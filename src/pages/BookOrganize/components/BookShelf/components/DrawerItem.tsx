import { TagsOutlined } from '@ant-design/icons';
import { Space } from 'antd';

import React from 'react';

import { connect, Dispatch } from 'umi';

interface DrawerItemProps {
  drawer: any;
}

class DrawerItem extends React.Component<DrawerItemProps, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { drawer } = this.props;

    return (
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space direction="horizontal" style={{justifyContent: 'space-between', width: '100%'}}>
          <p
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 0,
              textAlign: 'left',
              padding: '2px 0 0 0px',
              borderBottom: '1px solid rgba(0, 0, 0, .4)'
            }}
          >
            {drawer.name}
          </p>
          <TagsOutlined style={{fontSize: 20, color: '#40a9ff'}}/>
        </Space>
        <Space direction="horizontal">
          <p style={{ margin: 0, fontSize: 14 }}>Row: {drawer.row}</p>
          <p style={{ margin: 0, fontSize: 14 }}>Column: {drawer.col}</p>
        </Space>

        <Space direction="horizontal">
          <p style={{ margin: 0, fontSize: 14 }}>Code: #{drawer.barcode}</p>
        </Space>
      </Space>
    );
  }
}

export default connect((state) => ({ ...state }))(DrawerItem);
