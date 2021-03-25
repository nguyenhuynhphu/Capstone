import React from 'react';

import { connect, Dispatch } from 'umi';
import { List, Skeleton, Button } from 'antd';

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
            <div>
              <p>#{item.barCode}</p>
              <p>{item.id}</p>
              <p>{item.isAvailable}</p>
            </div>
          )}
        />
      </Skeleton>
    );
  }
}

export default connect((state) => ({ ...state }))(ListBook);
