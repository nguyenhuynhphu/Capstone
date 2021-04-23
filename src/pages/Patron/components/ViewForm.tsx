import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Descriptions, Divider, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../PatronPage.less';

interface ViewFormProps {
  dispatch: Dispatch;
  patronpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { patronpage } = this.props;
    const { choicePatron } = patronpage;
    const titleSpace = 7;
    const fieldSpace = 17;
    return (
      <div>
        <Row align={'middle'} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={5} style={{ marginTop: 6 }}>
              Patron Detail
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
          <Avatar style={{ width: 100, height: 100 }} src={choicePatron.image} />
          <p style={{ fontWeight: 'bold' }}>{choicePatron.name}</p>
        </Space>

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Gender">{choicePatron.gender}</Descriptions.Item>
          <Descriptions.Item label="Username">{choicePatron.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{choicePatron.email}</Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {choicePatron.doB?.split('T')[0]}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{choicePatron.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{choicePatron.address}</Descriptions.Item>
        </Descriptions>
        
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
