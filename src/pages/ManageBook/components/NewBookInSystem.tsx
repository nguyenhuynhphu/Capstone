import React from 'react';
import { connect, Dispatch } from 'umi';
import { Avatar, List, Space, Typography, Image, Popover, Row, Col, Descriptions, Tag } from 'antd';
import 'antd/dist/antd.css';
import { TagOutlined, WarningOutlined } from '@ant-design/icons';
import styles from '../ManageBookPage.less';

const { Paragraph, Text } = Typography;

interface NewBookInSystemProps {
  dispatch?: Dispatch;
  newbooklist?: any;
}

class NewBookInSystem extends React.Component<NewBookInSystemProps> {
  componentDidMount() {
    this.props.dispatch({
      type: 'newbooklist/fetchData',
    });
  }

  render() {
    const { newbooklist } = this.props;
    return (
      <List
        itemLayout="horizontal"
        loading={newbooklist.isLoading}
        dataSource={newbooklist.data}
        renderItem={(item: any) => (
          <Popover
            content={
              <>
                <Space direction="horizontal">
                  <Image
                    width={140}
                    height={215}
                    style={{ borderRadius: 10 }}
                    src={item.image.length != 0 ? item.image[0].url : null}
                  />

                  <Descriptions
                    className={styles.hoverDescription}
                    style={{ width: 250 }}
                    size="small"
                    column={1}
                  >
                    <Descriptions.Item label="Name">{item.name}</Descriptions.Item>
                    <Descriptions.Item label="Author">{item.author}</Descriptions.Item>
                    <Space style={{ cursor: 'pointer' }}>
                      <p style={{ marginRight: 5, marginBottom: 0 }}>Categories</p>
                      {this.handelCate(item)}
                    </Space>
                    <Descriptions.Item label="Quantity">{item.quantity}</Descriptions.Item>
                    <Descriptions.Item label="Publish Date">{item.publishDate}</Descriptions.Item>
                    <Descriptions.Item label="Fee">{item.fee}</Descriptions.Item>
                    <Descriptions.Item label="Company">{item.publishingCompany}</Descriptions.Item>
                  </Descriptions>
                </Space>
              </>
            }
            trigger="hover"
            placement={'right'}
          >
            <List.Item style={{ cursor: 'pointer' }} key={item.id}>
              <Space
                direction="horizontal"
                style={{ width: '100%', justifyContent: 'start' }}
              >
                <Image
                  width={45}
                  height={55}
                  style={{ borderRadius: 10 }}
                  src={item.image.length != 0 ? item.image[0].url : null}
                />
                <Space direction="vertical" size="small">
                  <p style={{ marginBottom: 0 }}>
                    <Text style={{ maxWidth: 350 }} ellipsis={true}>
                      {item.name}
                    </Text>
                    <span style={{ color: 'rgba(0, 0, 0, .4)', fontStyle: 'italic' }}>
                      {' '}
                      - {item.author}
                    </span>
                  </p>
                  <Space direction="horizontal" size="small">
                    <p style={{ marginBottom: 0, color: 'rgba(0, 0, 0, .6)', fontStyle: 'italic' }}>
                      Date Upload: {item.createdDate?.split('T')[0]}
                    </p>
                    <p style={{ marginBottom: 0 }}>
                      <span style={{ color: 'rgba(0, 0, 0, .4)', fontStyle: 'italic' }}>By:</span>{' '}
                      {item.staffName}
                    </p>
                  </Space>
                </Space>
              </Space>
            </List.Item>
          </Popover>
        )}
      />
    );
  }
  handelCate(record: any) {
    if (record.category != undefined) {
      var tmp: any = [];
      if (record.category.length > 0) {
        return (
          <Popover
            content={
              <div style={{ width: 50 }}>
                {record.category.map((cate: any, index: number) => (
                  <Tag icon={<TagOutlined />} color="#2db7f5">
                    {cate.name}
                  </Tag>
                ))}
              </div>
            }
            title="All Categories"
            trigger="hover"
          >
            {record.category.map((cate: any, index: number) =>
              index < 1 ? (
                <>
                  <Tag icon={<TagOutlined />} color="#2db7f5">
                    {cate.name}
                  </Tag>
                  <p style={{ display: 'inline-block', marginBottom: 0 }}>...</p>
                </>
              ) : (
                <></>
              ),
            )}
          </Popover>
        );
      } else {
        record.category.map((cate: any) =>
          tmp.push(
            <Tag icon={<TagOutlined />} color="#2db7f5">
              {cate.name}
            </Tag>,
          ),
        );
      }

      return tmp;
    } else {
      return (
        <Tag icon={<WarningOutlined />} color="#cd201f">
          No category
        </Tag>
      );
    }
  }
}

export default connect((state: any) => ({
  ...state,
}))(NewBookInSystem);
