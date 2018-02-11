import _ from 'lodash';
import axios from 'axios';
import User from 'core/User';
import AbstractCrudService from './AbstractCrudService';
import { GoalCrudService } from './GoalCrudService';

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

    async changeDefaultGoal(userId, goalId) {
        const { data } = await axios.put(`${this.apiUrl}/${userId}`, { default_goal_id: goalId });
        console.log(data);
        return (data === 1);
    }

    async getUser(username) {
        let goal;
        const { data } = await axios.get(`${this.apiUrl}?filter[]=username,eq,${username}&satisfy=all&include=goals`);
        const userColumns = data.users.columns;
        const goalColumns = data.goals.columns;
        const rawUser = _.head(data.users.records);
        const rawGoal = _.head(data.goals.records);

        if (rawGoal) {
            goal = GoalCrudService.convert(rawGoal)(goalColumns);
        }

        return (rawUser) ? this.constructor.convert(rawUser)(userColumns).withGoal(goal) : null;
    }

    static convert(rawUser) {
        return (columns) => {
            const userId = this.valueFrom(columns)('id')(rawUser);
            const name = this.valueFrom(columns)('username')(rawUser);
            const pwd = this.valueFrom(columns)('password')(rawUser);
            const avatar = this.valueFrom(columns)('avatar')(rawUser);
            return new User(userId, name, pwd, avatar);
        };
    }
}