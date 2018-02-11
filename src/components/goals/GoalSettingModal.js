import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification, Alert } from 'antd';
import GoalSettingStepBar from 'components/goals/steps/GoalSettingStepBar';
import MissionStatement from 'components/goals/steps/MissionStatement';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import ONumericInput from 'components/commons/ONumericInput';
import ONumericSlider from 'components/commons/ONumericSlider';
import OTextArea from 'components/commons/OTextArea';
import * as Messages from 'constants/Messages';
import { GoalCrudService, MetricsCrudService } from 'utils/CrudService';

class GoalSettingModal extends Component {
    constructor(props) {
        super(props);
        this.crudService = new GoalCrudService();
        this.metricsCrudService = new MetricsCrudService();
        this.state = {
            goal: props.goal,
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.goal) {
            this.setState({ goal: nextProps.goal });
        }
    }

    render() {
        return (
            <Modal
            visible={this.state.visible}
            onOk={this.done.bind(this)}
            onCancel={this.hideModal.bind(this)}
            className="goal-setting"
            width="50%"
            footer={null}
            >
            <GoalSettingStepBar ref="stepBar">
                <OTextArea  
                    title="Achieve" 
                    container={this.state.goal} 
                    fieldName='statement' 
                    label='What do you want to achieve with your company?'/>
                <Row
                    title="Goal">
                    <Col xs={12}>
                        <ONumericInput  
                            container={this.state.goal} 
                            fieldName='financialGoal' 
                            placeholder="(i.e) $20000"
                            prefix="$"
                            label='What is your financial goal?'/>
                    </Col>
                </Row>
                <Row
                    title="Period">
                    <Col xs={12}>
                            <h3>When do you want to start this goal and what is the end date?</h3>
                            <MonthRangePicker container={this.state.goal} startFieldName='startDate' endFieldName='endDate'/>
                    </Col>
                </Row>
                <Row
                    title="Workdays">
                    <Col xs={12}>
                    <ONumericInput  
                        container={this.state.goal} 
                        fieldName='monthlyWorkdays' 
                        suffix="day(s)"
                        label='How many days do you work per month'/>
                    </Col>
                </Row>
                <Row
                    title="Price">
                    <Col xs={12}>
                        <ONumericInput  
                            container={this.state.goal} 
                            fieldName='productPrice' 
                            prefix="$"
                            label='What is the average price of your product?'/>
                    </Col>
                </Row>
                <Row
                    title="Traffic CTR">
                    <Col xs={12}>
                        <ONumericSlider  
                            container={this.state.goal} 
                            step={0.01}
                            min={0.01}
                            max={100}
                            fieldName='ctr.traffic'
                            defaultValue={0.01}
                            suffix="%"
                            label='What is the your ideal traffic CTR?'/>
                    </Col>
                </Row>
                <Row
                    title="Optin CTR">
                    <Col xs={12}>
                        <ONumericSlider  
                            container={this.state.goal} 
                            step={0.01}
                            min={0.01}
                            max={100}
                            defaultValue={0.01}
                            fieldName='ctr.optin' 
                            suffix="%"
                            label='What is the your ideal optin CTR?'/>
                    </Col>
                </Row>
                <Row
                    title="Close Rate">
                    <Col xs={12}>
                        <ONumericSlider  
                            container={this.state.goal} 
                            step={0.01}
                            min={0.01}
                            max={100}
                            defaultValue={0.01}
                            fieldName='ctr.closerate' 
                            suffix="%"
                            label='What is the your ideal close rate?'/>
                    </Col>
                </Row>
                <OTextArea 
                    title="Omissions" 
                    container={this.state.goal} 
                    fieldName='omissions' 
                    label='What are the things you don’t need to do to get success?'/>
                <OTextArea 
                    title="Engage" 
                    container={this.state.goal} 
                    fieldName='engagement' 
                    label='What are the things you need to do to get success?'/>
                <Row
                    title="Done"
                >
                    <Col xs={12}>
                        <Row start="md">
                            <Col md={12}>
                                    <Alert
                                        message="Congratulations!"
                                        description="You have successfully created your mission statement"
                                        type="success"
                                        showIcon />
                            </Col>
                        </Row>
                        <Row center="xs">
                            <MissionStatement goal={this.state.goal} />
                        </Row>
                        <Row center="xs">
                            <Button type="primary" onClick={() => this.done()}>Done</Button>
                        </Row>
                    </Col>
                </Row>
            </GoalSettingStepBar>
        </Modal>
        );
    }

    async done() {
        try {
            const goal = this.state.goal;
            this.setState({ loading: true });
            if (goal.id) {
                const goalId = await this.crudService.update(goal);
            } else {
                const goalId = await this.crudService.create(goal);
                goal.id = goalId;
            }
            await this.metricsCrudService.createOrUpdateMetrics(goal);
            this.state.goal.enabled = true;
            this.setState({ goal: this.state.goal, loading: false });
            this.onUpdate(this.state.goal);
            notification.open({ message: Messages.FORECAST_SUCCESS, description: Messages.FORECAST_SUCCESS_DESC });
            this.setState({ visible: false }, () => console.log("closed"));
            this.refs.stepBar.reset();
        } catch (e) {
            notification.open({ message: Messages.ERROR, description: e });
        }
    }

    componentDidCatch() {
        notification.open({ message: Messages.FORECAST_SUCCESS, description: Messages.FORECAST_SUCCESS_DESC });

    }

    hideModal() {
        if (this.state.goal.goalId) {
            this.done();
        }
        this.setState({ visible: false }, () => console.log("closed"));
        this.refs.stepBar.reset();
    }

    showModal() {

        this.setState({ visible: true }, () => console.log("opened"));
    }

    onUpdate(goal) {
        if (this.props.onUpdate) {
            this.props.onUpdate(goal);
        }
    }
}

export default GoalSettingModal;