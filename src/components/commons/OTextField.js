import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';

class OTextField extends Component {

    constructor(props) {
        super({ value: _.get(props.container, props.fieldName, ""), ...props });
        this.state = { container: props.container, value: this.props.value };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ container: nextProps.container });
    }

    render() {
        const value = _.get(this.state.container, this.props.fieldName, "");
        return (
            <div>
         <h3>{this.props.label}</h3>
         <Input ref="textField" {...this.props} value={value} onChange={(event) => this.changeField(event)} />
        </div>
        );
    }

    changeField(event) {
        _.set(this.state.container, this.props.fieldName, event.target.value);
        this.value = event.target.value;
        this.setState({ container: this.state.container, value: this.value });
        if (this.props.onChange) {
            this.props.onChange(this.value);
        }
    }

    focus() {
        this.refs.textField.focus();
    }
}

export default OTextField;