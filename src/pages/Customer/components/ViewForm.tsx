import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Descriptions, Divider, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../CustomerPage.less';

interface ViewFormProps {
  dispatch: Dispatch;
  customerpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { customerpage } = this.props;
    const { choiceCustomer } = customerpage;
    const titleSpace = 7;
    const fieldSpace = 17;
    return (
      <div>
        <Row align={'middle'} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={5} style={{ marginTop: 6 }}>
              Customer Detail
            </Title>
          </Col>
        </Row>
        <Divider />
        <Space
          direction="vertical"
          style={{
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10,
          }}
        >
          <Avatar style={{ width: 100, height: 100 }} src={choiceCustomer.image} />
          <p style={{ fontWeight: 'bold' }}>{choiceCustomer.name}</p>
        </Space>

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Gender">{choiceCustomer.gender}</Descriptions.Item>
          <Descriptions.Item label="User Name">{choiceCustomer.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{choiceCustomer.email}</Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {choiceCustomer.doB?.split('T')[0]}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{choiceCustomer.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{choiceCustomer.address}</Descriptions.Item>
        </Descriptions>
        
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
