import React, { Component } from 'react';
import _ from 'lodash';
import { Alert } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import ONumericInput from 'components/commons/ONumericInput';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import OTextArea from 'components/commons/OTextArea';
import { Input } from 'antd';
import { MetricValue } from 'core/Metrics';

class MissionStatement extends Component {

    constructor(props) {
        super(props);
        this.state = { goal: props.goal }
        this.onUpdate = this.unbindedOnUpdate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ goal: nextProps.goal });
    }

    unbindedOnUpdate(goal) {
        this.setState({ goal });
        this.props.onUpdate(goal);
    };

    setGoalRange(e) {
        console.log(e);
    }

    get timeRange() {
    	const startDate = this.state.goal.startDate.format('MMM YYYY');
    	const endDate = this.state.goal.endDate.format('MMM YYYY');
    	return `${startDate} - ${endDate}`;
    }

    render() {
        return (
            <content>
				<Row start="md">
            		<Col md={12}>
            			<blockquote className="goal-header">{this.state.goal.statement}</blockquote>
            		</Col>
            		<Col md={12}>
            			<h3 className="goal-header">Mission Statement</h3>
            		</Col>
				</Row>
				<Row start="md">
            		<Col md={8}>
            			<h3 className="goal-header">Plays</h3>
            		</Col>
            		<Col md={4}>
            			<h3 className="goal-header">Goal ({this.timeRange})</h3>
            		</Col>
				</Row>
		        <Row start="md">
			        <Col md={8}>
			        	<h3>Focus Area 1</h3>
			        </Col>
				</Row>
		        <Row start="md">
			        <Col md={4}>
			        	<summary>Attract Stage</summary>
			        </Col>
			        <Col md={4}>
			        	<div>Amount of Impressions</div>
			        </Col>
			        <Col md={4}>
	 					<div>{this.state.goal.totalImpressions} Impressions</div>
			        </Col>
		        </Row>
		        <Row start="md">
			        <Col md={4} mdOffset={4}>
			        	<div>Traffic CTR</div>
			        </Col>
			        <Col md={4}>
	 					<div>{this.state.goal.ctr.traffic} %</div>
			        </Col>
		        </Row>
		        <Row start="md">
			        <Col md={8}>
			        	<h3>Focus Area 2</h3>
			        </Col>
				</Row>
		        <Row start="md">
			        <Col md={4}>
			        	<summary>Convert Stage</summary>
			        </Col>
			        <Col md={4}>
			        	<div>Amount of Visitors</div>
			        </Col>
			        <Col md={4}>
	 					<div>{Number(this.state.goal.totalVisitors).toFixed(0)} Visitors</div>
			        </Col>
			        <Col md={4} mdOffset={4}>
			        	<div>Optin CTR</div>
			        </Col>
			        <Col md={4}>
	 					<div>{Number(this.state.goal.ctr.optin).toFixed(2)} %</div>
			        </Col>
		        </Row>
		        <Row start="md">
			        <Col md={8}>
			        	<h3>Focus Area 3</h3>
			        </Col>
				</Row>
		        <Row start="md">
			        <Col md={4}>
			        	<summary>Close Stage</summary>
			        </Col>
			        <Col md={4}>
			        	<div>Amount of Sales</div>
			        </Col>
			        <Col md={4}>
	 					<div>{Number(this.state.goal.totalSales1).toFixed(0)}</div>
			        </Col>
			        <Col md={4} mdOffset={4}>
			        	<div>Close Rate</div>
			        </Col>
			        <Col md={4}>
	 					<div>{Number(this.state.goal.ctr.closerate).toFixed(2)} %</div>
			        </Col>
		        </Row>
		        <Row start="md">
			        <Col md={4} mdOffset={4}>
			        	<div>Revenue</div>
			        </Col>
			        <Col md={4}>
	 					<div>€ {Number(this.state.goal.totalRevenues).toFixed(2)}</div>
			        </Col>
		        </Row>
        	</content>
        );
    }
}

export default MissionStatement;