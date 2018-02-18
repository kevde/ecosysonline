import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Spin, Card, Avatar, Badge } from 'antd';
import { Link } from 'react-router-dom';
import { PersonaCrudService } from 'utils/PersonaCrudService';

export default class MembersList extends Component {
    constructor(props) {
        super(props);
        this.crudService = new PersonaCrudService();
        this.state = {
            personas: [],
            goalId: props.goalId,
            loading: false
        }
    }

    async componentWillMount() {
        if (this.props.goalId) {
            this.setState({ loading: true });
            const personas = await this.crudService.getSimplePersonas(this.props.goalId);
            this.setState({ personas });
        }
        this.setState({ loading: false });
    }

    async componentWillReceiveProps(nextProps) {
        if (nextProps.goalId) {
            this.setState({ loading: true });
            const personas = await this.crudService.getSimplePersonas(nextProps.goalId);
            this.setState({ goalId: nextProps.goalId, personas });
        }
        this.setState({ loading: false });
    }

    render() {
        return (
            <Spin spinning={this.state.loading}>
	    		<Card title="Members"extra={<Badge count={this.state.personas.length} className="members-list-count" style={{ backgroundColor: '#88c057' }}/>}>
                <Row className="members-list-container">
                {   this.state.personas.map((persona) =>
                    (
                    <Col lg={4} md={6} xs={12}>
                    <Link to={`/persona/${persona.id}`}>
                        <Row className="member-container">
                            <Col xs={1} md={2}>
                                <span className="member-avatar">
                                    <Avatar src={persona.avatar} icon="user" />
                                </span>
                            </Col>
                            <Col xs={11} md={10} className="member-fullname-container">
                                <span className="member-fullname">
                                    {persona.fullname}
                                </span>
                            </Col>
                        </Row>
                    </Link>
                    </Col>
                    ))
                }
	    		</Row>
                </Card>
    		</Spin>
        );
    }
}