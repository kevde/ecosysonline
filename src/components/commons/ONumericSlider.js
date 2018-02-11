import React from 'react';
import { Input, Tooltip, Slider } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
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

class ONumericSlider extends React.Component {

    constructor(props) {
        super(props);
        const value = _.get(props.container, props.fieldName, "");
        this.state = { container: props.container, value };
    }

    componentWillReceiveProps(nextProps) {
        const value = _.get(nextProps.container, nextProps.fieldName, "");
        this.setState({ container: nextProps.container, value });
    }

    onChange(e) {
        let { value } = e.target;
        const reg = /^-?(\d+)((?:(\.)(\d+))|(?:\.)|)|(?:\-)/;

        if (reg.test(value) || _.isEmpty(value)) {
            this.setState({ value });
        }
    }

    onBlur(e) {
        let { value } = e.target;
        const reg = /^-?(\d+)((?:(\.)(\d+))|(?:\.)|)/;

        if (reg.test(value)) {
            if (this.props.max && this.props.max < value) {
                value = this.props.max;
            }
            this.onSliderChange(value);
        } else if (_.isEmpty(value)) {
            this.setState({ value: this.props.min })
        }
    }

    onSliderChange(value) {
        _.set(this.state, `container.${this.props.fieldName}`, value);
        this.setState({ container: this.state.container, value }, () => {
            if (this.props.onChange) {
                this.props.onChange(value);
            }
            if (this.props.onUpdate) {
                this.props.onUpdate(this.state.container);
            }
        });
    }

    render() {
        return (
            <Row>
                {(this.props.label) ? (<h3>{this.props.label}</h3>) : "" }
                <Col md={8}>
                    <Slider {...this.props} onChange={this.onSliderChange.bind(this)} value={this.state.value} width='75%'/>
                </Col>
                <Col md={4}>
                    <Input
                      width='20%'
                      {...this.props}
                      value={this.state.value}
                      onChange={this.onChange.bind(this)}
                      onBlur={this.onBlur.bind(this)}
                      placeholder={this.props.placeholder ? this.props.placeholder : `${this.props.min} to ${this.props.max}`}
                      maxLength="25"
                    />
                </Col>
            </Row>
        );
    }
}

export default ONumericSlider;