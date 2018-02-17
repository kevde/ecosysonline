import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AccountEditModal from 'components/account/AccountEditModal';
import AccountCreateModal from 'components/account/AccountCreateModal';
import { Menu, Icon, Layout, Card, Avatar, Switch, Button, Select, Input, Spin } from 'antd';
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
            currentUser: props.currentUser,
            loading: false,
            page: 0,
            pageSize: 10,
            items: 100,
            users: []
        };
    }

    async componentWillMount() {
        this.reloadUserList();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.currentUser) {
            this.setState({ currentUser: nextProps.currentUser });
        }
    }

    async reloadUserList() {
        this.setState({ loading: true });
        const users = await this.userCrudService.listBasicUserDetails();
        this.setState({ users, loading: false });
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

    async deleteUser(cellInfo, e) {
        const userId = this.state.users[cellInfo.index]['id'];
        if (this.props.currentUser.id !== userId) {
            this.state.users[cellInfo.index]['delete-loading'] = true;
            this.setState({ users: this.state.users });
            const isSuccessfull = await this.userCrudService.delete(userId);

            if (isSuccessfull) {
                this.reloadUserList();
            } else {
                this.state.users[cellInfo.index]['delete-loading'] = false;
                this.setState({ users: this.state.users });
            }

        }
    }

    async onChange(cellInfo, e) {
        const userId = this.state.users[cellInfo.index]['id'];
        if (this.props.currentUser.id !== userId) {
            const toggledActive = !this.state.users[cellInfo.index]['active'];
            this.state.users[cellInfo.index]['loading'] = true;
            this.setState({ users: this.state.users });
            const isSuccessfull = await this.userCrudService.updateActiveStatus(userId, toggledActive);

            if (isSuccessfull) {
                this.state.users[cellInfo.index]['active'] = toggledActive;
            }
            this.state.users[cellInfo.index]['loading'] = false;
            this.setState({ users: this.state.users });
        }
    }

    onUpdate() {
        this.reloadUserList();
    }

    render() {
        const currentLength = (this.state.page + 1) * this.state.pageSize;
        const usersLength = this.state.users.length;
        return (
            <content>
                <Spin spinning={this.state.loading}>
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
                            <Button className="user-list-account" onClick={this.showAccountCreateModal.bind(this)}>
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
                            <AccountEditModal ref="accountEditModal" onUpdate={this.onUpdate.bind(this)} currentUser={this.state.currentUser} />
                            <AccountCreateModal ref="accountCreateModal" onUpdate={this.onUpdate.bind(this)} currentUser={this.state.currentUser} />
                        </Col>
                    </Row>
                </Spin>
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

    showAccountCreateModal() {
        this.refs.accountCreateModal.showModal();
    }

    renderAvatar(cellInfo) {
        return (
            <div onClick={() => this.showAccountEditModal(this.state.users[cellInfo.index]['id'])}>
                <Row>
                    <Col xs={1}>
                <span className="user-avatar">
                        <Avatar src={this.state.users[cellInfo.index]['avatar']} icon="user" />
                </span>
                    </Col>
                    <Col xs={11}>
                <span className="user-fullname">
                        {this.state.users[cellInfo.index]['fullname']}
                </span>
                    </Col>
                </Row>


            </div>
        );
    }

    renderActive(cellInfo) {
        return (
            <div className="user-cell">
                <Row>
                    <Col xs={6}>
                        <Switch 
                            checkedChildren="Active" 
                            unCheckedChildren="On Hold" 
                            onChange={this.onChange.bind(this, cellInfo)} 
                            checked={this.state.users[cellInfo.index]['active']} 
                            loading={this.state.users[cellInfo.index]['loading']}/>
                    </Col>
                    <Col xs={6}>
                        <Button type="primary" onClick={this.deleteUser.bind(this, cellInfo)} loading={this.state.users[cellInfo.index]['delete-loading']}>
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
}