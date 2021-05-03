import React from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import StatisticHeader from './components/StatisticHeader';
import { Col, Descriptions, Row, Space, Card, Statistic, List, Modal } from 'antd';
import Title from 'antd/lib/typography/Title';
import { connect } from 'react-redux';
import Avatar from 'antd/lib/avatar/avatar';
import {
  BorderlessTableOutlined,
  HomeOutlined,
  MailOutlined,
  PhoneOutlined,
  PlayCircleOutlined,
  RadiusUprightOutlined,
  SearchOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Dispatch } from 'umi';
import { history } from 'umi';
import { fetchAllPatrons } from '@/services/patron';
import Text from 'antd/lib/typography/Text';
import { fetchAllBookShelf } from '@/services/bookshelf';
import { fetchAllDectection } from '@/services/upload';
import { fetchDeletedBook } from '@/services/book';
import ManageDetectStatistic from '../UploadVideo/components/ManageDetectStatistic';
import ReactPlayer from 'react-player';
interface WelcomeProps {
  user?: any;
  dispatch: Dispatch;
}
interface WelcomeState {
  totalUser: number;
  totalBookShelf: number;
  totalDetection: number;
  totalMissing: number;
  data: any;
  showModal: boolean;
  selectedDetection: any;
}
const gridStyle: any = {
  width: 'calc(100% / 4 - 10px)',
  margin: '0px 5px',
  backgroundColor: 'white',
  borderRadius: 15,
};
class Welcome extends React.Component<WelcomeProps, WelcomeState> {
  constructor(props: any) {
    super(props);
    this.state = {
      totalUser: 0,
      totalBookShelf: 0,
      totalDetection: 0,
      totalMissing: 0,
      data: [],
      showModal: false,
      selectedDetection: {},
    };
  }

  componentDidMount() {
    this.props.dispatch({ type: 'manageborrowstatistic/fetchData' });
    this.fetchAllPatron();
    this.fetchAllBookShelf();
    this.fetchAllDetection();
    this.fetchAllDeletedBook();
    this.props.dispatch({
      type: 'managedetectstatistic/fetchData',
    });
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
              marginBottom: 10,
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
                        <PhoneOutlined style={{ marginRight: 5, color: '#40A9FF' }} /> Phone
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
          <Card style={{ backgroundColor: 'transparent', marginTop: 10, marginBottom: 10 }}>
            <Card.Grid style={gridStyle}>
              <Space style={{ width: '100%', justifyContent: 'start' }} size="large">
                <UserOutlined style={{ fontSize: 50, color: '#1890ff' }} />
                <Statistic title="Total Patron" value={this.state.totalUser} />
              </Space>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <Space style={{ width: '100%', justifyContent: 'start' }} size="large">
                <BorderlessTableOutlined style={{ fontSize: 50, color: '#1890ff' }} />
                <Statistic title="Total Bookshelf" value={this.state.totalBookShelf} />
              </Space>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <Space style={{ width: '100%', justifyContent: 'start' }} size="large">
                <SearchOutlined style={{ fontSize: 50, color: '#1890ff' }} />
                <Statistic title="Total Detection" value={this.state.totalDetection} />
              </Space>
            </Card.Grid>
            <Card.Grid style={gridStyle}>
              <Space style={{ width: '100%', justifyContent: 'start' }} size="large">
                <RadiusUprightOutlined style={{ fontSize: 50, color: '#1890ff' }} />
                <Statistic title="Total Book Missing" value={this.state.totalMissing} />
              </Space>
            </Card.Grid>
          </Card>
        </PageContainer>
        <Row
          style={{
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px 35px',
            marginBottom: 10,
          }}
        >
          <Col span={9} style={{ paddingTop: 10 }}>
            <List
              itemLayout="horizontal"
              dataSource={this.state.data}
              renderItem={(item: any) => (
                <List.Item
                  actions={[
                    <PlayCircleOutlined
                      onClick={() => this.setState({ showModal: true, selectedDetection: item })}
                      style={{ fontSize: 30, color: '#1890ff', cursor: 'pointer' }}
                    />,
                  ]}
                >
                  <List.Item.Meta
                    avatar={<Avatar src={item.image} />}
                    title={
                      <Text style={{ marginBottom: 0 }}>
                        {item.staffName}
                        <span
                          style={{
                            fontStyle: 'italic',
                            color: 'rgba(0, 0, 0,.4)',
                            fontWeight: 'normal',
                          }}
                        >
                          {' '}
                          - {item.time.split('T')[0]}
                        </span>
                      </Text>
                    }
                    description={`Bookshelf: ${item.bookShelfName}`}
                  />
                </List.Item>
              )}
            />
          </Col>
          <Col span={12} offset={3} style={{ paddingTop: 40 }}>
            <ManageDetectStatistic />
          </Col>
        </Row>
        <Modal
          visible={this.state.showModal}
          centered
          width={800}
          bodyStyle={{paddingTop: 50}}
          footer={false}
          onCancel={() => this.setState({ showModal: false, selectedDetection: {} })}
        >
          <ReactPlayer
            controls
            width={'100%'}
            height={'fit-content'}
            url={this.state.selectedDetection.url}
          />
        </Modal>
      </>
    );
  }

  async fetchAllPatron() {
    const response = await fetchAllPatrons();
    this.setState({ totalUser: response.meta.totalCount });
  }

  async fetchAllBookShelf() {
    const response = await fetchAllBookShelf('', 1);
    this.setState({ totalBookShelf: response.meta.totalCount });
  }
  async fetchAllDetection() {
    const response = await fetchAllDectection();
    var tmp: any = [];
    for (var i = 0; i < 4; i++) {
      tmp.push(response.data[i]);
    }
    this.setState({ totalDetection: response.meta.totalCount, data: tmp });
  }

  async fetchAllDeletedBook() {
    const response = await fetchDeletedBook();
    this.setState({ totalMissing: response.meta.totalCount });
  }

  async fetchDeletedBook() {
    const response = await fetchDeletedBook();
    this.setState({ totalMissing: response.meta.totalCount });
  }
}
export default connect((state) => ({ ...state }))(Welcome);
