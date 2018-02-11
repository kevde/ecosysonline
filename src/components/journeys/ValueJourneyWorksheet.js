import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card, Spin } from 'antd';
import JourneySettingModal from './JourneySettingModal';
import JourneyCard from './JourneyCard';
import { Journey } from 'core/Journey';
import Titlebar from 'components/layouts/Titlebar';
import ValueJourneyCanvas from './ValueJourneyCanvas';

class ValueJourneyWorksheet extends Component {
    constructor(props) {
        super(props);
        this.state = { journey: new Journey(), loading: true };
    }

    async componentWillReceiveProps(nextProps) {
        if (this.state.loading === false) {
            this.setState({ journey: this.state.journey });
        }
    }

    async componentWillMount() {
        const goalId = this.props.match.params.goalId;
        const journey = await this.props.crudService.listByGoalId(goalId);
        this.state.journey = journey;
        this.setState({ journey: journey, loading: false });
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
                <Titlebar title="Buyer's Journey" description="Worksheet"/>
                <Card>
                <JourneySettingModal journey={this.state.journey} onUpdate={this.onUpdate.bind(this)} loading={this.state.loading} />
                <ValueJourneyCanvas journey={this.state.journey}/>
                </Card>
            </Spin>
        );
    }

    async onUpdate(journey) {
        this.state.loading = true;
        const result = await this.props.crudService.update(journey);
        this.setState({ loading: false });

        if (this.props.onUpdate) {
            this.props.onUpdate(journey);
        }
    }
}

export default ValueJourneyWorksheet;