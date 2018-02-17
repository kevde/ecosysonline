import _ from 'lodash';
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Spin, Card, Switch, Icon } from 'antd';
import MissionStatement from 'components/goals/steps/MissionStatement';
import GoalSettingModal from 'components/goals/GoalSettingModal';
import Titlebar from 'components/layouts/Titlebar';
import Goal from 'core/Goal';
const { Meta } = Card;

export default class GoalList extends Component {
    constructor(props) {
        super(props);
        this.crudService = props.crudService;
        this.state = { goals: [], goalId: props.goalId, loading: true }
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.goalId !== _.get(this.state, 'currentGoal.id')) {
            this.setState({ loading: true });
            const goals = await this.reloadGoals(nextProps.user.id);
            const currentGoal = this.getDefaultGoal(goals, nextProps.goalId);
            this.setState({ goals, currentGoal, loading: false });
        }
    }

    async componentWillMount() {
        this.setState({ loading: true });
        const goals = await this.reloadGoals(this.props.user.id);
        const currentGoal = this.getDefaultGoal(goals, this.props.goalId);
        this.setState({ goals, currentGoal, loading: false });
    }

    async saveGoal(goal) {
        if (goal) {
            this.setState({ loading: true });
            const goals = await this.reloadGoals(this.props.user.id);
            const currentGoal = this.getDefaultGoal(goals, goal.id);
            this.setState({ goals, currentGoal, loading: false });
            this.onUpdate(goal);
        }
    }

    getDefaultGoal(goals, goalId) {
        const defaultGoal = _.find(goals, (goal) => goalId === goal.id);
        if (defaultGoal) {
            defaultGoal.enabled = true;
        }
        return defaultGoal;
    }

    async onSwitchChange(e, goal) {
        if (e === true && await this.onUpdate(goal)) {
            this.state.goals.map((g) => g.enabled = false);
            goal.enabled = true;
            this.setState({ goals: this.state.goals, currentGoal: goal });
        }
    }

    async reloadGoals(userId) {
        this.setState({ loading: true });
        const goals = await this.props.crudService.listByUserId(userId);
        this.setState({ goals: goals, loading: false });
        return goals;
    }

    async onUpdate(goal) {
        const isSuccess = true;
        if (this.props.onUpdate) {
            return await this.props.onUpdate(goal);
        }

        return isSuccess;
    }

    openModal(goal) {
        this.refs.goalSettingModal.showModal(goal);
    }

    createGoal() {
        const goal = new Goal(null, this.props.user.id);
        this.openModal(goal);
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Titlebar title="Setup Your Default Goal" description="Settings"/>
                <Row center="md">
                    {this.state.goals.map(goal => this.renderGoal(goal))}
                    {this.renderAddGoal()}
                </Row>
                <GoalSettingModal goal={this.state.currentGoal} ref="goalSettingModal" onUpdate={(goal) => this.saveGoal(goal)}  onRevert={(goal) => this.revertGoal(goal)}/>
            </Spin>
        );
    }

    renderAddGoal() {
        return (
            <Col md={3}>
                <Card onClick={() => this.createGoal(this.props.user.id)} className="add-goal">Add New Goal</Card>
            </Col>
        );
    }

    renderGoal(goal) {
        return (
            <Col md={3} key={goal.id}>
              <Card
                className="goal-card"
                hoverable
                cover={<img src={`https://placeimg.com/300/200/arch?random=${goal.id}`} width="100%" onClick={() => this.openModal(goal)}/>}
                actions={[<Icon type="setting" onClick={() => this.openModal(goal)}/>,<Switch checked={goal.enabled} onChange={(e) => this.onSwitchChange(e, goal)} />]}
              >
                <Meta
                  onClick={() => this.openModal(goal)}
                  title={goal.statement}
                />
              </Card>
            </Col>
        );
    }
}