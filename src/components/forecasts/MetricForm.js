import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { withRouter } from 'react-router';
import MetricTable from './MetricTable';
import { Modal, Spin, Affix } from 'antd';
import MetricBarGraph from './MetricBarGraph';
import MonthService from 'components/commons/MonthService';
import Titlebar from 'components/layouts/Titlebar';
import { MetricsCrudService } from 'utils/MetricsCrudService';
import { GoalCrudService } from 'utils/GoalCrudService';
import * as Messages from 'constants/Messages';
import MediaQuery from 'react-responsive';
import _ from 'lodash';

const metricsMap = {
    [Messages.REVENUES]: Messages.REVENUES_TITLE,
    [Messages.IMPRESSIONS]: Messages.IMPRESSIONS_TITLE,
    [Messages.TRAFFIC]: Messages.TRAFFIC_TITLE,
    [Messages.OPTIN]: Messages.OPTIN_TITLE,
    [Messages.CLOSE_RATE]: Messages.CLOSE_RATE_TITLE,
}


class MetricForm extends Component {
    constructor(props) {
        super(props);
        this.crudService = new MetricsCrudService();
        this.goalCrudService = new GoalCrudService();
        this.state = {
            isEditable: props.isEditable,
            loading: true,
            view: props.view,
            metrics: [],
            quarterlyMetrics: [],
            goals: props.goals,
            visible: true
        }
    }

    async componentWillReceiveProps(nextProps) {
        this.updateMetrics(nextProps.match.params.goalId, nextProps.match.params.type);
    }

    async componentWillMount() {
        this.updateMetrics(this.props.match.params.goalId, this.props.match.params.type);
    }

    async updateMetrics(goalId, type) {
        let metrics = [];
        let quarterlyMetrics = []
        ''
        let metricTitle = metricsMap[type] || this.props.metricTitle;
        if (type) {
            metrics = await this.crudService.listByGoalIdAndType(goalId, type);
        } else {
            const goal = await this.goalCrudService.get(goalId)
            metrics = await this.crudService.listRevenuesByGoal(goal);
        }

        quarterlyMetrics = MonthService.getQuarterlyMetricValues(metrics);
        this.setState({ metrics, quarterlyMetrics, loading: false, metricTitle });
    }

    render() {
        const metrics = this.state.metrics;
        const quarterlyMetrics = this.state.quarterlyMetrics;
        return (
            <Spin spinning={this.state.loading}>
            <div ref={(topDiv) => this.topDiv = topDiv}>
                <MediaQuery query="(min-width: 768px)">
                    <Titlebar title={this.state.metricTitle} description="Dashboard & statistics"/>
                </MediaQuery>
                <MediaQuery query="(max-width: 768px)">
                      <Affix offsetTop={64}>
                          <div className="content-title-header">
                              <h1>{this.state.metricTitle}</h1>
                          </div>
                      </Affix>
                </MediaQuery>
                <Row>
                    <Col md={12}>
                        <MetricBarGraph metrics={metrics} ref="metricBarGraph"/>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <MetricTable isEditable={this.state.isEditable} dateFormat="MMM-YYYY" metrics={metrics} onBlur={this.updateMetricValues.bind(this)}/>
                    </Col>
                    <Col md={6}>
                        <MetricTable isEditable={false} dateFormat="[Q]Q (YYYY)"  metrics={quarterlyMetrics}/>
                    </Col>
                </Row>
            </div>
            </Spin>
        );
    }

    async updateMetricValues(metricValues) {
        this.state.metrics = metricValues;
        const isSuccessfull = this.crudService.updateAll(metricValues);
        this.refs.metricBarGraph.setState({ metricValues: metricValues });
        this.setState({ metrics: this.state.metrics });
    }
}

export default withRouter(MetricForm);