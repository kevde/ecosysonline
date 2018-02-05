import React, { Component } from 'react';
import { Card, Input } from 'antd';
import OTextField from './../../commons/OTextField';

class PurchaseProcessForm extends Component {
    constructor(props) {
        super(props);
        this.state = { persona: props.persona };
    }

    render() {
        return (
        <Input.Group>
        <OTextField container={this.state.persona} fieldName="purchase.objections" label="Objections to the sale"/>
        <OTextField container={this.state.persona} fieldName="purchase.role" label="Role in the Purchase Process" />
        </Input.Group>
        );
    }
}

export default PurchaseProcessForm;