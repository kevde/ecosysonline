import _ from 'lodash';
import axios from 'axios';
import User from 'core/User';
import AbstractCrudService from './AbstractCrudService';

export class UserCrudService extends AbstractCrudService {
    constructor() {
        super('users');
    }

    create(user) {
        return axios.post(this.apiUrl, user);
    }

    async get(id) {
        const response = await axios.get(`${this.apiUrl}/${id}`);
        const userId = _.get(response, 'data.id');
        const username = _.get(response, 'data.username');
        const avatar = _.get(response, 'data.avatar');
        return new User(userId, username, avatar);
    }

    async getUser(username) {
        const { data } = await axios.get(`${this.apiUrl}?filter[]=username,eq,${username}&satisfy=all`);
        const rawUser = _.head(data.users.records);
        if (rawUser) {
            const columns = data.users.columns;
            const userId = this.valueFrom(columns)('id')(rawUser);
            const name = this.valueFrom(columns)('username')(rawUser);
            const pwd = this.valueFrom(columns)('password')(rawUser);
            const avatar = this.valueFrom(columns)('avatar')(rawUser);
            return new User(userId, name, pwd, avatar);
        } else {
            return null;
        }
    }
}