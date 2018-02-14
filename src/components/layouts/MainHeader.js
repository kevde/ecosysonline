import React, { Component } from 'react';
import { Layout, Menu, Breadcrumb, Affix, Avatar, Popover, Button, Icon } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import { Link } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

const { Header } = Layout;

class MainHeader extends Component {

    state = { menuClicked: false };

    render() {
        const username = _.get(this.props.user,'username');
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
                                <Popover placement="bottomRight" title={username} content={this.getPopoverContent()} trigger="click">
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
                                <Popover placement="bottomRight" title={username} content={this.getPopoverContent()} trigger="click">
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

    onMenuClick() {
        const menuClicked = !this.state.menuClicked;
        this.setState({ menuClicked });
        if (this.props.onMenuClick) {
            this.props.onMenuClick(menuClicked);
        }
        return menuClicked;
    }

    onLogout() {
        if (this.props.onLogout) {
            this.props.onLogout(null);
        }
    }

    getPopoverContent() {
        return (
            <Col>
                <Row>
                    <Col>
                        <Link to="/goals">Change Goal</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Link to="/users">Show Users</Link>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Button onClick={this.onLogout.bind(this)}>Logout</Button>
                    </Col>
                </Row>
            </Col>
        );
    }

    getAvatar() {
        let avatar = _.get(this.props.user, 'avatar');
        let props = (avatar) ? { src: avatar } : { icon: "user" };
        return <Avatar className="avatar" { ...props }/>;
    }
}
export default MainHeader;