import { PageHeaderWrapper } from '@ant-design/pro-layout';
import styles from './ManageEventPage.less';
import React from 'react';
import MyCalendar from './components/MyCalendar';
import { Button, Col, DatePicker, Descriptions, Drawer, Row, Space } from 'antd';
import InputCampaignForm from './components/InputCampaignForm';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';

interface ManageBorrowPageProps {}
interface ManageBorrowPageState {
  selectedDate: any;
  createCampaignVisible: boolean;
}
class ManageEventPage extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedDate: moment().toDate(),
      createCampaignVisible: false,
    };

    this.showCreateCampaign = this.showCreateCampaign.bind(this);
    this.onCreateCampaignClose = this.onCreateCampaignClose.bind(this);
  }

  showCreateCampaign() {
    this.setState({
      createCampaignVisible: true,
    });
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].style.paddingRight = '17px';
  }
  onCreateCampaignClose() {
    this.setState({
      createCampaignVisible: false,
    });
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByTagName('body')[0].style.paddingRight = '0px';
  }
  render() {
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

            <Button type="primary">New Event</Button>
            <Button type="primary" style={{backgroundColor: 'rgba(74, 212, 92)', border: 'none'}} onClick={this.showCreateCampaign}>
              New Campaign
            </Button>
          </Space>
        </Row>
        <Row>
          <Col span={24}>
            <MyCalendar selectedDate={this.state.selectedDate} />
          </Col>
        </Row>
        <Drawer
          title="Create Campaign"
          width={550}
          onClose={this.onCreateCampaignClose}
          visible={this.state.createCampaignVisible}
          bodyStyle={{}}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.onCreateCampaignClose} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.onCreateCampaignClose} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <InputCampaignForm />
        </Drawer>
      </>
    );
  }
}
export default ManageEventPage;
