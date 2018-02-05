import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
const { TextArea } = Input;

class OCustomInput extends Component {
    constructor(props) {
        super(props);
        this.state = { container: props.container, component: props.component };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ container: nextProps.container });
    }

    render() {
        const value = _.get(this.state.container, this.props.fieldName, "");
        const TagName = this.props.component;
        return (
            <div>
            <h3>{this.props.label}</h3>
            <TagName 
            {...this.props}
            onBlur={() => this.onBlur()} 
            value={value}
            onChange={(event) => this.changeField(event)}>{(this.props.children) ? this.props.children: ''}</TagName>
        </div>
        );
    }

    changeField(value) {
        _.set(this.state.container, this.props.fieldName, value);
        this.setState({ container: this.state.container });
    }

    onBlur() {
        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.container);
        }
    }
}

export default OCustomInput;