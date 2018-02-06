import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Layout, Menu, Breadcrumb, Icon, Affix, Switch } from 'antd';
import { login, logout, isLoggedIn } from 'utils/AuthService';
import MediaQuery from 'react-responsive';
const { Sider } = Layout;
const SubMenu = Menu.SubMenu;

class Sidebar extends Component {

    constructor(props) {
        super(props);
    }
    state = {
        collapsed: this.props.collapsed,
        goalId: this.props.goalId
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ goalId: nextProps.goalId, collapsed: nextProps.collapsed });
    }

    render() {
        return (
            <div>
            <Affix>
              <MediaQuery query="(max-width: 768px)">
                <Sider
                collapsible
                trigger={null}
                collapsed={this.state.collapsed}
                collapsedWidth="0">
                  {this.renderContents()}
                </Sider>
              </MediaQuery>
              <MediaQuery query="(min-width: 768px)">
                <Sider
                collapsed={false}
                collapsedWidth="0">
                  {this.renderContents()}
                </Sider>
              </MediaQuery>
            </Affix>
            </div>
        );
    }


    renderContents() {
        const goalId = this.state.goalId;
        return (
              <div>
                <div className="logo">
                <MediaQuery query="(min-width: 768px)">
                  <img src={`${process.env.PUBLIC_URL}/logo.png`} width="100%"/>
                </MediaQuery>
                </div>
                <Menu theme="dark" defaultSelectedKeys={['video']} mode="inline">
                  <Menu.Item key="start">
                    <Link to={`/`}>
                    <Icon type="right" />
                    <span>Start</span></Link>
                  </Menu.Item>
                  {(goalId) ? 
                    this.renderForecastMenu(goalId)
                     : ""}
                  {(goalId) ?
                  <Menu.Item key="assumptions">
                    <Icon type="usergroup-add" />
                    <span><Link to={`/assumptions/${goalId}`}>Fundamental Assumptions</Link></span>
                  </Menu.Item>
                  : "" }
                  {(goalId) ? 
                  <Menu.Item key="journeys">
                    <Icon type="car" />
                    <span><Link to={`/journeys/${goalId}`}>Buyer's Journey</Link></span>
                  </Menu.Item>
                  : "" }
                </Menu>
              </div>
        );
    }

    renderForecastMenu(goalId) {
        return <SubMenu
              key="forecast"
              title={<span><Icon type="cloud" /><span>Forecast</span></span>}
            >
              <Menu.Item key="forecast-focus1"><Link to={`/forecast/impressions/${goalId}`}>Impressions</Link></Menu.Item>
              <Menu.Item key="forecast-focus2"><Link to={`/forecast/traffic/${goalId}`}>Traffic CTR</Link></Menu.Item>
              <Menu.Item key="forecast-focus3"><Link to={`/forecast/optin/${goalId}`}>Optin CTR</Link></Menu.Item>
              <Menu.Item key="forecast-focus4"><Link to={`/forecast/closerate/${goalId}`}>Close to Rate</Link></Menu.Item>
              <Menu.Item key="forecast-focus5"><Link to={`/revenue/${goalId}`}>Revenue</Link></Menu.Item>
            </SubMenu>

    }


    onCollapse = () => {
        this.setState({ collapsed: !this.state.collapsed });
    }
}

export default withRouter(Sidebar);