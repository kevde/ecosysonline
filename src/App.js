import React, { Component } from 'react';
import reactRouter, { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import Assumptions from './components/assumptions/Assumptions';
import ValueJourneyWorksheet from './components/journeys/ValueJourneyWorksheet';
import Sidebar from './components/layouts/Sidebar';
import MainHeader from './components/layouts/MainHeader';
import MetricForm from './components/forecasts/MetricForm';
import GoalSettingModal from './components/goals/GoalSettingModal';
import ValueJourneyForm from './components/journeys/ValueJourneyForm';
import { Journey } from './core/Journey';
import GoalList from './components/goals/GoalList';
import LoginForm from './components/login/LoginForm';
import RegisterForm from './components/login/RegisterForm';
import MonthService from 'components/commons/MonthService';
import { UserCrudService, GoalCrudService, PersonaCrudService, MetricsCrudService, JourneyCrudService } from 'utils/CrudService';
import _ from 'lodash';

import { Layout } from 'antd';
import User from 'core/User';
import Goal from 'core/Goal';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import MediaQuery from 'react-responsive';
import './App.css';
const { Content } = Layout;

const METRIC_NAMES = ["visitors", "ctr", "revenue"];

class App extends Component {

    constructor(props) {
        super(props);
        this.userCrudService = new UserCrudService();
        this.goalCrudService = new GoalCrudService();
        this.personaCrudService = new PersonaCrudService();
        this.metricsCrudService = new MetricsCrudService();
        this.journeyCrudService = new JourneyCrudService();
        this.basename = "/";
    }

    state = { user: null, collapsed: true }

    backgroundJourney = { backgroundImage: `url('${process.env.PUBLIC_URL}/login-bg.jpg')` }

    render() {
        return (
            <Router basename={this.basename}>
              <div>
                {(this.state.user === null) ? this.renderNotLogged() : this.renderLogged()}
              </div>
            </Router>
        );
    }

    renderNotLogged() {
        return (
            <Layout>
                <Row className="login-panel" middle="lg">
                    <Col lg={3} center="lg" className="login-panel-col">
                        <Row>
                            <Col xs={4} xsOffset={4} md={6} mdOffset={3}>
                                <img src={`${process.env.PUBLIC_URL}/blue-logo.png`} className="main-logo" />
                            </Col>
                            <Col xs={12} middle="xs">
                                <h1>Welcome back!</h1>
                            </Col>
                        </Row>
                        { (<Redirect to="/" />) }
                        <Route exact={true} path="/"  render={(props) => <LoginForm container={this.state} crudService={this.userCrudService} onUpdate={(user) => this.reRenderUser(user)}/> } />
                        <Route exact={true} path="/register"  render={(props) => <RegisterForm crudService={this.userCrudService} onUpdate={(user) => this.reRenderUser(user)} /> } />
                    </Col>
                    <MediaQuery query="(min-width: 768px)">
                        <Col lg={9} style={this.backgroundJourney} className="login-bg" />
                    </MediaQuery>
                </Row>
            </Layout>
        );
    }

    renderLogged() {
        return (
            <Layout>
                    <Sidebar basename={this.basename} goalId={this.state.currentGoalId} collapsed={this.state.collapsed} />
                    <Layout>
                        <MainHeader ref="mainHeader" user={this.state.user} onLogout={this.onLogout.bind(this)} onMenuClick={this.onMenuClick.bind(this)}/>
                        <Content className="content">
                          <Route exact={true} path="/"  render={(props) => <GoalList {...props} user={this.state.user} crudService={this.goalCrudService} goalId={this.state.currentGoalId} onUpdate={(goal) => this.setDefaultGoal(goal)} />} />
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


    reRenderUser(user) {
        this.setState({ user });
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

export default App;