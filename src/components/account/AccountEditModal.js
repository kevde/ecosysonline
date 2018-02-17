import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification, Alert } from 'antd';
import GoalSettingStepBar from 'components/goals/steps/GoalSettingStepBar';
import MissionStatement from 'components/goals/steps/MissionStatement';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import ONumericInput from 'components/commons/ONumericInput';
import ONumericSlider from 'components/commons/ONumericSlider';
import OTextField from 'components/commons/OTextField';
import * as Messages from 'constants/Messages';
import { UserCrudService, MetricsCrudService } from 'utils/CrudService';

class AccountEditModal extends Component {
    constructor(props) {
        super(props);
        this.crudService = new UserCrudService();
        this.state = {
            goal: props.user,
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({ user: nextProps.user });
        }
    }

    render() {
        return (
            <Modal
            visible={this.state.visible}
            onOk={this.done.bind(this)}
            onCancel={this.hideModal.bind(this)}
            className="account-edit"
            width="50%"
            footer={null}
            >
				<OImageUpload container={this.state.user} fieldName="avatar" onSave={this.updatePhoto.bind(this)} folder="account"/>
                <OTextField  
                    container={this.state.user} 
                    fieldName='firstname' 
                    required={true}
                    label='First Name'/>
                <OTextField  
                    container={this.state.user} 
                    fieldName='lastname' 
                    required={true}
                    label='Last Name'/>
                <OTextField  
                    container={this.state.user} 
                    fieldName='email' 
                    required={true}
                    label='E-mail'/>
        </Modal>
        );
    }

    hideModal() {
        if (this.state.goal.goalId) {
            this.done();
        }
        this.setState({ visible: false }, () => console.log("closed"));
        this.refs.stepBar.reset();
    }

    showModal(userId) {
        const user = await this.crudService.getUser(this.props.userId);
        this.setState({ user, visible: true }, () => console.log("opened"));
    }

    onUpdate(goal) {
        if (this.props.onUpdate) {
            this.props.onUpdate(goal);
        }
    }
}

export default AccountEditModal;