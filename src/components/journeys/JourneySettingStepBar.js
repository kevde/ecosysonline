import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Steps, Button, message } from 'antd';

const Step = Steps.Step;

class JourneySettingStepBar extends Component {
    constructor(props) {
        super(props);
        this.state = { current: 0, steps: props.children.map((reactComponent) => ({ title: reactComponent.props.title, content: reactComponent })) };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ steps: nextProps.children.map((reactComponent) => ({ title: reactComponent.props.title, content: reactComponent })) });
    }

    next() {
        const current = this.state.current + 1;
        this.setState({ current });
    }
    prev() {
        const current = this.state.current - 1;
        this.setState({ current });
    }

    goto(page) {
        this.setState({ current: page });
    }

    componentWillMount() {;
        this.setState(this.state);
    }

    onUpdate(journey) {
        if (this.props.onUpdate) {
            this.props.onUpdate(journey);
        }
    }

    render() {
        const { current, steps } = this.state;
        return (
            <Col xs={12}>
                <Row>
                    <Col xs={3}>
                        <Steps current={current} direction="vertical" size="small" progressDot>
                            {steps.map((item, i) => <Step key={item.title} title={item.title} onClick={() => this.goto(i)} />)}
                        </Steps>
                    </Col>
                    <Col xs={9} >
                        <div className="steps-content">{steps[this.state.current].content}</div>
                    </Col>
                </Row>
                <Row>
                    <Col xs={1} xsOffset={1}>
                      {
                        this.state.current > 0 && this.state.current < steps.length - 1
                        &&
                        <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                          Previous
                        </Button>
                      }
                    </Col>
                    <Col xs={1} xsOffset={8}>
                      {
                        this.state.current < steps.length - 1
                        &&
                        <Button type="primary" onClick={() => this.next()}>Next</Button>
                      }
                    </Col>
                </Row>
            </Col>
        );
    }
}

export default JourneySettingStepBar;