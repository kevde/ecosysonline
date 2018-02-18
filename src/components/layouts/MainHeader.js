import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Affix, Avatar, Popover, Button, Icon } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import UserMenu from './UserMenu';
import _ from 'lodash';

const { Header } = Layout;

class MainHeader extends Component {

    state = { menuClicked: false, userMenuVisible: false };

    render() {
        const username = _.get(this.props.user, 'username');
        return (
            <Affix>
                <Header>
                  <Row>
                    <Col xs={12}>
                      <MediaQuery query="(max-width: 768px)">
                      <Row middle="xs" between="xs">
                        <Col xs={2} start="xs">
                            <div className="trigger-button">
                                <Icon type="bars" ref="trigger" onClick={this.onMenuClick.bind(this)} />
                            </div>
                        </Col>
                        <Col xs={8} center="xs">
                            <Link to="/">
                                <img src={`${process.env.PUBLIC_URL}/logo.png`} width="100%"/>
                            </Link>
                        </Col>
                        <Col xs={2}  end="xs">
                            <span className="avatar-box">
                                <Popover placement="bottomRight" title={username} ref={(over) => this.popOver = over} content={this.getPopoverContent()} trigger="click" visible={this.state.userMenuVisible} onVisibleChange={this.handleVisibleChange.bind(this)}>
                                    {this.getAvatar()}
                                </Popover>
                            </span>
                        </Col>
                      </Row>
                      </MediaQuery>
                      <MediaQuery query="(min-width: 768px)">
                      <Row middle="xs" between="xs">
                        <Col xs={1} start="xs">
                            <div className="trigger-button">
                                <Icon type="bars" ref="trigger" onClick={this.onMenuClick.bind(this)} />
                            </div>
                        </Col>
                        <Col xs={3} xsOffset={8} middle="xs" className="end-xs">
                            <span>
                                Hi {username}!&nbsp;&nbsp;&nbsp;
                            </span>
                            <span className="avatar-box">
                                <Popover placement="bottomRight" title={username} ref={(over) => this.popOver = over} content={this.getPopoverContent()} trigger="click" visible={this.state.userMenuVisible} onVisibleChange={this.handleVisibleChange.bind(this)}>
                                    {this.getAvatar()}
                                </Popover>
                            </span>
                        </Col>
                      </Row>
                      </MediaQuery>
                    </Col>
                  </Row>
                </Header>
              </Affix>
        );
    }

    handleVisibleChange(userMenuVisible) {
        this.setState({ userMenuVisible });
    }
    
    onMenuClick() {
        this.setState({ userMenuVisible: false });
    }

    onLogout() {
        if (this.props.onLogout) {
            this.props.onLogout(null);
        }
    }

    getPopoverContent() {
        return (
            <UserMenu user={this.props.user} onClick={this.onMenuClick.bind(this)}/>
        );
    }

    getAvatar() {
        let avatar = _.get(this.props.user, 'avatar');
        let props = (avatar) ? { src: avatar } : { icon: "user" };
        return <Avatar className="avatar" { ...props }/>;
    }
}
export default MainHeader;