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

var Barcode = require('react-barcode');

const { Text } = Typography;

interface ViewFormProps {
  dispatch: Dispatch;
  bookGroup: any;
  user?: any;
  listbooks?: any;
}
interface ViewFormState {
  viewBookQuantity: boolean;

  viewBookFeedbacks: boolean;
  bookInGroup: any;
  booksListLoading: boolean;
  booksListHasMore: boolean;
  isModalVisible: boolean;
  isPreviewVisible: boolean;

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
      isPreviewVisible: false,
      booksListLoading: false,
      booksListHasMore: true,
      isModalVisible: false,
      count: 1,
      totalBooks: 0,
    };
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
                      value={bookGroup.ratingAverage != undefined ? bookGroup.ratingAverage : 0}
                      defaultValue={0}
                      disabled
                    />
                  </Col>
                  <Col span={7} offset={1}>
                    <Title style={{ margin: 0, marginTop: 5 }} level={4}>
                      {bookGroup.ratingAverage != undefined
                        ? bookGroup.ratingAverage.toFixed(2)
                        : 0}
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
                <Button
                  className={styles.buttonCustom}
                  onClick={() => {}}
                  icon={<DeleteOutlined style={{ color: 'red' }} />}
                >
                  Delete
                </Button>
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
            <Row className={styles.row}>
              <Col span={6}>
                <Text className={styles.title}>Book Name: </Text>
              </Col>
              <Col span={18}>
                <Text>{bookGroup.name}</Text>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={6}>
                <Text className={styles.title}>Book Author: </Text>
              </Col>
              <Col span={18}>
                <Text>{bookGroup.author}</Text>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={6}>
                <Text className={styles.title}>Category: </Text>
              </Col>
              <Col span={18}>
                <Paragraph
                  style={{ marginBottom: 0 }}
                  ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}
                >
                  {this.handelCategory()}
                </Paragraph>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={11}>
                <Row>
                  <Col span={13}>
                    <Text className={styles.title}>Page Number: </Text>
                  </Col>
                  <Col span={9} offset={1}>
                    <Text>{bookGroup.pageNumber}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Row>
                  <Col span={5}>
                    <Text className={styles.title}>Size: </Text>
                  </Col>
                  <Col span={18}>
                    <Text>{`${bookGroup.width ? bookGroup.width : ''}${
                      bookGroup.height ? `x${bookGroup.height}` : ''
                    }`}</Text>
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={11}>
                <Row>
                  <Col span={13}>
                    <Text className={styles.title}>Quantity: </Text>
                  </Col>
                  <Col span={9}>
                    <Text>{bookGroup.quantity}</Text>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Link href="#" onClick={this.showChildrenDrawer}>
                  More detail <RightOutlined style={{ fontSize: 12 }} />
                </Link>
              </Col>
              <Col span={12}></Col>
            </Row>
            <Row className={styles.row}>
              <Col span={11}>
                <Text className={styles.title}>Publishing Company: </Text>
              </Col>
              <Col span={12}>
                <Text>{bookGroup.publishCompany}</Text>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={11}>
                <Text className={styles.title}>Publish date: </Text>
              </Col>
              <Col span={12}>
                <Text>{formatDate(bookGroup.publishDate)}</Text>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={11}>
                <Text className={styles.title}>Edition: </Text>
              </Col>
              <Col span={12}>
                <Text>{bookGroup.edition}</Text>
              </Col>
            </Row>
            <Row className={styles.row}>
              <Col span={11}>
                <Text className={styles.title}>Publishing Place: </Text>
              </Col>
              <Col span={12}>
                <Text>{bookGroup.publishPlace}</Text>
              </Col>
            </Row>
          </Col>
        </Row>
        <Divider orientation="left">Description</Divider>
        <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
          {bookGroup.description}
        </Paragraph>

        <Drawer
          width={500}
          closable={false}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.viewBookQuantity}
          className={styles.listBook}
        >
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
            <Title level={5} style={{ marginBottom: 0 }}>
              Book List
            </Title>
            <Button type="ghost" onClick={() => this.setState({ isModalVisible: true })}>
              Export PDF
            </Button>
          </Space>
          <Divider />
          <ListBooks />
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
            <Button onClick={() => this.setState({ isPreviewVisible: true })} type='primary'>Preview</Button>,
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
              filename={`${bookGroup.name.replace(/\s/g, "")}.pdf`}
              targetRef={pdfRef}
              option={{
                orientation: 'landscape',
                unit: 'in',
                format: [4, 2],
              }}
            >
              {({ toPdf }: any) => (
                <Button key="submit" type="primary" onClick={toPdf}>
                  Export
                </Button>
              )}
            </Pdf>,
          ]}
        >
          {/* <Title level={5}>{bookGroup.name}</Title>
          <div style={{ height: 300, overflow: 'auto', overflowY: 'auto' }}>
            {this.state.exportSelected.map((book: any) => (
              <Barcode value={book} />
            ))}
          </div> */}
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
              <SoundOutlined style={{fontSize: 40, color: 'rgba(0, 0, 0, .4)'}}/>
              <Title level={5} style={{ textAlign: 'center', color: 'rgba(0, 0, 0, .4)' }}>
              Nothing for review
              </Title>
            </Space>
          )}
        </Modal>
      </>
    );
  }
  handelBarcode() {
    var tmp: any = [];
    console.log('this.state.exportSelected', this.state.exportSelected);
    console.log('this.props.listbooks.data', this.props.listbooks.data);
    for (let i = 0; i < this.state.exportSelected.length; i++) {
      const bookId = this.state.exportSelected[i];
      for (let j = 0; j < this.props.listbooks.data.length; j++) {
        const book = this.props.listbooks.data[j];
        if (book.id == bookId) {
          tmp.push(book);
        }
      }
    }
    console.log('BOOK', tmp);

    return <div></div>;
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
