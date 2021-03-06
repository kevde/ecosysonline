import _ from "lodash";
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import PersonaInfoForm from 'components/assumptions/personas/PersonaInfoForm';
import { Card, Button, Icon } from 'antd';

class ProfileCard extends Component {

    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona, deleteDisabled: nextProps.deleteDisabled });
    }

    constructor(props) {
        super(props);
        this.state = {
            persona: props.persona,
            isAvatarOpened: false,
            deleteDisabled: props.deleteDisabled
        };
    }

    render() {
        const avatar = _.get(this.state, 'persona.avatar');
        const fullname = _.compact([_.get(this.state, 'persona.firstName'), _.get(this.state, 'persona.lastName')]).join(" ");
        return (
            <div>
                <Card>
                    <p>
                        <picture width="100%" onClick={this.showAvatarModal.bind(this)}>
                          <source srcSet={ avatar ? `${this.state.persona.avatar}?time=${new Date().getTime()}`: '' } />
                          <img src="/blank-photo.jpg" alt="Default Photo" style={{borderRadius: "100%"}}/>
                        </picture>              
                    </p>
                    <h2>{fullname}</h2>
                    { (this.state.deleteDisabled) ? '' :
                        <p>
                         <Icon type="delete" onClick={this.onDelete.bind(this)} />
                        </p>
                    }
                </Card>
                {(this.state.persona) ? 
                <PersonaInfoForm persona={this.state.persona} ref="personaModal" beforeClose={() => this.reRender()} onUpdate={this.onUpdate.bind(this)}></PersonaInfoForm>
                : ''}
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

    onDelete() {
        if (this.props.onDelete && this.state.persona) {
            this.props.onDelete(this.state.persona);
        }
    }
}

export default ProfileCard;