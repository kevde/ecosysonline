import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Modal, Input, Button, notification } from 'antd';
import JourneySettingStepBar from 'components/journeys/JourneySettingStepBar';
import AscendForm from 'components/journeys/AscendForm';
import OTextArea from 'components/commons/OTextArea';
import MonthRangePicker from 'components/commons/MonthRangePicker';
import ONumericInput from 'components/commons/ONumericInput';

class JourneySettingModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: true,
            journey: props.journey,
            loading: true
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ journey: nextProps.journey, loading: nextProps.loading });
    }

    render() {
        return (
            <Modal
            visible={this.state.visible && !this.state.loading}
            onOk={this.hideModal.bind(this)}
            onCancel={this.hideModal.bind(this)}
            className="journey-setting"
            width="50%"
            footer={null}
            >
            <JourneySettingStepBar>
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Aware" 
                    container={this.state.journey} 
                    fieldName='aware' 
                    label='How do you going to make your persona aware that you exist?'/>
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Engage" 
                    container={this.state.journey} 
                    fieldName='engage' 
                    label='How do they engage with your company?'/>
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Subscribe" 
                    container={this.state.journey} 
                    fieldName='subscribe' 
                    label='Where do they subscribe to that gives them value?'/>
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Convert" 
                    container={this.state.journey} 
                    fieldName='convert' 
                    label='How do you convert them to a first buy?'/>
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Excite" 
                    container={this.state.journey} 
                    fieldName='excite' 
                    label='How do you excite them?'/>
                <AscendForm 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Ascend" 
                    container={this.state.journey} />
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Advocate" 
                    container={this.state.journey} 
                    fieldName='advocate' 
                    label='What will you provide in the advocate step?'/>
                <OTextArea 
                    onUpdate={this.onUpdate.bind(this)} 
                    title="Promote" 
                    container={this.state.journey} 
                    fieldName='promote' 
                    label='How does your persona going to promote you?'/>
            </JourneySettingStepBar>
        </Modal>
        );
    }

    done() {
        this.state.journey.enabled = true;
        this.setState({ journey: this.state.journey });
        this.showNotification();
        this.hideModal();
    }

    hideModal() {
        this.setState({ visible: false }, () => console.log("closed"));
    }

    showModal() {
        this.setState({ visible: true }, () => console.log("opened"));
    }

    onUpdate(journey) {
        if (this.props.onUpdate) {
            this.props.onUpdate(journey);
        }
    }
}

export default JourneySettingModal;