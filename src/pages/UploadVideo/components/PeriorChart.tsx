import { Col, Row, Table } from 'antd';
import React from 'react';
import { ResponsiveCalendar } from '@nivo/calendar';
import { connect, Dispatch } from 'umi';

interface PeriorChartProps {
  dispatch: Dispatch;
  periorchart?: any;
}

class PeriorChart extends React.Component<PeriorChartProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { periorchart } = this.props;
    return (
      <>
        <ResponsiveCalendar
          data={periorchart.data}
          from="2021-01-01"
          to="2021-12-31"
          emptyColor="#eeeeee"
          minValue={0}
          colors={['#61cdbb']}
          margin={{ top: 10, right: 40, bottom: 40, left: 40 }}
          monthBorderColor="#ffffff"
          dayBorderWidth={2}
          dayBorderColor="#ffffff"
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'row',
              translateY: 36,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(PeriorChart);
