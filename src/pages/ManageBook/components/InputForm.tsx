import { Form, Button, Col, Row, Input, DatePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';

export const fileList: any = [];

export const InputForm = (props: any) => {
  const [form] = Form.useForm();
  var { bookGroup, categories } = props;
  const children: any = [];
  for (let i = 0; i < categories.length; i++) {
    let tmp = categories[i];
    children.push(
      <Select.Option key={tmp.id} value={tmp.id}>
        {tmp.name}
      </Select.Option>,
    );
  }

 
  if (bookGroup != null) {
    const cate: any = [];
    for (let i = 0; i < bookGroup.category.length; i++) {
      let tmp = bookGroup.category[i];
      cate.push(tmp.name);
      children.push(
        <Select.Option key={tmp.id} value={tmp.name}>
          {tmp.name}
        </Select.Option>,
      );
    }

    form.setFieldsValue({
      ...bookGroup,
      category: cate,
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
          <Form.Item name="name" label="Book Group Name" required>
            <Input placeholder="Please enter book group name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="author" label="Author" required>
            <Input placeholder="Please enter book author" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="pageNumber" label="Page Number" required>
            <Input placeholder="Please enter page number" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="width" label="Width" required>
            <Input placeholder="Please enter book's width" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="height" label="Height" required>
            <Input placeholder="Please enter book's height" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="quantity" label="Quantity" required>
            <Input placeholder="Please enter quantity" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="fee" label="Fee" required>
            <Input placeholder="Please enter book's fee" />
          </Form.Item>
        </Col>
        <Col span={6}>
          <Form.Item name="punishFee" label="Punish Fee" required>
            <Input placeholder="Please enter book's Punish Fee" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="category" label="Category">
            <Select
              mode="multiple"
              size={'middle'}
              placeholder="Please select"
              style={{ width: '100%' }}
            >
              {children}
            </Select>
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="publishingCompany" label="Publishing Company" required>
            <Input placeholder="Please enter publishing company" />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="publishDate" label="Publishing Date" required>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="publishingNumber" label="Publishing Number" required>
                <Input placeholder="Please enter publishing place" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="publishingPalace" label="Publishing Palace" required>
            <Input placeholder="Please enter publishing place" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16} style={{ marginTop: 15 }}>
        <Col span={24}>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              {
                required: true,
                message: 'please enter url description',
              },
            ]}
          >
            <Input.TextArea rows={4} placeholder="please enter url description" />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

