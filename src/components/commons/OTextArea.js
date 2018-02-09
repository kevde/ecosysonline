import React, { Component } from 'react';
import { Input } from 'antd';
import _ from 'lodash';
const { TextArea } = Input;
class OTextArea extends Component {

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
            <TextArea 
            {...this.props} 
            ref="textArea"
            rows={this.props.rows || 4} 
            onBlur={this.onBlur.bind(this)} 
            value={value}
            onChange={(event) => this.changeField(event)} />
        </div>
        );
    }

    changeField(event) {
        _.set(this.state.container, this.props.fieldName, event.target.value);
        this.setState({ container: this.state.container });
    }

    onBlur(e) {
        if (this.props.onBlur) {
            this.props.onBlur(e);
        }

        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.container);
        }
    }


    focus() {
        this.refs.textArea.focus();
    }
}

export default OTextArea;