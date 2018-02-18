import moment from 'moment';

const percent = (value) => value * 0.01;

class MetricValue {
    constructor(id, goalId, type) {
        this.id = id;
        this.goalId = goalId;
        this.type = type;
        this.actual = 0;
    }

    withValues(goal, month, actual) {
        this.goal = goal;
        this.month = month;
        this.actual = actual || 0;
        return this;
    }

    get difference() {
        return this.actual - this.goal;
    }

    get quarter() {
        return this.month.quarter();
    }

    get label() {
        return this.month.format('MMM-YYYY');
    }

    createMonthlyMetricValue(months, month) {
        const goal = Number(this.goal ? this.goal / months : 0).toFixed(2);
        const stretch = Number(this.stretch ? this.stretch / months : 0).toFixed(2);
        return new MetricValue(goal, stretch, month);
    }
}

class RevenueMetricValue {
    constructor(productPrice, month, impression, trafficCtr, optinCtr, closerateCtr) {
        this.productPrice = productPrice;
        this.month = month;
        this.impression = impression;
        this.trafficCtr = trafficCtr;
        this.optinCtr = optinCtr;
        this.closerateCtr = closerateCtr;
    }

    get actual() {
        return this.getTotalRevenues('actual');
    }

    get goal() {
        return this.getTotalRevenues('goal');
    }

    get difference() {
        return this.actual - this.goal;
    }

    get label() {
        return this.month.format('MMM-YYYY');
    }

    getTotalVisitors(valueType) {
        return Math.round(this.impression[valueType] * percent(this.trafficCtr[valueType]));
    }

    getTotalLeads(valueType) {
        return Math.round(this.getTotalVisitors(valueType) * percent(this.optinCtr[valueType]));
    }

    getTotalSales(valueType) {
        return this.getTotalLeads(valueType) * percent(this.closerateCtr[valueType]);
    }

    getTotalRevenues(valueType) {
        return this.getTotalSales(valueType) * this.productPrice;
    }
}

class QuarterMetricValue {
    constructor() {
        this.metricValues = [];
    }

    add(metricValue, quarter, year) {
        this.quarter = quarter;
        this.year = year;
        this.metricValues.push(metricValue);
        return this;
    }

    get goal() {
        return this.metricValues.reduce((sum, m) => Number(sum) + Number(m.goal), 0);
    }

    get stretch() {
        return this.metricValues.reduce((sum, m) => Number(sum) + Number(m.stretch), 0);
    }

    get actual() {
        return this.metricValues.reduce((sum, m) => Number(sum) + Number(m.actual), 0);
    }

    get difference() {
        return this.metricValues.reduce((sum, m) => Number(sum) + Number(m.difference), 0);
    }

    get month() {
        return new moment().quarter(this.quarter).year(this.year);
    }

    get label() {
        return this.month.format('MMM-YYYY');
    }
}

export { MetricValue, RevenueMetricValue, QuarterMetricValue };