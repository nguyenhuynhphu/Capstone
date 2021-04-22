import React from 'react';
import { connect } from 'umi';
import 'antd/dist/antd.css';

import { ResponsiveBar } from '@nivo/bar';

interface ReturnFeeChartProps {
  returnfeechart?: any
}

class ReturnFeeChart extends React.Component<ReturnFeeChartProps> {
  render() {
    return (
      <ResponsiveBar
        data={this.props.returnfeechart.data}
        keys={['fee']}
        indexBy="returnTime"
        margin={{ top: 20, right: 40, bottom: 80, left: 60 }}
        padding={0.3}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'nivo' }}
        colorBy={"index"}
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
              id: 'month1',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'month2',
            },
            id: 'lines',
          },
        ]}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
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
}))(ReturnFeeChart);
