import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Menu } from 'antd';

export default class UserMenu extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Menu mode="vertical">
		        <Menu.Item key="profile">
		          <Icon type="mail" />Settings
		        </Menu.Item>
		        <Menu.Item key="logout">Logout
		          <Icon type="mail" />
		        </Menu.Item>
			</Menu>
        );
    }
}