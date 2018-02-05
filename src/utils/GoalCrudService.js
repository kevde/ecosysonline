import _ from 'lodash';
import axios from 'axios';
import Goal from 'core/Goal';
import { MetricValue } from 'core/Metrics';
import AbstractCrudService from './AbstractCrudService';

export class GoalCrudService extends AbstractCrudService {
    constructor() {
        super('goals');
    }

    update(goal) {
        const id = _.get(goal, 'id');
        const financial_goal = _.get(goal, 'financialGoal');
        const product_price = _.get(goal, 'productPrice');

        const ctr_traffic = _.get(goal, 'ctr.traffic');
        const ctr_optin = _.get(goal, 'ctr.optin');
        const ctr_closerate = _.get(goal, 'ctr.closerate');

        const statement = _.get(goal, 'statement');
        const omissions = _.get(goal, 'omissions');
        const engagement = _.get(goal, 'engagement');

        const start_date = _.get(goal, 'startDate').format('YYYY-MM-DD');
        const end_date = _.get(goal, 'endDate').format('YYYY-MM-DD');
        return axios.put(`${this.apiUrl}/${goal.id}`, {
            financial_goal,
            product_price,
            start_date,
            end_date,
            ctr_traffic,
            ctr_optin,
            ctr_closerate,
            statement,
            omissions,
            engagement,
        });
    }

    create(goal) {
        const user_id = _.get(goal, 'userId');
        const financial_goal = _.get(goal, 'financialGoal');
        const product_price = _.get(goal, 'productPrice');

        const ctr_traffic = _.get(goal, 'ctr.traffic');
        const ctr_optin = _.get(goal, 'ctr.optin');
        const ctr_closerate = _.get(goal, 'ctr.closerate');

        const statement = _.get(goal, 'statement');
        const omissions = _.get(goal, 'omissions');
        const engagement = _.get(goal, 'engagement');

        const start_date = _.get(goal, 'startDate').format('YYYY-MM-DD');
        const end_date = _.get(goal, 'endDate').format('YYYY-MM-DD');
        return axios.post(`${this.apiUrl}`, {
            user_id,
            financial_goal,
            product_price,
            start_date,
            end_date,
            ctr_traffic,
            ctr_optin,
            ctr_closerate,
            statement,
            omissions,
            engagement,
        });
    }

    async listByUserId(userId) {
        const { list, columns } = await this.fetchByField('user_id', userId);
        console.log(list, columns)
        return list.map((rawGoal) => this.convert(rawGoal)(columns));
    }

    async get(goalId) {
        const { data } = await axios.get(`${this.apiUrl}/${goalId}`);
        return new Goal(data.id, data.user_id)
            .withTargets(data.financial_goal, data.product_price)
            .withRange(data.start_date, data.end_date)
            .withCtr(data.ctr_traffic, data.ctr_optin, data.ctr_closerate)
            .withTexts(data.statement, data.omissions, data.engagement);
    }

    convert(rawGoal) {
        return (columns) => {
            const id = this.valueFrom(columns)('id')(rawGoal);
            const userId = this.valueFrom(columns)('user_id')(rawGoal);
            const startDate = this.valueFrom(columns)('start_date')(rawGoal);
            const endDate = this.valueFrom(columns)('end_date')(rawGoal);
            const financialGoal = this.valueFrom(columns)('financial_goal')(rawGoal);
            const productPrice = this.valueFrom(columns)('product_price')(rawGoal);

            const ctrTraffic = this.valueFrom(columns)('ctr_traffic')(rawGoal);
            const ctrOptin = this.valueFrom(columns)('ctr_optin')(rawGoal);
            const ctrCloseRate = this.valueFrom(columns)('ctr_closerate')(rawGoal);

            const statement = this.valueFrom(columns)('statement')(rawGoal);
            const omissions = this.valueFrom(columns)('omissions')(rawGoal);
            const engagement = this.valueFrom(columns)('engagement')(rawGoal);

            return new Goal(id, userId)
                .withTargets(financialGoal, productPrice)
                .withRange(startDate, endDate)
                .withCtr(ctrTraffic, ctrOptin, ctrCloseRate)
                .withTexts(statement, omissions, engagement);
        };
    }
}