import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import LoginForm from 'components/login/LoginForm';
import RegisterForm from 'components/login/RegisterForm';
import { UserCrudService } from 'utils/CrudService';
import AuthService from 'utils/AuthService';
import _ from 'lodash';

import { Layout } from 'antd';
import User from 'core/User';
import MediaQuery from 'react-responsive';
const { Content } = Layout;

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.userCrudService = new UserCrudService();
    }

    state = { user: null }

    backgroundJourney = { backgroundImage: `url('${process.env.PUBLIC_URL}/login-bg.jpg')` }

    render() {
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
                        <Switch>
                        <Route exact path="/register" render={(props) => <RegisterForm crudService={this.userCrudService} onUpdate={(user) => this.reRenderUser(user)} /> } />
                        </Switch>
                    </Col>
                    <MediaQuery query="(min-width: 768px)">
                        <Col lg={9} style={this.backgroundJourney} className="login-bg" />
                    </MediaQuery>
                </Row>
            </Layout>
        );
    }

    reRenderUser(user) {
        this.setState({ user });
    }
}

export default LoginPage;