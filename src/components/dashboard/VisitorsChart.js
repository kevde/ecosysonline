import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Select } from 'antd';
import { ResponsiveContainer, PieChart, Pie, Cell, Legend, Label } from 'recharts';
const Option = Select.Option;

export default class VisitorsChart extends Component {
    constructor(props) {
        super(props);
        this.state = { metrics: props.metrics, type: 'actual', colors: this.getColors(props.metrics) };
    }

    async componentWillReceiveProps(nextProps) {
        this.setState({ metrics: nextProps.metrics, colors: this.getColors(nextProps.metrics) });
    }

    getColors(metrics) {
        return metrics.reduce((colors, metric) => {
            colors[metric.month.format('MMM YYYY')] = this.randomBlue();
            return colors;
        }, {});
    }

    render() {
        const actualValues = this.state.metrics.map((metric) => ({ id: metric.id, month: this.getMonth(metric), value: this.getValue(metric) }));

        return (
            <Card title="Visitors" extra={this.renderDropDown()}>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Legend verticalAlign="middle" align="right" layout="vertical"/>
                  <Pie data={actualValues} dataKey="value" nameKey="month" cx="50%" cy="50%" innerRadius={50} outerRadius={85}>
                    {
                      actualValues.map((entry, index) => (<Cell key={`cell-${index}`} fill={this.state.colors[entry.month]}/>))
                    }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
        );
    }

    onChange(value) {
        this.setState({ type: value });
    }

    getValue(metric) {
        return metric.getTotalVisitors(this.state.type);
    }

    getMonth(metric) {
        return metric.month.format('MMM YYYY');
    }

    randomBlue() {
        const randomLightness = 25 + (Math.floor(Math.random() * 50));
        return `hsl(208, 100%, ${randomLightness}%)`;
    }

    renderDropDown() {
        return (
            <Select ref="dropdown" defaultValue="actual" onChange={this.onChange.bind(this)}>
                <Option value="actual">Actual</Option>
                <Option value="goal">Goal</Option>
            </Select>
        );
    }
}