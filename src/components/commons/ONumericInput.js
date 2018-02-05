import React from 'react';
import { Input, Tooltip } from 'antd';
import _ from 'lodash';

function formatNumber(value) {
    value += '';
    const list = value.split('.');
    const prefix = list[0].charAt(0) === '-' ? '-' : '';
    let num = prefix ? list[0].slice(1) : list[0];
    let result = '';
    while (num.length > 3) {
        result = `,${num.slice(-3)}${result}`;
        num = num.slice(0, num.length - 3);
    }
    if (num) {
        result = num + result;
    }
    return `${prefix}${result}${list[1] ? `.${list[1]}` : ''}`;
}

class ONumericInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { container: props.container };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ container: nextProps.container });
    }

    onChange(e) {
        let { value } = e.target;

        if (_.startsWith(value, "0") && value.length > 1) {
            value = _.trimStart(value, "0");
        }

        if (this.isValueValid(value)) {
            const modifiedValue = (value !== "" && !_.endsWith(value, '.')) ? parseFloat(value) : value;
            _.set(this.state, `container.${this.props.fieldName}`, modifiedValue);
            this.setState(this.state);
            if (this.props.onChange) {
                this.props.onChange(e);
            }
        } else {
            if (value.charAt(value.length - 1) === '.' || value === '-') {
                e.target.value = value.slice(0, -1);
            }

            e.target.value = _.get(this.state, `container.${this.props.fieldName}`, "");
            e.stopPropagation();
        }
    }

    onBlur(e) {
        const { value } = e.target;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            e.target.value = value.slice(0, -1);
        }
        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.container);
        }
    }

    isValueValid(value) {
        const reg = /^-?(0|[1-9][0-9]*)(\.[0-9]*)?$/;
        return (!isNaN(value) && reg.test(value)) || value === '' || value === '-';
    }

    render() {
        return (
            <div>
                {(this.props.label) ? (<h3>{this.props.label}</h3>) : "" }
                <Input
                  {...this.props}
                  value={_.get(this.state, `container.${this.props.fieldName}`, "")}
                  onChange={this.onChange.bind(this)}
                  onBlur={this.onBlur.bind(this)}
                  placeholder={this.props.placeholder ? this.props.placeholder : "Input a number"}
                  maxLength="25"
                />
            </div>
        );
    }
}

export default ONumericInput;