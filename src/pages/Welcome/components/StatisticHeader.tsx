import React from 'react';
import { Row, Col, Space, Avatar, Spin } from 'antd';
import Title from 'antd/lib/typography/Title';
import { connect } from 'react-redux';
import { Dispatch } from 'umi';
import styles from '../Welcome.less';

import ManageBorrowStatistic from '@/pages/ManageBorrow/components/ManageBorrowStatistic';
import { SmileOutlined } from '@ant-design/icons';
interface StatisticHeaderProps {
  dispatch: Dispatch;
  statisticheader?: any;
}
class StatisticHeader extends React.Component<StatisticHeaderProps> {
  componentDidMount() {
    this.props.dispatch({
      type: 'statisticheader/fetchPatronActivities',
    });
    this.props.dispatch({
      type: 'statisticheader/fetchReturnToday',
    });
  }
  render() {
    const { statisticheader } = this.props;
    return (
      <Row
        style={{
          // height: 300,
          backgroundColor: 'white',
          borderRadius: '15px',
          padding: '20px 35px',
        }}
      >
        <Col span={9} style={{ display: 'flex', alignItems: 'center' }}>
          <div>
            <ManageBorrowStatistic />
          </div>
        </Col>
        <Col span={8} offset={1} style={{ marginTop: 20 }}>
          <Spin spinning={this.props.statisticheader.isLoading}>
            <Title
              level={3}
              style={{ fontWeight: 300, color: 'rgba(0 ,0 ,0 ,.8)', marginBottom: 0 }}
            >
              Return today
            </Title>
            <p style={{ fontStyle: 'italic', color: 'rgba(0 ,0, 0, .4)' }}>
              List patron need return book today
            </p>
            <Space className={styles.returnToday} direction={'vertical'} size="middle">
              {statisticheader.returnToday.length != 0 ? (
                <>
                  {statisticheader.returnToday.map((record: any) => (
                    <Space
                      direction={'horizontal'}
                      align={'center'}
                      style={{ width: '100%', justifyContent: 'space-between' }}
                    >
                      <Space direction={'horizontal'}>
                        <Avatar shape="square" size="default" src={record.image} />
                        <div>
                          <p style={{ marginBottom: 0 }}>{record.patronName}</p>
                          <p style={{ marginBottom: 0, fontSize: 12, color: 'rgba(0 ,0, 0, .4)' }}>
                            {record.startTime.split('T')[0]}
                          </p>
                        </div>
                      </Space>
                     
                    </Space>
                  ))}
                </>
              ) : (
                <Space
                  direction="vertical"
                  style={{
                    width: '100%',
                    height: 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <SmileOutlined style={{ color: 'rgba(0, 0, 0, .2)', fontSize: 40 }} />
                  <p style={{ color: 'rgba(0, 0, 0, .2)', textAlign: 'center' }}>
                    No return book today
                  </p>
                </Space>
              )}
            </Space>
          </Spin>
        </Col>
        <Col span={6} style={{ textAlign: 'left', marginTop: 20 }}>
          <Spin spinning={this.props.statisticheader.isLoading}>
            <Title
              level={3}
              style={{ fontWeight: 300, color: 'rgba(0 ,0 ,0 ,.8)', marginBottom: 0 }}
            >
              New Borrow
            </Title>
            <p style={{ fontStyle: 'italic', color: 'rgba(0 ,0, 0, .4)' }}>
              New patron borrow in system
            </p>
            <Space style={{ height: '100%', width: '85%' }} direction={'vertical'} size="middle">
              {statisticheader.patronActive.map((record: any) => (
                <Space
                  direction={'horizontal'}
                  align={'center'}
                  style={{ width: '100%', justifyContent: 'space-between' }}
                >
                  <Space direction={'horizontal'}>
                    <Avatar shape="square" size="default" src={record.image} />
                    <div>
                      <p style={{ marginBottom: 0 }}>{record.patronName}</p>
                      <p style={{ marginBottom: 0, fontSize: 12, color: 'rgba(0 ,0, 0, .4)' }}>
                        {record.startTime.split('T')[0]}
                      </p>
                    </div>
                  </Space>
                  {/* <p style={{ marginBottom: 0, color: 'green', fontSize: 16 }}>+ {record.total}$</p> */}
                </Space>
              ))}
            </Space>
          </Spin>
        </Col>
      </Row>
    );
  }
}
export default connect((state) => ({ ...state }))(StatisticHeader);
