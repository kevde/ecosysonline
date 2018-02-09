import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';

export default class OverallStatistics extends Component {
    constructor(props) {
        super(props);
        this.state = { statistics: props.statistics };
    }

    render() {
        return (
            <Row>
	    	<Col md={12}>
		    	<div className="stat-box stat-feedbacks">
		    		<div className="stat-value">200</div>
		    		<div className="stat-description">New Feedbacks</div>
		    	</div>
		    	<div className="stat-box stat-profit">
		    		<div className="stat-value">200</div>
		    		<div className="stat-description">Total Profit</div>
		    	</div>
		    	<div className="stat-box stat-orders">
		    		<div className="stat-value">200</div>
		    		<div className="stat-description">New Orders</div>
		    	</div>
		    	<div className="stat-box stat-popularity">
		    		<div className="stat-value">200</div>
		    		<div className="stat-description">Brand Popularity</div>
		    	</div>
		    	<div className="stat-box stat-revenue">
		    		<div className="stat-value">200</div>
		    		<div className="stat-description">Revenue, 60% of the Goal</div>
		    	</div>
	    	</Col>
    	</Row>
        );
    }
}