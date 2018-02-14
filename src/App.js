import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import LoginPage from './components/pages/LoginPage';
import MainPage from './components/pages/MainPage';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import './App.css';

class App extends Component {

    constructor(props) {
        super(props);
        this.basename = '/';
    }

    state = { user: null, collapsed: true }

    render() {
        return (
            <Router basename={this.basename}>
              <div>
                <Switch>
                  <Route exact={true} path="/"  render={(props) => this.renderMainPage() } />
                  <Route exact={true} path="/register"  render={(props) => <LoginPage user={this.state.user} /> } />
                  <Route path="/goals"  render={(props) => this.redirectWhenLoggedOut() } />
                  <Route path="/assumptions"  render={(props) => this.redirectWhenLoggedOut() } />
                  <Route path="/journeys"  render={(props) => this.redirectWhenLoggedOut() } />
                  <Route path="/forecast"  render={(props) => this.redirectWhenLoggedOut() } />
                  <Route path="/revenue"  render={(props) => this.redirectWhenLoggedOut() } />
                  <Route path="/persona"  render={(props) => this.redirectWhenLoggedOut() } />
                  <Route path="/users"  render={(props) => <MainPage user={this.state.user} onUpdate={this.onUpdate.bind(this)} /> } />
                </Switch>
              </div>
            </Router>
        );
    }

    redirectWhenLoggedOut() {
        return (this.state.user) ? (<MainPage user={this.state.user} onUpdate={this.onUpdate.bind(this)} />) : (<Redirect to="/" />);
    }

    renderMainPage() {
        return (this.state.user) ? (<MainPage user={this.state.user} onUpdate={this.onUpdate.bind(this)} />) : (<LoginPage user={this.state.user} onUpdate={this.onUpdate.bind(this)} />);
    }

    onUpdate(user) {
        this.setState({ user });
    }
}

export default App;