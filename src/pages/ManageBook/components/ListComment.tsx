import React from 'react';

import { connect, Dispatch } from 'umi';
import { Comment, Avatar, List, Rate, Divider, Popconfirm } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

interface ListCommentProps {
  dispatch: Dispatch;
  listcomments?: any;
  bookGroup: any;
  user?: any;
}
interface ListCommentState {}

class ListComment extends React.Component<ListCommentProps, ListCommentState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { listcomments } = this.props;

    return (
      <>
        <List
          className="comment-list"
          itemLayout="horizontal"
          dataSource={listcomments.data}
          loading={listcomments.isLoading}
          renderItem={(item: any) => (
            <li>
              <Comment
                actions={
                  this.props.user.currentUser.roleId == 1
                    ? [
                        <Popconfirm
                          title="Are you sure to delete this feedback ?"
                          onConfirm={() => {
                            this.props
                              .dispatch({
                                type: 'listcomments/removeFeedback',
                                payload: item.id,
                              })
                              .then(() =>
                                this.props.dispatch({
                                  type: 'listcomments/fetchData',
                                  payload: { id: this.props.bookGroup.id, page: 1 },
                                }),
                              );
                          }}
                        >
                          <span key="comment-list-reply-to-0">
                            <DeleteOutlined style={{ marginRight: 5 }} />
                            Remove
                          </span>
                        </Popconfirm>,
                      ]
                    : []
                }
                avatar={<Avatar src={item.image} alt={item.name} />}
                content={
                  <div>
                    <Divider style={{ margin: 0 }} orientation="left" plain>
                      {item.patronName}
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
      </>
    );
  }
}

export default connect((state) => ({ ...state }))(ListComment);
