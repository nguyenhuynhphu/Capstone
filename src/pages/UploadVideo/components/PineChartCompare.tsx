import React from 'react';
import { connect } from 'umi';
import 'antd/dist/antd.css';

import { ResponsivePie } from '@nivo/pie';

interface PineChartCompareProps {
  data: any;
}

class PineChartCompare extends React.Component<PineChartCompareProps> {
  render() {
    return (
      <ResponsivePie
        data={this.props.data}
        margin={{ top: 15, right: 15, bottom: 25, left: 0 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        startAngle={-90}
        
        endAngle={90}
        colors={{ scheme: 'nivo' }}
        borderWidth={1}
        borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
        radialLabelsSkipAngle={10}
        radialLabelsTextColor="#333333"
        radialLabelsLinkColor={{ from: 'color' }}
        sliceLabelsSkipAngle={10}
        sliceLabelsTextColor="#333333"
        enableRadialLabels={false}
        colorBy="index"
        defs={[
          {
            id: 'dots',
            type: 'patternDots',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: 'lines',
            type: 'patternLines',
            background: 'inherit',
            color: 'rgba(255, 255, 255, 0.3)',
            rotation: -45,
            lineWidth: 6,
            spacing: 10,
          },
        ]}
        fill={[
          {
            match: {
              id: 'ruby',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Scaned',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'go',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'python',
            },
            id: 'dots',
          },
          {
            match: {
              id: 'Not Scaned',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'lisp',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'elixir',
            },
            id: 'lines',
          },
          {
            match: {
              id: 'javascript',
            },
            id: 'lines',
          },
        ]}
      />
    );
  }
}
export default connect((state: any) => ({
  ...state,
}))(PineChartCompare);
