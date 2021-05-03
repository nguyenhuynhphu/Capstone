import { Form, Button, Col, Row, Input, DatePicker, Upload, Select, InputNumber } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import React from 'react';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { FormInstance } from 'antd/lib/form';
import _ from 'lodash';
interface InputFormProps {
  dispatch: Dispatch;
  managebook?: any;
  handelSubmit: Function;
}

interface InputFormState {
  fileList: any;
  form: any;
  errorFile: string;
}

class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
      errorFile: '',
      form: React.createRef<FormInstance>(),
    };
    this.handelFile = this.handelFile.bind(this);
  }
  componentDidMount() {
    this.initForm();
  }

  componentDidUpdate(prepProp: any) {
    const { managebook } = this.props;
    if (prepProp.managebook.choiceBook?.id != managebook.choiceBook?.id) {
      this.setState({ fileList: [] });
      this.initForm();
    }
  }

  render() {
    const { managebook } = this.props;
    return (
      <Form
        ref={this.state.form}
        layout="vertical"
        id={'inputForm'}
        onFinish={(value) => {
          if (managebook.choiceBook != undefined) {
            value.id = managebook.choiceBook.id;
          }
          if (this.state.fileList.length != 0) {
            value.images = this.state.fileList;
            this.props.handelSubmit(value);
          } else {
            this.setState({ errorFile: 'Book Image must no empty' });
          }
        }}
        onFinishFailed={(value: any) => {
          if (managebook.choiceBook != undefined) {
            value.id = managebook.choiceBook.id;
          }
          if (this.state.fileList.length == 0) {
            this.setState({ errorFile: 'Book Image must no empty' });
          }
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Book Group Name"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value != undefined) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Name must no empty');
                    }
                  },
                }),
              ]}
            >
              <Input placeholder="Please enter book group name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="author"
              label="Author"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value != undefined) {
                      if (value.trim().length <= 100) {
                        return Promise.resolve();
                      }
                      return Promise.reject('Author must be less than 100 characters');
                    }
                    return Promise.reject('Author must no empty');
                  },
                }),
              ]}
            >
              <Input placeholder="Please enter book author" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="pageNumber" label="Page Number">
              <InputNumber style={{width: '100% '}} min={0} placeholder="Please enter page number" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="width" label="Width">
              <InputNumber
                min={0}
                placeholder="Please enter book's width"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="height" label="Height">
              <InputNumber
                min={0}
                placeholder="Please enter book's height"
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          {managebook.choiceBook?.id == undefined ? (
            <>
              <Col span={12}>
                <Form.Item
                  name="quantity"
                  label="Quantity"
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Quantity must no empty');
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    min={1}
                    placeholder="Please enter quantity"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="fee"
                  label="Fee"
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Fee must no empty');
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber min={0.1} placeholder="Please enter Fee" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  name="punishFee"
                  label="Punish Fee"
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Punish fee must no empty');
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    min={0.1}
                    placeholder="Please enter Punish Fee"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </>
          ) : (
            <>
              <Col span={12}>
                <Form.Item
                  name="fee"
                  label="Fee"
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Fee must no empty');
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber min={0.1} placeholder="Please enter Fee" style={{ width: '100%' }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="punishFee"
                  label="Punish Fee"
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Punish fee must no empty');
                        }
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    min={0.1}
                    placeholder="Please enter Punish Fee"
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
            </>
          )}
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="price"
              label="Book Price"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value != undefined) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Book Price must no empty');
                    }
                  },
                }),
              ]}
            >
              <InputNumber style={{ width: '100%' }} placeholder="Please enter book price" />
            </Form.Item>
            <Form.Item
              name="category"
              label="Category"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value != undefined) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject(`Category must be choice`);
                    }
                  },
                }),
              ]}
            >
              <Select
                mode="multiple"
                size={'middle'}
                placeholder="Please select"
                style={{ width: '100%', zIndex: 999 }}
              >
                {managebook.categories.map((cate: any) => (
                  <Select.Option key={cate.id} value={cate.id}>
                    {cate.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item name="images" label="" required>
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
              <p style={{ marginBottom: 0, color: 'red' }}>
                {this.state.errorFile.length != 0 ? this.state.errorFile : ''}
              </p>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="publishCompany" label="Publishing Company">
              <Input placeholder="Please enter publishing company" />
            </Form.Item>
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item name="publishDate" label="Publishing Date">
                  <DatePicker style={{ width: '100%', zIndex: 99999999 }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="edition" label="Edition">
                  <Input placeholder="Please enter publishing place" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item name="publishPlace" label="Publishing Palace">
              <Input placeholder="Please enter publishing place" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16} style={{ marginTop: 15 }}>
          <Col span={24}>
            <Form.Item name="description" label="Description">
              <Input.TextArea rows={4} placeholder="please enter url description" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  initForm() {
    const { managebook } = this.props;
    if (managebook.choiceBook.id != undefined) {
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
        this.setState({ fileList: tmp });
      }
      this.state.form.current?.setFieldsValue({
        name: managebook.choiceBook.name,
        author: managebook.choiceBook.author,
        pageNumber: managebook.choiceBook.pageNumber,
        width: managebook.choiceBook.width,
        height: managebook.choiceBook.height,
        quantity: managebook.choiceBook.quantity,
        fee: managebook.choiceBook.fee,
        punishFee: managebook.choiceBook.punishFee,
        price: managebook.choiceBook.price,
        category: this.handelCate(managebook.choiceBook.category),
        images: { fileList: tmp },
        publishCompany: managebook.choiceBook.publishCompany,
        publishDate: managebook.choiceBook.publishDate
          ? moment.utc(managebook.choiceBook.publishDate)
          : null,
        edition: managebook.choiceBook.edition,
        publishPlace: managebook.choiceBook.publishPlace,
        description: managebook.choiceBook.description,
      });
    } else {
      this.setState({ fileList: [] });
      this.state.form.current?.resetFields();
    }
  }

  handelFile(images: any) {
    let fileError: any = [];
    var error: string = '';
    images.fileList.forEach((file: any) => {
      if (
        !(
          file.type === 'image/png' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/jpg' ||
          file.url
        )
      ) {
        fileError.push(file);
        error = 'File invalid';
      }
    });

    if (fileError.length != 0) {
      _.pullAll(images.fileList, fileError);
    }

    this.setState({ fileList: images.fileList, errorFile: error });
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
