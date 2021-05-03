import sendNotification from '@/utils/Notification';
import { Space, Descriptions, Row, Col, Form, Button, Divider, Tag } from 'antd';
import moment from 'moment';

import React from 'react';

import { connect, Dispatch } from 'umi';
import ReturnItem from './ReturnItem';

interface BorrowBookSectionProps {
  dispatch: Dispatch;
  borrowBook: any;
  user?: any;
  returnbooktable?: any;
}

class BorrowBookSection extends React.Component<BorrowBookSectionProps, {}> {
  constructor(props: any) {
    super(props);
    this.rerender = this.rerender.bind(this);
  }

  render() {
    const { borrowBook } = this.props;

    return (
      <>
        <Row
          gutter={16}
          style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}
        >
          <Col span={12} style={{ height: 500, overflow: 'auto' }}>
            {borrowBook.borrowDetail.map((returnItem: any) => (
              <ReturnItem returnItem={returnItem} renderParent={this.rerender} />
            ))}
          </Col>
          <Col span={11} offset={1} style={{ paddingLeft: 10 }}>
            <Divider orientation="left">Patron Informaton</Divider>
            <Descriptions column={2}>
              <Descriptions.Item label="Name">{borrowBook?.patron.name}</Descriptions.Item>
              <Descriptions.Item label="Email">{borrowBook?.patron.email}</Descriptions.Item>
              <Descriptions.Item label="Address" span={2}>
                {borrowBook?.patron.address}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">{borrowBook?.patron.phone}</Descriptions.Item>
            </Descriptions>
            <Form onFinish={(value) => this.handelConfirm(value)}>
              <Divider orientation="left" style={{ marginTop: 0 }}>
                Detail
              </Divider>
              <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'space-between', fontSize: 16 }}
              >
                <p style={{ marginBottom: 0 }}>Borrow Day: </p>
                <p style={{ marginBottom: 0 }}>
                  {moment(borrowBook?.startTime).format('DD/MM/YYYY')}
                </p>
              </Space>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  margin: '5px 0',
                }}
              >
                <p style={{ marginBottom: 0 }}>Correct payday: </p>
                <p style={{ marginBottom: 0 }}>
                  {moment(borrowBook?.endTime).format('DD/MM/YYYY')}
                </p>
              </Space>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 16,
                  marginBottom: '5px',
                }}
              >
                <p style={{ marginBottom: 0 }}>Return Day: </p>
                <Space style={{ margin: 0 }}>
                  {moment().diff(borrowBook.endTime, 'days') > 0 ? (
                    <Tag color={'#f50'}>Late {moment().diff(borrowBook.endTime, 'days')} days</Tag>
                  ) : (
                    <></>
                  )}
                  <p style={{ marginBottom: 0 }}>{moment().format('DD/MM/YYYY')}</p>
                </Space>
              </Space>
              <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'space-between', fontSize: 16 }}
              >
                <p style={{ marginBottom: 0 }}>Quantity: </p>
                <p style={{ marginBottom: 0 }}>{borrowBook.borrowDetail.length} books</p>
              </Space>
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  fontSize: 16,
                  margin: '5px 0',
                }}
              >
                <p style={{ marginBottom: 0 }}>Fee: </p>
                <p style={{ marginBottom: 0 }}>+ {this.handelFee()} $</p>
              </Space>
              <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'space-between', fontSize: 16 }}
              >
                <p style={{ marginBottom: 0 }}>Punsish Fee: </p>
                <p style={{ marginBottom: 0 }}>+ {this.handelPunishFee()} $</p>
              </Space>
              <Divider />
              <Space
                direction="horizontal"
                style={{
                  width: '100%',
                  justifyContent: 'space-between',
                  fontSize: 22,
                  marginBottom: 20,
                }}
              >
                <p style={{ marginBottom: 0 }}>Total: </p>
                <p style={{ marginBottom: 0 }}>{this.handelFee() + this.handelPunishFee()}$</p>
              </Space>
              <Row justify={'end'}>
                <Space align={'end'}>
                  <Button type="primary" htmlType={'submit'}>
                    Confirm
                  </Button>
                </Space>
              </Row>
            </Form>
          </Col>
        </Row>
      </>
    );
  }
  rerender() {
    this.setState({});
  }
  handelConfirm(value: any) {
    var { user, dispatch, borrowBook } = this.props;

    var tmp: any = [];
    borrowBook.borrowDetail.forEach((book: any) => {
      if (!book.isReturn && book.isReturnToday) {
        tmp.push({
          bookId: book.bookId,
        });
      }
    });

    var msgToServer: any = {
      patronId: borrowBook?.patron.id,
      returnTime: moment(),
      borrowId: borrowBook?.id,
      staffId: user.currentUser.id,
      returnDetail: tmp,
    };
    console.log('MSG', msgToServer);

    dispatch({
      type: 'manageborrow/confirmReturn',
      payload: msgToServer,
    });
    sendNotification('Return book success !', '', 'success');
    setTimeout(() => {
      dispatch({
        type: 'manageborrow/resetState',
        payload: {},
      });
      dispatch({
        type: 'returnbooktable/fetchData',
        payload: {
          filterName: this.props.returnbooktable.filterName,
          pagination: this.props.returnbooktable.pagination.current,
        },
      });
    }, 1000);
  }
  handelFee() {
    const { borrowBook } = this.props;

    var diffDate = moment().diff(borrowBook.endTime, 'days');

    if (diffDate > 0) {
      var diffDate = moment(borrowBook.endTime).diff(borrowBook.startTime, 'days');
    } else {
      var diffDate = moment().diff(borrowBook.startTime, 'days');
    }

    if (diffDate == 0) diffDate = 1;
    else diffDate += 1;
    var fee = 0;
    borrowBook.borrowDetail.forEach((borrow: any) => {
      if (!borrow.isReturn && borrow.isReturnToday) fee += borrow.fee * diffDate;
    });
    return fee;
  }
  handelPunishFee() {
    const { borrowBook } = this.props;

    var diffDate = moment().diff(borrowBook.endTime, 'days');
    var punishFee = 0;
    if (diffDate > 0) {
      borrowBook.borrowDetail.forEach((borrow: any) => {
        if (!borrow.isReturn && borrow.isReturnToday) punishFee += borrow.punishFee * diffDate;
      });
    }
    return punishFee;
  }
}

export default connect((state) => ({ ...state }))(BorrowBookSection);
