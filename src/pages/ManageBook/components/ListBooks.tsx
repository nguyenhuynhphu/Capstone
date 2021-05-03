import React from 'react';

import { connect, Dispatch } from 'umi';
import {
  List,
  Skeleton,
  Button,
  Descriptions,
  Tag,
  Row,
  Col,
  Alert,
  Space,
  Popover,
  Typography,
  Spin,
  Modal,
  Input,
} from 'antd';
import { CheckOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import sendNotification from '@/utils/Notification';
import { deleteBook, fetchBookById } from '@/services/book';
import Avatar from 'antd/lib/avatar/avatar';
const { Text } = Typography;
interface ListBookProps {
  dispatch: Dispatch;
  listbooks?: any;
  user?: any;
  filterBook: number;
}
interface ListBookState {
  borrowBook: any;
}

class ListBook extends React.Component<ListBookProps, ListBookState> {
  constructor(props: any) {
    super(props);
    this.state = {
      borrowBook: {},
    };
  }

  render() {
    const { listbooks } = this.props;

    return (
      <Skeleton loading={listbooks.isLoading} active={true}>
        {this.props.filterBook != 0 ? (
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={listbooks.data}
            renderItem={(item: any) => {
              if (item.id == this.props.filterBook) {
                return (
                  <Row key={item.id}>
                    <Col span={24}>
                      <Descriptions column={2}>
                        <Descriptions.Item label="" style={{ cursor: 'pointer' }}>
                          {item.bookShelfName ? (
                            <Alert
                              style={{ width: '100%' }}
                              message={
                                <Space
                                  direction="horizontal"
                                  size="small"
                                  style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    paddingRight: 10,
                                  }}
                                >
                                  <div>Book ID: {item.id}</div>
                                  <div style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    #{item.barCode}
                                  </div>
                                </Space>
                              }
                              description={`In Bookshelf: ${item.bookShelfName} at Drawer: ${item.drawerName}`}
                              action={
                                <Space
                                  direction="vertical"
                                  style={{
                                    width: '100%',

                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  {item.isAvailable ? (
                                    <>
                                      <Tag
                                        icon={
                                          <CheckOutlined
                                            style={{
                                              color: '#FFFFFF',
                                              cursor: 'pointer',
                                              margin: 0,
                                            }}
                                          />
                                        }
                                        color="#87d068"
                                      >
                                        Available
                                      </Tag>
                                      {this.props.user.currentUser.roleId != 1 ? (
                                        <Button
                                          onClick={() => this.deleteBook(item)}
                                          type="primary"
                                          size="small"
                                          icon={<DeleteOutlined />}
                                        >
                                          Remove
                                        </Button>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <Popover
                                        placement="left"
                                        content={
                                          this.state.borrowBook.patronImage ? (
                                            <Space direction="horizontal">
                                              <Avatar
                                                src={this.state.borrowBook?.patronImage}
                                              ></Avatar>
                                              <Space direction="vertical">
                                                <Text>{this.state.borrowBook?.patronName}</Text>
                                                <Text>
                                                  Borrow ID: {this.state.borrowBook?.borrowId}
                                                </Text>
                                              </Space>
                                            </Space>
                                          ) : (
                                            <Spin spinning />
                                          )
                                        }
                                        trigger="click"
                                      >
                                        <Tag
                                          onClick={() => this.loadBorrow(item.id)}
                                          icon={
                                            <CheckOutlined
                                              style={{
                                                color: '#FFFFFF',
                                                cursor: 'pointer',
                                                margin: '0 !important',
                                              }}
                                            />
                                          }
                                          color="#f50"
                                        >
                                          Not Available
                                        </Tag>
                                      </Popover>
                                      {this.props.user.currentUser.roleId != 1 ? (
                                        <Button
                                          onClick={() => this.deleteBook(item)}
                                          type="primary"
                                          size="small"
                                          icon={<DeleteOutlined />}
                                        >
                                          Remove
                                        </Button>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )}
                                </Space>
                              }
                              type="info"
                              showIcon
                            />
                          ) : (
                            <Alert
                              style={{ width: '100%' }}
                              message={
                                <Space
                                  direction="horizontal"
                                  size="small"
                                  style={{
                                    width: '100%',
                                    justifyContent: 'space-between',
                                    paddingRight: 10,
                                  }}
                                >
                                  <div>Book ID: {item.id}</div>
                                  <div style={{ fontSize: 14, fontWeight: 'bold' }}>
                                    #{item.barCode}
                                  </div>
                                </Space>
                              }
                              description={`Not in any Bookshelf yet !`}
                              action={
                                <Space
                                  direction="vertical"
                                  style={{
                                    width: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                  }}
                                >
                                  {item.isAvailable ? (
                                    <>
                                      <Tag
                                        icon={
                                          <CheckOutlined
                                            style={{
                                              color: '#FFFFFF',
                                              cursor: 'pointer',
                                              margin: '0 !important',
                                            }}
                                          />
                                        }
                                        color="#87d068"
                                      >
                                        Available
                                      </Tag>
                                      {this.props.user.currentUser.roleId != 1 ? (
                                        <Button
                                          onClick={() => this.deleteBook(item)}
                                          type="primary"
                                          size="small"
                                          icon={<DeleteOutlined />}
                                        >
                                          Remove
                                        </Button>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <Popover
                                        placement="left"
                                        content={
                                          this.state.borrowBook.patronImage ? (
                                            <Space direction="horizontal">
                                              <Avatar
                                                src={this.state.borrowBook?.patronImage}
                                              ></Avatar>
                                              <Space direction="vertical">
                                                <Text>{this.state.borrowBook?.patronName}</Text>
                                                <Text>
                                                  Borrow ID: {this.state.borrowBook?.borrowId}
                                                </Text>
                                              </Space>
                                            </Space>
                                          ) : (
                                            <Spin spinning />
                                          )
                                        }
                                        trigger="click"
                                      >
                                        <Tag
                                          onClick={() => this.loadBorrow(item.id)}
                                          icon={
                                            <CheckOutlined
                                              style={{
                                                color: '#FFFFFF',
                                                cursor: 'pointer',
                                                margin: '0 !important',
                                              }}
                                            />
                                          }
                                          color="#f50"
                                        >
                                          Not Available
                                        </Tag>
                                      </Popover>
                                      {this.props.user.currentUser.roleId != 1 ? (
                                        <Button
                                          onClick={() => this.deleteBook(item)}
                                          type="primary"
                                          size="small"
                                          icon={<DeleteOutlined />}
                                        >
                                          Remove
                                        </Button>
                                      ) : (
                                        <></>
                                      )}
                                    </>
                                  )}
                                </Space>
                              }
                              type="warning"
                              showIcon
                            />
                          )}
                        </Descriptions.Item>
                      </Descriptions>
                    </Col>
                  </Row>
                );
              }
              return <></>;
            }}
          />
        ) : (
          <List
            className="comment-list"
            itemLayout="horizontal"
            dataSource={listbooks.data}
            renderItem={(item: any) => {
              return (
                <Row key={item.id}>
                  <Col span={24}>
                    <Descriptions column={2}>
                      <Descriptions.Item label="" style={{ cursor: 'pointer' }}>
                        {item.bookShelfName ? (
                          <Alert
                            style={{ width: '100%' }}
                            message={
                              <Space
                                direction="horizontal"
                                size="small"
                                style={{
                                  width: '100%',
                                  justifyContent: 'space-between',
                                  paddingRight: 10,
                                }}
                              >
                                <div>Book ID: {item.id}</div>
                                <div style={{ fontSize: 14, fontWeight: 'bold' }}>
                                  #{item.barCode}
                                </div>
                              </Space>
                            }
                            description={`In Bookshelf: ${item.bookShelfName} at Drawer: ${item.drawerName}`}
                            action={
                              <Space
                                direction="vertical"
                                style={{
                                  width: '100%',

                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                {item.isAvailable ? (
                                  <>
                                    <Tag
                                      icon={
                                        <CheckOutlined
                                          style={{
                                            color: '#FFFFFF',
                                            cursor: 'pointer',
                                            margin: 0,
                                          }}
                                        />
                                      }
                                      color="#87d068"
                                    >
                                      Available
                                    </Tag>
                                    {this.props.user.currentUser.roleId != 1 ? (
                                      <Button
                                        onClick={() => this.deleteBook(item)}
                                        type="primary"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                      >
                                        Remove
                                      </Button>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Popover
                                      placement="left"
                                      content={
                                        this.state.borrowBook.patronImage ? (
                                          <Space direction="horizontal">
                                            <Avatar
                                              src={this.state.borrowBook?.patronImage}
                                            ></Avatar>
                                            <Space direction="vertical">
                                              <Text>{this.state.borrowBook?.patronName}</Text>
                                              <Text>
                                                Borrow ID: {this.state.borrowBook?.borrowId}
                                              </Text>
                                            </Space>
                                          </Space>
                                        ) : (
                                          <Spin spinning />
                                        )
                                      }
                                      trigger="click"
                                    >
                                      <Tag
                                        onClick={() => this.loadBorrow(item.id)}
                                        icon={
                                          <CheckOutlined
                                            style={{
                                              color: '#FFFFFF',
                                              cursor: 'pointer',
                                              margin: '0 !important',
                                            }}
                                          />
                                        }
                                        color="#f50"
                                      >
                                        Not Available
                                      </Tag>
                                    </Popover>
                                    {this.props.user.currentUser.roleId != 1 ? (
                                      <Button
                                        onClick={() => this.deleteBook(item)}
                                        type="primary"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                      >
                                        Remove
                                      </Button>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                              </Space>
                            }
                            type="info"
                            showIcon
                          />
                        ) : (
                          <Alert
                            style={{ width: '100%' }}
                            message={
                              <Space
                                direction="horizontal"
                                size="small"
                                style={{
                                  width: '100%',
                                  justifyContent: 'space-between',
                                  paddingRight: 10,
                                }}
                              >
                                <div>Book ID: {item.id}</div>
                                <div style={{ fontSize: 14, fontWeight: 'bold' }}>
                                  #{item.barCode}
                                </div>
                              </Space>
                            }
                            description={`Not in any Bookshelf yet !`}
                            action={
                              <Space
                                direction="vertical"
                                style={{
                                  width: '100%',
                                  justifyContent: 'center',
                                  alignItems: 'center',
                                }}
                              >
                                {item.isAvailable ? (
                                  <>
                                    <Tag
                                      icon={
                                        <CheckOutlined
                                          style={{
                                            color: '#FFFFFF',
                                            cursor: 'pointer',
                                            margin: '0 !important',
                                          }}
                                        />
                                      }
                                      color="#87d068"
                                    >
                                      Available
                                    </Tag>
                                    {this.props.user.currentUser.roleId != 1 ? (
                                      <Button
                                        onClick={() => this.deleteBook(item)}
                                        type="primary"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                      >
                                        Remove
                                      </Button>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <Popover
                                      placement="left"
                                      content={
                                        this.state.borrowBook.patronImage ? (
                                          <Space direction="horizontal">
                                            <Avatar
                                              src={this.state.borrowBook?.patronImage}
                                            ></Avatar>
                                            <Space direction="vertical">
                                              <Text>{this.state.borrowBook?.patronName}</Text>
                                              <Text>
                                                Borrow ID: {this.state.borrowBook?.borrowId}
                                              </Text>
                                            </Space>
                                          </Space>
                                        ) : (
                                          <Spin spinning />
                                        )
                                      }
                                      trigger="click"
                                    >
                                      <Tag
                                        onClick={() => this.loadBorrow(item.id)}
                                        icon={
                                          <CheckOutlined
                                            style={{
                                              color: '#FFFFFF',
                                              cursor: 'pointer',
                                              margin: '0 !important',
                                            }}
                                          />
                                        }
                                        color="#f50"
                                      >
                                        Not Available
                                      </Tag>
                                    </Popover>
                                    {this.props.user.currentUser.roleId != 1 ? (
                                      <Button
                                        onClick={() => this.deleteBook(item)}
                                        type="primary"
                                        size="small"
                                        icon={<DeleteOutlined />}
                                      >
                                        Remove
                                      </Button>
                                    ) : (
                                      <></>
                                    )}
                                  </>
                                )}
                              </Space>
                            }
                            type="warning"
                            showIcon
                          />
                        )}
                      </Descriptions.Item>
                    </Descriptions>
                  </Col>
                </Row>
              );
            }}
          />
        )}
      </Skeleton>
    );
  }

  async loadBorrow(bookId: number) {
    const response = await fetchBookById(bookId);

    var tmp: any = {
      patronId: response.data.patronId,
      patronImage: response.data.patronImage,
      patronName: response.data.patronName,
      borrowId: response.data.borrowId,
    };
    this.setState({
      borrowBook: tmp,
    });
  }

  async deleteBook(book: any) {
    var reason: string = '';
    Modal.confirm({
      title: 'Warning',
      icon: <ExclamationCircleOutlined />,
      centered: true,
      content: (
        <>
          <div>
   
            {book.patronId ? (
              <Text>
                {book?.patronName} - {book?.username}, have borrowed with Borrow ID:{' '}
                {book?.borrowId}, {' '}
              </Text>
            ) : (
              <></>
            )}
            <Text>Please enter reason why book is delete:</Text>
            <Input
              bordered={false}
              onChange={(e) => (reason = e.target.value)}
              style={{ borderBottom: '1px solid rgba(0, 0, 0, .5)', paddingBottom: 10 }}
            />
          </div>
        </>
      ),
      okText: 'Remove',
      cancelText: 'Cancel',
      onOk: async () => {

        book.note = reason;
        if (reason.trim().length != 0) {
          await deleteBook(book).finally(() => {
            sendNotification('Delete book success !', '', 'success');
            this.props.dispatch({
              type: 'listbooks/fetchData',
              payload: book.bookGroupId,
            });
          });
        } else {
          sendNotification('Delete fail because not input reason', '', 'error');
        }
      },
    });
  }
}

export default connect((state) => ({ ...state }))(ListBook);
