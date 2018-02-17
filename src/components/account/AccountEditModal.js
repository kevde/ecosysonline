import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification, Alert } from 'antd';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import ONumericInput from 'components/commons/ONumericInput';
import ONumericSlider from 'components/commons/ONumericSlider';
import OTextField from 'components/commons/OTextField';
import OImageUpload from 'components/commons/OImageUpload';
import User from 'core/User';
import * as Messages from 'constants/Messages';
import { UserCrudService, MetricsCrudService } from 'utils/CrudService';

class AccountEditModal extends Component {
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
        if (this.state.user.id) {
            this.done();
        }
        this.setState({ visible: false });
    }

    done() {

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