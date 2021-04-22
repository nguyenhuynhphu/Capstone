import React from 'react';
import { connect } from 'umi';
import { Button, Col, Descriptions, Row, Statistic } from 'antd';
import 'antd/dist/antd.css';

import { AppstoreOutlined, BookOutlined, CarryOutOutlined, FileDoneOutlined, HddOutlined, RadiusUpleftOutlined, SafetyCertificateOutlined, SecurityScanOutlined } from '@ant-design/icons';

import moment from 'moment';
import PineChartCompare from './PineChartCompare';

interface ManageDetectStatisticProps {
  managedetectstatistic?: any;
}

class ManageDetectStatistic extends React.Component<ManageDetectStatisticProps> {
  render() {
    const { managedetectstatistic } = this.props;
    const { data } = managedetectstatistic;
    return (
      <>
        <Row gutter={16} style={{ width: '100%' }}>
          <Col span={15} style={{ height: 250 }}>
            <PineChartCompare
              data={[
                {
                  id: 'Scaned',
                  label: 'Scaned',
                  value: data.totalAvailable,
                },
                {
                  id: 'Not Scaned',
                  label: 'Not Scaned',
                  value: data.totalNotAvailable,
                },
              ]}
            />
          </Col>

          <Col span={9} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}>
            <div>
              <Statistic
                style={{ marginBottom: 15 }}
                prefix={<HddOutlined style={{ color: '#40a9ff' }} />}
                title="Total bookshelves"
                value={data.totalBookShelf}
              />
              <Statistic
                style={{ marginBottom: 15 }}
                prefix={<SafetyCertificateOutlined style={{ color: '#40a9ff' }} />}
                title="Scaned bookshelves"
                value={data.totalAvailable}
              />
              <Statistic
                style={{ marginBottom: 15 }}
                prefix={<SecurityScanOutlined style={{ color: '#40a9ff' }} />}
                title="Unscaned bookshelves"
                value={data.totalNotAvailable}
              />
            </div>
          </Col>
        </Row>
        <Descriptions title="Statistic" column={2} size="default">
          <Descriptions.Item label="Most Scanned">{data.mostScannedBookshelf?.day}</Descriptions.Item>
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
}))(ManageDetectStatistic);
