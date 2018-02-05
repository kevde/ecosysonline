import React, { Component } from "react";
import { render } from "react-dom";
import { Card } from 'antd';
import ReactTable from "react-table";
import "react-table/react-table.css";

class MetricTable extends Component {
    constructor(props) {
        super(props);
        this.state = { metrics: props.metrics, dateFormat: props.dateFormat };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ metrics: nextProps.metrics });
    }

    get columns() {
        const monthHeader = { Header: "Month", accessor: "month", id: "month" };
        const goalHeader = { Header: "goal", accessor: "goal", id: "goal" };
        const actualHeader = { Header: "actual", accessor: "actual", id: "actual" };
        const differenceHeader = { Header: "difference", accessor: "difference", id: "difference" };

        monthHeader.accessor = d => this.formatDate(d)('month')(this.state.dateFormat);
        goalHeader.accessor = d => this.formatNumber(d)('goal');
        actualHeader.accessor = d => this.formatNumber(d)('actual');
        differenceHeader.accessor = d => this.formatNumber(d)('difference');

        if (this.props.isEditable) {
            goalHeader.Cell = this.renderEditable.bind(this);
            actualHeader.Cell = this.renderEditable.bind(this);
        }

        return [monthHeader, goalHeader, actualHeader, differenceHeader];
    }

    renderEditable(cellInfo) {
        return (
            <div
        style={{ backgroundColor: "#fafafa" }}
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => this.triggerOnBlurEvent(e, cellInfo)}
        dangerouslySetInnerHTML={{
          __html: this.state.metrics[cellInfo.index][cellInfo.column.id]
        }}
      />
        );
    }

    triggerOnBlurEvent(e, cellInfo) {
        const metrics = [...this.state.metrics];
        metrics[cellInfo.index][cellInfo.column.id] = parseFloat(e.target.innerHTML);
        this.setState({ metrics });
        if (this.props.onBlur) {
            this.props.onBlur(metrics);
        }
    }

    render() {
        const { metrics } = this.state;
        return (
            <Card type="inner">
        <ReactTable
       	  pageSize={metrics.length}
          showPagination={false}
          data={metrics}
          columns={this.columns}
          className="-striped -highlight"
        />
      </Card>
        );
    }

    formatNumber(d) {
        return (fieldName) => <div dangerouslySetInnerHTML={this.toFixedNumber(d)(fieldName)}/>;
    }

    toFixedNumber(d) {
        return (fieldName) => ({ __html: Number(d[fieldName] ? d[fieldName] : 0).toFixed(2) })
    }

    formatDate(d, formatString, fieldName) {
        const html = (fieldName, formatString) => ({ __html: d[fieldName].format(formatString) });
        return (fieldName) => (formatString) => <div dangerouslySetInnerHTML={html(fieldName, formatString)}/>;
    }
}

export default MetricTable;