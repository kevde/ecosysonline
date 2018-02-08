import _ from "lodash";
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Button, Icon } from 'antd';

class SalesCanvas extends Component {

    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona });
    }

    constructor(props) {
        super(props);
        this.state = {
            persona: props.persona,
            isAvatarOpened: false
        };
    }

    render() {
        return (
            <div>
	            <Card>
		            <Col md={12}>
		                <Row md={12}>
			                <Col md={3}>
			                    <Col md={12}>
			                        <h3>Trigger</h3>
			                    </Col>
			                    <Col md={12}>
			                        {this.state.persona.salesCanvas.trigger}
			                    </Col>
			                </Col>
			                <Col md={3}>
			                    <Col md={12}>
			                        <h3>Action</h3>
			                    </Col>
			                    <Col md={12}>
			                        {this.state.persona.salesCanvas.action}
			                    </Col>
		                    </Col>
			                <Col md={3}>
			                    <Col md={12}>
			                        <h3>Conversation</h3>
			                    </Col>
			                    <Col md={12}>
			                        {this.state.persona.salesCanvas.conversation}
			                    </Col>
		                    </Col>
			                <Col md={3}>
			                    <Col md={12}>
			                        <h3>Sell</h3>
			                    </Col>
			                    <Col md={12}>
			                        {this.state.persona.salesCanvas.sell}
			                    </Col>
		                	</Col>
		                </Row>
		            </Col>
	            </Card>
			</div>
        );
    }

    showAvatarModal() {
        this.refs.personaModal.showModal();
    }

    reRender() {
        this.setState({ persona: this.state.persona });
    }

    onUpdate(persona) {
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
        this.setState({ persona });
    }
}

export default SalesCanvas;