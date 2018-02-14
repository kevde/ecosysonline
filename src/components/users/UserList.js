import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Menu, Icon, Layout, Card, Avatar, Switch, Button } from 'antd';
import ReactTable from "react-table";
import moment from 'moment';
import "react-table/react-table.css";
const { Header, Content, Sider } = Layout;

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: true },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
                { fullname: 1, photo: './blank-photo.jpg', lastActivity: moment(), revenue: 10000, active: false },
            ]
        };
    }

    render() {
        return (
            <Row width="100%">
                <Col width="100%">
                <Card width="100%">
        <ReactTable
          pageSize={10 || this.state.users.length}
          showPagination={false}
          data={this.state.users}
          columns={this.columns}
          width="100%"
          className="-striped -highlight"
        />
                </Card>
                </Col>
            </Row>
        );
    }

    get columns() {
        const clientHeader = { Header: "Client Name", accessor: "fullname" };
        const lastActivityHeader = { Header: "Last Activity", accessor: 'lastActivity' };
        const totalBalanceHeader = { Header: "Total Balance", accessor: 'revenue' };
        const activeStateHeader = { Header: "Active", accessor: 'active' };
        const deleteHeader = {};
        clientHeader.Cell = this.renderAvatar.bind(this);
        lastActivityHeader.Cell = this.renderActivity.bind(this);
        totalBalanceHeader.Cell = this.renderRevenue.bind(this);
        activeStateHeader.Cell = this.renderActive.bind(this);
        deleteHeader.Cell = this.renderDelete.bind(this);
        return [clientHeader, lastActivityHeader, totalBalanceHeader, activeStateHeader, deleteHeader];
    }

    renderAvatar(cellInfo) {
        return (
            <div>
                <Avatar src={this.state.users[cellInfo.index]['photo']} icon="user" />
                {this.state.users[cellInfo.index]['fullname']}
            </div>
        );
    }

    renderDelete(cellInfo) {
        return (
            <div>
                <Button type="primary">
                    <Icon type="delete" />
                </Button>
            </div>
        );
    }

    renderActive(cellInfo) {
        return (
            <div>
                <Switch checkedChildren="Active" unCheckedChildren="On Hold" onChange={this.onChange.bind(this, cellInfo)} checked={this.state.users[cellInfo.index]['active']} />
            </div>
        );
    }

    renderActivity(cellInfo) {
        return this.state.users[cellInfo.index]['lastActivity'].format('MM/DD/YY');
    }

    renderRevenue(cellInfo) {
        const revenue = `$${this.state.users[cellInfo.index]['revenue'].toFixed(2)}`;
        return (
            <div class="user-revenue">
              {revenue}
            </div>
        );
    }

    onChange(cellInfo, e) {
        this.state.users[cellInfo.index]['active'] = !this.state.users[cellInfo.index]['active'];
        this.setState({ users: this.state.users });
    }
}