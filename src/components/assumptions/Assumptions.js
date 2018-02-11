import React, { Component } from 'react';
import { Button, Affix, Card, Spin } from 'antd';
import Persona from 'core/Persona';
import Titlebar from 'components/layouts/Titlebar';
import PersonaForm from './PersonaForm';
import _ from 'lodash';

class PersonaList extends Component {
    constructor(props) {
        super(props);
        this.crudService = props.crudService;
        this.state = { personas: [], loading: true, goalId: this.props.match.params.goalId };
    }

    async componentWillReceiveProps(nextProps) {
        this.reloadPersonas(nextProps.match.params.goalId);
    }

    async componentWillMount() {
        this.reloadPersonas(this.state.goalId);
    }

    async addPersona() {
        const newPersona = await this.crudService.create(this.state.goalId);
        const personas = await this.reloadPersonas(this.state.goalId);
        this.refreshParent(personas);
    }

    async reloadPersonas(goalId) {
        this.setState({ loading: true });
        let personas = await this.crudService.listByGoalId(goalId);
        this.setState({ personas, loading: false });
        return personas;
    }

    async removePersona(personaId) {
        let isSuccess = await this.crudService.delete(personaId);
        this.reloadPersonas(this.state.goalId);
    }

    refreshParent(personas) {
        this.state.personas = personas;
        if (this.props.onUpdate) {
            this.props.onUpdate(personas);
        }
        this.setState(this.state.personas);
    }

    render() {
        return (
            <content>
                <Titlebar title="Profile" description="Fundamental Assumptions"/>
                <Spin spinning={this.state.loading}>
                    {_.isEmpty(this.state.personas) ? (<Card onClick={this.addPersona.bind(this)} className="addPersona">Click this to add persona</Card>): ""}
                    {this.state.personas.map((persona, key) => (<PersonaForm key={key} persona={persona} onUpdate={this.onUpdate.bind(this)} onDelete={this.removePersona.bind(this)}></PersonaForm>))}
                    <Affix offsetBottom={40} style={{right: '40px', width: 'auto !important'}}>
                       <Button type="primary" shape="circle" icon="plus" size="large" onClick={this.addPersona.bind(this)}/>
                    </Affix>
                </Spin>
            </content>
        );
    }

    onUpdate(persona) {
        if (persona._deleted === true) {
            this.reloadPersonas(this.state.goalId);
            return;
        }
        this.refreshParent(this.state.personas);
    }
}

export default PersonaList;