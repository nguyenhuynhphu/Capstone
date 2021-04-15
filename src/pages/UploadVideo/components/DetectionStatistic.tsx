import React from 'react';
import { connect } from 'umi';
import { Col, Descriptions, Row, Statistic } from 'antd';
import 'antd/dist/antd.css';

import {
  BookOutlined,
  FileDoneOutlined,
  RadiusUpleftOutlined,
} from '@ant-design/icons';
import moment from 'moment';

interface DetectionStatisticProps {
  detectionstatistic?: any;
}

class DetectionStatistic extends React.Component<DetectionStatisticProps> {
  render() {

    const data: any = {};
    return (
      <>
        <Row gutter={16} style={{ width: '100%' }}>
          <Col span={15} style={{ height: 250 }}></Col>

          <Col span={9} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <div>
              <Statistic
                style={{ marginBottom: 15 }}
                prefix={<BookOutlined style={{ color: '#40a9ff' }} />}
                title="Total books"
                value={data.totalBook}
              />
              <Statistic
                style={{ marginBottom: 15 }}
                prefix={<FileDoneOutlined style={{ color: '#40a9ff' }} />}
                title="Book Available"
                value={data.totalAvailable}
              />
              <Statistic
                style={{ marginBottom: 15 }}
                prefix={<RadiusUpleftOutlined style={{ color: '#40a9ff' }} />}
                title="Book Not Available"
                value={data.totalNotAvailable}
              />
            </div>
          </Col>
        </Row>
        <Descriptions title="Statistic" column={2} size="default">
          <Descriptions.Item label="Month Income">{data.earnByMonth}$</Descriptions.Item>
          <Descriptions.Item label="Return Late">{data.totalLate}</Descriptions.Item>
          <Descriptions.Item label="Total Returns">{data.totalReturn}</Descriptions.Item>
          <Descriptions.Item label="Total Borrows">{data.totalBorrow}</Descriptions.Item>
          <Descriptions.Item
            label=""
            contentStyle={{
              color: 'rgba(0 ,0, 0, .4)',
              fontStyle: 'italic',
              textAlign: 'right',
              display: 'block',
              position: 'relative',
              top: 10,
            }}
          >
            This statistics as of {moment().format('DD/MM/YYYY')}
          </Descriptions.Item>
        </Descriptions>
      </>
    );
  }
}
export default connect((state: any) => ({
  ...state,
}))(DetectionStatistic);
