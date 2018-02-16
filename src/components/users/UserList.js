import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Menu, Icon, Layout, Card, Avatar, Switch, Button, Select } from 'antd';
import ReactTable from "react-table";
import moment from 'moment';
import "react-table/react-table.css";
const { Option } = Select;
const { Header, Content, Sider } = Layout;

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            pageSize: 10,
            items: 100,
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
            <content>
            <Row>
                <Col xs={8} md={10}>
                    <span className="user-list-pagination">
                        Showing {this.state.page} of {this.state.items}
                    </span>
                    <Select defaultValue={10} style={{ width: 120 }} value={this.state.pageSize}>
                      <Option value={5}>Show 5</Option>
                      <Option value={10}>Show 10</Option>
                      <Option value={20}>Show 20</Option>
                      <Option value={50}>Show 50</Option>
                    </Select>
                </Col>
                <Col xs={2} md={1}>
                    <Button className="user-list-pagination-button prev">Prev</Button>
                </Col>
                <Col xs={2} md={1}>
                    <Button className="user-list-pagination-button next">Next</Button>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                </Col>
            </Row>
            <Row>
                <Col md={12}>
                    <Card width="100%">
                        <ReactTable
                          pageSize={10 || this.state.users.length}
                          showPagination={false}
                          data={this.state.users}
                          columns={this.columns}
                          className="user-list"
                          style={{height: '70vh'}}
                        />
                    </Card>
                </Col>
            </Row>
            </content>
        );
    }

    get columns() {
        const clientHeader = { Header: "Client Name", accessor: "fullname" };
        const lastActivityHeader = { Header: "Last Activity", accessor: 'lastActivity' };
        const totalBalanceHeader = { Header: "Total Balance", accessor: 'revenue' };
        const activeStateHeader = { };
        clientHeader.Cell = this.renderAvatar.bind(this);
        lastActivityHeader.Cell = this.renderActivity.bind(this);
        totalBalanceHeader.Cell = this.renderRevenue.bind(this);
        activeStateHeader.Cell = this.renderActive.bind(this);
        return [clientHeader, lastActivityHeader, totalBalanceHeader, activeStateHeader];
    }

    renderAvatar(cellInfo) {
        return (
            <div>
                <span className="user-avatar">
                    <Avatar src={this.state.users[cellInfo.index]['photo']} icon="user" />
                </span>
                <span className="user-fullname">
                    {this.state.users[cellInfo.index]['fullname']}
                </span>
            </div>
        );
    }

    renderActive(cellInfo) {
        return (
            <div className="user-cell">
                <Row>
                    <Col xs={6}>
                        <Switch checkedChildren="Active" unCheckedChildren="On Hold" onChange={this.onChange.bind(this, cellInfo)} checked={this.state.users[cellInfo.index]['active']} />
                    </Col>
                    <Col xs={6}>
                        <Button type="primary">
                            <Icon type="delete" />
                        </Button>
                    </Col>
                </Row>
            </div>
        );
    }

    renderActivity(cellInfo) {
        return (
            <div className="user-cell">
                {this.state.users[cellInfo.index]['lastActivity'].format('MM/DD/YY')}
            </div>
            );
    }

    renderRevenue(cellInfo) {
        const revenue = `$${this.state.users[cellInfo.index]['revenue'].toFixed(2)}`;
        return (
            <div className="user-revenue user-cell">
              {revenue}
            </div>
        );
    }

    onChange(cellInfo, e) {
        this.state.users[cellInfo.index]['active'] = !this.state.users[cellInfo.index]['active'];
        this.setState({ users: this.state.users });
    }
}