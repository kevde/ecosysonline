import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Steps, Button, message } from 'antd';
const Step = Steps.Step;

class ProfileStepBar extends Component {
    constructor(props) {
        super(props);
        this.state = { current: 0, steps: props.children.map((reactComponent) => ({ title: reactComponent.props.title, content: reactComponent })) };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ current: 0 });
    }

    goto(page) {
       this.setState({current: page});
    }

    componentWillMount() {;
        this.setState(this.state);
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
            </Col>
        );
    }
}

export default ProfileStepBar;