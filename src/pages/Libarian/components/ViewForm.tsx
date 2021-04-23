import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Descriptions, Divider, Row, Space, Typography } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../LibarianPage.less';

interface ViewFormProps {
  dispatch: Dispatch;
  libarianpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { libarianpage } = this.props;
    const { choiceLibarian } = libarianpage;

    return (
      <div>
        <Row align={'middle'} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={5} style={{ marginTop: 6 }}>
              Libarian Detail
            </Title>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button
                onClick={() => {
                  this.props.dispatch({
                    type: 'libarianpage/displayUpdateLibrarian',
                    payload: true,
                  });
                  this.props.dispatch({
                    type: 'libarianpage/displayScrollBar',
                    payload: false,
                  });
                }}
                icon={<EditOutlined style={{ color: '#0078d4' }} />}
              >
                Edit
              </Button>
              {/* <Button icon={<DeleteOutlined style={{ color: 'red' }} />}>Delete</Button> */}
            </Space>
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
          <Avatar style={{ width: 100, height: 100 }} src={choiceLibarian.image} />
          <p style={{ fontWeight: 'bold' }}>{choiceLibarian.name}</p>
        </Space>

        <Descriptions column={1} bordered>
          <Descriptions.Item label="Gender">{choiceLibarian.gender}</Descriptions.Item>
          <Descriptions.Item label="Username">{choiceLibarian.username}</Descriptions.Item>
          <Descriptions.Item label="Email">{choiceLibarian.email}</Descriptions.Item>
          <Descriptions.Item label="Date Of Birth">
            {choiceLibarian.doB?.split('T')[0]}
          </Descriptions.Item>
          <Descriptions.Item label="Phone">{choiceLibarian.phone}</Descriptions.Item>
          <Descriptions.Item label="Address">{choiceLibarian.address}</Descriptions.Item>
        </Descriptions>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
