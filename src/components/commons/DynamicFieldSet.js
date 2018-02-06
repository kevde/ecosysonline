import { Form, Input, Icon, Button } from 'antd';
import React, { Component } from 'react';
import _ from 'lodash';
const FormItem = Form.Item;

let uuid = 0;
class DynamicFieldSet extends React.Component {
    constructor(props) {
        super(props);
        const initialValues = this.props.initialValues.reduce((result, item, index) => _.set(result, index, item), {});
        this.state = { initialValues: initialValues || {} }
    }
    remove = (k) => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        // We need at least one passenger
        if (keys.length === 1) {
            return;
        }

        // can use data-binding to set
        form.setFieldsValue({
            keys: keys.filter(key => key !== k),
        });
    }

    add = () => {
        const { form } = this.props;
        // can use data-binding to get
        const keys = form.getFieldValue('keys');
        const nextKeys = keys.concat(uuid);
        uuid++;
        // can use data-binding to set
        // important! notify form to detect changes
        form.setFieldsValue({
            keys: nextKeys,
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                this.props.onChange(Object.values(values.names));
                console.log('Received values of form: ', values);
            }
        });
    }

    render() {
        const { getFieldDecorator, getFieldValue } = this.props.form;
        getFieldDecorator('keys', { initialValue: [] });
        const keys = getFieldValue('keys');
        const formItems = keys.map((k, index) => {
            return (
                <FormItem
          label={index === 0 ? `Children's Age` : ''}
          required={false}
          key={k}
        >
          {getFieldDecorator(`names[${k}]`, {
            validateTrigger: ['onChange', 'onBlur'],
            rules: [{
              required: true,
              whitespace: true,
              message: `Please input your children's age or delete this field.`,
            }],
          })(
            <Input placeholder="passenger name" style={{ width: '60%', marginRight: 8 }} />
          )}
          {keys.length > 1 ? (
            <Icon
              className="dynamic-delete-button"
              type="minus-circle-o"
              disabled={keys.length === 1}
              onClick={() => this.remove(k)}
            />
          ) : null}
        </FormItem>
            );
        });
        return (
            <Form onSubmit={this.handleSubmit.bind(this)}>
        {formItems}
        <FormItem>
          <Button type="dashed" onClick={this.add} style={{ width: '60%' }}>
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

export default Form.create()(DynamicFieldSet);