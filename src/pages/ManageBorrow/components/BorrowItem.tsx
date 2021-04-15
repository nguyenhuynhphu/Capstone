import { Space, Image, Select, Typography, Descriptions, Alert } from 'antd';

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
    console.log(borrowItem.selectedBook);
    return (
      <>
        <Space direction={'horizontal'} style={{ width: '90%', alignItems: 'start' }}>
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
              <Descriptions size="small" style={{ width: 330 }} column={2}>
                <Descriptions.Item label="Bookshelf" span={2}>
                  {borrowItem.selectedBook.bookShelfName}
                </Descriptions.Item>
                <Descriptions.Item label="BookID">{borrowItem.selectedBook.id}</Descriptions.Item>

                <Descriptions.Item label="Drawer">
                  {borrowItem.selectedBook.drawerId}
                </Descriptions.Item>

                {/* <Descriptions.Item label="BarCode">
                  {borrowItem.selectedBook.barCode}
                </Descriptions.Item> */}
              </Descriptions>
            ) : (
              <Alert
                style={{ width: 'fit-content' }}
                message="Please seleted book in drawer"
                type="warning"
              />
            )}
          </div>
        </Space>
        <div style={{ marginRight: 50 }}>
          {borrowItem.selectedBook == undefined || borrowItem.drawer != undefined ? (
            <>
              <p>Select at:</p>
              <Select
                placeholder="Select drawer"
                style={{ width: 150 }}
                defaultValue={borrowItem.selectedBook ? borrowItem.selectedBook.id : null}
                onChange={(bookId: any) => {
                  console.log(borrowItem);

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
                {borrowItem.drawer?.map((value: any) => {
                  return (
                    <Select.Option key={`${value.bookId}`} value={value.bookId}>
                      {value.bookId}
                    </Select.Option>
                  );
                })}
              </Select>
            </>
          ) : (
            <></>
          )}
        </div>
      </>
    );
  }
}

export default connect((state) => ({ ...state }))(BorrowItem);
