import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification, Alert, Form, Radio } from 'antd';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import ONumericInput from 'components/commons/ONumericInput';
import ONumericSlider from 'components/commons/ONumericSlider';
import OTextField from 'components/commons/OTextField';
import OImageUpload from 'components/commons/OImageUpload';
import User from 'core/User';
import _ from 'lodash';
import * as Messages from 'constants/Messages';
import { UserCrudService, MetricsCrudService } from 'utils/CrudService';

class AccountEditModal extends Component {
    constructor(props) {
        super(props);
        this.crudService = new UserCrudService();
        this.state = {
            user: props.user,
            currentUser: props.currentUser,
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
            this.setState({ user: nextProps.user, currentUser: nextProps.currentUser });
        }
    }

    render() {
        const EditForm = Form.create({})(this.CustomForm.bind(this));
        return (
            <Modal
            visible={this.state.visible}
            onCancel={this.hideModal.bind(this)}
            className="account-edit"
            width="50%"
            footer={null}
            >
            <EditForm/>
        </Modal>
        );
    }

    CustomForm(props) {
        const form = props.form;
        return (
            <Form>
                <Form.Item>
                <Row>
                    <Col md={2} mdOffset={5}>
                        <OImageUpload 
                            container={this.state.user} 
                            fieldName="avatar" 
                            onSave={this.updatePhoto.bind(this)}
                            folder="account"/>
                    </Col>
                </Row>
                </Form.Item>
                <Form.Item>
                    <OTextField  
                        container={this.state.user} 
                        fieldName='username'
                        disabled={true}
                        label='Username'/>
                </Form.Item>
                <Form.Item>
                    {this.renderWithValidation(form,
                    <OTextField  
                        container={this.state.user} 
                        value={this.state.user.firstname}
                        fieldName='firstname' 
                        rules={[{ required: true, message: 'Please input your first name' }]}
                        label='First Name'/>
                    )}
                </Form.Item>
                <Form.Item>
                    {this.renderWithValidation(form,
                    <OTextField  
                        container={this.state.user} 
                        fieldName='lastname' 
                        rules={[{ required: true, message: 'Please input your last name' }]}
                        label='Last Name'/>
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
                {
                (_.get(this.state, 'currentUser.id') !== this.state.userId && _.get(this.state, 'currentUser.role') === 'admin') ?
                <Form.Item>
                    <Radio.Group defaultValue={this.state.user.role || 'member'} size="large" onChange={this.changeRole.bind(this)}>
                        <Radio.Button value="admin">Admin</Radio.Button>
                        <Radio.Button value="member">Member</Radio.Button>
                    </Radio.Group>
                </Form.Item>
                : ''
                }
                <Button type="primary" onClick={this.submitChanges.bind(this, form)}>Submit</Button>
            </Form>
        );
    }

    changeRole(e) {
        this.state.user.role = e.target.value;
        this.setState({ user: this.state.user });
    }

    async submitChanges(form) {
        form.validateFields(async(err) => {
            if (!err && _.get(this.state, 'user.id')) {
                const isSuccessfull = await this.crudService.updateDetails(this.state.user);
                if (isSuccessfull) {
                    this.hideModal();
                } else {
                    notification.open({ message: 'User not updated' });
                }
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

export default AccountEditModal;