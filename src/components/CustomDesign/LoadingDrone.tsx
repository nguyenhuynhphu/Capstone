import { UserOutlined } from '@ant-design/icons';
import { Space, Image } from 'antd';
import React from 'react';
import logo from '../../assets/drone2.gif';
interface LoadingDroneProps {}

const LoadingDrone = (props: LoadingDroneProps) => (
  <>
    <Space direction='vertical' style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image src={logo} width={180} />
      <p>Loading</p>
    </Space>
  </>
);

export default LoadingDrone;
