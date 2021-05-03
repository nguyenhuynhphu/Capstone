import {
  CheckOutlined,
  CloseOutlined,
  DeleteOutlined,
  DownOutlined,
  RightOutlined,
} from '@ant-design/icons';
import {
  Space,
  Image,
  Select,
  Typography,
  Descriptions,
  Alert,
  Tag,
  Popconfirm,
  Popover,
  TreeSelect,
  List,
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { TreeNode } from 'antd/lib/tree-select';
import moment from 'moment';
import styles from '../ManageBorrowPage.less';
import React from 'react';

import { connect } from 'umi';

const { Paragraph, Text } = Typography;

interface BorrowItemProps {
  borrowItem: any;
}

class BorrowItem extends React.Component<BorrowItemProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { borrowItem } = this.props;

    return (
      <>
        <Space direction={'horizontal'} style={{ width: '70%', alignItems: 'start' }}>
          <Image
            width={80}
            height={120}
            style={{ borderRadius: 5 }}
            src={
              borrowItem.image.length != 0 || borrowItem.image != undefined
                ? borrowItem.image[0].url
                : null
            }
          />
          <div>
            <p style={{ marginBottom: 0 }}>
              <Text style={{ maxWidth: 230, fontWeight: 500 }} ellipsis={true}>
                {borrowItem.name}
              </Text>
              <span style={{ color: 'rgba(0, 0, 0, .4)', fontStyle: 'italic' }}>
                {' '}
                - {borrowItem.author}
              </span>
            </p>

            <p style={{ margin: '5px 0px' }}>
              Fee: {borrowItem.fee}$ / Punish Fee: {borrowItem.punishFee}$
            </p>

            {borrowItem.selectedBook != undefined ? (
              <Descriptions size="small" style={{ width: 330 }} column={3}>
                <Descriptions.Item label="BookID">{borrowItem.selectedBook.id}</Descriptions.Item>
                <Descriptions.Item label="BarCode" span={2}>
                  {borrowItem.selectedBook.barCode}
                </Descriptions.Item>
                {borrowItem.selectedBook?.bookShelfName != undefined ? (
                  <>
                    <Descriptions.Item label="Bookshelf" span={2}>
                      {borrowItem.selectedBook.bookShelfName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Drawer">
                      {borrowItem.selectedBook.drawerId}
                    </Descriptions.Item>
                  </>
                ) : (
                  <>
                    <p
                      style={{
                        backgroundColor: '#F6FFED',
                        border: '1px solid rgb(183, 235, 143)',
                        padding: '7px 10px',
                        fontWeight: 400,
                      }}
                    >
                      Not in drawer yet
                    </p>
                  </>
                )}
              </Descriptions>
            ) : (
              this.handelStorage(borrowItem)
            )}
          </div>
        </Space>
        <div style={{ marginRight: 50 }}>{this.handelBookStatus()}</div>
      </>
    );
  }
  handelBookStatus() {
    const { borrowItem } = this.props;
    if (!borrowItem.isInStorage) {
      if (borrowItem.selectedBook) {
        if (borrowItem.selectedBook.isDeleted) {
          return (
            <Popover content={<div>{borrowItem.selectedBook.note}</div>} trigger="click">
              <Tag
                style={{ cursor: 'pointer' }}
                icon={<DeleteOutlined />}
                color="default"
                onClick={() => {}}
              >
                Removed
              </Tag>
            </Popover>
          );
        } else {
          if (borrowItem.selectedBook.isAvailable) {
            //oke duoc muon
            return (
              <Tag style={{ cursor: 'pointer' }} icon={<CheckOutlined />} color="#87d068">
                Available
              </Tag>
            );
          } else {
            //dang trong don muon khac ma chua tra
            return (
              <Popover
                content={
                  <Space>
                    <Avatar src={borrowItem.selectedBook?.patronImage} />
                    <Text>{borrowItem.selectedBook?.patronName} borrowed !</Text>
                  </Space>
                }
                trigger="click"
              >
                <Tag style={{ cursor: 'pointer' }} icon={<CloseOutlined />} color="#cd201f">
                  Not Available
                </Tag>
              </Popover>
            );
          }
        }
      } else {
        return (
          <>
            <p>Book in System:</p>
            <Popover
              trigger="click"
              placement="right"
              content={
                <>
                  <List
                    style={{ maxHeight: 500, overflow: 'auto' }}
                    className={styles.locationBook}
                  >
                    {borrowItem.drawer?.map((value: any) => (
                      <List.Item>
                        <Space direction="vertical">
                          <p style={{ marginBottom: 0 }}>Bookshelf: {value.bookShelfName}</p>
                          <p style={{ marginBottom: 0 }}>Drawer: {value.drawerName}</p>
                          <p style={{ marginBottom: 0 }}>Book ID: {value.bookId}</p>
                        </Space>
                      </List.Item>
                    ))}
                  </List>
                </>
              }
            >
              <Space
                style={{
                  border: '1px solid rgba(0, 0, 0, .2)',
                  padding: '5px 10px',
                  width: 150,
                  cursor: 'pointer',
                  justifyContent: 'space-between',
                }}
              >
                <p style={{ marginBottom: 0, color: 'rgba(0, 0, 0, .4)' }}>Book Location</p>
                <RightOutlined style={{ color: 'rgba(0, 0, 0, .4)' }} />
              </Space>
            </Popover>
          </>
        );
      }
    }
    return <></>;
  }

  handelRemoveBook() {
    const { borrowItem } = this.props;
  }

  handelStorage(borrowItem: any) {
    if (borrowItem.isInStorage) {
      return <Alert style={{ width: 'fit-content' }} message="Book In Storage" type="warning" />;
    } else {
      return (
        <Alert
          style={{ width: 'fit-content' }}
          message="Get book's location in select"
          type="warning"
        />
      );
    }
  }
}

export default connect((state) => ({ ...state }))(BorrowItem);
