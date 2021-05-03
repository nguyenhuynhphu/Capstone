import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Avatar,
  Button,
  Col,
  DatePicker,
  Drawer,
  List,
  Result,
  Row,
  Space,
  Spin,
  Steps,
  Typography,
  Popconfirm,
  Skeleton,
  ConfigProvider,
  Descriptions,
} from 'antd';
import React from 'react';

const { Paragraph } = Typography;

import { connect, Dispatch } from 'umi';
import ViewForm from './components/ViewForm';
import Form, { FormInstance } from 'antd/lib/form';
import ManageBorrowTable from './components/ManageBorrowTable';
import { getWishlist } from '@/utils/Signalr';
import {
  fecthDrawer,
  fetchBookByBarcode,
  fetchBooks,
  fetchPatronByName,
} from '@/services/manageborrow';
import Title from 'antd/lib/typography/Title';
import styles from './ManageBorrowPage.less';
import moment from 'moment';
import ReturnBookTable from './components/ReturnBookTable';
import ReturnFeeChart from './components/ReturnFeeChart';
import TableHeader from '@/components/CustomDesign/TableHeader';
import ManageBorrowStatistic from './components/ManageBorrowStatistic';
import {
  CloseOutlined,
  LoadingOutlined,
  RedoOutlined,
  SmileOutlined,
  UserOutlined,
} from '@ant-design/icons';
import _ from 'lodash';
import BorrowItem from './components/BorrowItem';
import Search from 'antd/lib/input/Search';
import BorrowBookSection from './components/BorrowBookSection';
import sendNotification from '@/utils/Notification';
import ViewReturnForm from './components/ViewReturnForm';

// import moment from 'moment';
const { Step } = Steps;

interface ManageBorrowPageProps {
  dispatch: Dispatch;
  manageborrowpage?: any;
  manageborrowtable?: any;
  manageborrow?: any;
  user?: any;
  returnfeechart?: any;
  manageborrowstatistic?: any;
}
interface ManageBorrowPageState {
  form: any;
  totalFee: number;
  patronName: any;
  loadingList: boolean;
  isGetReturnPatron: boolean;
}
const connection = getWishlist();
class ManageBorrowPage extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
      totalFee: 0,
      patronName: [],
      loadingList: false,
      isGetReturnPatron: false,
    };

    this.hideViewBorrow = this.hideViewBorrow.bind(this);
    this.hideViewReturn = this.hideViewReturn.bind(this);
    this.searchPatron = this.searchPatron.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({ type: 'returnfeechart/fetchData' });
    this.props.dispatch({ type: 'manageborrowstatistic/fetchData' });
  }
  render() {
    const { manageborrow, dispatch } = this.props;

    return (
      <>
        <PageHeaderWrapper
          extra={
            !manageborrow.isMakingTransaction && !manageborrow.isMakingReturn
              ? [
                  <Button
                    key="Return Request"
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: 'manageborrow/loading',
                        payload: {},
                      });
                      setTimeout(() => {
                        dispatch({
                          type: 'manageborrow/renderReturnScreen',
                          payload: {},
                        });
                      }, 1000);
                    }}
                  >
                    Return Request
                  </Button>,
                  <Button
                    key="Borrow Request"
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: 'manageborrow/loading',
                        payload: {},
                      });
                      setTimeout(() => {
                        dispatch({
                          type: 'manageborrow/changeScreen',
                          payload: {},
                        });
                      }, 1000);
                    }}
                  >
                    Borrow Request
                  </Button>,
                ]
              : [
                  <Button
                    key="Cancel Request"
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: 'manageborrow/resetState',
                        payload: {},
                      });
                      this.closeConnection();
                    }}
                  >
                    Cancel Request
                  </Button>,
                ]
          }
          style={{ marginBottom: 10, backgroundColor: 'white' }}
        />
        {this.handelScreen()}
      </>
    );
  }

  handelScreen() {
    const { manageborrow, manageborrowpage } = this.props;
    if (manageborrow.isMakingTransaction) {
      return (
        <Spin spinning={manageborrow.screenLoading}>
          <Row style={{ backgroundColor: 'white', padding: '30px 70px', marginBottom: 2 }}>
            <Col span={24}>
              <Steps direction="horizontal" current={this.props.manageborrow.processStep}>
                <Step
                  title="Scanning"
                  description={
                    this.props.manageborrow.isConnect ? (
                      <LoadingOutlined style={{ marginLeft: 20 }} />
                    ) : (
                      ''
                    )
                  }
                />
                <Step title="Checking Wishlist" />
                <Step title="Complete !" />
              </Steps>
            </Col>
          </Row>

          <Row style={{ backgroundColor: 'white', padding: '25px 20px', minHeight: 500 }}>
            <Col
              span={24}
              style={{ height: '100% !important', display: 'grid', alignItems: 'center' }}
            >
              {this.handelStep(this.props.manageborrow.processStep)}
            </Col>
          </Row>
        </Spin>
      );
    } else if (manageborrow.isMakingReturn) {
      return (
        <>
          <div
            style={{
              marginBottom: 10,
              overflow: 'hidden',
              width: '100%',
              display: 'flex',
              height: 350,
            }}
          >
            <div
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '20px 25px',
                transition: 'all 0.2s',
                width: '100%',
                marginRight: 10,
              }}
            >
              <Result
                title="Connect to server to scan order"
                extra={[
                  !this.props.manageborrow.isConnect
                    ? [
                        <Button type="primary" key="console" onClick={() => this.openConnection()}>
                          Start Scanning
                        </Button>,
                      ]
                    : [
                        <Spin
                          spinning={this.props.manageborrow.isConnect}
                          style={{ display: 'block', marginBottom: 15 }}
                        ></Spin>,
                        <Button type="primary" key="console" onClick={() => this.closeConnection()}>
                          Cancel
                        </Button>,
                      ],
                ]}
              />
            </div>
          </div>
          {this.props.manageborrow.borrowDetail.borrowDetail ? (
            <Space style={{ width: '100%' }} direction={'vertical'}>
              <BorrowBookSection borrowBook={this.props.manageborrow.borrowDetail} />
            </Space>
          ) : (
            <> </>
          )}
        </>
      );
    } else {
      return (
        <Spin spinning={manageborrow.screenLoading}>
          <Row gutter={15} style={{ marginBottom: 15 }}>
            <Col span={10} style={{ height: 500 }}>
              <Row
                style={{
                  height: '100%',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '20px 25px',
                }}
              >
                <TableHeader title="Overview" description="" />
                {this.props.manageborrowstatistic.isLoading ? (
                  <Space
                    direction="vertical"
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <p style={{ marginBottom: 4 }}>Loading</p>
                    <Spin spinning />
                  </Space>
                ) : (
                  <ManageBorrowStatistic />
                )}
              </Row>
            </Col>
            <Col span={14} style={{ height: 500 }}>
              <Row
                style={{
                  height: '100%',
                  backgroundColor: 'white',
                  borderRadius: '15px',
                  padding: '20px 25px',
                }}
              >
                <div>
                  <TableHeader title="Return Fee" description="Total fee rerturn earn by month" />
                </div>

                {this.props.returnfeechart.isLoading ? (
                  <Space
                    direction="vertical"
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <p style={{ marginBottom: 4 }}>Loading Chart</p>
                    <Spin spinning />
                  </Space>
                ) : (
                  <ReturnFeeChart />
                )}
              </Row>
            </Col>
          </Row>
          <Row gutter={15}>
            <Col span={10}>
              <Row style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}>
                <Col span={24}>
                  <ReturnBookTable />
                  <Drawer
                    title={'Return Detail'}
                    width={700}
                    zIndex={99999}
                    placement="right"
                    destroyOnClose
                    closable={false}
                    onClose={this.hideViewReturn}
                    visible={manageborrowpage.viewReturnVisible}
                  >
                    <ViewReturnForm />
                  </Drawer>
                </Col>
              </Row>
            </Col>
            <Col span={14}>
              <Row style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}>
                <Col span={24}>
                  <ManageBorrowTable />
                  <Drawer
                    title={'Borrow Detail'}
                    width={500}
                    placement="right"
                    closable={false}
                    destroyOnClose
                    onClose={this.hideViewBorrow}
                    visible={manageborrowpage.viewBorrowVisible}
                  >
                    <ViewForm />
                  </Drawer>
                </Col>
              </Row>
            </Col>
          </Row>
        </Spin>
      );
    }
  }

  handelStep(step: number) {
    console.log('handelStep', this.props.manageborrow.scanId);

    switch (step) {
      case 0:
        return (
          <Result
            title="Scanning QR code"
            subTitle="Please using phone to scan Patron QR code !"
            extra={
              !this.props.manageborrow.isConnect
                ? [
                    <Button type="primary" key="console" onClick={() => this.openConnection()}>
                      Start Scanning
                    </Button>,
                  ]
                : [
                    <Spin
                      spinning={this.props.manageborrow.isConnect}
                      style={{ display: 'block', marginBottom: 15 }}
                    ></Spin>,
                    <Button type="primary" key="console" onClick={() => this.closeConnection()}>
                      Cancel
                    </Button>,
                  ]
            }
          />
        );
      case 1:
        return (
          <Row style={{ height: '100%' }}>
            <Col span={15} className={styles.wishlistCol}>
              <List
                itemLayout="horizontal"
                dataSource={this.props.manageborrow.scanId}
                style={{ padding: '0px 20px' }}
                renderItem={(item: any) => (
                  <List.Item style={{ position: 'relative' }}>
                    <Popconfirm
                      title="Are you sure?"
                      trigger="click"
                      onConfirm={() => {
                        this.props.dispatch({
                          type: 'manageborrow/removeFromScanId',
                          payload: item,
                        });
                      }}
                    >
                      <CloseOutlined
                        style={{
                          position: 'absolute',
                          right: 5,
                          top: 10,
                          cursor: 'pointer',
                          color: 'rgba(0, 0, 0, .6)',
                        }}
                      />
                    </Popconfirm>

                    <BorrowItem borrowItem={item} />
                  </List.Item>
                )}
              />
            </Col>
            <Col span={9} className={styles.confirmForm}>
              {this.props.manageborrow.patron.id != undefined ? (
                <>
                  <Space
                    style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between' }}
                  >
                    <Title level={5} style={{ marginBottom: 0 }}>
                      Patron Informaton
                    </Title>
                    <Popconfirm
                      title="Are you sure to re-choice user?"
                      onConfirm={() =>
                        this.props.dispatch({
                          type: 'manageborrow/loadPatron',
                          payload: {},
                        })
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type={'text'} style={{ color: 'red' }}>
                        <RedoOutlined /> Rechoice Patron
                      </Button>
                    </Popconfirm>
                  </Space>
                  <Descriptions column={1} size="middle">
                    <Descriptions.Item label="Name">
                      {this.props.manageborrow?.patron.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Username">
                      {this.props.manageborrow?.patron.username}
                    </Descriptions.Item>

                    <Descriptions.Item label="Email">
                      {this.props.manageborrow?.patron.email}
                    </Descriptions.Item>

                    <Descriptions.Item label="Phone">
                      {this.props.manageborrow?.patron.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Address" span={2}>
                      {this.props.manageborrow?.patron.address}
                    </Descriptions.Item>
                  </Descriptions>
                  <Form onFinish={(value) => this.onConfirm(value)}>
                    <Form.Item
                      name="date"
                      label="Borrow Day: "
                      required
                      initialValue={moment()}
                      style={{ marginBottom: 25 }}
                    >
                      <DatePicker onChange={() => {}} style={{ marginLeft: 28 }} disabled />
                    </Form.Item>
                    <Form.Item
                      name="returnDate"
                      label="Return Day: "
                      required
                      initialValue={moment().add(7, 'days')}
                      style={{ marginBottom: 25 }}
                    >
                      <DatePicker
                        onChange={() => {}}
                        disabledDate={this.disabledDate}
                        style={{ marginLeft: 30 }}
                      />
                    </Form.Item>

                    <Row justify={'end'}>
                      <Space align={'end'}>
                        <Button type="primary" htmlType={'submit'}>
                          Confirm
                        </Button>
                      </Space>
                    </Row>
                  </Form>
                </>
              ) : (
                <Space direction="vertical" style={{ width: '100%', justifyContent: 'center' }}>
                  <p style={{ marginBottom: 0 }}>Select Patron</p>
                  <Search
                    placeholder="Type patron username"
                    enterButton="Search"
                    size="middle"
                    suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
                    onSearch={(patronName: string) => this.searchPatron(patronName)}
                  />
                  <ConfigProvider
                    renderEmpty={() => (
                      <div style={{ textAlign: 'center' }}>
                        <SmileOutlined style={{ fontSize: 20 }} />
                        <p>No data yet</p>
                      </div>
                    )}
                  >
                    <List
                      className="demo-loadmore-list"
                      loading={this.state.loadingList}
                      itemLayout="horizontal"
                      dataSource={this.state.patronName}
                      renderItem={(item: any) => (
                        <List.Item
                          actions={[
                            <Popconfirm
                              title="Are you sure to select this user?"
                              onConfirm={() => {
                                this.props.dispatch({
                                  type: 'manageborrow/fetchPatron',
                                  payload: item.id,
                                });
                              }}
                              okText="Yes"
                              cancelText="No"
                            >
                              <Button type={'text'} key="list-loadmore-edit">
                                Select
                              </Button>
                              ,
                            </Popconfirm>,
                          ]}
                        >
                          <Skeleton avatar title={false} loading={item.loading} active>
                            <List.Item.Meta
                              avatar={<Avatar src={item.image} />}
                              title={
                                <Space>
                                  <span>{item.name}</span>
                                  <span style={{ color: 'rgba(0, 0, 0, .4)', fontStyle: 'italic' }}>
                                    - {item.username}
                                  </span>
                                </Space>
                              }
                              description={`User ID: #${item.id}`}
                            />
                          </Skeleton>
                        </List.Item>
                      )}
                    />
                  </ConfigProvider>
                </Space>
              )}
            </Col>
          </Row>
        );
      case 2:
        return (
          <Result
            status="success"
            title="Successfully Borrow !"
            //subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
            extra={[
              <Button
                type="primary"
                key="console"
                onClick={() =>
                  this.props.dispatch({
                    type: 'manageborrow/resetState',
                    payload: {},
                  })
                }
              >
                Exit Borrow
              </Button>,
              <Button
                key="buy"
                onClick={() =>
                  this.props.dispatch({
                    type: 'manageborrow/anotherBorrowRequest',
                    payload: {},
                  })
                }
              >
                Another Request
              </Button>,
            ]}
          />
        );
    }
  }
  disabledDate(current: any) {
    // Can not select days before today and today
    return current && current < moment().endOf('day');
  }
  openConnection() {
    const { dispatch, manageborrow } = this.props;
    this.setState({ isGetReturnPatron: true });
    dispatch({
      type: 'manageborrow/renderButton',
      payload: true,
    });
    if (connection != undefined) {
      connection
        .start()
        .then(() => {
          connection.on('ReceiveMessageToBorrow', async (value) => {
            //tung cuon
            console.log('MOT CUON', value);
            if (value.staffId == this.props.user.currentUser.id) {
              var book: any = await fetchBookByBarcode(value.barcode); // get Book infor
              if (book.data[0] != undefined) {
                var bookGroup = await fetchBooks(book.data[0].bookGroupId); // get BookGroup infor
                bookGroup.data.selectedBook = book.data[0]; // choice book in BookGroup
                bookGroup.data.isInStorage = false;
                dispatch({
                  type: 'manageborrow/addToScanId',
                  payload: [bookGroup.data],
                });
                dispatch({ type: 'manageborrow/renderWishList', payload: manageborrow.scanId });
                dispatch({ type: 'manageborrow/changeProcess', payload: 1 });
              }
            }
          });
          connection.on('ReceiveMessage', async (value) => {
            //wishlist
            console.log('WISHLIST', value);
            if (value.staffId == this.props.user.currentUser.id) {
              var promiese: any = [];
              if (value.wishlist != undefined) {
                value.wishlist.forEach((id: any) => {
                  promiese.push(fetchBooks(id)); // get BookGroup infor
                });
                var tmp = await Promise.all(promiese);
                var bookgroupList: any = [];
                tmp.forEach((notConvertData: any) => {
                  bookgroupList.push(notConvertData.data);
                });

                if (bookgroupList != undefined) {
                  dispatch({
                    type: 'manageborrow/addToScanId',
                    payload: bookgroupList,
                  });
                } else {
                  dispatch({
                    type: 'manageborrow/addToScanId',
                    payload: [],
                  });
                }

                this.fetchBookInDrawer(value.patronId);
              }
            }
          });

          connection.on('ReceiveMessageToReturnBook', async (value) => {
            if (value.staffId == this.props.user.currentUser.id) {
              console.log('manageborrow.borrowDetail', manageborrow.borrowDetail);
              dispatch({
                type: 'manageborrow/fetchBorrowDetail',
                payload: value,
              });
            }
          });
        })
        .catch((e) => console.log('ERROR >> ', e));
    }
  }

  closeConnection() {
    this.setState({ isGetReturnPatron: false });
    this.props.dispatch({
      type: 'manageborrow/renderButton',
      payload: false,
    });
    if (connection != undefined) {
      connection.stop();
    }
  }

  async fetchBookInDrawer(patronId: any) {
    const { dispatch, manageborrow } = this.props;

    for (let i = 0; i < manageborrow.scanId.length; i++) {
      const book = manageborrow.scanId[i];

      book.drawer = undefined;

      var drawer = await fecthDrawer(book.id);
      let tmpDrawer: any = [];
      drawer.forEach((book: any) => {
        if (book == null) tmpDrawer.push(book);
      });
      _.pullAll(drawer, tmpDrawer);

      if (drawer.length != 0) {
        book.drawer = drawer;
        book.isInStorage = false;
      } else {
        book.isInStorage = true;
      }
    }
    console.log('manageborrow.scanId', manageborrow.scanId);

    if (patronId != undefined) {
      dispatch({ type: 'manageborrow/fetchPatron', payload: patronId });
    }
    dispatch({ type: 'manageborrow/renderWishList', payload: manageborrow.scanId });
    dispatch({ type: 'manageborrow/changeProcess', payload: 1 });
  }

  hideViewBorrow() {
    this.props.dispatch({
      type: 'manageborrowpage/hideViewBorrow',
      payload: {},
    });
  }
  hideViewReturn() {
    this.props.dispatch({
      type: 'manageborrowpage/hideViewReturn',
      payload: {},
    });
  }

  async searchPatron(patronName: string) {
    this.setState({ loadingList: true });
    var tmp = await fetchPatronByName(patronName);
    this.setState({ patronName: tmp.data, loadingList: false });
  }

  onConfirm(dateValue: any) {
    const { manageborrow, user, dispatch } = this.props;
    var tmp: any = [];
    console.log(manageborrow.scanId);

    manageborrow.scanId.forEach((book: any) => {
      if (book.selectedBook) {
        if (book.selectedBook.isDeleted == false && book.selectedBook.isAvailable == true) {
          tmp.push({
            bookId: book.selectedBook.id,
          });
        }
      }
    });

    if (tmp.length == manageborrow.scanId.length) {
      var msgToServer: any = {
        patronId: manageborrow.patron.id,
        patronName: manageborrow.patron.name,
        startTime: dateValue.date,
        endTime: dateValue.returnDate,
        quantity: manageborrow.scanId.length,
        staffId: user.currentUser.id,
        borrowDetail: tmp,
      };

      dispatch({
        type: 'manageborrow/confirmBorrow',
        payload: msgToServer,
      }).then(() => {
        dispatch({ type: 'manageborrow/changeProcess', payload: 2 });
      });
    } else {
      console.log('ERROR DO');
      sendNotification(
        'Confirm Borrow Fail',
        'Please check status of borrow items, there all should be available',
        'error',
      );
    }
  }
}

export default connect((state) => ({ ...state }))(ManageBorrowPage);
