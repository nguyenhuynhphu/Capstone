import { UserOutlined } from '@ant-design/icons';
import { Space, Image } from 'antd';
import React from 'react';
import logo from '../../assets/drone2.gif';
interface LoadingDroneProps {}

const LoadingDrone = (props: LoadingDroneProps) => (
  <>
    <Space
      direction="vertical"
      style={{ justifyContent: 'center', alignItems: 'center', width: '100%', height: '100%' }}
    >
      <Image src={logo} width={180} />
    </Space>
  </>
);

export default LoadingDrone;
