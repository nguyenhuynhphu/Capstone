import {
  BookOutlined,
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  EuroCircleOutlined,
  EuroOutlined,
  ExclamationOutlined,
} from '@ant-design/icons';
import {
  Badge,
  Button,
  Descriptions,
  Image,
  List,
  Popover,
  Skeleton,
  Space,
  Tag,
  Tooltip,
  Typography,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { history } from 'umi';
const { Text } = Typography;
interface ViewFormProps {
  dispatch: Dispatch;
  manageborrowpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { manageborrowpage } = this.props;
    const { choiceBorrow } = manageborrowpage;

    return (
      <Skeleton loading={this.props.manageborrowpage.borrowLoading} active paragraph={{ rows: 10 }}>
        <div>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Patron Name">
              <Avatar src={choiceBorrow.image} /> {choiceBorrow.patronName}
            </Descriptions.Item>
            <Descriptions.Item label="Borrow Time">
              {choiceBorrow.startTime?.split('T')[0]}
            </Descriptions.Item>
            <Descriptions.Item label="Return Time">
              <Space>
                <p style={{ marginBottom: 0 }}>{choiceBorrow.endTime?.split('T')[0]}</p>
                <Badge status="processing" title="Valid" />
              </Space>
            </Descriptions.Item>
            <Descriptions.Item label="Quantity">
              <Space>
                <p style={{ marginBottom: 0 }}>{choiceBorrow.quantity}</p>
                <BookOutlined style={{ color: '#3FA8FF' }} />
              </Space>
            </Descriptions.Item>
          </Descriptions>
          <div>
            <List
              itemLayout="horizontal"
              dataSource={choiceBorrow.borrowDetail}
              renderItem={(item: any) => (
                <List.Item>
                  <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                    <Space>
                      <Image
                        width={55}
                        height={83}
                        src={item.image != undefined ? item.image : null}
                      />
                      <Space direction="vertical" size="small">
                        <div style={{ marginBottom: 0 }}>
                          <Tooltip title={item.bookName}>
                            <Text ellipsis={true} style={{ maxWidth: 200, fontWeight: 500 }}>
                              {item.bookName}
                            </Text>
                          </Tooltip>
                          <span style={{ color: 'rgba(0, 0, 0, .5)', fontStyle: 'italic' }}>
                            {' -'} {item.author}
                          </span>
                        </div>
                        <Space direction="horizontal">
                          <p style={{ marginBottom: 0 }}>BookID: {item.bookId}</p>
                          <span style={{ color: 'rgba(0, 0, 0, .5)', fontStyle: 'italic' }}>
                            {' -'} #{item.barcode}
                          </span>
                        </Space>
                        {item.isDeleted ? (
                          <Tag
                            style={{ cursor: 'pointer' }}
                            icon={<CloseOutlined />}
                            color="#f50"
                            onClick={() => {}}
                          >
                            Lost
                          </Tag>
                        ) : (
                          <>
                            {item.isReturn ? (
                              <Tag
                                style={{ cursor: 'pointer' }}
                                icon={<CheckOutlined />}
                                color="#87d068"
                                onClick={() =>  this.props.dispatch({
                                  type: 'manageborrowpage/showViewReturn',
                                  payload: item.returnId,
                                })}
                              >
                                Return at {item.returnTime?.split('T')[0]}
                              </Tag>
                            ) : (
                              <Tag
                                style={{ cursor: 'pointer' }}
                                icon={<ExclamationOutlined />}
                                color="gold"
                                onClick={() => {}}
                              >
                                Not Return Yet
                              </Tag>
                            )}
                          </>
                        )}
                      </Space>
                    </Space>
                    {item.isDeleted ? (
                      <Popover content={<div>{item.note}</div>} trigger="click">
                        <Tag
                          style={{ cursor: 'pointer' }}
                          icon={<DeleteOutlined />}
                          color="default"
                          onClick={() => {}}
                        >
                          Removed
                        </Tag>
                      </Popover>
                    ) : (
                      <Button
                        type="link"
                        onClick={() => {
                          history.push(`/book/manage-book`, {
                            bookGroupId: item.bookGroupId,
                            filterBook: item.bookId,
                          });
                          this.props.dispatch({
                            type: 'manageborrowpage/hideViewBorrow',
                            payload: {},
                          });
                        }}
                      >
                        Book Detail
                      </Button>
                    )}
                  </Space>
                </List.Item>
              )}
            />
          </div>
        </div>
      </Skeleton>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
