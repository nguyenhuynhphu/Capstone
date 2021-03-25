import React from 'react';

import { connect, Dispatch } from 'umi';
import {
  Comment,
  Avatar,
  Typography,
  List,
  Rate,
  Divider,
  Skeleton,
  Button,
  Spin,
  Space,
} from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface ListCommentProps {
  dispatch: Dispatch;
  listcomments?: any;
  managebook?: any;
}
interface ListCommentState {}

class ListComment extends React.Component<ListCommentProps, ListCommentState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { listcomments, managebook } = this.props;

    return (
      <>
        <List
          className="comment-list"
          itemLayout="horizontal"
          loadMore={
            listcomments.hasNextPage ? (
              <>
                <div
                  style={{
                    textAlign: 'center',
                    marginTop: 12,
                    height: 32,
                    lineHeight: '32px',
                  }}
                >
                  <Button
                    onClick={() =>
                      this.props.dispatch({
                        type: 'listcomments/fetchData',
                        payload: { id: managebook.choiceBook.id, page: listcomments.current + 1 },
                      })
                    }
                  >
                    Loading more
                  </Button>
                </div>
              </>
            ) : null
          }
          dataSource={listcomments.data}
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
                      value={item.rate != undefined ? item.rate : 0}
                      disabled
                    />
                    <p>{item.reviewContent}</p>
                  </div>
                }
              />
            </li>
          )}
        />
        <div style={{textAlign: 'center', height: 50}}>
          <Spin size={'large'} spinning={listcomments.isLoading} />
        </div>
      </>
    );
  }
}

export default connect((state) => ({ ...state }))(ListComment);
