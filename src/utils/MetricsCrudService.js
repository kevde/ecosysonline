import _ from 'lodash';
import axios from 'axios';
import Goal from 'core/Goal';
import { MetricValue, RevenueMetricValue } from 'core/Metrics';
import AbstractCrudService from './AbstractCrudService';
import MonthService from 'components/commons/MonthService';
import moment from 'moment';

export class MetricsCrudService extends AbstractCrudService {
    constructor() {
        super('metric_values');
    }

    async update(metricValue) {
        return axios.put(`${this.apiUrl}/${metricValue.id}`, this.toRaw(metricValue));
    }

    async updateAll(metricValues) {
        const metricValueIds = _.map(metricValues, 'id').join(',');
        const rawMetricValues = _.map(metricValues, (metricValue) => this.toRaw(metricValue));
        const { data } = await axios.put(`${this.apiUrl}/${metricValueIds}`, rawMetricValues);
        return rawMetricValues;
    }

    async createAll(metricValues) {
        const rawMetricValues = _.map(metricValues, (metricValue) => this.toRaw(metricValue));
        const { data } = await axios.post(`${this.apiUrl}`, rawMetricValues);
        if (data) {
            _.forEach(metricValues, (metricValue, i) => _.set(metricValue, 'id', data[i]));
            return rawMetricValues;
        } else {
            return [];
        }
    }

    async listByGoalIdAndType(goalId, type) {
        const { list, columns } = await this.fetchByFields({ 'goal_id': goalId, 'type': type });
        return list.map((rawMetric) => this.convert(rawMetric)(columns));
    }

    async listByGoal(goal) {
        const { list, columns } = await this.fetchByFields({ 'goal_id': goal.id });
        const metrics = list.map((rawMetric) => this.convert(rawMetric)(columns));
        const monthlyMetricGroup = _.groupBy(metrics, (metric) => metric.month.format('YYYY-MM-DD'));
        return _.map(monthlyMetricGroup, (metrics, month) => {
            const impression = _.find(metrics, ['type', 'impressions']);
            const trafficCtr = _.find(metrics, ['type', 'traffic']);
            const optinCtr = _.find(metrics, ['type', 'optin']);
            const closerateCtr = _.find(metrics, ['type', 'closerate']);
            return new RevenueMetricValue(goal.productPrice, moment(month), impression, trafficCtr, optinCtr, closerateCtr);
        });
    }

    async createOrUpdateMetrics(goal) {
        const { list, columns } = await this.fetchByFields({ 'goal_id': goal.id });
        const metricValues = list.map((rawMetric) => this.convert(rawMetric)(columns));
        const months = MonthService.getMonths(goal.startDate, goal.endDate);

        // reuse all metrics 
        let newMetrics = _.filter(metricValues, (metric) => _.includes(_.map(months, (month) => month.format('YYYY-MM-DD')), metric.month.format('YYYY-MM-DD')));
        const rejectedMetrics = _.reject(metricValues, (metric) => _.includes(_.map(months, (month) => month.format('YYYY-MM-DD')), metric.month.format('YYYY-MM-DD')));
        const rejectedIds = _.map(rejectedMetrics, (metric) => metric.id);

        if (!_.isEmpty(rejectedIds)) {
            const deletedEntries = await axios.delete(`${this.apiUrl}/${rejectedIds.join(',')}`);
        }

        _.forEach(months, (month) => {
            newMetrics = this.repopulateMetric(goal, month, newMetrics, 'monthlyImpressions', 'impressions');
            newMetrics = this.repopulateMetric(goal, month, newMetrics, 'ctr.traffic', 'traffic', );
            newMetrics = this.repopulateMetric(goal, month, newMetrics, 'ctr.optin', 'optin', );
            newMetrics = this.repopulateMetric(goal, month, newMetrics, 'ctr.closerate', 'closerate', );
        });
        const updateMetrics = _.filter(newMetrics, 'id');
        const createMetrics = _.reject(newMetrics, 'id');
        const updatedMetrics = await !_.isEmpty(updateMetrics) ? this.updateAll(updateMetrics) : [];
        const createdMetrics = await !_.isEmpty(createMetrics) ? this.createAll(createMetrics) : [];
        return [updatedMetrics, ...createdMetrics];
    }

    repopulateMetric(goal, month, newMetrics, fieldName, type) {
        const databaseMetricValue = _.find(newMetrics, (metric) => metric.month.isSame(month) && metric.type === type);
        let metricValue = (databaseMetricValue) ? databaseMetricValue : new MetricValue(null, goal.id, type);
        const goalValue = _.get(goal, fieldName, '');
        metricValue = metricValue.withValues(goalValue, month);
        if (!metricValue.id) {
            newMetrics.push(metricValue);
        }
        return newMetrics;
    }

    toRaw(metricValue) {
        const { id, goalId, type, actual, goal, month } = metricValue;
        return { goal_id: goalId, type, actual, goal, month: month.format('YYYY-MM-DD') };
    }

    convert(rawMetric) {
        return (columns) => {
            const id = this.valueFrom(columns)('id')(rawMetric);
            const metricGoalId = this.valueFrom(columns)('goal_id')(rawMetric);
            const type = this.valueFrom(columns)('type')(rawMetric);
            const actual = this.valueFrom(columns)('actual')(rawMetric);
            const goal = this.valueFrom(columns)('goal')(rawMetric);
            const month = moment(this.valueFrom(columns)('month')(rawMetric));

            return new MetricValue(id, metricGoalId, type)
                .withValues(goal, month, actual);
        };
    }
}