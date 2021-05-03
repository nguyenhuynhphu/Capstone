import {
  Drawer,
  Col,
  Row,
  Divider,
  Button,
  Space,
  Image,
  Carousel,
  Rate,
  Modal,
  Table,
  InputNumber,
  Descriptions,
  Popconfirm,
} from 'antd';
import styles from './ComponentsStyle.less';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { Typography } from 'antd';
import { DeleteOutlined, EditOutlined, RightOutlined, SoundOutlined } from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';
import Paragraph from 'antd/lib/typography/Paragraph';
import { connect, Dispatch } from 'umi';
import ListComment from './ListComment';
import ListBooks from './ListBooks';
import { formatDate } from '@/utils/utils';
import Column from 'antd/lib/table/Column';
import Pdf from 'react-to-pdf';
import { insertBook } from '@/services/book';
import sendNotification from '@/utils/Notification';
import Description from '@/pages/UploadVideo/components/Description';

var Barcode = require('react-barcode');

const { Text } = Typography;

interface ViewFormProps {
  dispatch: Dispatch;
  bookGroup: any;
  user?: any;
  listbooks?: any;
  disablebook?: any;
  filterBook?: any;
  bookgrouptable?: any;
}
interface ViewFormState {
  viewBookQuantity: boolean;

  viewBookFeedbacks: boolean;
  bookInGroup: any;
  booksListLoading: boolean;
  booksListHasMore: boolean;
  isModalVisible: boolean;
  isPreviewVisible: boolean;
  isDisabelBookVisible: boolean;
  isCreateBookVisible: boolean;
  inputBooks: number;
  exportSelected: any;
  count: number;
  totalBooks: number;
}
const pdfRef = React.createRef();
class ViewForm extends React.Component<ViewFormProps, ViewFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewBookQuantity: false,
      viewBookFeedbacks: false,
      exportSelected: [],
      bookInGroup: [],
      inputBooks: 0,
      isDisabelBookVisible: false,
      isPreviewVisible: false,
      booksListLoading: false,
      booksListHasMore: true,
      isModalVisible: false,
      isCreateBookVisible: false,

      count: 1,
      totalBooks: 0,
    };
    this.createBooks = this.createBooks.bind(this);
  }

  render() {
    const { bookGroup } = this.props;
    return (
      <>
        <Row align={'middle'}>
          <Col span={12}>
            <Title level={3} className="site-description-item-profile-p">
              Book Group Detail
            </Title>
            <Row align={'middle'}>
              <Col span={15}>
                <Row align={'middle'}>
                  <Col span={16}>
                    <Rate
                      allowHalf
                      allowClear={false}
                      value={
                        bookGroup?.ratingAverage != 'NaN' ? bookGroup?.ratingAverage?.toFixed(2) : 0
                      }
                      defaultValue={0}
                      disabled
                    />
                  </Col>
                  <Col span={7} offset={1}>
                    <Title style={{ margin: 0, marginTop: 5 }} level={4}>
                      {bookGroup?.ratingAverage != 'NaN' ? bookGroup?.ratingAverage?.toFixed(2) : 0}
                    </Title>
                  </Col>
                </Row>
              </Col>
              <Col span={9} style={{ marginTop: 6 }}>
                <Link href="#" onClick={this.showFeedbackDrawer}>
                  View Feedbacks <RightOutlined style={{ fontSize: 12 }} />
                </Link>
              </Col>
            </Row>
          </Col>
          <Col span={12} style={{ paddingTop: 5, textAlign: 'right' }}>
            {this.props.user.currentUser.role != 1 ? (
              <Space className={styles.stickButton}>
                <Button
                  className={styles.buttonCustom}
                  onClick={() =>
                    this.props.dispatch({
                      type: 'managebook/showInputBook',
                      payload: { ...bookGroup },
                    })
                  }
                  icon={<EditOutlined style={{ color: '#0078d4' }} />}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Are you sure?"
                  placement='bottomLeft'
                  onConfirm={() => {
                    this.props
                      .dispatch({
                        type: 'managebook/deleteBookGroup',
                        payload: [bookGroup.id],
                      })
                      .then(() => {
                        sendNotification(
                          'Delete Success !',
                          `Successfull delete bookgroup`,
                          'success',
                        );
                        this.props
                          .dispatch({
                            type: 'bookgrouptable/fetchData',
                            payload: {
                              filterName: this.props.bookgrouptable.filterName,
                              pagination: this.props.bookgrouptable.pagination.current,
                            },
                          })
                          .then(() => {
                            this.props.dispatch({
                              type: 'managebook/hideDeleteBook',
                              payload: {},
                            }),
                              this.props
                                .dispatch({
                                  type: 'managebook/hideViewBook',
                                  payload: {},
                                })
                                .then(
                                  this.props.dispatch({
                                    type: 'listcomments/resetData',
                                    payload: {},
                                  }),
                                );
                          });
                      });
                  }}
                >
                  <Button
                    className={styles.buttonCustom}
                    onClick={() => {}}
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                  >
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            ) : (
              <></>
            )}
          </Col>
        </Row>
        <Divider orientation="left">Overview</Divider>
        <Row>
          <Col span={10} style={{ textAlign: 'center' }}>
            <Carousel dots={true}>{this.imageHandel()}</Carousel>
          </Col>
          <Col span={14}>
            <Descriptions column={2} size="small">
              <Descriptions.Item label="Name" span={2} labelStyle={{ fontWeight: 500 }}>
                {bookGroup.name}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Author" span={2}>
                {bookGroup.author}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Categories" span={2}>
                {this.handelCategory()}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Page Count">
                {bookGroup.pageNumber}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Size">
                {`${bookGroup.width ? bookGroup.width : ''}${
                  bookGroup.height ? `x${bookGroup.height}` : ''
                }`}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Quantity">
                {bookGroup.quantity}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="">
                <Link id={'view-book'} href="#" onClick={this.showChildrenDrawer}>
                  More detail <RightOutlined style={{ fontSize: 12 }} />
                </Link>
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Publish Company" span={2}>
                {bookGroup.publishCompany}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Publish Date" span={2}>
                {formatDate(bookGroup.publishDate)}
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Edition" span={2}>
                <Text>{bookGroup.edition}</Text>
              </Descriptions.Item>
              <Descriptions.Item labelStyle={{ fontWeight: 500 }} label="Publishing Place" span={2}>
                <Text className={styles.title}>{bookGroup.publishPlace}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>
        <Divider orientation="left">Description</Divider>
        <Paragraph ellipsis={{ rows: 5, expandable: true, symbol: 'more' }}>
          {bookGroup.description}
        </Paragraph>

        <Drawer
          width={600}
          closable={false}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.viewBookQuantity}
          className={styles.listBook}
        >
          {this.props.user.currentUser.role != 1 ? (
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <Title level={5} style={{ marginBottom: 0 }}>
                Book List
              </Title>
              <Space direction="horizontal">
                <Button type="ghost" onClick={() => this.setState({ isModalVisible: true })}>
                  Export PDF
                </Button>
                <Button
                  type="ghost"
                  onClick={() => {
                    this.props.dispatch({
                      type: 'disablebook/fetchData',
                      payload: bookGroup.id,
                    });
                    this.setState({ isDisabelBookVisible: true });
                  }}
                >
                  Disable Book
                </Button>
                <Button type="primary" onClick={() => this.setState({ isCreateBookVisible: true })}>
                  Create Books
                </Button>
              </Space>
            </Space>
          ) : (
            <Title level={5} style={{ marginBottom: 0 }}>
              Book List
            </Title>
          )}

          <Divider />
          <ListBooks filterBook={this.props.filterBook} />
        </Drawer>
        <Drawer
          title="Show Feedbacks"
          width={400}
          closable={false}
          onClose={this.onFeedbackDrawerClose}
          visible={this.state.viewBookFeedbacks}
        >
          <ListComment bookGroup={bookGroup} />
        </Drawer>
        <Modal
          title="Disable Book"
          visible={this.state.isDisabelBookVisible}
          //className={styles.exportSection}

          centered
          bodyStyle={{ paddingTop: 10, paddingBottom: 10 }}
          onCancel={() => this.setState({ isDisabelBookVisible: false })}
          footer={[
            <Button key="back" onClick={() => this.setState({ isDisabelBookVisible: false })}>
              Close
            </Button>,
          ]}
        >
          <Table
            loading={this.props.disablebook.isLoading}
            dataSource={this.props.disablebook.data}
            pagination={false}
            scroll={{ y: 500 }}
          >
            <Column title="Book ID" dataIndex="id" />
            <Column title="Note" dataIndex="note" key="name" />
          </Table>
        </Modal>
        <Modal
          title="Choice books"
          visible={this.state.isModalVisible}
          className={styles.exportSection}
          centered
          bodyStyle={{ paddingTop: 10, paddingBottom: 10 }}
          onCancel={() => this.setState({ isModalVisible: false, exportSelected: [] })}
          footer={[
            <Button
              key="back"
              onClick={() => this.setState({ isModalVisible: false, exportSelected: [] })}
            >
              Cancel
            </Button>,
            <Button onClick={() => this.setState({ isPreviewVisible: true })} type="primary">
              Preview
            </Button>,
          ]}
        >
          <Table
            dataSource={this.props.listbooks.data}
            pagination={false}
            rowSelection={{
              selectedRowKeys: this.state.exportSelected,
              onChange: (selectedRowKeys: any) =>
                this.setState({ exportSelected: selectedRowKeys }),
            }}
            scroll={{ y: 480 }}
          >
            <Column title="Book ID" dataIndex="id" />
            <Column title="Barcode" dataIndex="barCode" key="name" />
          </Table>
        </Modal>
        <Modal
          title="Preview PDF"
          visible={this.state.isPreviewVisible}
          centered
          width={900}
          bodyStyle={{ paddingTop: 10, paddingBottom: 10 }}
          onCancel={() => this.setState({ isPreviewVisible: false, exportSelected: [] })}
          footer={[
            <Button
              key="back"
              onClick={() => this.setState({ isPreviewVisible: false, exportSelected: [] })}
            >
              Close
            </Button>,
            <Pdf
              filename={`${bookGroup.names?.replace(/\s/g, '')}.pdf`}
              targetRef={pdfRef}
              option={{
                orientation: 'landscape',
                unit: 'in',
                format: [4, 2],
              }}
            >
              {({ toPdf }: any) => (
                <Button
                  key="submit"
                  type="primary"
                  onClick={this.state.exportSelected.length != 0 ? toPdf : null}
                >
                  Export
                </Button>
              )}
            </Pdf>,
          ]}
        >
          {this.state.exportSelected.length != 0 ? (
            <div
              ref={pdfRef}
              style={{
                width: '100%',
                height: '100%',
              }}
            >
              <Title level={5}>{bookGroup.name}</Title>
              <div>
                {this.state.exportSelected.map((book: any) => (
                  <Barcode value={book} format="CODE128" fontSize={20} width={2} height={50} />
                ))}
              </div>
            </div>
          ) : (
            <Space
              direction="vertical"
              style={{ height: 200, width: '100%', alignItems: 'center', justifyContent: 'center' }}
            >
              <SoundOutlined style={{ fontSize: 40, color: 'rgba(0, 0, 0, .4)' }} />
              <Title level={5} style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .4)' }}>
                Nothing for review
              </Title>
            </Space>
          )}
        </Modal>
        <Modal
          title="Create Book"
          centered
          visible={this.state.isCreateBookVisible}
          width={400}
          onCancel={() => this.setState({ isCreateBookVisible: false })}
          footer={[
            <Button onClick={() => this.setState({ isCreateBookVisible: false, inputBooks: 0 })}>
              Close
            </Button>,
            <Button onClick={this.createBooks} type={'primary'}>
              Create
            </Button>,
          ]}
        >
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
            <p style={{ marginBottom: 0 }}>Number of books: </p>
            <InputNumber
              style={{ width: 200 }}
              min={1}
              onChange={(value: any) => this.setState({ inputBooks: parseInt(value) })}
            />
          </Space>
        </Modal>
      </>
    );
  }
  async createBooks() {
    const { inputBooks } = this.state;
    const { bookGroup, dispatch, bookgrouptable } = this.props;

    dispatch({
      type: 'listbooks/createBook',
      payload: { bookGroupId: bookGroup.id, inputBooks: inputBooks },
    }).then(() => {
      sendNotification('Create books succecss !', '', 'success');
      dispatch({
        type: 'listbooks/fetchData',
        payload: bookGroup.id,
      });
      dispatch({
        type: 'managebook/showViewBook',
        payload: bookGroup.id,
      });
      dispatch({
        type: 'bookgrouptable/fetchData',
        payload: {
          filterName: bookgrouptable.filterName,
          pagination: bookgrouptable.pagination.current,
        },
      });
      this.setState({ isCreateBookVisible: false, inputBooks: 0 });
    });
  }

  handelCategory() {
    const { bookGroup } = this.props;
    let tmp = '';
    try {
      for (let i = 0; i < bookGroup.category.length; i++) {
        const element = bookGroup.category[i];
        if (i == bookGroup.category.length - 1) tmp += element.name;
        else tmp += element.name + ', ';
      }
    } catch (error) {
      tmp = 'Not have categories yet !';
    }

    return tmp;
  }

  imageHandel() {
    let tmp: any = [];
    const { bookGroup } = this.props;
    if (bookGroup != undefined)
      if (bookGroup.image != undefined) {
        bookGroup.image.forEach((image: any) => {
          tmp.push(
            <div>
              <Image width={200} height={280} src={image.url} />
            </div>,
          );
        });
      }
    return tmp;
  }
  //#region
  showChildrenDrawer = () => {
    this.setState({
      viewBookQuantity: true,
      bookInGroup: [],
    });
    const { dispatch, bookGroup } = this.props;
    dispatch({
      type: 'listbooks/fetchData',
      payload: bookGroup.id,
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      viewBookQuantity: false,
    });
  };

  showFeedbackDrawer = () => {
    const { dispatch, bookGroup } = this.props;
    this.setState({
      viewBookFeedbacks: true,
    });
    dispatch({
      type: 'listcomments/fetchData',
      payload: { id: bookGroup.id, page: 1 },
    });
  };

  onFeedbackDrawerClose = () => {
    this.setState({
      viewBookFeedbacks: false,
    });
    this.props.dispatch({
      type: 'listcomments/resetData',
      payload: {},
    });
  };

  //#endregion
}

export default connect((state) => ({ ...state }))(ViewForm);
