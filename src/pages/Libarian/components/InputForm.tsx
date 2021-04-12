import { Form, Col, Row, Input, DatePicker, Select, Upload, Button, message } from 'antd';
import React from 'react';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { UploadOutlined } from '@ant-design/icons';
import { fetchLibariansByEmail, fetchLibariansByUsername } from '@/services/libarian';
import _ from 'lodash';
import { FormInstance } from 'antd/lib/form';

const { Option } = Select;
interface InputFormProps {
  dispatch: Dispatch;
  libarianpage?: any;
  handelSubmit: Function;
}
interface InputFormState {
  fileList: any;
  form: any;
}

class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
      form: React.createRef<FormInstance>(),
    };
  }

  componentDidMount() {
    this.initForm();
  }
  componentDidUpdate(prepProp: any) {
    const { libarianpage } = this.props;
    if (prepProp.libarianpage.choiceLibarian.id != libarianpage.choiceLibarian.id) {
      this.initForm();
      this.setState({ form: React.createRef<FormInstance>() });
    }
  }

  render() {
    return (
      <Form
        ref={this.state.form}
        layout="vertical"
        id={'inputLibarian'}
        onFinish={(value) => {
          value.image = this.state.fileList[0];
          this.props.handelSubmit(value);
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
                    if (moment().diff(value, 'days') <= 0) {
                      return Promise.reject('Date Of Birth invalid');
                    }
                    return Promise.resolve();
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
                    if (getFieldValue('id') == undefined) {
                      if (value?.length != 0) {
                        const response = await fetchLibariansByUsername(value);
                        if (response.data[0] == undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject('User name is exits');
                        }
                      } else {
                        return Promise.reject('User name must not empty');
                      }
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
                    if (value?.length != 0) {
                      var regex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                      if (value?.match(regex)) {
                        const response = await fetchLibariansByEmail(value);
                        if (getFieldValue('id') == undefined) {
                          if (response.data[0] == undefined) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject('Email is exits');
                          }
                        } else {
                          if (response.data[0] != undefined) {
                            if (response.data[0].id == getFieldValue('id')) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject('Email is exits');
                            }
                          }
                        }
                      } else {
                        return Promise.reject('Email invalid');
                      }
                    } else {
                      return Promise.reject('Email must not empty');
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
            <Form.Item
              name="image"
              label="Avatar"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    console.log('validator', value);
                    if (value != undefined) {
                      var file = value.fileList[0];
                      if (file != undefined) {
                        if (file.url == undefined) {
                          if (
                            file.type === 'image/png' ||
                            file.type === 'image/jpeg' ||
                            file.type === 'image/jpg'
                          ) {
                            return Promise.resolve();
                          } else {
                            value.fileList = [];
                            return Promise.reject(`${file.name} is not a valid file`);
                          }
                        }
                        return Promise.resolve();
                      } else {
                        return Promise.reject('Please uppload an avatar');
                      }
                    } else {
                      return Promise.reject('Please uppload an avatar asdasd');
                    }
                  },
                }),
              ]}
            >
              <Upload
                listType="picture"
                fileList={this.state.fileList}
                beforeUpload={(file: { type: string; name: any }) => {
                  return false;
                }}
                onChange={(info: any) => {
                  console.log(info);
                  if (info.fileList.length != 0) {
                    info.fileList = [];
                    info.fileList = [info.file];
                  }
                  this.setState({ fileList: info.fileList });
                }}
              >
                <Button icon={<UploadOutlined />}>Upload file</Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    );
  }

  initForm() {
    const { libarianpage } = this.props;
    if (libarianpage.choiceLibarian.id != undefined) {

      let tmp = {
        key: `${libarianpage.choiceLibarian.id}`,
        uid: `${libarianpage.choiceLibarian.id}`,
        name: 'Current avatar',
        type: 'image/png',
        url: libarianpage.choiceLibarian.image,
      };
      this.state.form.current?.setFieldsValue({
        id: libarianpage.choiceLibarian.id,
        name: libarianpage.choiceLibarian.name,
        address: libarianpage.choiceLibarian.address,
        email: libarianpage.choiceLibarian.email,
        gender: libarianpage.choiceLibarian.gender,
        doB: moment(libarianpage.choiceLibarian.doB),
        phone: libarianpage.choiceLibarian.phone,
        username: libarianpage.choiceLibarian.username,
        image: { fileList: [tmp] },
      });

      this.setState({ fileList: [tmp] });
    } else {
      this.state.form.current?.resetFields();
      this.setState({ fileList: [] });
    }
  }
}

export default connect((state) => ({ ...state }))(InputForm);
