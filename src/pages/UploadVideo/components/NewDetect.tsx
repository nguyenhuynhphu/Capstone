import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { connect, Dispatch } from 'umi';
import { Progress } from 'antd';

interface NewDetectProps {
  dispatch: Dispatch;

}

class NewDetect extends React.Component<NewDetectProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { periorchart } = this.props;
    return (
      <>
        <Progress
          strokeColor={{
            from: '#108ee9',
            to: '#87d068',
          }}
          percent={99.9}
          status="active"
        />
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(NewDetect);
