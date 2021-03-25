import { Form, Col, Row, Input, DatePicker, Select, Upload, Button, message } from 'antd';
import React from 'react';
import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { UploadOutlined } from '@ant-design/icons';

const { Option } = Select;
interface InputFormProps {
  dispatch: Dispatch;
  libarianpage?: any;
  handelSubmit: Function;
  formRef: any;
}
interface InputFormState {
  fileList: any;
}

const props = {};

class InputForm extends React.Component<InputFormProps, InputFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      fileList: [],
    };
  }

  componentDidMount() {
    this.initForm();
  }
  componentDidUpdate(prepProp: any) {
    const { libarianpage } = this.props;
    if (prepProp.libarianpage.choiceLibarian.id != libarianpage.choiceLibarian.id) {
      this.initForm();
    }
  }

  render() {
    console.log(this.state.fileList);
    return (
      <Form
        ref={this.props.formRef}
        layout="vertical"
        id={'inputLibarian'}
        onFinish={(value) => {
          value.image = this.state.fileList[0];
          this.props.handelSubmit(value);
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="name" label="Name" required>
              <Input placeholder="Please enter name" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="address" label="Address" required>
              <Input placeholder="Please enter book's width" />
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
            <Form.Item name="doB" label="Date of birth" required>
              <DatePicker style={{ width: '100%' }} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="phone" label="Phone" required>
              <Input placeholder="Please enter quantity" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item name="username" label="Username" required>
              <Input placeholder="Please enter quantity" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="email" label="Email" required>
              <Input placeholder="Please enter book's fee" />
            </Form.Item>
          </Col>
        </Row>
        {this.props.libarianpage.choiceLibarian.id == undefined ? (
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
        ) : (
          <></>
        )}
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item name="image" label="Avatar" required>
              <Upload
                listType="picture"
                fileList={this.state.fileList}
                beforeUpload={(file: { type: string; name: any }) => {
                  return false;
                }}
                onChange={(info: any) => {
                  var file = info.fileList[info.fileList.length - 1];
                  if (
                    file.type === 'image/png' ||
                    file.type === 'image/jpeg' ||
                    file.type === 'image/jpg'
                  ) {
                    this.setState({ fileList: [file] });
                  } else {
                    message.error(`${file.name} is not a valid file`);
                  }
                }}
              >
                <Button icon={<UploadOutlined />}>Upload png only</Button>
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
      this.props.formRef.current?.setFieldsValue({
        name: libarianpage.choiceLibarian.name,
        address: libarianpage.choiceLibarian.address,
        email: libarianpage.choiceLibarian.email,
        gender: libarianpage.choiceLibarian.gender,
        doB: moment(libarianpage.choiceLibarian.doB),
        phone: libarianpage.choiceLibarian.phone,
        username: libarianpage.choiceLibarian.username,
      });
      let tmp = {
        key: `${libarianpage.choiceLibarian.id}`,
        uid: `${libarianpage.choiceLibarian.id}`,
        name: 'Current avatar',
        url: libarianpage.choiceLibarian.image,
      };
      console.log('TMP >>>>', tmp);

      this.setState({ fileList: [tmp] });
    }
  }
}

export default connect((state) => ({ ...state }))(InputForm);
