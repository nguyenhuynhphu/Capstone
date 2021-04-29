import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import StatisticHeader from './components/StatisticHeader';
import { Col, Descriptions, Row, Space, Image, Button } from 'antd';
import Title from 'antd/lib/typography/Title';
import { connect } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import {
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dispatch } from 'umi';
import PeriorChart from '../UploadVideo/components/PeriorChart';
interface WelcomeProps {
  user?: any;
  dispatch: Dispatch;
}
class Welcome extends React.Component<WelcomeProps> {
  componentDidMount() {
    this.props.dispatch({ type: 'manageborrowstatistic/fetchData' });
  }

  render() {
    return (
      <>
        <PageContainer>
          <Row
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '20px 35px',
              marginBottom: 15,
            }}
          >
            <Col span={24}>
              <Title
                level={3}
                style={{ fontWeight: 300, color: 'rgba(0 ,0 ,0 ,.8)', marginBottom: 20 }}
              >
                Welcome to PAPV
              </Title>
              <Space direction="horizontal" align="center" size="large">
                <Avatar
                  style={{ width: 80, height: 80 }}
                  shape="square"
                  src={this.props.user.currentUser.avatar}
                />
                <Descriptions column={3}>
                  <Descriptions.Item
                    label={
                      <>
                        <UserOutlined style={{ marginRight: 5, color: '#40A9FF' }} /> User Name
                      </>
                    }
                  >
                    {this.props.user.currentUser.name}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <PhoneOutlined style={{ marginRight: 5, color: '#40A9FF' }} /> User Name
                      </>
                    }
                  >
                    {this.props.user.currentUser.phone}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <MailOutlined style={{ marginRight: 5, color: '#40A9FF' }} /> Email
                      </>
                    }
                  >
                    {this.props.user.currentUser.email}{' '}
                  </Descriptions.Item>
                  <Descriptions.Item
                    label={
                      <>
                        <TeamOutlined style={{ marginRight: 5, color: '#40A9FF' }} /> Role
                      </>
                    }
                  >
                    {this.props.user.currentUser.role == 1 ? 'Admin' : 'Librarian'}
                  </Descriptions.Item>

                  <Descriptions.Item
                    label={
                      <>
                        <HomeOutlined style={{ marginRight: 5, color: '#40A9FF' }} /> Address
                      </>
                    }
                  >
                    {this.props.user.currentUser.address}
                  </Descriptions.Item>
                </Descriptions>
              </Space>
            </Col>
          </Row>
          <StatisticHeader />
          <Row
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '20px 35px',
              marginTop: 15,
            }}
          >
            Tracking
            <Col span={24} style={{ height: 300 }}>
              <PeriorChart />
            </Col>
          </Row>
        </PageContainer>
        
      </>
    );
  }
 
}
export default connect((state) => ({ ...state }))(Welcome);
