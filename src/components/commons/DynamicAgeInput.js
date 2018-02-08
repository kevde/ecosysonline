import { Form, Input, Icon, Button } from 'antd';
import React, { Component } from 'react';
import ONumericSlider from 'components/commons/ONumericSlider';
import _ from 'lodash';
const FormItem = Form.Item;

let uuid = 0;
class DynamicAgeInput extends React.Component {
    constructor(props) {
        super(props);
        const initialValues = this.toObject(this.props.initialValues);
        this.state = { initialValues: initialValues || {} }
    }
    remove(k) {
        const keys = Object.keys(this.state.initialValues);
        delete this.state.initialValues[k];
        const initialValues = this.toObject(this.toArray(this.state.initialValues));
        this.setState({ initialValues });
    }

    toObject(initialValues) {
        return initialValues.reduce((result, item, index) => _.set(result, index, item), {});
    }

    toArray(initialValues) {
        return Object.values(initialValues);
    }

    add() {
        const { form } = this.props;
        let uuid = Math.max(...Object.keys(this.state.initialValues));
        let initialValues = this.state.initialValues;
        initialValues[uuid + 1] = this.props.min || 0;
        this.setState({ initialValues });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.setFieldsValue(this.state.initialValues);
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onChange(this.toArray(values));
                console.log('Received values of form: ', values);
            }
        });
    }

    checkAge(rule, value, callback) {
        if (value >= 0 && !isNaN(value)) {
            callback();
            return;
        }
        callback('Price must greater than zero!');
    }

    yrsOldSettings = {
        validateTrigger: ['onChange'],
        rules: [{ validator: this.checkAge.bind(this) }],
        message: `Please input your children's age or delete this field.`,
    };
    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        const keys = Object.keys(this.state.initialValues);
        const formItems = keys.map((k, index) => {
            return (
                <FormItem label={index === 0 ? `Children's Age` : ''} required={false} key={k}>
          {getFieldDecorator(`${k}`, this.yrsOldSettings)(
                        <ONumericSlider
                            container={this.state.initialValues}
                            fieldName={`${k}`}
                            step={1}
                            min={0}
                            max={100}
                            defaultValue={0}
                            placeholder="0"
                            suffix="yrs old"/>
          )}
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
        </FormItem>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.add.bind(this)} style={{ width: '60%' }}>
            <Icon type="plus" /> Add field
          </Button>
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">Submit</Button>
        </FormItem>
      </Form>
        );
    }
}

export default Form.create()(DynamicAgeInput);