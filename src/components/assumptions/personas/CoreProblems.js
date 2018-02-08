import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { Card } from 'antd';
import OTextField from 'components/commons/OTextField';

class CoreProblems extends Component {

    constructor(props) {
        super(props);
        this.state = {
            persona: props.persona,
            isEdited: { solution0: false, solution1: false, solution2: false }
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona });
    }

    render() {
        return (
            <Card>
            <Col>
                <Row md={12}>
                    <Col md={6}>
                        <h3>Core Problems</h3>
                    </Col>
                    <Col md={6}>
                        <h3>Solutions</h3>
                    </Col>
                </Row>
                <Row md={12} start="md">
                    <Col md={6}>
                         1. {this.state.persona.coreProblems.painPoints[0]}
                    </Col>
                    <Col md={6}>
                        {
                            this.state.isEdited['solution0'] 
                            ? <OTextField onBlur={() => this.toggle('solution0')} 
                                prefix="1. "
                                container={this.state.persona} 
                                fieldName="coreProblems.solutions.0" 
                                size="small"
                                ref="solution0"
                                placeholder="Solution..." />
                            : <div onClick={() => this.toggle('solution0')}>1. {this.state.persona.coreProblems.solutions[0]}</div>
                        }
                    </Col>
                </Row>
                <Row md={12} start="md">
                    <Col md={6}>
                         2. {this.state.persona.coreProblems.painPoints[1]}
                    </Col>
                    <Col md={6}>
                        {
                            this.state.isEdited['solution1'] 
                            ? <OTextField onBlur={() => this.toggle('solution1')} 
                                prefix="2. "
                                container={this.state.persona} 
                                fieldName="coreProblems.solutions.1"
                                size="small"
                                ref="solution1"
                                placeholder="Solution..." />
                            : <div onClick={() => this.toggle('solution1')}>2. {this.state.persona.coreProblems.solutions[1]}</div>
                        }
                    </Col>
                </Row>
                <Row md={12} start="md">
                    <Col md={6}>
                         3. {this.state.persona.coreProblems.painPoints[2]}
                    </Col>
                    <Col md={6}>
                        {
                            this.state.isEdited['solution2'] 
                            ? <OTextField onBlur={() => this.toggle('solution2')} 
                                prefix="3. "
                                container={this.state.persona}
                                fieldName="coreProblems.solutions.2" 
                                size="small"
                                ref="solution2"
                                placeholder="Solution..." />
                            : <div onClick={() => this.toggle('solution2')}>3. {this.state.persona.coreProblems.solutions[2]}</div>
                        }
                    </Col>
                </Row>
            </Col>
            </Card>
        );
    }

    toggle(fieldName) {
        this.state.isEdited[fieldName] = !this.state.isEdited[fieldName];
        this.setState({ isHidden: this.state.isEdited }, () => {
            if (this.state.isEdited[fieldName]) {
                this.refs[fieldName].focus();
            }
        });
    }

    hide(solutionForm, displayForm) {
        this.refs[solutionForm].style = { display: 'none' };
        this.refs[displayForm].style.display = 'block';
        this.onUpdate(this.state.persona);
    }

    onUpdate(persona) {
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
        this.setState({ persona });
    }
}

export default CoreProblems;