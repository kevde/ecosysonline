import React from 'react';
import { Input, Tooltip } from 'antd';
import _ from 'lodash';

class ONumericInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = { container: props.container, error: false, exceed: 0 };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ container: nextProps.container, error: false, exceed: 0 });
    }

    onChange(e) {
        let { value } = e.target;
        const reg = /(?:^(\-|)\d{1,}((?:\.\d{1,})|\.|)$)|(?:^\-$)|(?:^$)/;
        const container = _.set(this.state.container, this.props.fieldName, value);
        if (reg.test(value) || _.isEmpty(value)) {
            this.setState({ container });
        } else {
            e.preventDefault();
        }
    }

    onBlur(e) {
        let { value } = e.target;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            e.target.value = value.slice(0, -1);
        }

        value = parseFloat(value);

        if (!_.isNull(this.props.min) & this.props.min > value) {
            this.setState({ error: true, exceed: -1 });
            return;
        }

        if (!_.isNull(this.props.max) & this.props.max < value) {
            this.setState({ error: true, exceed: -1 });
            return;
        }
        
        this.setState({ error: false, exceed: 0 });

        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.container);
        }
    }

    render() {
        return (
            <div>
                {(this.props.label) ? (<h3>{this.props.label}</h3>) : "" }
                <Input
                  {...this.props}
                  value={_.get(this.state, `container.${this.props.fieldName}`, "")}
                  style={{ borderColor: (this.state.error) ? 'red' : '' }}
                  onChange={this.onChange.bind(this)}
                  onBlur={this.onBlur.bind(this)}
                  placeholder={this.props.placeholder ? this.props.placeholder : "Input a number"}
                  maxLength="25"
                />
                <div style={{display: (this.state.error) ?  '' : 'none'}}>
                {this.state.exceed === 1 ? `Value should not exceed ${_.compact([this.props.prefix, `${this.props.max}`, this.props.suffix]).join('')}` : '' }
                {this.state.exceed === -1 ? `Value should not go below ${_.compact([this.props.prefix, `${this.props.min}`, this.props.suffix]).join('')}` : '' }
                </div>
            </div>
        );
    }
}

export default ONumericInput;