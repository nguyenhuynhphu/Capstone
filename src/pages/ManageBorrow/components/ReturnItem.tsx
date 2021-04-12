import { TagsOutlined } from '@ant-design/icons';
import { Space, Image, Select, Typography, Descriptions, Alert, Button, Popconfirm } from 'antd';

import React from 'react';
import { connect } from 'umi';


const { Paragraph, Text } = Typography;

interface ReturnItemrops {
  returnItem: any;
}

class ReturnItem extends React.Component<ReturnItemrops, {}> {
  constructor(props: any) {
    super(props);
  }

  render() {
    const { returnItem } = this.props;

    return (
      <>
        <Space
          direction={'horizontal'}
          align={'center'}
          style={{ width: '100%', alignItems: 'start', marginBottom: 10 }}
        >
          <Image width={80} height={120} style={{ borderRadius: 5 }} src={returnItem.image} />
          <Space
            direction="horizontal"
            style={{ width: 'calc(100% -80px)', justifyContent: 'space-between' }}
          >
            <div style={{ width: 400 }}>
              <p style={{ marginBottom: 0 }}>
                <Text style={{ maxWidth: 230, fontWeight: 500 }} ellipsis={true}>
                  {returnItem.bookName}
                </Text>
                <span style={{ color: 'rgba(0, 0, 0, .4)', fontStyle: 'italic' }}>
                  {' '}
                  - {returnItem.author}
                </span>
              </p>

              <p style={{ margin: '5px 0px' }}>
                Fee: {returnItem.fee}$ / Punish Fee: {returnItem.punishFee}$
              </p>
              <p style={{ margin: '5px 0px' }}>BookID: {returnItem.bookId}</p>
              <p style={{ margin: '5px 0px' }}>Barcode: #{returnItem.barcode}</p>
            </div>
            {returnItem.isReturn ? (
              <Alert showIcon message="Return" type="success" />
            ) : (
              <Popconfirm
                title="Are you sure to confirm this?"
                onConfirm={() => {
                  returnItem.isReturn = true;
                  this.setState({});
                }}
              >
                <Button>Return</Button>
              </Popconfirm>
            )}
          </Space>
        </Space>
      </>
    );
  }
}

export default connect((state) => ({ ...state }))(ReturnItem);
