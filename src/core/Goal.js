import { MetricValue } from './Metrics';
import { Journey } from './Journey';
import moment from 'moment';
import _ from 'lodash';

const percent = (value) => value * 0.01;

class Goal {
    constructor(id, userId) {
        this.userId = userId;
        this.id = id;
        this.financialGoal = "";
        this.productPrice = "";
        this.ctr = { traffic: 0.01, optin: 0.01, closerate: 0.01 };
        this.journey = new Journey();
        this.statement = "";
        this.omissions = "";
        this.engagement = "";
        this.startDate = moment();
        this.endDate = moment().add(1, 'year');
        this.monthlyWorkdays = 20;
        this.personas = [];
        this.metrics = [];
        this.enabled = false;
    }

    withTargets(financialGoal, productPrice) {
        this.financialGoal = financialGoal;
        this.productPrice = productPrice;
        return this;
    }

    withRange(startDate, endDate) {
        this.startDate = moment(startDate);
        this.endDate = moment(endDate);
        return this;
    }

    withCtr(traffic, optin, closerate) {
        this.ctr = { traffic, optin, closerate };
        return this;
    }

    withTexts(statement, omissions, engagement) {
        this.statement = statement;
        this.omissions = omissions;
        this.engagement = engagement;
        return this;
    }

    isEnabled() {
        return this.enabled;
    }

    get dailyOptins() {
        return Math.ceil(this.dailySales / percent(this.ctr.closerate));
    }

    get dailyLeads() {
        return Math.ceil(this.dailyOptins / percent(this.ctr.optin));
    }

    get dailyImpressions() {
        return Math.ceil(this.dailyLeads / percent(this.ctr.traffic));
    }

    get dailySales() {
        return Math.ceil(this.totalSales / this.totalWorkDays);
    }

    get totalWorkDays() {
        return this.monthlyWorkdays * this.monthCount;
    }

    get monthlyImpressions() {
        return this.dailyImpressions * this.monthlyWorkdays;
    }

    get totalImpressions() {
        return this.monthlyImpressions * this.monthCount;
    }

    get totalVisitors() {
        return Math.round(this.totalImpressions * percent(this.ctr.traffic));
    }

    get totalLeads() {
        return Math.round(this.totalVisitors * percent(this.ctr.optin));
    }

    get totalSales1() {
        return Math.round(this.totalLeads * percent(this.ctr.closerate));
    }

    get totalRevenues() {
        return this.totalSales1 * this.productPrice;
    }

    get totalSales() {
        return this.financialGoal / this.productPrice;
    }

    get monthCount() {
        return this.endDate.diff(this.startDate, 'month') + 1;
    }
}

export default Goal;