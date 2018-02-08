import decode from 'jwt-decode';
import { Redirect } from 'react-router-dom';
import auth0 from 'auth0-js';
const ID_TOKEN_KEY = 'id_token';
const ACCESS_TOKEN_KEY = 'access_token';

const CLIENT_ID = 'rVEsDz09ecQK7k3pCVB0d7Yi8cAfXmkw';
const CLIENT_DOMAIN = 'darkspot.auth0.com';
const REDIRECT = `${process.env.PUBLIC_URL}/callback`;
const SCOPE = 'read:users';
const AUDIENCE = 'AUDIENCE_ATTRIBUTE';

var auth = new auth0.WebAuth({
    clientID: CLIENT_ID,
    domain: CLIENT_DOMAIN
});


class AuthService {

    constructor(webAuth, localStorage) {
        this.webAuth = webAuth;
        this.localStorage = localStorage;
    }


    login() {
        return this.webAuth.authorize({
            responseType: 'token id_token',
            redirectUri: REDIRECT,
            audience: AUDIENCE,
            scope: SCOPE
        });
    }

    logout(browserHistory) {
        this._clearIdToken();
        this._clearAccessToken();
        browserHistory.push('/');
        // return (<Redirect to="/" />);
    }
    requireAuth(nextState, replace) {
        if (!this.isLoggedIn()) {
            replace({ pathname: '/' });
        }
    }

    getIdToken() {
        return this.localStorage.getItem(ID_TOKEN_KEY);
    }

    getAccessToken() {
        return this.localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    setAccessToken() {
        let accessToken = this._getParameterByName('access_token');
        this.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
    }

    setIdToken() {
        let idToken = this._getParameterByName('id_token');
        this.localStorage.setItem(ID_TOKEN_KEY, idToken);
    }

    isLoggedIn() {
        const idToken = this.getIdToken();
        return !!idToken && !this._isTokenExpired(idToken);
    }

    _clearIdToken() {
        this.localStorage.removeItem(ID_TOKEN_KEY);
    }

    _clearAccessToken() {
        this.localStorage.removeItem(ACCESS_TOKEN_KEY);
    }

    _getParameterByName(name) {
        let match = RegExp(`[#&]${name}=([^&]*)`).exec(window.location.hash);
        return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
    }

    _getTokenExpirationDate(encodedToken) {
        let token;
        try {
            token = decode(encodedToken);
            if (!token.exp) { return null; }

        } catch (e) {
            return null;
        }

        const date = new Date(0);
        date.setUTCSeconds(token.exp);

        return date;
    }

    _isTokenExpired(token) {
        const expirationDate = this._getTokenExpirationDate(token);
        return expirationDate < new Date();
    }
}

export default new AuthService(auth, localStorage);