import { Avatar, Button, Col, Drawer, List, Result, Row, Space, Spin, Table, Tabs } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../UploadVideo.less';
import { connect, Dispatch } from 'umi';
import Description from './Description';
import BookTrackingItem from './BookTrackingItem';
import {
  AndroidOutlined,
  AppleOutlined,
  CheckOutlined,
  CloseOutlined,
  QuestionOutlined,
} from '@ant-design/icons';
import LoadingDrone from '@/components/CustomDesign/LoadingDrone';

interface TrackingDetailProps {
  dispatch: Dispatch;
  record: any;
  model: any;
}
interface TrackingDetailState {
  visible: boolean;
}

const columns = [
  {
    title: 'Drawer Barcode',
    dataIndex: 'drawerBarcode',
    key: 'drawerBarcode',
  },
  {
    title: 'Drawer Id',
    dataIndex: 'drawerId',
    key: 'drawerId',
  },
];
class TrackingDetail extends React.Component<TrackingDetailProps, TrackingDetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  render() {
    return (
      <>
        <Row style={{ height: 550 }}>
          <Col span={8}>
            <ReactPlayer
              controls
              width={'100%'}
              height={'fit-content'}
              url={this.props.record.url}
            />
            <Title style={{ textAlign: 'left', fontFamily: 'roboto', margin: '20px 0' }} level={4}>
              Tracking Detail
            </Title>
            <Space style={{ width: '100%' }} direction={'vertical'}>
              <Description name={'Bookshelf:'} value={this.props.record.bookShelfName} />
              <Description name={'Date'} value={'18/06/2021'} />
              <Description name={'Staff Upload'} value={this.props.record.staffName} />
            </Space>
          </Col>
          <Col span={16} style={{ borderLeft: '1px solid rgba(0, 0, 0, .1)' }}>
            <Row style={{ textAlign: 'left', height: '100%' }}>
              <Col span={24} style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                {this.props.model.isLoading ? (
                  <Spin spinning />
                ) : (
                  <>
                    {this.props.model.data.length != 0 ? (
                      <Table
                        columns={columns}
                        loading={this.props.model.isLoading}
                        dataSource={this.props.model.data}
                        bordered
                        onRow={(record) => {
                          return {
                            onDoubleClick: () => {
                              this.onSelectRow(record);
                              this.props.dispatch({
                                type: 'trackingdetail/fetchError',
                                payload: record.id,
                              });
                            }, // double click row,
                          };
                        }}
                        className={styles.tablelDrawer}
                        scroll={{ x: 0, y: 485 }}
                        pagination={false}
                        style={{ height: '100%', marginLeft: 5, borderLeft: 'none' }}
                      />
                    ) : (
                      <Result
                        style={{
                          height: '100%',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          display: 'flex',
                        }}
                        status="warning"
                        title="No Drawer Was Found !"
                        subTitle="There are something wrong, please recheck video that you was uploaded !"
                      />
                    )}
                  </>
                )}

                <Drawer
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  width={600}
                  visible={this.state.visible}
                  getContainer={false}
                  style={{ position: 'absolute' }}
                >
                  <Tabs
                    defaultActiveKey="1"
                    type={'card'}
                    tabBarExtraContent={{
                      right: (
                        <Button
                          type={'text'}
                          disabled
                          style={{ color: 'black', cursor: 'context-menu' }}
                        >
                          List Errors
                        </Button>
                      ),
                    }}
                  >
                    <Tabs.TabPane
                      tab={
                        <span>
                          <QuestionOutlined />
                          Unverify error
                        </span>
                      }
                      key="1"
                      style={
                        this.props.model.isLoading
                          ? {
                              height: 400,
                              width: '100%',
                              display: 'flex',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }
                          : {}
                      }
                    >
                      {!this.props.model.isLoading ? (
                        this.props.model.listError.length != 0 ? (
                          this.props.model.listError.map((record: any) =>
                            !record.isConfirm && !record.isReject ? (
                              <BookTrackingItem record={record} />
                            ) : (
                              <></>
                            ),
                          )
                        ) : (
                          <Result
                            status="success"
                            title="Successfully Purchased Cloud Server ECS!"
                            subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
                            extra={[
                              <Button type="primary" key="console">
                                Go Console
                              </Button>,
                              <Button key="buy">Buy Again</Button>,
                            ]}
                          />
                        )
                      ) : (
                        <Spin spinning />
                      )}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <span>
                          <CheckOutlined />
                          Verify error
                        </span>
                      }
                      key="2"
                    >
                      {this.props.model.listError.map((record: any) =>
                        record.isConfirm ? <BookTrackingItem record={record} /> : <></>,
                      )}
                    </Tabs.TabPane>
                    <Tabs.TabPane
                      tab={
                        <span>
                          <CloseOutlined />
                          Reject error
                        </span>
                      }
                      key="3"
                    >
                      {this.props.model.listError.map((record: any) =>
                        record.isReject ? <BookTrackingItem record={record} /> : <></>,
                      )}
                    </Tabs.TabPane>
                  </Tabs>
                </Drawer>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    var tmp = document.querySelectorAll(`.${styles.tablelDrawer} tr`);
    tmp.forEach((tr: any) => {
      tr.classList.remove(styles.active);
    });
    this.setState({
      visible: false,
    });
  };

  onSelectRow(record: any) {
    var tmp = document.querySelectorAll(`.${styles.tablelDrawer} tr`);
    tmp.forEach((tr: any) => {
      tr.classList.remove(styles.active);
    });
    tmp.forEach((tr: any) => {
      if (tr.attributes['data-row-key'] != undefined) {
        if (tr.attributes['data-row-key']['value'] == record.key) {
          tr.classList.add(styles.active);
        }
      }
    });
    this.showDrawer();
  }
}
export default connect((state) => ({ ...state }))(TrackingDetail);
