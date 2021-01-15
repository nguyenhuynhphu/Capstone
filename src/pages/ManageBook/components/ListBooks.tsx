import React from 'react';

import { connect, Dispatch } from 'umi';
import { Comment, Avatar, Typography, List, Rate, Divider, Skeleton, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

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
          loadMore={
            <>
              <div
                style={{
                  textAlign: 'center',
                  marginTop: 12,
                  height: 32,
                  lineHeight: '32px',
                }}
              >
                <Button onClick={() => {}}>loading more</Button>
              </div>
            </>
          }
          dataSource={listbooks.data}
          renderItem={(item: any) => (
            <li>
              <Comment
                actions={[
                  <span key="comment-list-reply-to-0">
                    <DeleteOutlined style={{ marginRight: 5 }} />
                    Remove
                  </span>,
                ]}
                avatar={
                  <Avatar
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                    alt="Han Solo"
                  />
                }
                content={
                  <div>
                    <Divider style={{ margin: 0 }} orientation="left" plain>
                      {item.customerId}
                    </Divider>

                    <Rate
                      allowHalf
                      allowClear={false}
                      style={{ fontSize: 14 }}
                      value={item.rating != undefined ? item.rating : 0}
                      disabled
                    />
                    <p>{item.reviewContent}</p>
                  </div>
                }
              />
            </li>
          )}
        />
      </Skeleton>
    );
  }
}

export default connect((state) => ({ ...state }))(ListBook);
