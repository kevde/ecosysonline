import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Affix } from 'antd';

export default class Titlebar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Affix offsetTop={50}>
		    <div className="title-bar">
	        	<Row>
		        	<Col md={12}>
							<h1 className="title">{this.props.title}</h1>
							<span className="description">{this.props.description}</span>
					</Col>
	        	</Row>
			</div>
		</Affix>
        );
    }
}