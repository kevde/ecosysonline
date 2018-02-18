import React, { Component } from 'react';
import PersonaForm from './PersonaForm';
import { Row, Col } from 'react-flexbox-grid';
import { PersonaCrudService } from 'utils/PersonaCrudService';
import Titlebar from 'components/layouts/Titlebar';

export default class PersonaPage extends Component {
    constructor(props) {
        super(props);
        this.crudService = new PersonaCrudService();
        this.state = { persona: null };
    }
    async componentWillMount() {
        const personaId = this.props.match.params.personaId;
        const persona = await this.crudService.get(personaId);
        this.setState({ persona, personaId });
    }

    async componentWillReceiveProps(nextProps) {
        const personaId = nextProps.match.params.personaId;
        const persona = await this.crudService.get(personaId);
        this.setState({ persona, personaId });
    }

    render() {
        return (
            <content>

                        <Titlebar title="Profile" description="Fundamental Assumptions"/>
                <Row>
                    <Col>
        				<PersonaForm persona={this.state.persona} deleteDisabled={true}/>
                    </Col>
                </Row>
        	</content>
        )
    }
}