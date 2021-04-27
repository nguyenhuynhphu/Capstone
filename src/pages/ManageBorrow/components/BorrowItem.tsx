import { CheckOutlined, CloseOutlined, DeleteOutlined } from '@ant-design/icons';
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
} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import moment from 'moment';

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
    // console.log("borrowItem", borrowItem);

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
            <p>Choice Book:</p>
            <Select
              placeholder="Select Book"
              style={{ width: 150 }}
              value={borrowItem.selectedBook ? borrowItem.selectedBook.id : null}
              onChange={(bookId: any) => {
                var tmp = borrowItem.drawer?.find((book: any) => book.bookId == bookId);
                borrowItem.selectedBook = {
                  barCode: tmp.barcode?.trim(),
                  bookShelfName: tmp.bookShelfName,
                  drawerId: tmp.id,
                  id: tmp.bookId,
                };
                this.setState({});
                //borrowItem.choiceBook = bookId;
              }}
            >
              {borrowItem.drawer?.map((value: any) => (
                <Select.Option key={`${value?.bookId}`} value={value?.bookId}>
                  {value.bookId}
                </Select.Option>
              ))}
            </Select>
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
          message="Please seleted book in drawer"
          type="warning"
        />
      );
    }
  }
}

export default connect((state) => ({ ...state }))(BorrowItem);
