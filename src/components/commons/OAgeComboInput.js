import React, { Component } from 'react';
import Cropper from 'react-cropper';
import { Upload, Icon, Modal, Select, Input } from 'antd';
import { Row, Col } from 'react-flexbox-grid';
import _ from 'lodash';

const Option = Select.Option;
const InputGroup = Input.Group;

const children = [];
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
        this.state.container[this.props.fieldName] = value.join(',');
        this.state.childrenAges = value;
        this.setState({ childrenAges: value, container: this.state.container });
    }

    render() {
        return (
            <InputGroup compact>
        	<Input value={this.state.childrenAges.length} disabled style={{ width: '20%' }}/>
            <Select
		    mode="tags"
		    ref="childrenAges"
		    style={{ width: '80%' }}
		    onChange={this.handleChange.bind(this)}
		    onInputKeyDown={this.onInputKeyDown.bind(this)}
		    tokenSeparators={[',']}
		  >
		    {children}
		  </Select>
		  </InputGroup>
        );
    }

    onInputKeyDown(e) {
        if (isNaN(e.key)) {
            e.preventDefault();
        }
    }
}

export default OAgeComboInput;