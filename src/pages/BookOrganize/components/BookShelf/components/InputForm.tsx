import { Form, Col, Row, Input, Select, Badge, InputNumber } from 'antd';
import { useForm } from 'antd/es/form/Form';
import React from 'react';
import { connect } from 'umi';
import BookShelfTable from '../BookShelfTable';
const { Option } = Select;

const InputForm = (props: any) => {
  var { bookShelf, locationtable } = props;

  const getOptions = () => {
    let tmp: any = [];

    locationtable.data.forEach((location: any) => {
      tmp.push(
        <Option value={location.id}>
          <Badge color={location.color} />
          {location.name}
        </Option>,
      );
    });
    return tmp;
  };

  const [form] = Form.useForm();
  if (bookShelf != undefined) {
    form.setFieldsValue({
      ...bookShelf,
    });
  }

  return (
    <Form
      layout="vertical"
      id="createBookShelf"
      form={form}
      onFinish={(value) => {
        props
          .dispatch({
            type: 'organizebook/insertBookShelf',
            payload: { ...value },
          })
          .then(() =>
            props.dispatch({
              type: 'bookshelftable/fetchData',
              payload: {
                filterName: props.bookshelftable.filterName,
                pagination: props.bookshelftable.pagination.current,
              },
            }),
          );
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Book Shelf Name"
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value != undefined) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(`Name must no empty`);
                  }
                },
              }),
            ]}
          >
            <Input placeholder="Please enter book shelf name" />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            name="row"
            label="Row Number"
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value != undefined) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(`Row must no empty`);
                  }
                },
              }),
            ]}
          >
            <InputNumber style={{ width: '100%' }} min={1} placeholder="Please input row number" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="col"
            label="Column Number"
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value != undefined) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(`Column must no empty`);
                  }
                },
              }),
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              placeholder="Please input column number"
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="locationId"
            label="Location"
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value != undefined) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject(`Location must be choice`);
                  }
                },
              }),
            ]}
          >
            <Select placeholder={'Select location'}>{getOptions()}</Select>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default connect((state) => ({ ...state }))(InputForm);
