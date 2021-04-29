import React from 'react';
import { connect, Dispatch } from 'umi';
import { Button, Divider, Progress, Space, Statistic } from 'antd';
import Title from 'antd/lib/typography/Title';
import {
  AppstoreOutlined,
  ArrowDownOutlined,
  ArrowUpOutlined,
  RightOutlined,
} from '@ant-design/icons';

interface NewDetectProps {
  dispatch: Dispatch;
  newdetect?: any;
  trackingDetail: Function;
}
interface NewDetectState {}

class NewDetect extends React.Component<NewDetectProps, NewDetectState> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { newdetect } = this.props;
    const { data } = newdetect;
    return (
      <>
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
          <Space style={{ justifyContent: 'space-between' }}>
            <div>
              <Title style={{ margin: 0 }} level={4}>
                {data.bookShelfName}
              </Title>
              <div style={{ color: 'rgba(0, 0 ,0, .6)', fontStyle: 'italic', marginBottom: 5 }}>
                <p style={{ marginBottom: 0 }}>Uploaded: {data.time?.split('T')[0]}</p>
                <p style={{ marginBottom: 0 }}>Staff: {data.staffName}</p>
              </div>
            </div>
          </Space>
          <Statistic
            title="Drawer Found"
            value={data.drawerDetection?.length}
            suffix={`/ ${data.notFoundDrawer } `}
          />
          <Button
            type="link"
            style={{ fontStyle: 'italic', fontSize: 14 }}
            onClick={() => this.props.trackingDetail(data)}
          >
            Detail <RightOutlined />
          </Button>
        </Space>
        <Divider orientation="left" style={{ marginTop: 15, marginBottom: 15 }}>
          Overview
        </Divider>
        <Space
          direction="horizontal"
          size="large"
          style={{ justifyContent: 'space-around', width: '100%' }}
        >
          {data.totalError != 0 ? (
            <Progress
              type="circle"
              strokeColor={{
                '0%': '#f50',
                '100%': '#f50',
              }}
              width={90}
              percent={100}
              format={() => <p style={{ margin: 0, color: '#f50' }}>{data.totalError} error</p>}
            />
          ) : (
            <Progress width={90} type="circle" percent={100} />
          )}
          <Statistic
            title="Compare Last Scan"
            value={data.compareLastTime > 0 ? data.compareLastTime: data.compareLastTime * -1}
            valueStyle={data.compareLastTime > 0 ? { color: '#f50' } : { color: '#3f8600' }}
            prefix={data.compareLastTime > 0 ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix={'errors'}
          />
          <Statistic title="Total Scans" value={data.totalDetect} suffix={'time'} />
        </Space>
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(NewDetect);
