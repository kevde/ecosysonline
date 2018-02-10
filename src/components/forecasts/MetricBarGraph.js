import React, { Component } from 'react';
import { Card, Radio } from 'antd';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine, Area, Tooltip } from 'recharts';
import _ from 'lodash';
import MonthService from 'components/commons/MonthService';
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class MetricBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            monthly: props.metrics,
            quarterly: MonthService.getQuarterlyMetricValues(props.metrics),
            yearly: props.metrics,
            mode: props.mode || 'monthly'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            monthly: nextProps.metrics,
            quarterly: MonthService.getQuarterlyMetricValues(nextProps.metrics),
            yearly: nextProps.metrics,
            mode: nextProps.mode || this.viewMode.state.value
        });
    }


    render() {
        const metrics = this.state[this.state.mode];
        return (
            <Card title={this.props.title || 'Statistics'} extra={this.renderModes()}>
             <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={this.state[this.state.mode]} onClick={this.onClick.bind(this)}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                  <XAxis dataKey="label"/>
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                  <Area type="monotone" dataKey="goal" fillOpacity={1} stroke="#4da6a1" strokeWidth={2} fill="#86d3ce" />
                  <Area type="monotone" dataKey="actual" fillOpacity={1} stroke="#874ea8" strokeWidth={2} fill="#3993bb" />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
        );
    }

    onClick(e) {
        console.log(e);
    }

    changeMode(e) {
        const { value } = e.target;
        this.setState({ mode: value });
    }

    renderModes() {
        return (
            <RadioGroup ref={(mode) => this.viewMode = mode} defaultValue="monthly" size="large" onChange={this.changeMode.bind(this)}>
            <RadioButton value="monthly">Monthly</RadioButton>
            <RadioButton value="quarterly">Quarterly</RadioButton>
            <RadioButton value="yearly">Yearly</RadioButton>
          </RadioGroup>
        );
    }
}

export default MetricBarGraph;