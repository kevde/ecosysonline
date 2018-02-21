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

    async create(user) {
        const { data } = await axios.post(this.apiUrl, user);
        return (data) ? _.set(user, 'id', data) : null;
    }

    async get(id) {
        const response = await axios.get(`${this.apiUrl}/${id}`);
        const userId = _.get(response, 'data.id');
        const username = _.get(response, 'data.username');
        const avatar = _.get(response, 'data.avatar');
        const role = _.get(response, 'data.role');
        const firstname = _.get(response, 'data.firstname');
        const lastname = _.get(response, 'data.lastname');
        const email = _.get(response, 'data.email');
        const lastActivity = _.get(response, 'data.last_login');
        return new User(userId, username, avatar, role)
            .withUserDetails(firstname, lastname, email);
    }

    async delete(userId) {
        const { data } = await axios.delete(`${this.apiUrl}/${userId}`);
        return (data === 1);
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
        const { data } = await axios.get(`${this.apiUrl}?transform=1&include=goals&columns=id,username,firstname,lastname,avatar,active,last_login,goals.financial_goal`);
        if (!_.isEmpty(data.users)) {

            return data.users.map((rawData) => {
                const date = moment(rawData.last_login, 'YYYY-MM-DD');
                const revenue = _.get(rawData, 'goals.0.financial_goal', 0);
                const fullname = _.compact([rawData.firstname, rawData.lastname, `(${rawData.username})`]).join(" ");

                return new UserDetail(rawData.id, fullname, `${rawData.avatar}`, date, rawData.active, revenue);
            });
        } else {
            return [];
        }
    }

    async updateActivity(userId) {
        const { data } = await axios.put(`${this.apiUrl}/${userId}`, { last_login: moment().format("YYYY-MM-DD") });
        return (data === 1);
    }

    async updateDetails(user) {
        const { firstname, lastname, email, role } = user;
        const { data } = await axios.put(`${this.apiUrl}/${user.id}`, { firstname, lastname, email, role });
        return (data === 1);
    }

    async updateActiveStatus(userId, toggledActive) {
        try {
            const { data } = await axios.put(`${this.apiUrl}/${userId}`, { active: toggledActive });
            return (data === 1);
        } catch (e) {
            return false;
        }
    }

    async updatePhoto(userId, avatarBinary) {
        let updateResult;
        let avatarUrl;
        const formData = new FormData();
        const blob = await this.toBlob(avatarBinary);
        formData.append('avatarFile', blob, `user-${userId}.png`);
        const result = await axios.post(process.env.REACT_APP_UPLOAD_API, formData);
        if (result.data) {
            avatarUrl = `${process.env.REACT_APP_PHOTO_BASE}/${result.data}`;
            updateResult = await axios.put(`${this.apiUrl}/${userId}`, { avatar: avatarUrl });
        }
        return (updateResult.data === 1) ? avatarUrl : '';
    }

    toBlob(canvas) {
        return new Promise((resolve, reject) => canvas.toBlob((blob) => resolve(blob)));
    }

    static convert(rawUser) {
        return (columns) => {
            const userId = this.valueFrom(columns)('id')(rawUser);
            const name = this.valueFrom(columns)('username')(rawUser);
            const pwd = this.valueFrom(columns)('password')(rawUser);
            const role = this.valueFrom(columns)('role')(rawUser);
            const avatar = this.valueFrom(columns)('avatar')(rawUser);
            const firstname = this.valueFrom(columns)('firstname')(rawUser);
            const lastname = this.valueFrom(columns)('lastname')(rawUser);
            const email = this.valueFrom(columns)('email')(rawUser);
            const active = this.valueFrom(columns)('active')(rawUser);
            const lastActivity = moment(this.valueFrom(columns)('last_login')(rawUser), "YYYY-MM-DD");
            return new User(userId, name, avatar, role)
                .withPassword(pwd)
                .withUserDetails(firstname, lastname, email)
                .withStatus(active, lastActivity);
        };
    }
}