import { Space, Spin } from 'antd';
import React from 'react';

import { connect } from 'umi';
import LoadingDrone from '../CustomDesign/LoadingDrone';

class LoadingComponent extends React.Component<{}> {
  render() {
    return (
      <Space
        direction="vertical"
        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100vh' }}
      >
        <LoadingDrone />
      </Space>
    );
  }
}

export default connect((state) => ({ ...state }))(LoadingComponent);
