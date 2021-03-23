import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Table } from 'antd';
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
          <Col span={19}>
            <Space direction="vertical" style={{ alignItems: 'start' }}>
              <p style={{ fontWeight: 500, marginBottom: 0 }}>{this.props.record.bookName}</p>
              <Space direction="horizontal">
                <p style={{ fontWeight: 500, marginBottom: 0 }}>#{this.props.record.bookBarcode}</p>
                <p style={{ fontWeight: 500, marginBottom: 0 }}>ID: {this.props.record.bookId}</p>
              </Space>
              <p style={{ textAlign: 'left' }}>{this.props.record.errorMessage}</p>
            </Space>
          </Col>
          <Col span={4} offset={1}>
            <Space
              direction="horizontal"
              style={{ height: '100%', justifyContent: 'center' }}
            >
              <Button shape='circle' icon={<CheckOutlined />} type="primary" ></Button>
              <Button shape='circle' danger icon={<CloseOutlined />} ></Button>
            </Space>
          </Col>
        </Row>
      </>
    );
  }

  handelIcon(typeError: any) {
    // if(this.props.record.typeError ==) ? (
    //   <WarningOutlined style={{ color: 'red', fontSize: 24 }} />
    // ) : (
    //   <CheckCircleOutlined style={{ color: 'green', fontSize: 24 }} />
    // )}
  }
}
export default BookTrackingItem;
