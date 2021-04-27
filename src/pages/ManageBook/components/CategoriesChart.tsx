import React from 'react';
import { connect, Dispatch } from 'umi';
import { Spin, Typography } from 'antd';
import 'antd/dist/antd.css';
import { ResponsiveBar } from '@nivo/bar';
const { Text } = Typography;

interface CategoriesChartProps {
  dispatch?: Dispatch;
  categorieschart?: any;
}

class CategoriesChart extends React.Component<CategoriesChartProps, {}> {
  render() {
    const { categorieschart } = this.props;
    return (
      <ResponsiveBar
        //data={data}
        data={categorieschart.data}
        keys={['total']}
        indexBy="category"
        margin={{ top: 30, right: 25, bottom: 60, left: 35 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        colorBy={'index'}
        enableGridX={true}
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: '#38bcb2',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: '#eed312',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'fries',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'sandwich',
            },
            id: 'lines',
          },
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        // axisBottom={{
        //   tickSize: 5,
        //   tickPadding: 5,
        //   tickRotation: 0,
        //   legend: 'Book',
        //   legendPosition: 'middle',
        //   legendOffset: 32,
        // }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'food',
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        enableLabel={false}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    );
  }
}
export default connect((state: any) => ({
  ...state,
}))(CategoriesChart);
