import sendNotification from '@/utils/Notification';
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
          .then(() => {
            sendNotification('Add BookShelf Successfull !', '', 'success');
            props.dispatch({
              type: 'bookshelftable/fetchData',
              payload: {
                filterName: props.bookshelftable.filterName,
                pagination: props.bookshelftable.pagination.current,
              },
            });
            props.dispatch({
              type: 'organizebook/hideCreateBookShelf',
              payload: {},
            });
          });
      }}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="name"
            label="Bookshelf Name"
            required
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (value != undefined) {
                    if (value.trim().length != 0) {
                      return Promise.resolve();
                    }
                  }
                  return Promise.reject(`Name must no empty`);
                },
              }),
            ]}
          >
            <Input placeholder="Please enter bookshelf name" />
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
                    if (value != 0) {
                      return Promise.resolve();
                    }
                  }
                  return Promise.reject(`Row must no empty`);
                },
              }),
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={30}
              placeholder="Please input row number"
            />
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
                    if (value != 0) {
                      return Promise.resolve();
                    }
                  }
                  return Promise.reject(`Column must no empty`);
                },
              }),
            ]}
          >
            <InputNumber
              style={{ width: '100%' }}
              min={1}
              max={30}
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
                    if (value.length != 0) {
                      return Promise.resolve();
                    }
                  }
                  return Promise.reject(`Location must be choice`);
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
