import React from 'react';

import { connect, Dispatch } from 'umi';
import { List, Skeleton, Button, Descriptions, Divider } from 'antd';

interface ListBookProps {
  dispatch: Dispatch;
  listbooks?: any;
}
interface ListBookState {}

class ListBook extends React.Component<ListBookProps, ListBookState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { listbooks } = this.props;

    return (
      <Skeleton loading={listbooks.isLoading} active={true}>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={listbooks.data}
          renderItem={(item: any) => (
            <>
              <Descriptions column={2}>
                <Descriptions.Item label="Barcode">#{item.barCode}</Descriptions.Item>
                <Descriptions.Item label="ID">{item.id}</Descriptions.Item>
                <Descriptions.Item label="Status" span={2}>
                  {item.isAvailable ? 'Available' : 'Not Available'}
                </Descriptions.Item>
                <Descriptions.Item label="Drawer" span={2}>
                  {item.drawerName}
                </Descriptions.Item>
                <Descriptions.Item label="Book Shelf" >
                  {item.bookShelfName}
                </Descriptions.Item>
              </Descriptions>
              <Divider />
            </>
          )}
        />
      </Skeleton>
    );
  }
}

export default connect((state) => ({ ...state }))(ListBook);
