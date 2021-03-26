import React from 'react';
import { connect, Dispatch } from 'umi';
import { Spin, Typography } from 'antd';
import 'antd/dist/antd.css';
import { ResponsiveBar } from '@nivo/bar';
const { Text } = Typography;

interface CategoriesChartProps {
  dispatch: Dispatch;
  categorieschart?: any;
}

const data: any = [
  {
    category: 'AL',
    'hot dog': 8,
    'hot dogColor': 'hsl(243, 70%, 50%)',
    burger: 17,
    burgerColor: 'hsl(249, 70%, 50%)',
    sandwich: 94,
    sandwichColor: 'hsl(112, 70%, 50%)',
    kebab: 17,
    kebabColor: 'hsl(107, 70%, 50%)',
    fries: 162,
    friesColor: 'hsl(112, 70%, 50%)',
    donut: 94,
    donutColor: 'hsl(232, 70%, 50%)',
  },
  {
    category: 'AM',
    'hot dog': 11,
    'hot dogColor': 'hsl(215, 70%, 50%)',
    burger: 83,
    burgerColor: 'hsl(153, 70%, 50%)',
    sandwich: 81,
    sandwichColor: 'hsl(312, 70%, 50%)',
    kebab: 76,
    kebabColor: 'hsl(147, 70%, 50%)',
    fries: 150,
    friesColor: 'hsl(122, 70%, 50%)',
    donut: 133,
    donutColor: 'hsl(26, 70%, 50%)',
  },
];
class CategoriesChart extends React.Component<CategoriesChartProps, {}> {

  render() {
    const { categorieschart } = this.props;
    return (
        <ResponsiveBar
          data={categorieschart.data}
          keys={['total']}
          indexBy="category"
          margin={{ top: 30, right: 25, bottom: 60, left: 35 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          colors={{ scheme: 'nivo' }}
          colorBy={"index"}
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
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: 'Book',
            legendPosition: 'middle',
            legendOffset: 32,
          }}
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
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
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
