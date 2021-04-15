import { Form, Col, Row, Input, DatePicker, Select, Upload, Button, message } from 'antd';
import React from 'react';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { fetchLibariansByEmail, fetchLibariansByUsername } from '@/services/libarian';
import _, { trim } from 'lodash';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;
interface InputFormProps {
  dispatch: Dispatch;
  libarianpage?: any;
  handelSubmit: Function;
  form: any;
}
interface InputFormState {
  fileList: any;

  errorFile: string;
}

class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
      errorFile: '',
    };
  }

  render() {
    return (
      <Form
        ref={this.props.form}
        layout="vertical"
        id={'inputLibarian'}
        onFinish={(value) => {
          value.image = this.state.fileList[0].originFileObj;
          if (value.image) {
            this.props.handelSubmit(value);
          } else {
            this.setState({ errorFile: 'Avartar is required' });
          }
        }}
        onFinishFailed={(value: any) => {
          value.image = this.state.fileList[0];
          if (!value.image) {
            this.setState({ errorFile: 'Avartar is required' });
          }
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="name"
              label="Name"
              required
              rules={[
                {
                  required: true,
                  message: 'Name field is required!',
                },
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value?.length <= 8) {
                      return Promise.reject("Name's length should be upper than 8");
                    }
                    return Promise.resolve();
                  },
                }),
              ]}
            >
              <Input placeholder="Please enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="address"
              label="Address"
              required
              rules={[
                {
                  required: true,
                  message: 'Address field is required!',
                },
              ]}
            >
              <Input placeholder="Please address" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="gender" label="Gender" required initialValue={'male'}>
              <Select>
                <Option value="male">Male</Option>
                <Option value="female">Female</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="doB"
              label="Date of birth"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value != undefined) {
                      if (moment().diff(value, 'years') <= 18) {
                        return Promise.reject('Librarian not enough 18 year old');
                      }
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Date Of Birth is required');
                    }
                  },
                }),
              ]}
            >
              <DatePicker style={{ width: '100%' }} showToday={false} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item
              name="phone"
              label="Phone"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value == undefined) {
                      return Promise.reject('Phone is required');
                    } else if (value.trim().length == 0) {
                      return Promise.reject('Phone is required');
                    }
                    var regex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
                    if (value?.match(regex)) {
                      return Promise.resolve();
                    } else {
                      return Promise.reject('Phone invalid');
                    }
                  },
                }),
              ]}
            >
              <Input placeholder="Please enter phone" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="username"
              label="Username"
        
              required
              rules={[
                ({ getFieldValue }) => ({
                  async validator(rule, value) {
                    if (value?.trim().length != 0) {
                      const response = await fetchLibariansByUsername(value);
                      if (response.data[0] == undefined) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject('Username is exits');
                      }
                    } else {
                      return Promise.reject('Username is required');
                    }
                  },
                }),
              ]}
            >
              <Input
                placeholder="Please enter username"
                disabled={this.props.libarianpage.choiceLibarian.id != undefined}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="email"
              label="Email"
        
              required
              rules={[
                ({ getFieldValue }) => ({
                  async validator(rule, value) {
                    if (value?.trim().length != 0) {
                      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (value?.match(regex)) {
                        const response = await fetchLibariansByEmail(value);

                        if (response.data[0] == undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('Email is exits');
                        }
                      } else {
                        return Promise.reject('Email invalid');
                      }
                    } else {
                      return Promise.reject('Email is required');
                    }
                  },
                }),
              ]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>
          </Col>
        </Row>
        {this.props.libarianpage.choiceLibarian.id == undefined ? (
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                required
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value.length >= 8) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject('Password must upper than 8 character');
                      }
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Please enter password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="confirm"
                label="Confirm Password"
                required
                rules={[
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (value === getFieldValue('password')) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject('Password and confirm password not match');
                      }
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Please enter password confirm" />
              </Form.Item>
            </Col>
          </Row>
        ) : (
          <></>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="image" label="Avatar">
              <Upload
                listType="picture"
                fileList={this.state.fileList}
                beforeUpload={() => false}
                onChange={(images: any) => {
                  var error: string = '';
                  var fileError: any = [];
                  console.log(images);

                  if (images.fileList.length != 0) {
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
                        error = 'File not valid';
                      }
                    });
                    _.pullAll(images.fileList, fileError);
                  } else {
                    error = 'Avatar is required';
                  }
                  this.setState({ fileList: images.fileList, errorFile: error });
                }}
              >
                <Button icon={<UploadOutlined />}>Upload file</Button>
              </Upload>
              <p style={{ marginBottom: 0, color: 'red' }}>
                {this.state.errorFile.length != 0 ? this.state.errorFile : ''}
              </p>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default connect((state) => ({ ...state }))(InputForm);
