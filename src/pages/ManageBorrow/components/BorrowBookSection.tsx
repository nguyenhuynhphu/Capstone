import sendNotification from '@/utils/Notification';
import { TagsOutlined } from '@ant-design/icons';
import {
  Space,
  Image,
  Select,
  Typography,
  Descriptions,
  Alert,
  Row,
  Col,
  Table,
  Form,
  DatePicker,
  Button,
} from 'antd';
import Column from 'antd/lib/table/Column';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';

import React from 'react';

import { connect, Dispatch } from 'umi';
import ReturnItem from './ReturnItem';

interface BorrowBookSectionProps {
  dispatch: Dispatch;
  borrowBook: any;
  user?: any;
}

class BorrowBookSection extends React.Component<BorrowBookSectionProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { borrowBook } = this.props;

    return (
      <>
        <Row
          gutter={16}
          style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}
        >
          <Col span={14} style={{ height: 500, overflow: 'auto' }}>
            {borrowBook.borrowDetail.map((returnItem: any) => (
              <ReturnItem returnItem={returnItem} />
            ))}
          </Col>
          <Col span={10} style={{ paddingLeft: 25 }}>
            <Space style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between' }}>
              <Title level={5} style={{ marginBottom: 0 }}>
                Patron Informaton
              </Title>
            </Space>
            <Row style={{ marginBottom: 15 }}>
              <Col span={8}>Name:</Col>
              <Col span={16}>{borrowBook?.patron.name}</Col>
            </Row>
            <Row style={{ marginBottom: 15 }}>
              <Col span={8}>Email:</Col>
              <Col span={16}>{borrowBook?.patron.email}</Col>
            </Row>
            <Row style={{ marginBottom: 15 }}>
              <Col span={8}>Address:</Col>
              <Col span={16}>{borrowBook?.patron.address}</Col>
            </Row>
            <Row style={{ marginBottom: 15 }}>
              <Col span={8}>Phone:</Col>
              <Col span={16}>{borrowBook?.patron.phone}</Col>
            </Row>

            <Form onFinish={(value) => this.handelConfirm(value)}>
              <Form.Item
                name="date"
                label="Borrow Day: "
                initialValue={moment()}
                style={{ marginBottom: 15 }}
              >
                <DatePicker onChange={() => {}} style={{ marginLeft: 77 }} disabled />
              </Form.Item>
              <Form.Item
                name="returnDate"
                label="Return Day: "
                initialValue={moment()}
                style={{ marginBottom: 5 }}
              >
                <DatePicker onChange={() => {}} style={{ marginLeft: 80 }} />
              </Form.Item>

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
  handelConfirm(value: any) {
    var { user, dispatch, borrowBook } = this.props;
    console.log('borrowBook', borrowBook);

    var tmp: any = [];
    borrowBook.borrowDetail.forEach((book: any) => {
      console.log(book);
      if (book.isReturn) {
        tmp.push({
          isLate: false,
          punishFee: book.punishFee,
          bookId: book.id,
          fee: book.fee,
          isDeleted: false,
        });
      }
    });

    var msgToServer: any = {
      patronId: borrowBook?.patron.id,
      returnTime: value?.returnDate,
      borrowId: borrowBook?.id,
      staffId: user.currentUser.id,
      isDeleted: false,
      returnDetail: tmp,
    };

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
    }, 1000);
  }
}

export default connect((state) => ({ ...state }))(BorrowBookSection);
