import _ from 'lodash';
import axios from 'axios';
import User, { UserDetail } from 'core/User';
import AbstractCrudService from './AbstractCrudService';
import { GoalCrudService } from './GoalCrudService';
import moment from 'moment';

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

    async listBasicUserDetails() {
        const { data } = await axios.get(`${this.apiUrl}?transform=1&include=goals&columns=id,firstname,lastname,avatar,active,last_login,goals.financial_goal`);
        if (!_.isEmpty(data.users)) {

            return data.users.map((rawData) => {
                const date = moment(rawData.last_login, 'YYYY-MM-DD');
                const revenue = _.get(rawData, 'goals.0.financial_goal', 0);
                return new UserDetail(rawData.id, `${rawData.firstname} ${rawData.lastname}`, `${rawData.avatar}`, date, rawData.active, revenue);
            });
        } else {
            return [];
        }
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