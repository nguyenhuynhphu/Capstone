import { Drawer, Col, Row, Divider, Button, Space, Image, Carousel, Rate, List, Spin } from 'antd';
import styles from './ComponentsStyle.less';
import React from 'react';
import Title from 'antd/lib/typography/Title';
import { DeleteOutlined, EditOutlined, RightOutlined } from '@ant-design/icons';
import Link from 'antd/lib/typography/Link';
import Paragraph from 'antd/lib/typography/Paragraph';
import { fetchAllBook } from '@/services/book';
import InfiniteScroll from 'react-infinite-scroller';
import { connect, Dispatch } from 'umi';

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
const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);

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
    console.log('BOOKGROUP', bookGroup);
    return (
      <>
        <Row align={'middle'}>
          <Col span={12}>
            <Title level={2} className="site-description-item-profile-p">
              Book Group Detail
            </Title>
            <Row align={'middle'}>
              <Col span={12}>
                <Rate allowClear={false} defaultValue={3} disabled />
              </Col>
              <Col span={12}>
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
                    payload: {  ...bookGroup },
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
            <Row>
              <Col span={24}>
                <DescriptionItem title="Book Name" content={bookGroup.name} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Author" content={bookGroup.author} />
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <DescriptionItem title="Category" />
              </Col>
              <Col span={20} style={{ paddingLeft: 7 }}>
                <Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }}>
                  Ant Design, a design language for background applications, is refined by Ant UED
                  Team. Ant Design, a design language for background applications, is refined by Ant
                  UED Team.
                </Paragraph>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <DescriptionItem title="Page Number" content={bookGroup.pageNumber} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Size" content={`${bookGroup.width}x${bookGroup.height}`} />
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <DescriptionItem title="Book in system" content={bookGroup.quantity} />
              </Col>
              <Col span={12}>
                <Link href="#" onClick={this.showChildrenDrawer}>
                  More detail <RightOutlined style={{ fontSize: 12 }} />
                </Link>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Publishing Company" content={bookGroup.publishingCompany} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Publish date" content={bookGroup.publishDate} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Publishing Place" content={bookGroup.publishingPalace} />
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
          <div style={{ overflow: 'auto', height: 300 }}>
            <InfiniteScroll
              initialLoad={false}
              pageStart={0}
              loadMore={this.handleInfiniteOnLoad}
              hasMore={!this.state.booksListLoading && this.state.booksListHasMore}
              useWindow={false}
            >
              <List
                dataSource={this.state.bookInGroup}
                renderItem={(item: any, index: number) => (
                  <List.Item key={item.id}>
                    <List.Item.Meta title={item.bookGroupId} />
                    <div>{item.id}</div>
                  </List.Item>
                )}
              >
                {this.state.booksListLoading && this.state.booksListHasMore && (
                  <div className="demo-loading-container">
                    <Spin />
                  </div>
                )}
              </List>
            </InfiniteScroll>
          </div>
        </Drawer>
        <Drawer
          title="Show Feedbacks"
          width={320}
          closable={false}
          onClose={this.onFeedbackDrawerClose}
          visible={this.state.viewBookFeedbacks}
        >
          This is two-level drawer
        </Drawer>
      </>
    );
  }

  imageHandel() {
    let tmp: any = [];
    const { bookGroup } = this.props;
    if (bookGroup != undefined)
      bookGroup.image.forEach((image: any) => {
        tmp.push(
          <div>
            <Image width={200} height={270} src={image.url} />
          </div>,
        );
      });
    return tmp;
  }

  handleInfiniteOnLoad = () => {
    let { bookInGroup, count, totalCount } = this.state;

    this.setState({
      booksListLoading: true,
    });

    if (bookInGroup.length >= totalCount) {
      this.setState({
        booksListHasMore: false,
        booksListLoading: false,
      });
      return;
    }
    this.fetchAllBook(count);
  };

  async fetchAllBook(count: number) {
    if (this.props.bookGroup.id != undefined) {
      await fetchAllBook(this.props.bookGroup.id, count).then((value) =>
        this.setState({
          bookInGroup: this.state.bookInGroup.concat(value.data),
          booksListLoading: false,
          totalBooks: value.meta.totalCount,
          count: value.meta.totalPages >= this.state.count ? count + 1 : this.state.count,
        }),
      );
    }
  }
  //#region
  showChildrenDrawer = () => {
    this.fetchAllBook(1);
    this.setState({
      viewBookQuantity: true,
      bookInGroup: [],
    });
  };

  onChildrenDrawerClose = () => {
    this.setState({
      viewBookQuantity: false,
    });
  };

  showFeedbackDrawer = () => {
    this.setState({
      viewBookFeedbacks: true,
    });
  };

  onFeedbackDrawerClose = () => {
    this.setState({
      viewBookFeedbacks: false,
    });
  };

  //#endregion
}

export default connect() (ViewForm);
