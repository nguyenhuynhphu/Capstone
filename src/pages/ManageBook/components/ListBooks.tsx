import React from 'react';

import { connect, Dispatch } from 'umi';
import { List, Skeleton, Button, Descriptions, Divider, Tag, Row, Col, Alert, Space } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';

interface ListBookProps {
  dispatch: Dispatch;
  listbooks?: any;
}
interface ListBookState {}

class ListBook extends React.Component<ListBookProps, ListBookState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { listbooks } = this.props;

    return (
      <Skeleton loading={listbooks.isLoading} active={true}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={listbooks.data}
          renderItem={(item: any) => (
            <>
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
                                alignItems: 'flex-end',
                              }}
                            >
                              {item.isAvailable ? (
                                <Tag
                                  icon={
                                    <CheckOutlined
                                      style={{ color: '#FFFFFF', cursor: 'pointer', margin: 0 }}
                                    />
                                  }
                                  color="#87d068"
                                >
                                  Available
                                </Tag>
                              ) : (
                                <Tag
                                  icon={
                                    <CheckOutlined
                                      style={{ color: '#FFFFFF', cursor: 'pointer', margin: 0 }}
                                    />
                                  }
                  
                                  color="#f50"
                                >
                                  Not Available
                                </Tag>
                              )}
                              <Button type="primary" size="small" icon={<DeleteOutlined />}>
                                Remove
                              </Button>
                            </Space>
                          }
                          type="info"
                          showIcon
                        />
                      ) : (
                        <Alert
                          style={{ width: '100%' }}
                          message={`Book ID: ${item.id}`}
                          description={`Not in any Bookshelf yet !`}
                          action={
                            <Space
                              direction="vertical"
                              style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'flex-end',
                              }}
                            >
                              {item.isAvailable ? (
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
                              ) : (
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
                                  color="#f50"
                                >
                                  Not Available
                                </Tag>
                              )}
                              <Button type="primary" size="small" icon={<DeleteOutlined />}>
                                Remove
                              </Button>
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
            </>
          )}
        />
      </Skeleton>
    );
  }
}

export default connect((state) => ({ ...state }))(ListBook);
