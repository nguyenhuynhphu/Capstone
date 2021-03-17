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
} from 'antd';
import React from 'react';

const { Paragraph } = Typography;

import { connect, Dispatch } from 'umi';
import ViewForm from './components/ViewForm';
import Form, { FormInstance } from 'antd/lib/form';
import ManageBorrowTable from './components/ManageBorrowTable';
import { getWishlist } from '@/utils/Signalr';
import { fecthDrawer, fetchBooks } from '@/services/manageborrow';
import Title from 'antd/lib/typography/Title';
import styles from './ManageBorrowPage.less';
import moment from 'moment';
import Column from 'antd/lib/table/Column';
import { fetchDrawer } from '@/services/organizebook';

// import moment from 'moment';
const { Step } = Steps;

interface ManageBorrowPageProps {
  dispatch: Dispatch;
  manageborrowpage?: any;
  manageborrowtable?: any;
  manageborrow?: any;
  user?: any;
}
interface ManageBorrowPageState {
  form: any;
  totalFee: number;
}
const connection = getWishlist();
class ManageBorrowPage extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
      totalFee: 0,
    };

    this.hideViewBorrow = this.hideViewBorrow.bind(this);
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
                    key="1"
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
                    key="1"
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
                    key="1"
                    type="primary"
                    onClick={() => {
                      dispatch({
                        type: 'manageborrow/resetState',
                        payload: {},
                      });
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
          <Row style={{ backgroundColor: 'white', padding: '25px 20px', minHeight: 500 }}>
            <Col
              span={6}
              style={{
                display: 'grid',
                gridTemplateColumns: 'auto',
                alignItems: 'center',
                paddingLeft: 20,
                borderRight: '0.5px solid rgba(0, 0, 0, .1)',
              }}
            >
              <Steps
                direction="vertical"
                current={this.props.manageborrow.processStep}
                style={{ height: '100%', transform: 'translateY(50px)' }}
              >
                <Step title="Getting Wishlist" />
                <Step title="Checking Wishlist" />
                <Step title="Complete !" />
              </Steps>
            </Col>
            <Col
              span={18}
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
          <Result
            title="Connect to server to scan order"
            extra={[
              <Button type="primary" key="console" onClick={() => this.openConnection()}>
                Connect
              </Button>,
            ]}
          />
          <Table
            dataSource={[]}
            size={'middle'}
            onRow={(record) => {
              return {
                onDoubleClick: () => {}, // double click row,
              };
            }}
            onChange={(pagination) => {}}
          >
            <Column title="Name" dataIndex="name" key="name" />
            <Column title="Total Row" dataIndex="row" key="row" align={'center'} />
            <Column title="Total Column" dataIndex="col" key="col" align={'center'} />
          </Table>
        </>
      );
    } else {
      return (
        <Spin spinning={manageborrow.screenLoading}>
          <ManageBorrowTable />
          <Drawer
            width={420}
            placement="right"
            closable={false}
            onClose={this.hideViewBorrow}
            visible={manageborrowpage.viewBorrowVisible}
          >
            <ViewForm />
          </Drawer>
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
                dataSource={this.props.manageborrow.wishlist}
                style={{ padding: '0px 20px' }}
                renderItem={(item: any) =>
                  item.data ? (
                    <List.Item>
                      <Space direction={'horizontal'} style={{ width: 380 }}>
                        <Image
                          width={80}
                          height={120}
                          src={item.data.image.length != 0 ? item.data.image[0].url : null}
                        />
                        <div>
                          <p style={{ fontWeight: 'bold', marginBottom: 0 }}>{item.data.name}</p>
                          <p style={{ marginBottom: 0 }}>{item.data.author}</p>
                          <p>Fee: {item.data.fee}$</p>
                          <Paragraph
                            ellipsis={true ? { rows: 2, expandable: true, symbol: 'more' } : false}
                          >
                            {item.data.description}
                          </Paragraph>
                        </div>
                      </Space>
                      <div>
                        <p>Select at:</p>
                        <Select
                          placeholder="Select drawer"
                          style={{ width: 150 }}
                          onChange={(bookId: any) => {
                            console.log(item.data);
                            item.data.choiceBook = bookId;
                          }}
                        >
                          {item.data.drawer.map((value: any) => {
                            console.log('VALUE: >>>', value);

                            return (
                              <Select.Option
                                key={`${value.id}_${value.bookShelfName}`}
                                value={value.bookId}
                              >
                                {value.bookId}
                              </Select.Option>
                            );
                          })}
                        </Select>
                      </div>
                    </List.Item>
                  ) : null
                }
              />
            </Col>
            <Col span={9} className={styles.confirmForm}>
              <Title level={5} style={{ marginBottom: 20 }}>
                Customer Informaton
              </Title>
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
    this.props.dispatch({
      type: 'manageborrow/renderButton',
      payload: true,
    });
    if (connection != undefined) {
      connection
        .start()
        .then((value) => {
          connection.on('ReceiveMessage', (value) => {
            if (value.staffId !== this.props.user.currentUser.id) {
              console.log(value);

              this.fetchWishList(value.wishlist, 1);
            }
          });
          connection.on('ReceiveMessageToReturn', (value) => {
            if (value.staffId !== this.props.user.currentUser.id) {
              console.log(value);

              this.fetchWishList(value.wishlist, 1);
            }
          });
        })
        .catch((e) => console.log('ERROR >> ', e));
    }
  }

  closeConnection() {
    this.props.dispatch({
      type: 'manageborrow/renderButton',
      payload: false,
    });
    if (connection != undefined) {
      connection.stop();
    }
  }

  fetchWishList(listId: any, customerId: any) {
    var total = 0;
    var promiese: any = [];
    var promiese2: any = [];
    listId.forEach((id: any) => {
      promiese.push(fetchBooks(id));
      promiese2.push(fecthDrawer(id));
    });

    Promise.all(promiese)
      .then((value1: any) => {
        Promise.all(promiese2).then((value2) => {
          console.log(value1, value2);
          for (let i = 0; i < value1.length; i++) {
            value1[i].data.drawer = value2[i];
          }
          this.props.dispatch({ type: 'manageborrow/fetchCustomer', payload: customerId });
          this.props.dispatch({ type: 'manageborrow/renderWishList', payload: value1 });
          this.props.dispatch({ type: 'manageborrow/changeProcess', payload: 1 });
        });
      })
      .then(() => {
        this.setState({ totalFee: total });
        if (connection) {
          connection.stop();
        }
      });
  }

  hideViewBorrow() {
    this.props.dispatch({
      type: 'manageborrowpage/hideViewBorrow',
      payload: {},
    });
  }

  onConfirm(dateValue: any) {
    const { manageborrow, user, dispatch } = this.props;

    var tmp: any = [];
    manageborrow.wishlist.forEach((bookGroup: any) => {
      console.log(bookGroup);

      tmp.push({
        bookId: bookGroup.data.choiceBook,
      });
    });

    var msgToServer: any = {
      customerId: manageborrow.customer.id,
      customerName: manageborrow.customer.name,
      startTime: dateValue.date,
      endTime: dateValue.returnDate,
      quantity: manageborrow.wishlist.length,
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
