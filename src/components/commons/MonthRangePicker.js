import { DatePicker } from 'antd';
import React from 'react';
import _ from 'lodash';
const { RangePicker } = DatePicker;

class MonthRangePicker extends React.Component {
    constructor(props) {
        super(props);
        let startTime = _.get(props.container, this.props.startFieldName);
        let endTime = _.get(props.container, this.props.endFieldName);
        this.state = {
            container: props.container,
            mode: ['month', 'month'],
            value: [startTime, endTime],
        }
    }

    componentWillReceiveProps(nextProps) {
        let startTime = _.get(nextProps.container, this.props.startFieldName);
        let endTime = _.get(nextProps.container, this.props.endFieldName);
        this.setState({
            container: nextProps.container,
            value: [startTime, endTime]
        });
    }

    handlePanelChange(value, mode) {
        _.set(this.state.container, this.props.startFieldName, value[0]);
        _.set(this.state.container, this.props.endFieldName, value[1]);
        this.setState({
            value,
            mode: [
                mode[0] === 'date' ? 'month' : mode[0],
                mode[1] === 'date' ? 'month' : mode[1],
            ],
            container: this.state.container
        });
        if (this.props.onUpdate) {
            this.props.onUpdate(this.state.container);
        }
    }

    render() {
        const { value, mode } = this.state;
        return (
            <RangePicker
        placeholder={['Start month', 'End month']}
        format="YYYY-MM"
        value={value}
        mode={mode}
        onPanelChange={this.handlePanelChange.bind(this)}
      />
        );
    }
}

export default MonthRangePicker;