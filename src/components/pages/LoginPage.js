import React, { Component } from 'react';
import reactRouter, { Route } from 'react-router-dom';
import { Row, Col } from 'react-flexbox-grid';
import LoginForm from 'components/login/LoginForm';
import RegisterForm from 'components/login/RegisterForm';
import { UserCrudService } from 'utils/CrudService';
import _ from 'lodash';

import { Layout } from 'antd';
import User from 'core/User';
import MediaQuery from 'react-responsive';
const { Content, Footer } = Layout;

class LoginPage extends Component {

    constructor(props) {
        super(props);
        this.userCrudService = new UserCrudService();
        this.state = { user: props.user };
    }

    backgroundJourney = { backgroundImage: `url('${process.env.PUBLIC_URL}/login-bg.jpg')` }

    async componentWillReceiveProps(nextProps) {
        const { user } = nextProps;
        this.setState({ user });
    }

    render() {
        return (
            <Layout>
                <Row className="login-panel" middle="lg">
                    <Col lg={4} center="lg" className="login-panel-col">
                        <Row>
                            <Col xs={4} xsOffset={4} md={6} mdOffset={3}>
                                <img src={`${process.env.PUBLIC_URL}/blue-logo.png`} className="main-logo" />
                            </Col>
                        </Row>
                        <Route exact={true} path="/"  render={(props) => <LoginForm container={this.state} crudService={this.userCrudService} onUpdate={(user) => this.onUpdate(user)}/> } />
                        <Route exact={true} path="/register"  render={(props) => <RegisterForm crudService={this.userCrudService} onUpdate={(user) => this.onUpdate(user)} /> } />
                        <Footer>2018 <span>Online</span><span className="trade">Ecosystem&trade;</span></Footer>
                    </Col>
                    <MediaQuery query="(min-width: 768px)">
                        <Col lg={8}><div style={this.backgroundJourney} className="login-bg" /></Col>
                    </MediaQuery>
                </Row>
            </Layout>
        );
    }

    onUpdate(user) {
        this.setState({ user }, () => {
            if (this.props.onUpdate) {
                this.props.onUpdate(user);
            }
        });
    }
}

export default LoginPage;