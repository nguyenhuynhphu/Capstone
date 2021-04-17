import { Space, Image, Typography, Alert, Button, Popconfirm, Tag } from 'antd';
import moment from 'moment';

import React from 'react';
import { connect } from 'umi';

const { Text } = Typography;

interface ReturnItemrops {
  returnItem: any;
  renderParent: Function;
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
            <div style={{ width: 300 }}>
              <p style={{ marginBottom: 0 }}>
                <Text style={{ maxWidth: 230, fontWeight: 500 }} ellipsis={true}>
                  {returnItem.bookName}
                </Text>
                <span style={{ color: 'rgba(0, 0, 0, .4)', fontStyle: 'italic' }}>
                  {' '}
                  - {returnItem.author}
                </span>
              </p>
              <Space direction="horizontal">
                <p style={{ marginBottom: 0 }}>BookID: {returnItem.bookId}</p>
                <p style={{ margin: 0 }}>Barcode: #{returnItem.barcode}</p>
              </Space>
              <Space direction="horizontal">
                <p style={{ margin: '5px 0px' }}>Fee: {returnItem.fee}$/day</p>
                <p style={{ margin: '5px 0px' }}>Punish Fee: {returnItem.punishFee}$/day</p>
              </Space>
              {!returnItem.isReturn ? (
                <Space direction="horizontal" style={{ width: '100%' }}>
                  <Tag color="#87d068" style={{ fontSize: 16, width: 80, textAlign: 'center' }}>
                    + {this.handelFee()}$
                  </Tag>
                  {moment().diff(returnItem.returnTime, 'days') > 0 ? (
                    <Tag color="#f50" style={{ fontSize: 16, width: 80, textAlign: 'center' }}>
                      + {this.handelPunishFee()}$
                    </Tag>
                  ) : (
                    <></>
                  )}
                </Space>
              ) : (
                <></>
              )}
            </div>
            {!returnItem.isReturn ? (
              <Space direction="horizontal">
                {moment().diff(returnItem.returnTime, 'days') > 0 ? (
                  <Tag color={'#f50'}>
                    Late {moment().diff(returnItem.returnTime, 'days') + 1} days
                  </Tag>
                ) : (
                  <></>
                )}
                {returnItem.isReturnToday ? (
                  <Alert showIcon message="Return" type="success" />
                ) : (
                  <Popconfirm
                    title="Are you sure to confirm this?"
                    onConfirm={() => {
                      returnItem.isReturnToday = true;
                      this.props.renderParent();
                      this.setState({});
                    }}
                  >
                    <Button>Return</Button>
                  </Popconfirm>
                )}
              </Space>
            ) : (
              <Tag color={'#87d068'} style={{ marginLeft: 100, cursor: 'pointer' }}>
                Returned
              </Tag>
            )}
          </Space>
        </Space>
      </>
    );
  }
  handelFee() {
    const { returnItem } = this.props;

    var diffDate = moment(returnItem.returnTime).diff(returnItem.startTime, 'days');
    if (diffDate == 0) diffDate = 1;
    else diffDate += 1;
    var fee = 0;
    fee += returnItem.fee * diffDate;
    
    return fee;
  }
  handelPunishFee() {
    const { returnItem } = this.props;
    var returnTime = returnItem.returnTime;
    var diffDate = moment().diff(returnTime, 'days');

    var punishFee = 0;
    if (diffDate > 0) {
      punishFee += returnItem.punishFee * (diffDate + 1);
    }
    return punishFee;
  }
}

export default connect((state) => ({ ...state }))(ReturnItem);
