import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OTextArea from 'components/commons/OTextArea';

export default class AscendForm extends Component {

    constructor(props) {
        super(props);
        this.state = { container: props.container };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ container: nextProps.container });
    }

    onUpdate(container) {
        if (this.props.onUpdate) {
            this.props.onUpdate(container);
        }
    }
    render() {
        return (
            <Row>
				<Col md={12}>
					<h3>What is your value ladder?</h3>
				</Col>
				<Col md={12}>
		        <OTextArea 
		        	rows={1}
		            onUpdate={this.onUpdate.bind(this)} 
		            container={this.state.container} 
		            fieldName='ascend.0' />
	            <OTextArea 
		        	rows={1}
	            	onUpdate={this.onUpdate.bind(this)} 
		            container={this.state.container} 
		            fieldName='ascend.1' />
	            <OTextArea 
		        	rows={1}
	            	onUpdate={this.onUpdate.bind(this)} 
	            	container={this.state.container} 
	            	fieldName='ascend.2' />
	            <OTextArea 
		        	rows={1}
	            	onUpdate={this.onUpdate.bind(this)} 
	            	container={this.state.container} 
	            	fieldName='ascend.3' />
				</Col>
			</Row>
        );
    }
}