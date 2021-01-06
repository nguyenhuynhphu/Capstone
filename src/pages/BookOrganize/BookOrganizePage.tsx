import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Row, Col, Drawer, Button, Modal, Form, Input, Select, Badge, Divider, Switch } from 'antd';
import styles from './BookOrganizePage.less';
import React from 'react';

import BookShelfTable from './components/BookShelf/BookShelfTable';
import LocationTable from './components/Location/LocationTable';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import InputForm from './components/BookShelf/components/InputForm';
import ViewForm from './components/BookShelf/components/ViewForm';
import CustomBookShelf from './components/BookShelf/components/CustomBookShelf';
import Minimap from './components/BookShelf/components/Minimap';
import AddBookForm from './components/BookShelf/components/AddBookForm';
import TransferBook from './components/BookShelf/components/TransferBook';
import { fetchAllBookShelf } from '@/services/bookshelf';
import Title from 'antd/lib/typography/Title';
import Search from 'antd/lib/input/Search';
import { fetchAllLocation } from '@/services/location';
import { connect, Dispatch } from 'umi';
interface BookOrganizePageProps {
  dispatch: Dispatch;
  organizebook: any;
  locationtable: any;
  global: any;
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
  choiceBookShelf: any;

  bookShelfData: any;
  bookShelfPaginaton: any;
  bookShelfLoading: boolean;

  locationData: any;
  locationPaginaton: any;
  locationLoading: boolean;
}
const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

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
      choiceBookShelf: {
        column: 10,
        row: 20,
      },
      bookShelfData: [],
      bookShelfPaginaton: {
        current: 1,
        total: 0,
      },
      bookShelfLoading: false,

      locationData: [],
      locationPaginaton: {
        current: 1,
        total: 0,
      },
      locationLoading: false,
    };
    //#region  bind function
    this.hideCreateBookShelf = this.hideCreateBookShelf.bind(this);

    this.hideCreateLocation = this.hideCreateLocation.bind(this);

    this.hideViewLocation = this.hideViewLocation.bind(this);

    this.hideViewBookShelf = this.hideViewBookShelf.bind(this);
    this.showOrganizeBook = this.showOrganizeBook.bind(this);
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

  componentDidMount() {}

  render() {
    const { organizebook, locationtable, global } = this.props;
    return (
      <>
        <PageHeaderWrapper style={{ marginBottom: '20px' }}></PageHeaderWrapper>
        <Row gutter={25}>
          <Col span={16}>
            <div className={styles.bookShelfTable}>
              <BookShelfTable
                onOrganize={this.showOrganizeBook}
                pagination={this.state.bookShelfPaginaton}
                dataSource={this.state.bookShelfData}
                isLoading={this.state.bookShelfLoading}
              />
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.bookShelfTable}>
              <LocationTable />
            </div>
          </Col>
        </Row>
        <Drawer
          title="Create book shelf"
          width={400}
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
                Submit
              </Button>
            </div>
          }
        >
          <InputForm bookShelf={{}} />
        </Drawer>
        <Drawer
          title="Book shelf detail"
          width={400}
          closable={true}
          onClose={this.hideViewBookShelf}
          visible={this.state.viewBookShelfVisible}
        >
          <ViewForm bookShelf={null} />
        </Drawer>
        <Drawer
          title="Create book shelf"
          width={400}
          closable={false}
          onClose={this.hideEditBookShelf}
          visible={this.state.editFormVisible}
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
                Submit
              </Button>
            </div>
          }
        >
          <InputForm bookShelf={{}} />
        </Drawer>
        <Drawer
          title="Organize Book"
          width={'100vw'}
          closable={true}
          onClose={this.hideOrganizeBook}
          visible={this.state.organizeBookVisible}
          bodyStyle={{ padding: 0 }}
        >
          <Row style={{ height: '100%' }} className={'organizeRow'}>
            <Col span={6} style={{ height: '100%' }}>
              <AddBookForm
                column={this.state.choiceBookShelf.column}
                row={this.state.choiceBookShelf.row}
                onPassingFilter={this.onPassingFilter}
              />

              <Divider orientation="left" style={{ marginBottom: 4 }}>
                Minimap
              </Divider>
              <Row>
                <Col className={'calcCol'} span={24} style={{ textAlign: 'center' }}>
                  <Minimap
                    column={this.state.choiceBookShelf.column}
                    row={this.state.choiceBookShelf.row}
                    selectedPart={this.state.selectedPart}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={11} style={{ height: 675 }}>
              <CustomBookShelf
                data={null}
                column={this.state.choiceBookShelf.column}
                row={this.state.choiceBookShelf.row}
                selectedPart={this.state.selectedPart}
              />
            </Col>
            <Col span={7} style={{ height: 675 }}>
              <TransferBook />
            </Col>
          </Row>
        </Drawer>
        <Drawer
          mask={false}
          visible={organizebook.deleteLocationVisible}
          placement={'bottom'}
          closeIcon={null}
          height={70}
        >
          <Row align={'middle'} style={{ height: '100%', paddingLeft: 50 }}>
            <Col span={8}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                Do you want to delete {organizebook.selectedRowKeys.length} location ?
              </p>
            </Col>
            <Col span={3} offset={13}>
              <Button
                type="primary"
                danger
                onClick={() =>
                  this.props
                    .dispatch({
                      type: 'organizebook/deleteLocation',
                      payload: organizebook.selectedRowKeys,
                    })
                    .then(() => {
                      this.props.dispatch({
                        type: 'locationtable/fetchData',
                        payload: {
                          filterName: locationtable.filterName,
                          pagination: locationtable.pagination.current,
                        },
                      });
                    })
                }
              >
                Delete
              </Button>
              <Button style={{ marginLeft: 15 }}>Cancel</Button>
            </Col>
          </Row>
        </Drawer>
        <Modal
          visible={organizebook.createLocationVisible}
          title="Create Location"
          onOk={() => {}}
          centered
          width={400}
          onCancel={this.hideCreateLocation}
          footer={[
            <Button key="back" onClick={this.hideCreateLocation}>
              Cancel
            </Button>,
            <Button
              form={'createLocation'}
              key="submit"
              htmlType="submit"
              type="primary"
              onClick={() => {
                this.hideCreateLocation();
              }}
            >
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
            <Form.Item label="Location Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Represent Color" name="color">
              <Select placeholder="Select color" style={{ width: 120 }}>
                {global.colors.map((color: any) => (
                  <Select.Option value={color}>
                    <Badge color={color} text={color} />
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Using Room" name="isRoom" initialValue={true}>
              <Switch defaultChecked onChange={() => {}} />
            </Form.Item>
          </Form>
        </Modal>
        <Modal
          visible={organizebook.viewLocationVisible}
          title="Location Detail"
          centered
          width={400}
          className={styles.locationViewModal}
          onCancel={this.hideViewLocation}
          footer={null}
        >
          <Row>
            <Col span={24}>
              <DescriptionItem title="Location" content={organizebook.choiceLocation.name} />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem
                title="Color"
                content={
                  <Badge
                    color={organizebook.choiceLocation.color}
                    text={organizebook.choiceLocation.color}
                  />
                }
              />
            </Col>
          </Row>

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
                    onClick={() => {}}
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                  >
                    Delete
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    className={styles.buttonCustom}
                    onClick={() => alert('hello')}
                    icon={<EditOutlined style={{ color: '#0078d4' }} />}
                  >
                    Save
                  </Button>
                  <Button
                    className={styles.buttonCustom}
                    onClick={() => {}}
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Col>
          </Row>
        </Modal>
      </>
    );
  }

  insertLocation(location: any) {
    const { dispatch, locationtable } = this.props;
    dispatch({
      type: 'organizebook/insertLocation',
      payload: { ...location },
    }).then(() =>
      dispatch({
        type: 'locationtable/fetchData',
        payload: {
          filterName: locationtable.filterName,
          pagination: locationtable.pagination.current,
        },
      }),
    );
  }

  //#region Page Effect

  showOrganizeBook() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].style.paddingRight = '17px';
    this.setState({
      organizeBookVisible: true,
    });
  }
  hideOrganizeBook() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByTagName('body')[0].style.paddingRight = '0px';
    this.setState({
      organizeBookVisible: false,
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
    console.log('LOCATION: ', this.props.organizebook.choiceLocation);
    this.props.dispatch({
      type: 'organizebook/hideCreateLocation',
      payload: {},
    });
  }

  hideViewLocation() {
    this.props.dispatch({
      type: 'organizebook/hideViewLocation',
      payload: {},
    });
  }
  //#endregion

  onPassingFilter(startRow: any, endRow: any, startCol: any, endCol: any) {
    this.setState({
      selectedPart: {
        rowStart: startRow,
        rowEnd: endRow,
        colStart: startCol,
        colEnd: endCol,
      },
    });
  }
}
export default connect((state) => ({ ...state }))(BookOrganizePage);
