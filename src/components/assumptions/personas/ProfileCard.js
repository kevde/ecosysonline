import _ from "lodash";
import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import AvatarForm from 'components/assumptions/avatars/AvatarForm';
import { Card, Button, Icon } from 'antd';

class ProfileCard extends Component {

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
                    <p>
                        <picture width="100%" onClick={this.showAvatarModal.bind(this)}>
                          <source srcSet={ this.state.persona.avatar ? `${this.state.persona.avatar}?time=${new Date().getTime()}`: '' } />
                          <img src="/blank-photo.jpg" alt="Default Photo" style={{borderRadius: "100%"}}/>
                        </picture>              
                    </p>
                    <h2>{this.state.persona.firstName} {this.state.persona.lastName}</h2>
                    <p>
                     <Icon type="delete" onClick={this.onDelete.bind(this)} />
                    </p>
                </Card>
                <AvatarForm persona={this.state.persona} ref="personaModal" beforeClose={() => this.reRender()} onUpdate={this.onUpdate.bind(this)}></AvatarForm>
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
        if (this.props.onDelete) {
            this.props.onDelete(this.state.persona);
        }
    }
}

export default ProfileCard;