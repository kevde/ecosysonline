import React, { Component } from 'react';
import { Row, Col } from 'react-flexbox-grid';
import { InputNumber, Select} from 'antd';
import OImageUpload from 'components/commons/OImageUpload';
import OTextField from 'components/commons/OTextField';
import OCustomInput from 'components/commons/OCustomInput';
import OAgeComboInput from 'components/commons/OAgeComboInput';
import { PersonaCrudService } from 'utils/PersonaCrudService';
const Option = Select.Option;
class BasicInfo extends Component {

    constructor(props) {
        super(props);
        this.personaCrudService = new PersonaCrudService();
        this.state = {
            persona: props.persona,
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ persona: nextProps.persona });
    }

    render() {
        return (
            <Col md={12}>
                <Row>
                    <Col md={4}>
                        <OImageUpload container={this.state.persona} fieldName="avatar" onSave={this.updatePhoto.bind(this)}/>
                    </Col>
                    <Col md={8}>
                         <OTextField container={this.state.persona} fieldName="firstName" size="large" placeholder="First Name" />
                         <OTextField container={this.state.persona} fieldName="lastName" size="large" placeholder="Last Name" />
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <OCustomInput container={this.state.persona} fieldName="age" label="Age" component={InputNumber} min={18} max={120}/>
                        <OCustomInput container={this.state.persona} fieldName="gender" label="Gender" component={Select} style={{width: "100%"}}>
                                  <Option value="1">Male</Option>
                                  <Option value="2">Female</Option>
                                  <Option value="0">Other</Option>
                                  <Option value="9">I prefer not to say</Option>
                        </OCustomInput>
                        <OTextField container={this.state.persona} fieldName="info.maritalStatus" label="Marital Status" />
                        <OAgeComboInput container={this.state.persona} fieldName="info.children" label="#/Age of Children" />
                        <OTextField container={this.state.persona} fieldName="info.location" label="Location" />
                    </Col>
                    <Col md={6}>
                        <OTextField container={this.state.persona} fieldName="info.quote" label="Quote" />
                        <OTextField container={this.state.persona} fieldName="info.jobTitle" label="Job Title" />
                        <OTextField container={this.state.persona} fieldName="info.income" label="Annual Income" />
                        <OTextField container={this.state.persona} fieldName="info.education" label="Level of Education" />
                        <OTextField container={this.state.persona} fieldName="info.other" label="Other" />
                    </Col>
                </Row>
            </Col>
        );
    }

    onUpdate(persona) {
        if (this.props.onUpdate) {
            this.props.onUpdate(persona);
        }
        this.setState({ persona });
    }

    async updatePhoto(persona, canvas) {
        const result = await this.personaCrudService.updatePhoto(persona.id, canvas);
        if (result) {
            this.onUpdate(persona);
        }
        return result;
    }
}

export default BasicInfo;