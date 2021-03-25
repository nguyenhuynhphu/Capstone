import { Drawer, Col, Row, Divider, Button, Space, Image, Carousel, Rate } from 'antd';
import styles from './ComponentsStyle.less';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { Typography } from 'antd';
import { DeleteOutlined, EditOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';
import Paragraph from 'antd/lib/typography/Paragraph';
import { connect, Dispatch } from 'umi';
import ListComment from './ListComment';
import ListBooks from './ListBooks';
import { formatDate } from '@/utils/utils';
const { Text } = Typography;

interface ViewFormProps {
  dispatch: Dispatch;
  bookGroup: any;
}
interface ViewFormState {
  viewBookQuantity: boolean;

  viewBookFeedbacks: boolean;
  bookInGroup: any;
  booksListLoading: boolean;
  booksListHasMore: boolean;
  count: number;
  totalBooks: number;
}

class ViewForm extends React.Component<ViewFormProps, ViewFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      viewBookQuantity: false,
      viewBookFeedbacks: false,

      bookInGroup: [],
      booksListLoading: false,
      booksListHasMore: true,
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
            <Space className={styles.stickButton}>
              <Button
                className={styles.buttonCustom}
                onClick={() =>
                  this.props.dispatch({
                    type: 'managebook/showEditBook',
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
                    <Text>{`${bookGroup.width}x${bookGroup.height}`}</Text>
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
          title="Show book"
          width={320}
          closable={false}
          onClose={this.onChildrenDrawerClose}
          visible={this.state.viewBookQuantity}
        >
          <ListBooks />
        </Drawer>
        <Drawer
          title="Show Feedbacks"
          width={400}
          closable={false}
          onClose={this.onFeedbackDrawerClose}
          visible={this.state.viewBookFeedbacks}
        >
          <ListComment />
        </Drawer>
      </>
    );
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
              <Image width={200} height={270} src={image.url} />
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
