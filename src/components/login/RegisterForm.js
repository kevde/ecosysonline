import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Link, withRouter } from 'react-router-dom';
import User from 'core/User';
import * as Messages from 'constants/Messages';
import { Form, Input, Tooltip, Icon, Cascader, Select, Checkbox, Button, AutoComplete, Spin, notification } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const residences = [{
    value: 'zhejiang',
    label: 'Zhejiang',
    children: [{
        value: 'hangzhou',
        label: 'Hangzhou',
        children: [{
            value: 'xihu',
            label: 'West Lake',
        }],
    }],
}, {
    value: 'jiangsu',
    label: 'Jiangsu',
    children: [{
        value: 'nanjing',
        label: 'Nanjing',
        children: [{
            value: 'zhonghuamen',
            label: 'Zhong Hua Men',
        }],
    }],
}];

class RegistrationForm extends React.Component {

    async handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                this.setState({ loading: true });
                const user = new User(null, values.username, values.password);
                try {
                    const { data } = await this.crudService.create(user);
                    if (data) {
                        notification.open({ message: `Welcome ${user.username}!`, description: `An account has been created for you` });
                        this.setState({ isLogged: true });
                        if (this.props.onUpdate) {
                            this.props.onUpdate(user);
                        }
                    } else {
                        notification.open({ message: Messages.ERROR, description: Messages.REGISTER_ERROR });
                    }
                } catch (e) {
                    notification.open({ message: Messages.ERROR, description: Messages.REGISTER_ERROR });

                }
                this.setState({ loading: false });
            }
        });
    }
    handleConfirmBlur(e) {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }

    checkPassword(rule, value, callback) {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    }
    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }

    constructor(props) {
        super(props);
        this.crudService = props.crudService;
        this.state = {
            loading: false,
            login: { username: "", password: "" },
            confirmDirty: false,
            autoCompleteResult: []
        };
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { autoCompleteResult } = this.state;
        return (
            <Spin spinning={this.state.loading}>
                <h1>Create an Account</h1>
                <Form onSubmit={this.handleSubmit.bind(this)}>
                    <FormItem>
                      {getFieldDecorator('username', {
                        rules: [{
                          required: true, message: 'Please input your username!',
                        }],
                      })(
                        <Input addonBefore="USERNAME" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: [{
                          required: true, message: 'Please input your password!',
                        }, {
                          validator: this.checkConfirm.bind(this),
                        }],
                      })(
                        <Input type="password" addonBefore="PASSWORD" />
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('confirm', {
                        rules: [{
                          required: true, message: 'Please confirm your password!',
                        }, {
                          validator: this.checkPassword.bind(this),
                        }],
                      })(
                        <Input type="password" addonBefore="CONFIRM PASSWORD" onBlur={this.handleConfirmBlur.bind(this)} />
                      )}
                    </FormItem>
                    <FormItem>
                      <Button type="primary" className="login-form-button" htmlType="submit">Register</Button>
                    </FormItem>
                    <p style={{ textAlign: 'center' }}>
                        Or back to <Link to={`/`}>Login</Link>  
                      </p>
                </Form>
            </Spin>
        );
    }
}

export default Form.create()(RegistrationForm);