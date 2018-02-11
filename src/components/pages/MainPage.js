import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import Assumptions from 'components/assumptions/Assumptions';
import ValueJourneyWorksheet from 'components/journeys/ValueJourneyWorksheet';
import Sidebar from 'components/layouts/Sidebar';
import MainHeader from 'components/layouts/MainHeader';
import MetricForm from 'components/forecasts/MetricForm';
import ValueJourneyForm from 'components/journeys/ValueJourneyForm';
import GoalList from 'components/goals/GoalList';
import LoginForm from 'components/login/LoginForm';
import RegisterForm from 'components/login/RegisterForm';
import MonthService from 'components/commons/MonthService';
import Dashboard from 'components/dashboard/Dashboard';
import { GoalCrudService, PersonaCrudService, MetricsCrudService, JourneyCrudService } from 'utils/CrudService';
import _ from 'lodash';

import { Layout } from 'antd';
import Goal from 'core/Goal';
import MediaQuery from 'react-responsive';
const { Content, Footer } = Layout;

class MainPage extends Component {

    constructor(props) {
        super(props);
        this.goalCrudService = new GoalCrudService();
        this.personaCrudService = new PersonaCrudService();
        this.metricsCrudService = new MetricsCrudService();
        this.journeyCrudService = new JourneyCrudService();
        this.state = { user: props.user, collapsed: true }
        this.basename = props.basename;
    }

    render() {
        return (
            <Layout>
                    <Sidebar basename={this.basename} goalId={this.state.currentGoalId} collapsed={this.state.collapsed} />
                    <Layout>
                        <MainHeader ref="mainHeader" user={this.state.user} onLogout={this.onLogout.bind(this)} onMenuClick={this.onMenuClick.bind(this)}/>
                        <Content className="content">
                          <Route exact={true} path="/"  render={(props) => <Dashboard user={this.state.user} /> } />
                          <Route exact={true} path="/goals"  render={(props) => <GoalList {...props} user={this.state.user} crudService={this.goalCrudService} goalId={this.state.currentGoalId} onUpdate={(goal) => this.setDefaultGoal(goal)} />} />
                          <Route exact={true} path="/assumptions/:goalId" render={(props) => <Assumptions {...props} goal={this.state.user.goals} crudService={this.personaCrudService} /> }/>
                          <Route exact={true} path="/journeys/:goalId"  onEnter={this.changeClassName.bind(this)} render={(props) => <ValueJourneyWorksheet {...props} goal={this.state.user.goals} crudService={this.journeyCrudService} /> } />
                          <Route exact={true} path="/forecast/:type/:goalId" render= {() => <MetricForm isEditable={true} /> } />
                          <Route exact={true} path="/revenue/:goalId" render={(props) => <MetricForm {...props} /> } />
                        </Content>
                    </Layout>
              </Layout>
        );
    }

    onMenuClick(collapsed) {
        this.setState({ collapsed });
    }

    changeClassName(e) {
        console.log(e);
    }

    async onLogout(user) {
        this.setState({ user: null });
    }

    async setDefaultGoal(goal) {
        const currentGoalId = goal.id;
        this.setState({ currentGoalId });
    }

    populateMonthlyMetrics(goals, metrics, metricName) {
        const metricValue = goals[metricName];
        const { goal, stretch } = metricValue;
        if (_.isEmpty(metrics[metricName])) {
            metrics[metricName] = MonthService.createMetricValues(goals.startDate, goals.endDate, goal, stretch);
        } else {
            metrics[metricName] = MonthService.updateMetricValues(goals.startDate, goals.endDate, goal, stretch, metrics[metricName]);
        }
    }

}

export default MainPage;