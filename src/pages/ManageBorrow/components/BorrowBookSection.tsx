import { TagsOutlined } from '@ant-design/icons';
import { Space, Image, Select, Typography, Descriptions, Alert, Row, Col, Table, Form, DatePicker, Button } from 'antd';
import Column from 'antd/lib/table/Column';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';

import React from 'react';

import { connect, Dispatch } from 'umi';

interface BorrowBookSectionProps {
  borrowBook: any;
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
          <Col span={10}>
            <>
              <Space style={{ marginBottom: 20, width: '100%', justifyContent: 'space-between' }}>
                <Title level={5} style={{ marginBottom: 0 }}>
                  Customer Informaton
                </Title>
                
              </Space>

              <Row>
                <Col span={8}>Name:</Col>
                <Col span={16}>{borrowBook?.customer.name}</Col>
              </Row>
              <Row>
                <Col span={8}>Email:</Col>
                <Col span={16}>{borrowBook?.customer.email}</Col>
              </Row>
              <Row>
                <Col span={8}>Address:</Col>
                <Col span={16}>{borrowBook?.customer.address}</Col>
              </Row>
              <Row>
                <Col span={8}>Phone:</Col>
                <Col span={16}>{borrowBook?.customer.phone}</Col>
              </Row>
              
              <Form onFinish={(value) => {}}>
                <Form.Item
                  name="date"
                  label="Borrow Day: "
                  required
                  initialValue={moment()}
                  style={{ marginBottom: 25 }}
                >
                  <DatePicker onChange={() => {}} style={{ marginLeft: 28 }} disabled />
                </Form.Item>
                <Form.Item
                  name="returnDate"
                  label="Return Day: "
                  required
                  initialValue={moment()}
                  style={{ marginBottom: 25 }}
                >
                  <DatePicker onChange={() => {}} style={{ marginLeft: 30 }} />
                </Form.Item>

                <Row justify={'end'}>
                  <Space align={'end'}>
                    <Button type="primary" htmlType={'submit'}>
                      Confirm
                    </Button>
                  </Space>
                </Row>
              </Form>
            </>
          </Col>
          <Col span={14}>
            <Table
              dataSource={borrowBook.borrowDetails}
              size={'middle'}
              onRow={(record) => {
                return {
                  onDoubleClick: () => {}, // double click row,
                };
              }}
              onChange={(pagination) => {}}
            >
              <Column title="Name" dataIndex="bookName" key="name" />
              <Column title="Total Row" dataIndex="fee" key="row" align={'center'} />
              <Column title="Total Column" dataIndex="startTime" key="col" align={'center'} />
            </Table>
          </Col>
        </Row>
      </>
    );
  }
}

export default connect((state) => ({ ...state }))(BorrowBookSection);
