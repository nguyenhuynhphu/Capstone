import { Col, Row, Table } from 'antd';
import React from 'react';
import ReactPlayer from 'react-player';

interface DescriptionProps {
  name: string;
  value: string;
}

class Description extends React.Component<DescriptionProps> {
  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <>
        <Row style={{fontFamily: 'roboto', borderBottom: '1px solid rgba(0, 0, 0, .2)', marginBottom: 10}}>
          <Col span={12}>
            <p style={{textAlign: 'left', fontWeight: 500}}>{this.props.name}</p>
          </Col>
          <Col span={12}>
            <p style={{textAlign: 'left'}}>{this.props.value}</p>
          </Col>
        </Row>
      </>
    );
  }
}
export default Description;
