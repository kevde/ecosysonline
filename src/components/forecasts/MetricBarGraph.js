import React, { Component } from 'react';
import { Card, Radio } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
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
            sum: props.sum || 'sum',
            prefix: props.prefix || '',
            suffix: props.suffix || '',
            mode: props.mode || 'monthly'
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            monthly: nextProps.metrics,
            quarterly: MonthService.getQuarterlyMetricValues(nextProps.metrics),
            mode: nextProps.mode || this.viewMode.state.value,
            prefix: nextProps.prefix || '',
            suffix: nextProps.suffix || '',
            sum: nextProps.sum || 'sum'
        });
    }


    render() {
        const metrics = this.state[this.state.mode];
        const goal = this.getSumBy(this.state.sum, 'goal');
        const actual = this.getSumBy(this.state.sum, 'actual');
        const difference = this.getSumBy(this.state.sum, 'difference');
        return (
            <Card title={this.props.title || 'Statistics'} extra={this.renderModes()}>
              <Row>
                 <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={this.state[this.state.mode]} onClick={this.onClick.bind(this)}
                      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                      <XAxis dataKey="label"/>
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
                      <Area type="monotone" dataKey="goal" fillOpacity={1} stroke="#4da6a1" strokeWidth={2} fill="#86d3ce" />
                      <Area type="monotone" dataKey="actual" fillOpacity={1} stroke="#0e4d92" strokeWidth={2} fill="#3993bb" />
                    </AreaChart>
                  </ResponsiveContainer>
              </Row>
              <Row>
                <Col xs={4}>
                  <h1>
                   { goal < 0 ? '-': '' }
                   {this.state.prefix}
                   {_.round(Math.abs(goal), 2)}
                   {this.state.suffix}
                  </h1>
                  <h3>Goal</h3>
                </Col>
                <Col xs={4}>
                  <h1>
                   { actual < 0 ? '-': '' }
                   {this.state.prefix}
                   {_.round(Math.abs(actual), 2)}
                   {this.state.suffix}
                  </h1>
                  <h3>Actual</h3>
                </Col>
                <Col xs={4}>
                  <h1>
                   { (difference < 0) ? '-': (difference > 0) ? '+' : '' }
                   {this.state.prefix}
                   {_.round(Math.abs(difference), 2)}
                   {this.state.suffix}
                  </h1>
                  <h3>Difference</h3>
                </Col>
              </Row>
            </Card>
        );
    }

    getSumBy(type, fieldName) {
        const typeMap = {
            mean: _.meanBy,
            sum: _.sumBy
        }
        return typeMap[type](this.state.monthly, (metric) => _.get(metric, fieldName)) || 0;
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
          </RadioGroup>
        );
    }
}

export default MetricBarGraph;