import _ from "lodash";
import { Row, Col } from 'react-flexbox-grid';
import React, { Component } from 'react';
import SalesCanvas from './personas/SalesCanvas';
import CoreProblems from './personas/CoreProblems';
import ProfileCard from './personas/ProfileCard';
import { PersonaCrudService } from 'utils/PersonaCrudService';
import { Card, Button, Icon } from 'antd';

class PersonaForm extends Component {

    constructor(props) {
        super(props);
        this.crudService = new PersonaCrudService();
        this.state = {
            persona: props.persona,
            isAvatarOpened: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona });
    }

    render() {
        return (
            <Col>
                <Row>
                    <Col md={2} className="display-initial">
                        <ProfileCard persona={this.state.persona} onUpdate={this.onUpdate.bind(this)} onDelete={(persona) => this.props.onDelete(persona.id)}/>              
                    </Col>
                    <Col md={10}>
                        <Row>
                            <Col md={12}>
                                <CoreProblems persona={this.state.persona} onUpdate={this.onUpdate.bind(this)}/>          
                            </Col>
                            <Col md={12}>
                                <SalesCanvas persona={this.state.persona}/>          
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Col>
        );
    }

    showAvatarModal() {
        console.log(this.state.persona)
        this.refs.personaModal.showModal();
    }

    reRender() {
        this.setState({ persona: this.state.persona });
    }

    async onUpdate(persona) {
        const result = await this.crudService.updatePersona(persona);
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
        this.setState({ persona });
    }
}

export default PersonaForm;