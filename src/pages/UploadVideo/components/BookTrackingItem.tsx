import { CheckCircleOutlined, WarningOutlined } from '@ant-design/icons';
import { Col, Row, Table } from 'antd';
import React from 'react';

interface BookTrackingItemProps {
  record: any;
}

class BookTrackingItem extends React.Component<BookTrackingItemProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <Row
          style={{
            fontFamily: 'roboto',
            borderBottom: '1px solid rgba(0, 0, 0, .2)',
            marginBottom: 10,
          }}
        >
          <Col span={2}>
          {this.props.record.isError ? <WarningOutlined style={{color: 'red', fontSize: 24}}/> :<CheckCircleOutlined style={{color: 'green', fontSize: 24}}/> }
            
          </Col>
          <Col span={6}>
            <p style={{ textAlign: 'left', fontWeight: 500 }}>{this.props.record.bookName}</p>
          </Col>
          <Col span={8}>
            <p style={{ textAlign: 'center', fontWeight: 500 }}>ID: {this.props.record.bookId}</p>
          </Col>
          <Col span={8}>
            <p style={{ textAlign: 'left' }}>{this.props.record.errorMessage}</p>
          </Col>
        </Row>
      </>
    );
  }
}
export default BookTrackingItem;
