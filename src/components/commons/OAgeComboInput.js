import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Upload, Icon, Modal, Select, Input, Button } from 'antd';
import DynamicAgeInput from 'components/commons/DynamicAgeInput';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';

const Option = Select.Option;
const InputGroup = Input.Group;

const children = [];
const ageClass = {
    padding: '1px 3px',
    borderRadius: '3px',
    border: '1px solid gray',
    margin: '2px',
    color: ' gray',
    display: 'table-row'
}

const yrsOldClass = {
    fontSize: '1vh',
}

for (let i = 0; i < 120; i++) {
    children.push(<Option key={i}>{i}</Option>);
}

class OAgeComboInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            container: props.container,
            childrenAges: _.get(props.container, props.fieldName, '').split(','),
            loading: false,
            modalVisible: false
        }
    }

    handleChange(value) {
        console.log(`selected ${value}`);
        _.set(this.state.container, this.props.fieldName, value.join(','));
        this.state.childrenAges = value;
        this.setState({ childrenAges: value, container: this.state.container });
        this.onUpdate(this.state.container);
    }

    render() {
        return (
            <Row>
                    <Col md={12}>
                            <h3>Children(s)</h3>
                    </Col>
                    <Col md={4}>
                           {this.state.childrenAges.length}
                    </Col>
                    <Col md={4}>
                        {this.createAgesCard(this.state.childrenAges)}
                    </Col>
                    <Col md={4}>
                        <Button onClick={this.openModal.bind(this)}>Edit</Button>
                    </Col>
                    <Modal visible={this.state.modalVisible} footer={null} onCancel={this.hideModal.bind(this)}>
                          <DynamicAgeInput initialValues={this.state.childrenAges} onChange={this.onChange.bind(this)}/>
                    </Modal>
                </Row>
        );
    }

    hideModal() {
        this.setState({ modalVisible: false, container: this.props.container, childrenAges: _.get(this.props.container, this.props.fieldName, '').split(','), });
    }

    openModal() {
        this.setState({ modalVisible: true });
    }

    onUpdate(container) {
        if (this.props.onUpdate) {
            this.props.onUpdate(container);
        }
    }

    onChange(ages) {
        this.handleChange(ages);
        this.setState({ modalVisible: false });
    }


    createAgesCard(childrenAges) {
        const distinctAges = [...new Set(childrenAges)].sort();
        return distinctAges.map((age) => (<span style={ageClass}>{this.countAges(childrenAges, age)} x {age} <span style={yrsOldClass}>yrs old</span></span>));
    }

    countAges(childrenAges, age) {
        return childrenAges.filter((childAge) => age === childAge).length;
    }
}

export default OAgeComboInput;