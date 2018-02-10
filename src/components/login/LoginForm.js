import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link, withRouter } from 'react-router-dom';
import OTextField from 'components/commons/OTextField';
import User from 'core/User';
import * as Messages from 'constants/Messages';
import { Card, Button, Spin, Affix, Form, Icon, Input, Checkbox, notification } from 'antd';
import { Redirect } from 'react-router-dom';
const FormItem = Form.Item;

class NormalLoginForm extends React.Component {

    constructor(props) {
        super(props);
        this.crudService = props.crudService;
        this.state = { loading: false, login: { username: "", password: "" } };
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields(async(err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);

                this.setState({ loading: true });
                try {
                    const user = await this.crudService.getUser(values.userName);
                    if (user && this.props.onUpdate && values.userName === user.username && values.password === user.password) {
                        this.props.onUpdate(user);
                        this.setState({ isLogged: true });
                    } else {
                        notification.open({ message: Messages.LOGIN_FAILED, description: Messages.LOGIN_FAILED_DESC });
                        e.preventDefault();
                    }
                } catch (e) {
                    notification.open({ message: Messages.LOGIN_FAILED, description: Messages.LOGIN_FAILED_DESC });
                }
                this.setState({ loading: false });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Spin spinning={this.state.loading}>
                <h1>Welcome back!</h1>
                <Form onSubmit={this.handleSubmit.bind(this)} className="login-form">
                    <FormItem>
                      {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                      })(
                        <Input addonBefore="USERNAME" size="lg" placeholder="Enter your email or your username" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                      })(
                        <Input addonBefore="PASSWORD" size="lg" type="password" placeholder="Enter your password" />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" htmlType="submit" size="lg"  className="login-form-button">
                        LOGIN
                      </Button>
                      <p style={{ textAlign: 'center' }}>
                        Or <Link to={`/register`}>Register now!</Link>  
                      </p>
                    </FormItem>
                </Form>
            </Spin>
        );
    }
}

export default Form.create()(NormalLoginForm);