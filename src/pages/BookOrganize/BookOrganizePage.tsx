import { PageHeaderWrapper } from '@ant-design/pro-layout';
import {
  Row,
  Col,
  Drawer,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Badge,
  Divider,
  Spin,
  Space,
} from 'antd';
import styles from './BookOrganizePage.less';
import React from 'react';

import BookShelfTable from './components/BookShelf/BookShelfTable';
import LocationTable from './components/Location/LocationTable';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import InputForm from './components/BookShelf/components/InputForm';

import CustomBookShelf from './components/BookShelf/components/CustomBookShelf';

import AddBookForm from './components/BookShelf/components/AddBookForm';
import TransferBook from './components/BookShelf/components/TransferBook';

import { connect, Dispatch } from 'umi';
import sendNotification from '@/utils/Notification';
interface BookOrganizePageProps {
  dispatch: Dispatch;
  organizebook?: any;
  locationtable?: any;
  drawergrid?: any;
  transferbook?: any;
  global?: any;
  user?: any;
}
interface BookOrganizePageState {
  createLocationVisible: boolean;
  createBookShelfVisible: boolean;
  viewLocationVisible: boolean;
  viewBookShelfVisible: boolean;
  isEditLocation: boolean;
  editFormVisible: boolean;
  organizeBookVisible: boolean;
  selectedPart: any;
}
class BookOrganizePage extends React.Component<BookOrganizePageProps, BookOrganizePageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      createLocationVisible: false,
      //-----------
      createBookShelfVisible: false,
      //-----------
      viewLocationVisible: false,
      isEditLocation: false,
      viewBookShelfVisible: false,
      editFormVisible: false,
      organizeBookVisible: false,
      selectedPart: {
        rowStart: 1,
        rowEnd: 1,
        colStart: 1,
        colEnd: 1,
      },
    };
    //#region  bind function
    this.hideCreateBookShelf = this.hideCreateBookShelf.bind(this);

    this.hideCreateLocation = this.hideCreateLocation.bind(this);

    this.hideViewLocation = this.hideViewLocation.bind(this);

    this.hideViewBookShelf = this.hideViewBookShelf.bind(this);

    this.hideOrganizeBook = this.hideOrganizeBook.bind(this);

    this.onPassingFilter = this.onPassingFilter.bind(this);
    //#endregion
  }

  colors = [
    'pink',
    'red',
    'yellow',
    'orange',
    'cyan',
    'green',
    'blue',
    'purple',
    'geekblue',
    'magenta',
    'volcano',
    'gold',
    'lime',
  ];

  render() {
    const { organizebook, locationtable, global } = this.props;

    return (
      <>
        <PageHeaderWrapper style={{ marginBottom: '20px' }}></PageHeaderWrapper>
        <Row gutter={25}>
          <Col span={14}>
            <Row style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}>
              <Col span={24}>
                <BookShelfTable />
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <Row style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}>
              <Col span={24}>
                <LocationTable />
              </Col>
            </Row>
          </Col>
        </Row>
        <Drawer
          title="Create Bookshelf"
          width={400}
          destroyOnClose
          closable={false}
          onClose={this.hideCreateBookShelf}
          visible={organizebook.createBookShelfVisible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => {}} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button type="primary" form={'createBookShelf'} key="submit" htmlType="submit">
                Save
              </Button>
            </div>
          }
        >
          <InputForm bookShelf={{}} />
        </Drawer>
        <Drawer
          title="Organize Book"
          width={'100vw'}
          height={'100vh'}
          destroyOnClose
          closable={true}
          onClose={this.hideOrganizeBook}
          visible={organizebook.organizeBookVisible}
          placement={'bottom'}
          bodyStyle={{ padding: 0 }}
        >
          <Row style={{ height: '100%' }} className={'organizeRow'}>
            <Col span={7} style={{ height: '100%', borderRight: '1px solid rgba(0, 0, 0, 0.2)' }}>
              <AddBookForm onPassingFilter={this.onPassingFilter} />
            </Col>
            <Col
              span={10}
              style={{ height: '100%', transition: 'all 0.5s', overflow: 'auto' }}
              className={styles.spinningCustom}
            >
              <Spin
                style={{ height: '100% !important' }}
                tip="Loading..."
                spinning={this.props.drawergrid.isLoading}
              >
                <CustomBookShelf />
              </Spin>
            </Col>
            <Col
              span={7}
              className={styles.spinningCustom}
              style={{
                position: 'relative',
                zIndex: 9999,
                borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
              }}
            >
              <TransferBook />
            </Col>
          </Row>
        </Drawer>
        
        <Modal
          visible={organizebook.createLocationVisible}
          title="Create Location"
          onOk={() => {}}
          centered
          width={460}
          onCancel={this.hideCreateLocation}
          footer={[
            <Button key="back" onClick={this.hideCreateLocation}>
              Cancel
            </Button>,
            <Button form={'createLocation'} key="submit" htmlType="submit" type="primary">
              Save
            </Button>,
          ]}
        >
          <Form
            id="createLocation"
            initialValues={{ remember: true }}
            onFinish={(value) => {
              this.insertLocation(value);
            }}
          >
            <Form.Item
              label="Location Name"
              name="name"
              required
              rules={[
                ({ getFieldValue }) => ({
                  validator(rule, value) {
                    if (value != undefined) {
                      if (value.trim().length <= 100) {
                        return Promise.resolve();
                      } else {
                        return Promise.reject(`Name must be less than 100 characters`);
                      }
                    } else {
                      return Promise.reject(`Location name must not empty`);
                    }
                  },
                }),
              ]}
            >
              <Input />
            </Form.Item>
            <Row gutter={16}>
              <Col span={14}>
                <Form.Item
                  label="Color"
                  name="color"
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          return Promise.resolve();
                        } else {
                          return Promise.reject(`Please choice color`);
                        }
                      },
                    }),
                  ]}
                >
                  <Select placeholder="Select color" style={{ width: 120 }}>
                    {global.colors.map((color: any) => (
                      <Select.Option key={color} value={color}>
                        <Badge color={color} text={color} />
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
        <Modal
          visible={organizebook.viewLocationVisible}
          title="Location Detail"
          centered
          width={460}
          className={styles.locationViewModal}
          onCancel={this.hideViewLocation}
          footer={null}
        >
          {!this.state.isEditLocation ? (
            <>
              <Space direction="vertical">
                <Space direction="horizontal">
                  <p>Location: </p>
                  <p>{organizebook.choiceLocation.name}</p>
                </Space>
                <Space direction="horizontal">
                  <p style={{ marginBottom: 0 }}>Color: </p>
                  <Badge
                    color={organizebook.choiceLocation.color}
                    text={organizebook.choiceLocation.color}
                  />
                </Space>
              </Space>
            </>
          ) : (
            <>
              <Form
                id={'updateLocation'}
                initialValues={{ remember: true }}
                onFinish={(value) => {
                  this.editLocation(value);
                }}
              >
                <Form.Item
                  label="Location Name"
                  name="name"
                  initialValue={organizebook.choiceLocation.name}
                  required
                  rules={[
                    ({ getFieldValue }) => ({
                      validator(rule, value) {
                        if (value != undefined) {
                          if (value.trim().length <= 100) {
                            return Promise.resolve();
                          } else {
                            return Promise.reject(`Name must be less than 100 characters`);
                          }
                        } else {
                          return Promise.reject(`Location name must not empty`);
                        }
                      },
                    }),
                  ]}
                >
                  <Input />
                </Form.Item>
                <Row gutter={16}>
                  <Col span={14}>
                    <Form.Item
                      label="Represent Color"
                      name="color"
                      initialValue={organizebook.choiceLocation.color}
                      required
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(rule, value) {
                            if (value != undefined) {
                              return Promise.resolve();
                            } else {
                              return Promise.reject(`Please choice color`);
                            }
                          },
                        }),
                      ]}
                    >
                      <Select placeholder="Select color" style={{ width: 100 }}>
                        {global.colors.map((color: any) => (
                          <Select.Option value={color}>
                            <Badge color={color} text={color} />
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </>
          )}
          {this.props.user.currentUser.roleId == 1 ? (
            <Row>
              <Col span={24} style={{ textAlign: 'right' }}>
                {!this.state.isEditLocation ? (
                  <>
                    <Button
                      className={styles.buttonCustom}
                      onClick={() => this.setState({ isEditLocation: true })}
                      icon={<EditOutlined style={{ color: '#0078d4' }} />}
                    >
                      Edit
                    </Button>
                    <Button
                      className={styles.buttonCustom}
                      onClick={() => this.deleteLocation()}
                      icon={<DeleteOutlined style={{ color: 'red' }} />}
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      form={'updateLocation'}
                      key="submit"
                      htmlType="submit"
                      className={styles.buttonCustom}
                      icon={<EditOutlined style={{ color: '#0078d4' }} />}
                    >
                      Save
                    </Button>
                    <Button
                      className={styles.buttonCustom}
                      onClick={() => this.setState({ isEditLocation: false })}
                      icon={<DeleteOutlined style={{ color: 'red' }} />}
                    >
                      Cancel
                    </Button>
                  </>
                )}
              </Col>
            </Row>
          ) : (
            <></>
          )}
        </Modal>
      </>
    );
  }

  insertLocation(location: any) {
    const { dispatch, locationtable } = this.props;

    dispatch({
      type: 'organizebook/insertLocation',
      payload: { ...location },
    }).then(() => {
      sendNotification('Add Location Successfull !', '', 'success');
      dispatch({
        type: 'locationtable/fetchData',
        payload: {
          filterName: locationtable.filterName,
          pagination: locationtable.pagination.current,
        },
      });
    });
    this.hideCreateLocation();
  }

  editLocation(location: any) {
    const { dispatch, locationtable, organizebook } = this.props;
    dispatch({
      type: 'organizebook/editLocation',
      payload: { ...location, id: organizebook.choiceLocation.id },
    }).then(() => {
      sendNotification('Edit Location Successfull !', '', 'success');
      dispatch({
        type: 'locationtable/fetchData',
        payload: {
          filterName: locationtable.filterName,
          pagination: locationtable.pagination.current,
        },
      });
    });
  }

  deleteLocation() {
    const { dispatch, locationtable, organizebook } = this.props;
    dispatch({
      type: 'organizebook/deleteLocation',
      payload: organizebook.choiceLocation.id,
    }).then(() => {
      sendNotification('Delete Location Successfull !', '', 'success');
      dispatch({
        type: 'locationtable/fetchData',
        payload: {
          filterName: locationtable.filterName,
          pagination: locationtable.pagination.current,
        },
      });
    });
  }

  fetchDrawer() {
    var { organizebook, dispatch } = this.props;
    dispatch({
      type: 'drawergrid/fetchData',
      payload: { ...organizebook.bookshelfLocate, bookSheflId: organizebook.choiceBookShelf.id },
    });
  }

  //#region Page Effect

  hideOrganizeBook() {
   
    this.props
      .dispatch({
        type: 'organizebook/hideOrganizeBookShelf',
        payload: {},
      })
      .then(() => {
        setTimeout(() => {
          this.props.dispatch({
            type: 'organizebook/resetBookShelfLocate',
            payload: {},
          });
        }, 500);
      })
      .then(() => {
        this.props.dispatch({
          type: 'transferbook/cleanData',
          payload: {},
        });
      });
  }

  hideCreateBookShelf() {
    this.props.dispatch({
      type: 'organizebook/hideCreateBookShelf',
      payload: {},
    });
  }

  hideViewBookShelf() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByTagName('body')[0].style.paddingRight = '0px';
    this.setState({
      viewBookShelfVisible: false,
    });
  }

  hideCreateLocation() {
    this.props.dispatch({
      type: 'organizebook/hideCreateLocation',
      payload: {},
    });
  }

  hideViewLocation() {
    this.props
      .dispatch({
        type: 'organizebook/hideViewLocation',
        payload: {},
      })
      .then(() => this.setState({ isEditLocation: false }));
  }
  //#endregion

  onPassingFilter(startRow: any, endRow: any, startCol: any, endCol: any) {
    const { dispatch } = this.props;
    var buttons = document.getElementsByClassName('buttonActive');
    for (let i = 0; i < buttons.length; i++) {
      const element = buttons[i];
      element.classList.remove('active');
    }
    dispatch({
      type: 'organizebook/filterBookShelfLocate',
      payload: {
        rowStart: startRow,
        rowEnd: endRow,
        colStart: startCol,
        colEnd: endCol,
      },
    }).then(() => {
      var promises: any = [];
      promises.push(
        dispatch({
          type: 'drawergrid/fetchData',
          payload: {
            ...this.props.organizebook.bookshelfLocate,
            bookSheflId: this.props.organizebook.choiceBookShelf.id,
          },
        }),
        dispatch({
          type: 'drawergrid/fetchData',
          payload: {
            ...this.props.organizebook.bookshelfLocate,
            bookSheflId: this.props.organizebook.choiceBookShelf.id,
          },
        }),
        dispatch({
          type: 'transferbook/hideAllBooks',
          payload: {},
        }),
      );
      Promise.all(promises);
    });
  }
}
export default connect((state) => ({ ...state }))(BookOrganizePage);
