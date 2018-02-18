import React, { Component } from 'react';
import OverallStatistics from './OverallStatistics';
import MetricBarGraph from 'components/forecasts/MetricBarGraph';
import Titlebar from 'components/layouts/Titlebar';
import VisitorsChart from './VisitorsChart';
import MembersList from './MembersList';
import { Spin } from 'antd';
import _ from 'lodash';
import moment from 'moment';
import { Row, Col } from 'react-flexbox-grid';

export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.goalCrudService = props.goalCrudService;
        this.metricsCrudService = props.metricsCrudService;
        this.state = { revenues: [], loading: true, goal: this.props.goal };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({ loading: true });
        let goal = nextProps.goal;
        let revenues = this.state.revenues;
        if (!goal) {
            goal = await this.goalCrudService.get(goal);
        }
        revenues = await this.metricsCrudService.listRevenuesByGoal(goal);
        this.setState({ goal, revenues, loading: false });
    }

    async componentWillMount() {
        this.setState({ loading: true });
        let goal = this.state.goal;
        let revenues = this.state.revenues;
        if (!goal) {
            goal = await this.goalCrudService.get(this.state.goal);
        }
        revenues = await this.metricsCrudService.listRevenuesByGoal(goal);
        this.setState({ goal, revenues, loading: false });
    }

    getNearestRevenue() {
        return _.minBy(this.state.revenues, (metric) => metric.month.diff(moment()));
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>            
            	<Titlebar title="Dashboard" description="Dashboard & statistics"/>
	            <Row>
					<Col md={12}>
						<OverallStatistics statistics={this.getNearestRevenue()} />
					</Col>
					<Col md={5}>
						<VisitorsChart metrics={this.state.revenues} />
					</Col>
					<Col md={7}>
						<MetricBarGraph metrics={this.state.revenues} prefix="$"/>
					</Col>
                    <Col md={12}>
                        <MembersList goalId={this.state.goal.id} />
                    </Col>
				</Row>
			</Spin>
        );
    }
}