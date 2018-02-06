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
                                <Popover placement="bottomRight" title={this.props.user.username} content={<Button onClick={this.onLogout.bind(this)}>Logout</Button>} trigger="click">
                                    {this.getAvatar()}
                                </Popover>
                            </span>
                        </Col>
                      </Row>
                      </MediaQuery>
                      <MediaQuery query="(min-width: 768px)">
                      <Row middle="xs" end="xs">
                        <Col xs={3} xsOffset={9} middle="xs">
                            <span>
                                Hi {this.props.user.username}!&nbsp;&nbsp;&nbsp;
                            </span>
                            <span className="avatar-box">
                                <Popover placement="bottomRight" title={this.props.user.username} content={<Button onClick={this.onLogout.bind(this)}>Logout</Button>} trigger="click">
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
            this.props.onLogout(this.props.user);
        }
    }

    getAvatar() {
        let props = (this.props.user.avatar) ? { src: this.props.user.avatar } : { icon: "user" };
        return <Avatar size="large" className="avatar" { ...props }/>;
    }
}
export default MainHeader;