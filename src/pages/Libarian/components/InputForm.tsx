import { Form, Button, Col, Row, Input, DatePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';

const { Option } = Select;
var fileList: any = [];
const children: any = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const InputForm = (props: any) => {
  const [form] = Form.useForm();
  var { bookGroup } = props;
  if (bookGroup != undefined) {
    form.setFieldsValue({
      ...bookGroup,
      publishDate: bookGroup.publishDate ? moment(bookGroup.publishDate) : null,
    });
  }

  return (
    <Form
      form={form}
      layout="vertical"
      id={'inputForm'}
      onFinish={(value) => {
        props.handelSubmit(value);
      }}
    >
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="name" label="Name" required>
            <Input placeholder="Please enter name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="gender" label="Gender" required>
            <Select defaultValue="male">
              <Option value="male">Male</Option>
              <Option value="Femal">Female</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="dateOfBirth" label="Date of birth" required>
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="address" label="Address" required>
            <Input placeholder="Please enter book's width" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="phone" label="Phone" required>
            <Input placeholder="Please enter quantity" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email" required>
            <Input placeholder="Please enter book's fee" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="password" label="Password" required>
            <Input placeholder="Please enter quantity" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="confirm" label="Confirm Password" required>
            <Input placeholder="Please enter book's fee" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export { fileList, InputForm };
