import React from 'react';
import { connect, Dispatch } from 'umi';
import { Avatar, List, Space, Typography, Image, Popover, Row, Col, Descriptions, Tag } from 'antd';
import 'antd/dist/antd.css';
import { TagOutlined, WarningOutlined } from '@ant-design/icons';
import styles from '../ManageBookPage.less';
interface NewBookInSystemProps {
  dispatch: Dispatch;
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
                    src={item.image.length != 0 ? item.image[0].url : null}
                  />
                  {console.log(item)}
                  <Descriptions  className={styles.hoverDescription} style={{ width: 250 }} size="small" column={1}>
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
            <List.Item>
              <Space>
                <p>{item.name}</p>
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
