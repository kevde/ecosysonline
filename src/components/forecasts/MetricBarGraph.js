import React, { Component } from 'react';
import { Card } from 'antd';
import { ResponsiveContainer, AreaChart, CartesianGrid, XAxis, YAxis, ReferenceLine, Area, Tooltip } from 'recharts';

class MetricBarGraph extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metrics: props.metrics
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ metrics: nextProps.metrics });
    }


    render() {
        return (
            <Card>
			 <ResponsiveContainer width="100%" height={300}>
			    <AreaChart data={this.state.metrics}
			      margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
			      <XAxis dataKey="monthOfYear" />
			      <YAxis />
			      <CartesianGrid strokeDasharray="3 3" />
			      <Tooltip />
			      <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
			      <Area type="monotone" dataKey="goal" stroke="#8884d8" fill="#8884d8" />
			      <Area type="monotone" dataKey="difference" stroke="#AABBd8" fill="#AABBd8" />
			    </AreaChart>
			  </ResponsiveContainer>
        	</Card>
        );
    }

    updateMetricValues(metrics) {
        this.setState({ metrics });
    }
}

export default MetricBarGraph;