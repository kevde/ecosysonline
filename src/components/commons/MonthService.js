import moment from 'moment';
import _ from 'lodash';
import { Metrics, MetricValue, QuarterMetricValue } from 'core/Metrics';

class MonthService {
    getMonths(start, end) {
        let startDate = moment(start).clone().date(1);
        let endDate = moment(end).clone().date(1);
        endDate.subtract(1, "month");

        let month = moment(startDate);
        let dates = [startDate];
        while (month <= endDate) {
            month.add(1, "month");
            dates.push(month.clone().date(1));
        }
        return dates;
    }

    createMetricValuesPerMonth(months, metricValue) {
        return months.map((month) => metricValue.createMonthlyMetricValue(months.length, month));
    }

    createMetricValues(startDate, endDate, goal, stretch) {
        const months = this.getMonths(startDate, endDate);
        return this.createMetricValuesPerMonth(months, new MetricValue(goal, stretch));
    }

    updateMetricValues(startDate, endDate, goal, stretch, previousMetricValues) {
        const months = this.getMonths(startDate, endDate);
        const monthlyGoal = goal / months.length;
        const monthlyStretch = stretch / months.length;

        return months.map((month) => {
            const foundMetricValue = _.find(previousMetricValues, (metric) => {
                return metric.month.month() == month.month() && metric.month.year() === month.year();
            });
            if (foundMetricValue) {
                foundMetricValue.goal = monthlyGoal;
                foundMetricValue.stretch = monthlyStretch;
                return foundMetricValue;
            } else {
                return new MetricValue(monthlyGoal, monthlyStretch, month);
            }
        });
    }

    getQuarterlyMetricValues(metricValues) {
        if (_.isEmpty(metricValues)) {
            return [];
        }

        let currentMoment = metricValues[0].month;
        let quarterMetricValues = [new QuarterMetricValue()];
        for (let i = 0; i < metricValues.length; i++) {
            let year = metricValues[i].month.year();
            let quarter = metricValues[i].month.quarter();

            if (currentMoment.quarter() !== quarter || currentMoment.year() !== year) {
                quarterMetricValues.push(new QuarterMetricValue());
                currentMoment = metricValues[i].month;
            }

            let quarterlyMetricValue = quarterMetricValues.slice(-1).pop();
            quarterlyMetricValue.add(metricValues[i], quarter, year);
        }
        return quarterMetricValues;
    }
}

export default new MonthService();