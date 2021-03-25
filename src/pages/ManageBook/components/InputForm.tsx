import { Form, Button, Col, Row, Input, DatePicker, Upload, Select } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React, { useReducer, useState } from 'react';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { render } from 'react-dom';
import { FormInstance } from 'antd/lib/form';
import { fileList } from '@/pages/Libarian/components/InputForm';
interface InputFormProps {
  dispatch: Dispatch;
  managebook?: any;
  handelSubmit: Function;
  formRef: any;
}

interface InputFormState {
  fileList: any;
  cates: any;
}

class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
      cates: [],
    };
    this.handelFile = this.handelFile.bind(this);
  }
  componentDidMount() {
    this.initForm();
  }
  componentDidUpdate(prepProp: any) {
    const { managebook } = this.props;
    if (prepProp.managebook.choiceBook.id != managebook.choiceBook.id) {
      this.setState({ fileList: [] });
      this.initForm();
    }
  }

  render() {
    const { managebook } = this.props;
    let children: any = [];
    for (let i = 0; i < managebook.categories.length; i++) {
      let tmp = managebook.categories[i];
      children.push(
        <Select.Option key={tmp.id} value={tmp.id}>
          {tmp.name}
        </Select.Option>,
      );
    }
    return (
      <Form
        ref={this.props.formRef}
        layout="vertical"
        id={'inputForm'}
        onFinish={(value) => {
          if (managebook.choiceBook != undefined) {
            value.id = managebook.choiceBook.id;
          }
          this.props.handelSubmit(value);
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
          {managebook.choiceBook.id == undefined ? (
            <>
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
            </>
          ) : (
            <>
              <Col span={12}>
                <Form.Item name="fee" label="Fee" required>
                  <Input placeholder="Please enter book's fee" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="punishFee" label="Punish Fee" required>
                  <Input placeholder="Please enter book's Punish Fee" />
                </Form.Item>
              </Col>
            </>
          )}
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
            <Form.Item name="images" label="">
              <Upload
                onChange={this.handelFile}
                listType={'picture'}
                multiple
                fileList={this.state.fileList}
                beforeUpload={() =>
                  this.state.fileList != undefined ? this.state.fileList : undefined
                }
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="publishCompany" label="Publishing Company" required>
              <Input placeholder="Please enter publishing company" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="publishDate" label="Publishing Date" required>
                  <DatePicker style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="edition" label="Publishing Number" required>
                  <Input placeholder="Please enter publishing place" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="publishPlace" label="Publishing Palace" required>
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
  }

  initForm() {
    const { managebook } = this.props;
    if (managebook.choiceBook != undefined) {
      console.log("CURRENT >>>>", managebook.choiceBook);
      
      this.props.formRef.current?.setFieldsValue({
        name: managebook.choiceBook.name,
        author: managebook.choiceBook.author,
        pageNumber: managebook.choiceBook.pageNumber,
        width: managebook.choiceBook.width,
        height: managebook.choiceBook.height,
        quantity: managebook.choiceBook.quantity,
        fee: managebook.choiceBook.fee,
        punishFee: managebook.choiceBook.punishFee,
        category: this.handelCate(managebook.choiceBook.category),
        images: managebook.choiceBook.images,
        publishCompany: managebook.choiceBook.publishCompany,
        publishDate: moment.utc(managebook.choiceBook.publishDate),
        edition: managebook.choiceBook.edition,
        publishPlace: managebook.choiceBook.publishPlace,
        description: managebook.choiceBook.description,
      });
      let tmp: any = [];
      if (managebook.choiceBook.image != undefined) {
        managebook.choiceBook.image.forEach((image: any, index: number) => {
          tmp.push({
            key: image.id,
            uid: image.id,
            name: 'Picture ' + index,
            url: image.url,
          });
        });
        if (this.state.fileList.length == 0) this.setState({ fileList: tmp });
      }
    }
  }

  handelFile(images: any) {

    this.setState({ fileList: images.fileList });
  }

  handelCate(categories: any) {
    let cate: any = [];
    if (categories != undefined) {
      for (let i = 0; i < categories.length; i++) {
        let tmp = categories[i];
        cate.push(tmp.id);
      }
    }
    return cate;
  }
}
export default connect((state) => ({ ...state }))(InputForm);
