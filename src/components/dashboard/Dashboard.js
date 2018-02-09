import React, { Component } from 'react';
import OverallStatistics from './OverallStatistics';
import MetricBarGraph from 'components/forecasts/MetricBarGraph';
import VisitsChart from './VisitsChart';
import { Row, Col } from 'react-flexbox-grid';

export default class Dashboard extends Component {

    render() {
        return (
            <Row>
				<Col md={12}>
					<OverallStatistics statistics={{}} />
				</Col>
				<Col md={5}>
					<VisitsChart statistics={{}} />
				</Col>
				<Col md={7}>
					<MetricBarGraph metrics={{}} />
				</Col>
			</Row>
        );
    }
}