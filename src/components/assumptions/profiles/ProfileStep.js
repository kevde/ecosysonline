import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification } from 'antd';
import ProfileStepBar from './ProfileStepBar';
import BasicInfo from './BasicInfo';
import SourcesOfInformationForm from './SourcesOfInformationForm';
import PurchaseProcessForm from './PurchaseProcessForm';

class ProfileStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            persona: props.persona
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona });
    }

    render() {
        return (
            <ProfileStepBar>
                <Row
                    title="Basic" 
                    md={12}>
                    <BasicInfo persona={this.state.persona} onUpdate={this.onUpdate.bind(this)} />
                </Row>
                <Row
                    title="Information Sources"
                >
                	<SourcesOfInformationForm persona={this.state.persona} />
                </Row>
                <Row
                    title="Purchase Process"
                >
                	<PurchaseProcessForm persona={this.state.persona} />
                </Row>
            </ProfileStepBar>
        );
    }

    done() {
        this.state.persona.enabled = true;
        this.setState({ persona: this.state.persona });
        this.showNotification();
        this.hideModal();
    }

    onUpdate(persona) {
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
    }
}

export default ProfileStep;