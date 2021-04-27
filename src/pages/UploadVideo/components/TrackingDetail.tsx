import {
  Alert,
  Button,
  Col,
  ConfigProvider,
  Drawer,
  Result,
  Row,
  Space,
  Spin,
  Table,
  Tabs,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../UploadVideo.less';
import { connect, Dispatch } from 'umi';
import Description from './Description';
import BookTrackingItem from './BookTrackingItem';
import { CheckOutlined, CloseOutlined, QuestionOutlined } from '@ant-design/icons';
import sendNotification from '@/utils/Notification';
const { Text } = Typography;
interface TrackingDetailProps {
  dispatch: Dispatch;
  record: any;
  trackingdetail?: any;
}
interface TrackingDetailState {
  visible: boolean;
}

const columns: any = [
  {
    title: 'Drawer Id',
    dataIndex: 'drawerId',
    key: 'drawerId',
    align: 'left',
  },
  {
    title: 'Drawer Name',
    dataIndex: 'drawerName',
    key: 'drawerName',
    align: 'left',
  },
  {
    title: 'Drawer Barcode',
    dataIndex: 'drawerBarcode',
    key: 'drawerBarcode',
    align: 'left',
  },
  {
    title: 'Issue',
    dataIndex: 'error',
    key: 'issue',
    align: 'left',
    render: (text: string, record: any) => {
      if (record.error.length == 0) {
        return <Tag color="#87d068">No issue</Tag>;
      } else {
        return <Tag color="#cd201f">{record.error.length} issues</Tag>;
      }
    },
  },
];

const columns2: any = [
  {
    title: 'No',
    key: 'no',
    align: 'left',
    width: 50,
    render: (text: string, record: any, index: number) => (
      <p style={{ marginBottom: 0 }}>{index + 1}</p>
    ),
  },
  {
    title: 'BookId',
    dataIndex: 'id',
    key: 'id',
    width: 100,
    align: 'left',
    render: (text: string, record: any, index: number) => {
      if (record.id == 'Strange Barcode') {
        return {
          children: <Text>{text}</Text>,
          props: {
            colSpan: 2,
          },
        };
      } else {
        return <Text>{text}</Text>;
      }
    },
  },
  {
    title: 'Book Name',
    dataIndex: 'bookName',
    align: 'left',
    width: 250,
    render: (text: string, record: any, index: number) => {
      if (record.id == 'Strange Barcode') {
        return {
          children: <Text>{text}</Text>,
          props: {
            colSpan: 0,
          },
        };
      }
      return (
        <Tooltip title={text}>
          <Text ellipsis={true} style={{ marginBottom: 0, maxWidth: 250 }}>
            {text}
          </Text>
        </Tooltip>
      );
    },
  },
  {
    title: 'Book Barcode',
    dataIndex: 'barCode',
    align: 'center',
    width: 200,
  },
  {
    title: 'Filter',
    dataIndex: 'error',
    key: 'issue',
    align: 'right',
    render: (text: string, record: any) => {
      //console.log("RECRD", record);

      if (!record.error) {
        //no Error
        return <Tag color="#87d068">No issue</Tag>;
      } else {
        // Error
        if (record.error.isConfirm) {
          // Confirm
          return <Tag color="blue">Confirm</Tag>;
        } else if (record.error.isRejected) {
          //Reject
          return <Tag color="red">Reject</Tag>;
        }
        return <Tag color="#cd201f">Issue</Tag>;
      }
    },
    filters: [
      { text: 'Issue', value: 'issue' },
      { text: 'No Issue', value: 'no-issue' },
      { text: 'Confirm', value: 'confirm' },
      { text: 'Reject', value: 'reject' },
    ],
    onFilter: (value: any, record: any) => {
      if (value == 'issue') {
        if (record.error != undefined) {
          if (!(record.error.isConfirm || record.error.isRejected)) {
            return record;
          }
        }
      } else if (value == 'confirm') {
        if (record.error != undefined) {
          if (record.error.isConfirm) {
            return record;
          }
        }
      } else if (value == 'reject') {
        if (record.error != undefined) {
          if (record.error.isRejected) {
            return record;
          }
        }
      } else {
        return record.error == undefined;
      }
    },
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
              <Col
                span={24}
                style={{
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  paddingLeft: 15,
                }}
              >
                <ConfigProvider
                  renderEmpty={() => (
                    <Result
                      style={{
                        height: '100%',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        display: 'flex',
                        margin: '80px 0',
                      }}
                      status="warning"
                      title="No Drawer Was Found !"
                      subTitle="There are something wrong, please recheck video that you was uploaded !"
                    />
                  )}
                >
                  <Table
                    columns={columns}
                    className={styles.listErrorCustom}
                    loading={this.props.trackingdetail.isLoading}
                    scroll={{ y: 480 }}
                    size={'small'}
                    expandable={{
                      expandedRowRender: (record) => (
                        <>
                          <Table
                            columns={columns2}
                            scroll={{ y: 400 }}
                            dataSource={record.books}
                            pagination={false}
                            size="small"
                            expandable={{
                              expandedRowRender: (book) => {
                                if (book.error.isConfirm) {
                                  return (
                                    <Space
                                      style={{ width: '100%', justifyContent: 'space-between' }}
                                    >
                                      <Alert
                                        message={book.error.errorMessage}
                                        type="error"
                                        showIcon
                                      />
                                      <Tag color="blue">Confirm</Tag>
                                    </Space>
                                  );
                                } else if (book.error.isRejected) {
                                  return (
                                    <Space
                                      style={{ width: '100%', justifyContent: 'space-between' }}
                                    >
                                      <Alert
                                        message={book.error.errorMessage}
                                        type="error"
                                        showIcon
                                      />
                                      <Tag color="red">Reject</Tag>
                                    </Space>
                                  );
                                }
                                return (
                                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                                    <Alert
                                      message={book.error.errorMessage}
                                      type="error"
                                      showIcon
                                    />
                                    <Space style={{ width: 125 }}>
                                      <Tooltip title="Confirm Error">
                                        <Button
                                          shape="round"
                                          type="primary"
                                          size="small"
                                          icon={<CheckOutlined />}
                                          onClick={() => this.handelConfirm(book)}
                                        ></Button>
                                        {/* <Button type="primary" size="small" icon={<CheckOutlined />} onClick={() => {}} /> */}
                                      </Tooltip>
                                      <Tooltip title="Reject Error">
                                        <Button
                                          shape="round"
                                          type="primary"
                                          danger
                                          size="small"
                                          icon={<CloseOutlined />}
                                          onClick={() => this.handelReject(book)}
                                        ></Button>
                                      </Tooltip>
                                    </Space>
                                  </Space>
                                );
                              },
                              rowExpandable: (record) => {
                                if (record.error) return true;
                                return false;
                              },
                            }}
                          />
                        </>
                      ),
                    }}
                    dataSource={this.props.trackingdetail.data}
                  />
                </ConfigProvider>

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
                        this.props.trackingdetail.isLoading
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
                      {!this.props.trackingdetail.isLoading ? (
                        this.renderUnverifyError()
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
                      {this.renderConfirmError()}
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
                      {this.renderRejectError()}
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

  renderUnverifyError() {
    const { trackingdetail } = this.props;
    var tmp: any = [];
    if (trackingdetail.listError.length != 0) {
      this.props.trackingdetail.listError.map((record: any) => {
        if (!record.isConfirm && !record.isRejected) {
          tmp.push(<BookTrackingItem record={record} />);
        }
      });
      if (tmp.length != 0) {
        return tmp;
      }
    }
    return <Result style={{ margin: '100px 0px' }} status="success" title="No error found !" />;
  }
  renderConfirmError() {
    const { trackingdetail } = this.props;
    var tmp: any = [];
    if (trackingdetail.listError.length != 0) {
      this.props.trackingdetail.listError.map((record: any) => {
        if (record.isConfirm) {
          tmp.push(<BookTrackingItem record={record} />);
        }
      });
      if (tmp.length != 0) {
        return tmp;
      }
    }
    return <Result style={{ margin: '100px 0px' }} status="success" title="No error found !" />;
  }
  renderRejectError() {
    const { trackingdetail } = this.props;
    var tmp: any = [];
    if (trackingdetail.listError.length != 0) {
      this.props.trackingdetail.listError.map((record: any) => {
        if (record.isRejected) {
          tmp.push(<BookTrackingItem record={record} />);
        }
      });
      if (tmp.length != 0) {
        return tmp;
      }
    }
    return <Result style={{ margin: '100px 0px' }} status="success" title="No error found !" />;
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
  handelConfirm(record: any) {
    console.log(record);

    const { dispatch } = this.props;
    record.error.isConfirm = true;
    record.error.isRejected = false;
    if (record.error.typeError != 1) {
      console.log('DEFI');
      var tmp: any = {
        id: record.error.id,
        drawerDetectionId: record.error.drawerDetectionId,
        errorMessage: record.error.errorMessage,
        bookId: record.error.bookId,
        isRejected: record.error.isRejected,
        isConfirm: record.error.isConfirm,
        typeError: record.error.typeError,
        isDeleted: 0,
      };
      dispatch({ type: 'trackingdetail/updateError', payload: tmp });
    } else {
      console.log('UNDEFI');
      var tmp: any = {
        id: record.error.id,
        drawerDetectionId: record.error.drawerDetectionId,
        errorMessage: record.error.errorMessage,
        isRejected: record.error.isRejected,
        isConfirm: record.error.isConfirm,
        typeError: record.error.typeError,
        isDeleted: 0,
      };
      dispatch({ type: 'trackingdetail/updateErrorUndefined', payload: tmp });
    }
    sendNotification('Confirm error success !', '', 'success');
  }
  handelReject(record: any) {
    const { dispatch } = this.props;
    record.error.isConfirm = false;
    record.error.isRejected = true;
    if (record.error.typeError != 1) {
      console.log('DEFI');
      var tmp: any = {
        id: record.error.id,
        drawerDetectionId: record.error.drawerDetectionId,
        errorMessage: record.error.errorMessage,
        bookId: record.error.bookId,
        isRejected: record.error.isRejected,
        isConfirm: record.error.isConfirm,
        typeError: record.error.typeError,
        isDeleted: 0,
      };
      dispatch({ type: 'trackingdetail/updateError', payload: tmp });
    } else {
      console.log('UNDEFI');
      var tmp: any = {
        id: record.error.id,
        drawerDetectionId: record.error.drawerDetectionId,
        errorMessage: record.error.errorMessage,
        isRejected: record.error.isRejected,
        isConfirm: record.error.isConfirm,
        typeError: record.error.typeError,
        isDeleted: 0,
      };
      dispatch({ type: 'trackingdetail/updateErrorUndefined', payload: tmp });
    }
    sendNotification('Reject error success !', '', 'success');
  }
}
export default connect((state) => ({ ...state }))(TrackingDetail);
