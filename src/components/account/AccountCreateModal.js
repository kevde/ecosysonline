import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification, Alert, Form } from 'antd';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import ONumericInput from 'components/commons/ONumericInput';
import ONumericSlider from 'components/commons/ONumericSlider';
import OTextField from 'components/commons/OTextField';
import OImageUpload from 'components/commons/OImageUpload';
import User from 'core/User';
import _ from 'lodash';
import * as Messages from 'constants/Messages';
import { UserCrudService, MetricsCrudService } from 'utils/CrudService';

class AccountCreateModal extends Component {
    constructor(props) {
        super(props);
        this.crudService = new UserCrudService();
        this.state = {
            user: props.user,
            visible: false
        };
    }

    async componentWillMount() {
        if (this.props.user) {
            const user = await this.crudService.get(this.props.user.id);
            this.setState({ user });
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({ user: nextProps.user });
        }
    }

    render() {
        const CreateForm = Form.create({})(this.CustomForm.bind(this));
        return (
            <Modal
            visible={this.state.visible}
            onCancel={this.hideModal.bind(this)}
            className="account-edit"
            width="50%"
            footer={null}
            >
            <CreateForm/>
        </Modal>
        );
    }

    CustomForm(props) {
        const form = props.form;
        return (
            <Form>
                <Form.Item>
                    {this.renderWithValidation(form,
                    <OTextField  
                        container={this.state.user} 
                        fieldName='username' 
                        rules={[{ required: true, message: 'Please input your username' }]}
                        label='Username'/>
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderWithValidation(form,
                    <OTextField  
                        container={this.state.user} 
                        fieldName='password'
                        type="password"
                        rules={[
                            { required: true, message: 'Please input your password' },
                            // { pattern: /\d{6, 12}/, message: 'Password should be from 6 to 12 characters only'}
                        ]}
                        label='Password'/>
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderWithValidation(form,
                    <OTextField  
                        container={this.state.user} 
                        fieldName='email' 
                        rules={[{ required: true, message: 'Please type in an email' }, { type: 'email', message: 'The input is not valid E-mail!' }]}
                        label='E-mail'/>
                    )}
                </Form.Item>
                <Button type="primary" onClick={this.submitChanges.bind(this, form)}>Submit</Button>
            </Form>
        );
    }

    async submitChanges(form) {
        form.validateFields(async(err) => {
            if (!err) {
                const userId = await this.crudService.create(this.state.user);
                if (userId) {
                    this.hideModal();
                } else {
                    notification.open({ message: 'User not updated' });
                }
            } else {
                console.log(err);
            }
        }, );
    }

    renderWithValidation(form, reactComponent) {
        return form.getFieldDecorator(reactComponent.props.fieldName, {
            initialValue: _.get(reactComponent.props.container, reactComponent.props.fieldName),
            rules: reactComponent.props.rules
        })(reactComponent);
    }

    hideModal() {
        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.user);
        }
        this.setState({ visible: false });
    }

    async updatePhoto(container, avatarBinary) {
        return await this.crudService.updatePhoto(this.state.user.id, avatarBinary);
    }

    async showModal(userId) {
        if (userId) {
            const user = await this.crudService.get(userId);
            this.setState({ user, visible: true });
        } else {
            this.setState({ user: new User(), visible: true });
        }
    }

    onUpdate(user) {
        if (this.props.onUpdate) {
            this.props.onUpdate(user);
        }
    }
}

export default AccountCreateModal;