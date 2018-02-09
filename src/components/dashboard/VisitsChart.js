import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Select } from 'antd';
import { ResponsiveContainer, PieChart, Pie, LabelList, Cell, Legend, Text, Label } from 'recharts';
const Option = Select.Option;

export default class VisitsChart extends Component {
    constructor(props) {
        super(props);
        this.state = { visits: [{ visits: 2000, location: 'Germany' }, { visits: 200, location: 'New Zealand' }] };
    }
    render() {
        return (
            <Card title="Analysis" extra={this.renderDropDown()}>
             <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Legend verticalAlign="middle" align="right" layout="vertical"/>
                  <Pie data={this.state.visits} dataKey="visits" nameKey="location" cx="50%" cy="50%" innerRadius={50} outerRadius={85}>
                    {
                      this.state.visits.map((entry, index) => (<Cell key={`cell-${index}`} fill={this.randomBlue()}/>))
                    }
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </Card>
        );
    }

    randomBlue() {
        const randomLightness = 25 + (Math.floor(Math.random() * 50));
        return `hsl(208, 100%, ${randomLightness}%)`;
    }

    renderDropDown() {
        return (
            <Select defaultValue="days">
                <Option value="days">Last 24 Hours</Option>
                <Option value="months">Last Month</Option>
                <Option value="years">Last Year</Option>
            </Select>
        );
    }
}