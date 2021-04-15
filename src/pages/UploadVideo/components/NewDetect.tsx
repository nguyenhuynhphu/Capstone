import React from 'react';
import { connect, Dispatch } from 'umi';
import { Space, Spin } from 'antd';
import Avatar from 'antd/lib/avatar/avatar';

interface NewDetectProps {
  dispatch: Dispatch;
  newdetect?: any;
}
interface NewDetectState {}

class NewDetect extends React.Component<NewDetectProps, NewDetectState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { newdetect } = this.props;

    return (
      <>
        <Space>
          {/* <Avatar
            shape="square"
            style={{ width: 100, height: 100 }}
            src={record.image}
            size="large"
          />
          <div>
            <p style={{ marginBottom: 0 }}>{record.staffName}</p>
            <p style={{ marginBottom: 0 }}>{record.time.split('T')[0]}</p>
          </div> */}
        </Space>
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(NewDetect);
