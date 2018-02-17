import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AccountEditModal from 'components/account/AccountEditModal';
import { Menu, Icon, Layout, Card, Avatar, Switch, Button, Select, Input } from 'antd';
import ReactTable from "react-table";
import moment from 'moment';
import "react-table/react-table.css";
const { Option } = Select;
const { Header, Content, Sider } = Layout;
const InputGroup = Input.Group;

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.userCrudService = props.userCrudService;
        this.state = {
            page: 0,
            pageSize: 10,
            items: 100,
            users: []
        };
    }

    async componentWillMount() {
        const users = await this.userCrudService.listBasicUserDetails();
        this.setState({ users });
    }

    changePageSize(value) {
        this.setState({ pageSize: value, page: 0 });
    }

    changePage(step) {
        const isIncrementValid = step > 0 && !this.isNextDisabed();
        const isDecrementValid = step < 0 && !this.isPrevDisabled();

        if (isIncrementValid || isDecrementValid) {
            this.setState({ page: this.state.page + step });
        }
    }

    isNextDisabed() {
        const currentLength = (this.state.page + 1) * this.state.pageSize;
        const usersLength = this.state.users.length;
        return currentLength >= usersLength;
    }

    isPrevDisabled() {
        const currentLength = this.state.page * this.state.pageSize;
        return currentLength <= 0;
    }

    render() {
        const currentLength = (this.state.page + 1) * this.state.pageSize;
        const usersLength = this.state.users.length;
        return (
            <content>
            <Row>
                <Col xs={8} md={9}>
                    <span className="user-list-pagination">
                        Showing {(currentLength > usersLength) ? usersLength : currentLength} of {usersLength}
                    </span>
                    <Select defaultValue={10} style={{ width: 120 }} value={this.state.pageSize} onChange={this.changePageSize.bind(this)}>
                      <Option value={5}>Show 5</Option>
                      <Option value={10}>Show 10</Option>
                      <Option value={20}>Show 20</Option>
                      <Option value={50}>Show 50</Option>
                    </Select>
                </Col>
                <Col xs={2} md={1}>
                    <Button className="user-list-account" onClick={this.showAccountEditModal.bind(this)} disabled={this.isNextDisabed()}>
                        Add User
                    </Button>  
                </Col>
                <Col xs={2} md={2}>
                 <InputGroup compact>
                    <Button className="user-list-pagination-button prev" onClick={() => this.changePage(-1)} disabled={this.isPrevDisabled()}>Prev</Button>
                    <Button className="user-list-pagination-button next" onClick={() => this.changePage(1)} disabled={this.isNextDisabed()}>Next</Button>
                 </InputGroup>
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
                          page={this.state.page}
                          pageSize={this.state.pageSize}
                          className="user-list"
                          style={{height: '70vh'}}
                        />
                    </Card>
                    <AccountEditModal ref="accountEditModal" />
                </Col>
            </Row>
            </content>
        );
    }

    get columns() {
        const clientHeader = { Header: "Client Name", accessor: "fullname" };
        const lastActivityHeader = { Header: "Last Activity", accessor: 'lastActivity' };
        const totalBalanceHeader = { Header: "Total Balance", accessor: 'revenue' };
        const activeStateHeader = {};
        clientHeader.Cell = this.renderAvatar.bind(this);
        lastActivityHeader.Cell = this.renderActivity.bind(this);
        totalBalanceHeader.Cell = this.renderRevenue.bind(this);
        activeStateHeader.Cell = this.renderActive.bind(this);
        return [clientHeader, lastActivityHeader, totalBalanceHeader, activeStateHeader];
    }

    showAccountEditModal(userId) {
        this.refs.accountEditModal.showModal(userId);
    }

    renderAvatar(cellInfo) {
        return (
            <div onClick={() => this.showAccountEditModal(this.state.users[cellInfo.index]['id'])}>
                <span className="user-avatar">
                    <Avatar src={this.state.users[cellInfo.index]['avatar']} icon="user" />
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