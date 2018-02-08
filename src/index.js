import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Router, Route, Redirect } from 'react-router';
import { createBrowserHistory } from 'history';
import AuthService from './utils/AuthService';
import AuthCallback from './components/utils/AuthCallback';
import RegisterForm from './components/login/RegisterForm';
import LoginPage from './pages/LoginPage';
import './index.css';
import 'antd/dist/antd.css';
import 'react-grid-layout/css/styles.css';
import './App.css';

const browserHistory = createBrowserHistory({});
export class Root extends Component {

    render() {
        return (
				<Router history={browserHistory}>
					<div>
				        <Route exact path="/" render={() => this.renderWithLogin(<App/>)} />
				        <Route exact path="/login" render={(props) => AuthService.login()} />
				        <Route exact path="/register" component={LoginPage} />
				        <Route exact path="/callback" component={AuthCallback} />
					</div>
				</Router>
        );
    }

    renderWithLogin(component) {
        return (AuthService.isLoggedIn()) ? component : (<Redirect to="/login" />);
    }
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();