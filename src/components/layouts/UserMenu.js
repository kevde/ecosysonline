import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

export default class UserMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu mode="vertical">
                <Menu.Item key="profile-1">
                    <Link to="/account">
                      <Icon type="mail" />My Account
                    </Link>
                </Menu.Item>
                <Menu.Item key="goals-2">
                    <Link to="/goals">
                      <Icon type="mail" />My Goals
                    </Link>
                </Menu.Item>
                <Menu.Item key="users-3">
                    <Link to="/users">
                      <Icon type="mail" />Users
                    </Link>
                </Menu.Item>
                <Menu.Item key="logout-4">Logout
                    <Link to="/logout">
                      <Icon type="mail" />
                    </Link>
                </Menu.Item>
			</Menu>
        );
    }
}