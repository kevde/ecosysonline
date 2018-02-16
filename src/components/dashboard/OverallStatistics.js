import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';

export default class OverallStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = { statistics: props.statistics };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({ statistics: nextProps.statistics });
    }

    render() {
        const revenue = this.state.statistics;
        const month = _.get(revenue, `month`);
        const impression = _.get(revenue, `impression.goal` || 0);
        const trafficCtr = _.get(revenue, `trafficCtr.goal` || 0);
        const optinCtr = _.get(revenue, `optinCtr.goal` || 0);
        const closerateCtr = _.get(revenue, `closerateCtr.goal` || 0);
        return (
            <Row>
	    	<Col md={12} className="stat-header">
	    		{month ? month.format('MMMM YYYY') : ''}
	    	</Col>
	    	<Col md={12}>
		    	<div className="stat-box stat-feedbacks">
		    		<div className="stat-value">{impression}</div>
		    		<div className="stat-description">Impressions</div>
		    	</div>
		    	<div className="stat-box stat-profit">
		    		<div className="stat-value">{trafficCtr} %</div>
		    		<div className="stat-description">Traffic Ctr</div>
		    	</div>
		    	<div className="stat-box stat-orders">
		    		<div className="stat-value">{optinCtr} %</div>
		    		<div className="stat-description">Optin Ctr</div>
		    	</div>
		    	<div className="stat-box stat-popularity">
		    		<div className="stat-value">{closerateCtr} %</div>
		    		<div className="stat-description">Close Rate</div>
		    	</div>
		    	<div className="stat-box stat-revenue">
		    		<div className="stat-value">$ {(revenue) ? revenue.getTotalRevenues('goal') : 0}</div>
		    		<div className="stat-description">Revenue</div>
		    	</div>
	    	</Col>
    	</Row>
        );
    }
}