import { Form, Col, Row, Input, DatePicker, Select } from 'antd';
import React from 'react';
import moment from 'moment';
import { connect, Dispatch } from 'umi';

const { Option } = Select;
interface InputFormProps {
  dispatch: Dispatch;
  libarianpage?: any;
  handelSubmit: Function;
  formRef: any;
}
class InputForm extends React.Component<InputFormProps> {
  constructor(props: any) {
    super(props);
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
    return (
      <Form
        ref={this.props.formRef}
        layout="vertical"
        id={'inputLibarian'}
        onFinish={(value) => this.props.handelSubmit(value)}
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
    }
  }
}

export default connect((state) => ({ ...state }))(InputForm);
