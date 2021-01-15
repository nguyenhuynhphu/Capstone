import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './ManageEventPage.less';
import React from 'react';

import { Avatar, Button, Card, Col, DatePicker, Descriptions, Drawer, Row, Space } from 'antd';
import InputCampaignForm from './components/InputCampaignForm';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import Meta from 'antd/lib/card/Meta';
import { connect, Dispatch } from 'umi';
import ChoiceBookTable from './components/ChoiceBookTable';

interface ManageEventPageProps {
  dispatch: Dispatch;
  manageevent?: any;
}
interface ManageEventPageState {
  selectedDate: any;
}
class ManageEventPage extends React.Component<ManageEventPageProps, ManageEventPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDate: moment().toDate(),
    };
    this.hideCreateCampaign = this.hideCreateCampaign.bind(this);
    this.hideBooks = this.hideBooks.bind(this);
  }

  render() {
    const { manageevent } = this.props;
    return (
      <>
        <PageHeaderWrapper
          style={{ marginBottom: 25, backgroundColor: 'white' }}
        ></PageHeaderWrapper>
        <Row>
          <Col
            span={24}
            style={{ backgroundColor: 'white', padding: '20px 25px', paddingBottom: 5 }}
          >
            <Title level={3}>Libarian Events Information</Title>
            <Descriptions size="small" column={1} className={styles.pageInfo}>
              <Descriptions.Item label="Total Events Launched">99</Descriptions.Item>
              <Descriptions.Item label="Total Campaign Launched">99</Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Row style={{ backgroundColor: 'white', paddingLeft: '25px' }}>
          <Space>
            <DatePicker
              defaultValue={moment()}
              size={'middle'}
              onSelect={(date) => this.setState({ selectedDate: date.toDate() })}
              picker={'month'}
              style={{ width: 250 }}
            />
            <Button
              type="primary"
              style={{ border: 'none' }}
              onClick={() =>
                this.props.dispatch({
                  type: 'manageevent/showCreateCampaign',
                  payload: {},
                })
              }
            >
              New Campaign
            </Button>
          </Space>
        </Row>
        <Row style={{ backgroundColor: 'white', padding: '25px 25px' }}>
          <Col span={24}>
            <Space
              direction="horizontal"
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto auto auto auto',
                justifyContent: 'space-around',
                rowGap: 20,
                maxHeight: 600,
                overflow: 'auto',
              }}
            >
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
              <Card
                style={{ width: 280 }}
                cover={
                  <img
                    alt="example"
                    src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
                }
                actions={[<EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
              >
                <Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title="Card title"
                  description="This is the description"
                />
              </Card>
            </Space>
          </Col>
        </Row>
        <Drawer
          title="Create Campaign"
          width={550}
          onClose={this.hideCreateCampaign}
          visible={manageevent.createCampaignVisible}
          bodyStyle={{}}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.hideCreateCampaign} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.hideCreateCampaign} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <InputCampaignForm />
        </Drawer>
        <Drawer
          title="Add Books"
          width={500}
          onClose={this.hideBooks}
          visible={manageevent.booksVisible}
          bodyStyle={{paddingBottom: 0}}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.hideBooks} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.hideBooks} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <ChoiceBookTable />
        </Drawer>

      </>
    );
  }
  hideCreateCampaign() {
    this.props.dispatch({
      type: 'manageevent/hideCreateCampaign',
      payload: {},
    })
  }
  hideBooks() {
    this.props.dispatch({
      type: 'manageevent/hideBooks',
      payload: {},
    })
  }
}
export default connect((state) => ({ ...state }))(ManageEventPage);
