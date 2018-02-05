import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';

class OTextField extends Component {

    constructor(props) {
        super(props);
        this.state = { container: props.container };
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
        this.setState({ container: this.state.container });
    }
    
    focus() {
        this.refs.textField.focus();
    }
}

export default OTextField;