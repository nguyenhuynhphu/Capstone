import { Space, Spin } from 'antd';
import React from 'react';

import { connect } from 'umi';

class Test extends React.Component<{}> {
  render() {
    return (
      <Space
        direction="vertical"
        style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
      >
     
        <Spin spinning style={{ fontSize: 80 }} />
      </Space>
    );
  }
}

export default connect((state) => ({ ...state }))(Test);
