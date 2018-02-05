import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import _ from 'lodash';

export default class JourneyCard extends Component {
    render() {
        return (
            <Col md={4}>
				<Row center="md">
					<h3>{this.props.title}</h3>
				</Row>
				{
					_.isArray(this.props.content) 
					? this.props.content.map((contentItem) => this.renderContent(contentItem))
					: this.renderContent(this.props.content)
				}
		    </Col>
        );
    }

    renderContent(contentItem) {
        return (
            <Row center="md">
				{contentItem}
			</Row>
        );
    }
}