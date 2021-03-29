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
  Image,
  Space,
  Spin,
  Steps,
  Typography,
  Input,
  Table,
  Select,
  Descriptions,
  Popover,
  Popconfirm,
  Skeleton,
  ConfigProvider,
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
  fetchBorrowBook,
  fetchBorrowDetail,
  fetchBorrowDetailByBarcode,
  fetchCustomer,
  fetchCustomerByName,
} from '@/services/manageborrow';
import Title from 'antd/lib/typography/Title';
import styles from './ManageBorrowPage.less';
import moment from 'moment';
import Column from 'antd/lib/table/Column';
import { fetchDrawer } from '@/services/organizebook';
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
  customerName: any;
  loadingList: boolean;
  isGetReturnCustomer: boolean;
}
const connection = getWishlist();
class ManageBorrowPage extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
      totalFee: 0,
      customerName: [],
      loadingList: false,
      isGetReturnCustomer: false,
    };

    this.hideViewBorrow = this.hideViewBorrow.bind(this);
    this.searchCustomer = this.searchCustomer.bind(this);
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
          {this.props.manageborrow.returnList ? (
            <Space style={{ width: '100%' }} direction={'vertical'}>
              {this.props.manageborrow.returnList?.map((borrowBook: any) => (
                <BorrowBookSection borrowBook={borrowBook} />
              ))}
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
    switch (step) {
      case 0:
        return (
          <Result
            title="Scanning QR code"
            subTitle="Please using phone to scan customer QR code !"
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
                      title="Title"
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
              {this.props.manageborrow.customer.id != undefined ? (
                <>
                  <Space
                    style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between' }}
                  >
                    <Title level={5} style={{ marginBottom: 0 }}>
                      Customer Informaton
                    </Title>
                    <Popconfirm
                      title="Are you sure to re-choice user?"
                      onConfirm={() =>
                        this.props.dispatch({
                          type: 'manageborrow/loadCustomer',
                          payload: {},
                        })
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type={'text'} style={{ color: 'red' }}>
                        <RedoOutlined /> Rechoice User
                      </Button>
                    </Popconfirm>
                  </Space>

                  <Row>
                    <Col span={8}>Name:</Col>
                    <Col span={16}>{this.props.manageborrow?.customer.name}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>Email:</Col>
                    <Col span={16}>{this.props.manageborrow?.customer.email}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>Address:</Col>
                    <Col span={16}>{this.props.manageborrow?.customer.address}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>Phone:</Col>
                    <Col span={16}>{this.props.manageborrow?.customer.phone}</Col>
                  </Row>
                  <Row>
                    <Col span={8}>Total Fee:</Col>
                    <Col span={16}>{this.state.totalFee}$</Col>
                  </Row>
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
                      initialValue={moment()}
                      style={{ marginBottom: 25 }}
                    >
                      <DatePicker onChange={() => {}} style={{ marginLeft: 30 }} />
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
                  <p style={{ marginBottom: 0 }}>Select Customer</p>
                  <Search
                    placeholder="input search text"
                    enterButton="Search"
                    size="middle"
                    suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
                    onSearch={(customerName: string) => this.searchCustomer(customerName)}
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
                      dataSource={this.state.customerName}
                      renderItem={(item: any) => (
                        <List.Item
                          actions={[
                            <Popconfirm
                              title="Are you sure to select this user?"
                              onConfirm={() => {
                                this.props.dispatch({
                                  type: 'manageborrow/fetchCustomer',
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
                              title={item.name}
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

  openConnection() {
    const { dispatch, manageborrow } = this.props;
    this.setState({ isGetReturnCustomer: true });
    dispatch({
      type: 'manageborrow/renderButton',
      payload: true,
    });
    if (connection != undefined) {
      connection
        .start()
        .then((value) => {
          connection.on('ReceiveMessageToBorrow', async (value) => {
            //tunwgf cuoons
            console.log("ReceiveMessageToBorrow", value);
            if (value.staffId !== this.props.user.currentUser.id) {
              var book: any = await fetchBookByBarcode(value.barcode);
              if (book.data[0] != undefined) {
                var bookGroup = await fetchBooks(book.data[0].bookGroupId);
                bookGroup.data.selectedBook = book.data[0];

                dispatch({
                  type: 'manageborrow/addToScanId',
                  payload: [bookGroup.data],
                });
                this.fetchWishList(undefined);
              }
            }
          });
          connection.on('ReceiveMessage', async (value) => {
            //wishlist
            console.log("ReceiveMessage", value);
            

            if (value.staffId !== this.props.user.currentUser.id) {
              var promiese: any = [];
              if (value.wishlist != undefined) {
                value.wishlist.forEach((id: any) => {
                  promiese.push(fetchBooks(id));
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

                this.fetchWishList(value.customerId);
              }
            }
          });

          connection.on('ReceiveMessageToReturnBook', async (value) => {
            console.log('ReceiveMessageToReturnBook', value);

            if (value.staffId !== this.props.user.currentUser.id) {
              var listBorrow = await fetchBorrowDetailByBarcode(value.barcode);

              if (listBorrow.data != undefined) {
                if (listBorrow.data.length != 0) {
                  var tmp: any = manageborrow.returnList.find(
                    (record: any) => record.borrowBookId == listBorrow.data[0].borrowId,
                  );
                  if (tmp == undefined) {
                    // chua ton tai
                    var fetchBorrowDetail = await fetchBorrowBook(listBorrow.data[0].borrowId);

                    var customer = await fetchCustomer(fetchBorrowDetail.data.customerId);
                    var firstScan = listBorrow.data.find(
                      (borrowDetail: any) => borrowDetail.barcode == value.barcode,
                    );
                    firstScan.isReturn = true;
                    tmp = {
                      customer: customer.data,
                      borrowBookId: listBorrow.data[0].borrowId,
                      borrowDetails: listBorrow.data.map((borrowDetail: any) => borrowDetail),
                    };
                    dispatch({
                      type: 'manageborrow/addToReturnList',
                      payload: tmp,
                    });
                  } else {
                    // ton tai
                    var scanItem = tmp.borrowDetails.find(
                      (borrowDetail: any) => borrowDetail.barcode == value.barcode,
                    );
                    scanItem.isReturn = true;
                  }
                  console.log('manageborrow.returnList', manageborrow.returnList);
                }
              }
            }
          });
        })
        .catch((e) => console.log('ERROR >> ', e));
    }
  }

  closeConnection() {
    this.setState({ isGetReturnCustomer: false });
    this.props.dispatch({
      type: 'manageborrow/renderButton',
      payload: false,
    });
    if (connection != undefined) {
      connection.stop();
    }
  }

  async fetchWishList(customerId: any) {
    const { dispatch, manageborrow } = this.props;

    for (let i = 0; i < manageborrow.scanId.length; i++) {
      const book = manageborrow.scanId[i];
      book.drawer = undefined;
      var drawer = await fecthDrawer(book.id);
      if (drawer.length == 0) {
        book.drawer = undefined;
      } else {
        book.drawer = drawer;
      }
    }

    if (customerId != undefined) {
      dispatch({ type: 'manageborrow/fetchCustomer', payload: customerId });
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

  async searchCustomer(customerName: string) {
    this.setState({ loadingList: true });
    var tmp = await fetchCustomerByName(customerName);
    this.setState({ customerName: tmp.data, loadingList: false });
  }

  onConfirm(dateValue: any) {
    const { manageborrow, user, dispatch } = this.props;

    var tmp: any = [];
    console.log(manageborrow.scanId);
    manageborrow.scanId.forEach((book: any) => {
      console.log(book);

      tmp.push({
        bookId: book.selectedBook.id,
      });
    });

    var msgToServer: any = {
      customerId: manageborrow.customer.id,
      customerName: manageborrow.customer.name,
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
  }
}

export default connect((state) => ({ ...state }))(ManageBorrowPage);
