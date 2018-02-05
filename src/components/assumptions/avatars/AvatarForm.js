import React, { Component } from 'react';
import { Modal, Input } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import ProfileStep from 'components/assumptions/profiles/ProfileStep';
import ProfileSettingStepBar from 'components/assumptions/ProfileSettingStepBar';
import PainPointsForm from 'components/assumptions/profiles/PainPointsForm';
import OTextArea from 'components/commons/OTextArea';
import { Card, Button, Icon } from 'antd';

class AvatarForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persona: props.persona,
            isAvatarOpened: false,
            mounted: false,
        };
    }

    componentDidMount() {
        this.setState({ mounted: true });
    }

    render() {
        return (
            <Modal
                title="Customer Avatar"
                visible={this.state.visible}
                onOk={this.hideModal.bind(this)}
                onCancel={this.hideModal.bind(this)}
                width="80%"
                footer={null}
        >
            <ProfileSettingStepBar>
                    <ProfileStep title="Profile" persona={this.state.persona} onUpdate={this.onUpdate.bind(this)} />
                    <Col title="Problems" xs={12}>
                        <PainPointsForm persona={this.state.persona} onUpdate={this.onUpdate.bind(this)} />
                    </Col>
                    <OTextArea
                        onUpdate={this.onUpdate.bind(this)} 
                        title="Trigger" 
                        container={this.state.persona} 
                        fieldName='salesCanvas.trigger' 
                        label='Brainstorm Trigger Events that will initiate your Ideal Conversation'/>
                    <OTextArea
                        onUpdate={this.onUpdate.bind(this)} 
                        title="Action" 
                        container={this.state.persona} 
                        fieldName='salesCanvas.action' 
                        label='Create Entry-Point Offers that funnel prospects into the “Next Step”'/>
                    <OTextArea
                        onUpdate={this.onUpdate.bind(this)} 
                        title="Conversation" 
                        container={this.state.persona} 
                        fieldName='salesCanvas.conversation' 
                        label='Who do you serve? Where are the talking? What are you talking about?'/>
                    <Col title="Sell" xs={12}>
                        <Row center="xs">
                            <OTextArea
                                onUpdate={this.onUpdate.bind(this)} 
                                title="Sell" 
                                container={this.state.persona} 
                                fieldName='salesCanvas.sell' 
                                label='What do you offer to help your customer?'/>
                        </Row>
                        <Row center="xs">
                            <Button type="primary" onClick={() => this.done()}>Done</Button>
                        </Row>
                    </Col>
            </ProfileSettingStepBar>
        </Modal>
        );
    }

    done() {
        this.hideModal();
    }

    hideModal() {
        this.onUpdate(this.state.persona);
        this.setState({ visible: false }, () => console.log("closed"));
    }

    showModal() {
        this.setState({ visible: true }, () => console.log("opened"));
    }

    onUpdate(persona) {
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
        this.setState({ persona });
    }
}

export default AvatarForm;