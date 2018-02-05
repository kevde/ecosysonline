import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import OImageUpload from 'components/commons/OImageUpload';
import OTextField from 'components/commons/OTextField';
import OTextArea from 'components/commons/OTextArea';
class BasicInfo extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persona: props.persona,
        };
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona });
    }

    render() {
        return (
        	<Row>
	            <Col md={6}>
		            <Col md={12}>
		                <OTextArea container={this.state.persona} fieldName="coreProblems.goals" label="Goals"/>
		            </Col>
		            <Col md={12}>
		                <OTextArea container={this.state.persona} fieldName="coreProblems.values" label="Values"/>
		            </Col>
	            </Col>
	            <Col md={6}>
		            <Col md={12}>
		                <OTextArea container={this.state.persona} fieldName="coreProblems.challenges" label="Challenges"/>
		            </Col>
		            <Col md={12}>
		                <Row>
		                	<h3>Pain Points</h3>
		                </Row>
		                <Row>
		                    <Col md={12}>
		                         <OTextField prefix="1. " container={this.state.persona} fieldName="coreProblems.painPoints.0" size="small" placeholder="Problem..." />
		                    </Col>
		                    <Col md={12}>
		                         <OTextField prefix="2. " container={this.state.persona} fieldName="coreProblems.painPoints.1" size="small" placeholder="Problem..." />
		                    </Col>
		                    <Col md={12}>
		                         <OTextField prefix="3. " container={this.state.persona} fieldName="coreProblems.painPoints.2" size="small" placeholder="Problem..." />
		                    </Col>
		                </Row>
		            </Col>
	            </Col>
        	</Row>
        );
    }

    onUpdate(persona) {
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
        this.setState({ persona });
    }

    updatePhoto(persona) {
        this.personaCrudService.updatePhoto(persona.id, persona.avatar);
        this.onUpdate(persona);
    }
}

export default BasicInfo;