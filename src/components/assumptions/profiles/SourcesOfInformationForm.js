import React, { Component } from 'react';
import { Card, Input } from 'antd';
import OTextField from 'components/commons/OTextField';

class SourcesOfInformationForm extends Component {


    constructor(props) {
        super(props);
        this.state = { persona: props.persona };
    }

    render() {
        return (
        <Input.Group>
        <OTextField container={this.state.persona} fieldName="sources.books" label="Books"/>
        <OTextField container={this.state.persona} fieldName="sources.magazines" label="Magazines" />
        <OTextField container={this.state.persona} fieldName="sources.blogs" label="Blogs/Websites" />
        <OTextField container={this.state.persona} fieldName="sources.gurus" label="Gurus" />
        <OTextField container={this.state.persona} fieldName="sources.other" label="Others" />
        </Input.Group>
        );
    }

    changeField(fieldName, event) {
        this.state.persona[fieldName] = event.target.value;
        this.setState({ persona: this.state.persona });
    }
}

export default SourcesOfInformationForm;