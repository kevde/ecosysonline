import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';
import AccountEditModal from 'components/account/AccountEditModal';
import _ from 'lodash';

export default class UserMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userId: _.get(props, 'user.id'),
            role: _.get(props, 'user.role')
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user) {
            this.setState({
                userId: _.get(nextProps, 'user.id'),
                role: _.get(nextProps, 'user.role')
            });
        }
    }

    render() {
        return (
            <Menu mode="vertical">
                <Menu.Item key="profile-1">
                    <div  onClick={this.openModal.bind(this)}>
                        <Icon type="user" />My Account
                    </div>
                </Menu.Item>
                <Menu.Item key="goals-2">
                    <Link to="/goals">
                      <Icon type="star-o" />My Goals
                    </Link>
                </Menu.Item>
                {
                (this.state.role === 'admin') ?
                <Menu.Item key="users-3">
                    <Link to="/users">
                      <Icon type="usergroup-add" />Users
                    </Link>
                </Menu.Item>
                : ''
                }
                <Menu.Item key="logout-4">
                    <Link to="/logout">
                      <Icon type="logout" />Logout
                    </Link>
                </Menu.Item>
                <AccountEditModal ref={(modal) => this.accountEditModal = modal} user={this.props.user}/> 
            </Menu>
        );
    }

    openModal() {
        this.accountEditModal.showModal(this.state.userId);
    }
}