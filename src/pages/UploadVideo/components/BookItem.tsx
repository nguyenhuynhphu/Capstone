import {
  CheckOutlined,
  CloseOutlined,
  ExclamationOutlined,
  YoutubeOutlined,
} from '@ant-design/icons';
import { Alert, Button, Col, Collapse, Row, Space, Table, Tag, Tooltip } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../UploadVideo.less';
interface BookItemProps {
  book: any;
}

class BookItem extends React.Component<BookItemProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { book } = this.props;
    if (book.error) {
      return (
        <>
          <Collapse
            style={{ width: '100%', padding: 0, margin: 0, color: 'white' }}
            className={styles.collapseBook}
            ghost
          >
            <Collapse.Panel
              style={{ width: '100%', margin: 0 }}
              header={
                <Space
                  style={{ width: '100%', justifyContent: 'space-between', paddingLeft: 30 }}
                  direction="horizontal"
                >
                  <Space direction="horizontal" size="large" style={{ width: 250 }}>
                    <p style={{ marginBottom: 0 }}>#{book.id}</p>
                    <p style={{ marginBottom: 0, width: 200 }}>{book.bookName}</p>
                  </Space>
                  <p style={{ marginBottom: 0 }}>{book.barCode}</p>
                  <Tag icon={<ExclamationOutlined />} color="#cd201f" style={{ cursor: 'pointer' }}>
                    Issue
                  </Tag>
                </Space>
              }
              key={book.id}
            >
              <Space style={{ width: '100%', justifyContent: 'space-between' }}>
                <Alert message={book.error.errorMessage} type="error" showIcon />
               
                <Space style={{ width: 125 }}>
                  <Tooltip title="Confirm Error">
                    <Button
                      shape="round"
                      type="primary"
                      size="small"
                      icon={<CheckOutlined />}
                      onClick={() => {}}
                    ></Button>
                    {/* <Button type="primary" size="small" icon={<CheckOutlined />} onClick={() => {}} /> */}
                  </Tooltip>
                  <Tooltip title="Reject Error">
                    <Button
                      shape="round"
                      type="primary"
                      danger
                      size="small"
                      icon={<CloseOutlined />}
                      onClick={() => {}}
                    ></Button>
                  </Tooltip>
                </Space>
              </Space>
            </Collapse.Panel>
          </Collapse>
        </>
      );
    } else {
      return (
        <>
          <Space
            style={{
              width: '100%',
              justifyContent: 'space-between',
              padding: '10px 10px',
              paddingLeft: 40,
            }}
            direction="horizontal"
          >
            <Space direction="horizontal" size="large" style={{ width: 267 }}>
              <p style={{ marginBottom: 0 }}>#{book.id}</p>
              <p style={{ marginBottom: 0, width: 200 }}>{book.bookName}</p>
            </Space>
            <p style={{ marginBottom: 0 }}>{book.barCode}</p>
            <Tag icon={<CheckOutlined />} color="#87d068" style={{ cursor: 'pointer' }}>
              No Error
            </Tag>
          </Space>
        </>
      );
    }
  }
}
export default BookItem;
