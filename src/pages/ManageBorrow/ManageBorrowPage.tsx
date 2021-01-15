import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React from 'react';

import moment from 'moment';
import { connect, Dispatch } from 'umi';
import { Avatar, Button, Col, List, Result, Row, Spin, Steps } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
const { Step } = Steps;
const data = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];
interface ManageBorrowPageProps {
  dispatch: Dispatch;
  manageborrow?: any;
}
interface ManageBorrowPageState {}
class ManageBorrowPage extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  render() {
    const { manageborrow, dispatch } = this.props;
    return (
      <>
        <PageHeaderWrapper
          extra={[
            <Button
              key="1"
              type="primary"
              onClick={() => {
                dispatch({
                  type: 'manageborrow/loading',
                  payload: {},
                });
                setTimeout(() => {
                  dispatch({
                    type: 'manageborrow/changeScreen',
                    payload: {},
                  });
                }, 1000);
              }}
            >
              {!manageborrow.isMakingTransaction ? 'Making Borrow Request' : 'Cancel Request'}
            </Button>,
          ]}
          style={{ marginBottom: 10, backgroundColor: 'white' }}
        />
        {manageborrow.isMakingTransaction ? (
          <>
            <Spin spinning={manageborrow.screenLoading}>
              <Row style={{ backgroundColor: 'white', padding: '25px 20px', minHeight: 500 }}>
                <Col
                  span={6}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'auto',
                    alignItems: 'center',
                    paddingLeft: 20,
                    borderRight: '0.5px solid rgba(0, 0, 0, .1)',
                  }}
                >
                  <Steps
                    direction="vertical"
                    current={0}
                    style={{ height: '100%', transform: 'translateY(50px)' }}
                  >
                    <Step title="Getting Wishlist" />
                    <Step title="Checking Wishlist" />
                    <Step title="Complete !" />
                  </Steps>
                </Col>
                <Col
                  span={18}
                  style={{ height: '100% !important', display: 'grid', alignItems: 'center' }}
                >
                  {this.handelStep(1)}
                </Col>
              </Row>
            </Spin>
          </>
        ) : (
          <>
            <Spin spinning={manageborrow.screenLoading}>
              <div>askdkjgasdkjasgdkasjdhg</div>
            </Spin>
          </>
        )}
      </>
    );
  }

  handelStep(step: number) {
    switch (step) {
      case 0:
        return (
          <Result
            title="Scanning QR code"
            subTitle="Please using phone to scan customer QR code !"
            extra={[
              <Button type="primary" key="console">
                Start Scanning
              </Button>,
            ]}
          />
        );
      case 1:
        return (
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                  }
                  title={<a href="https://ant.design">{item.title}</a>}
                  description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                />
              </List.Item>
            )}
          />
        );
      case 2:
        return <div>not done</div>;
    }
  }
}
export default connect((state) => ({ ...state }))(ManageBorrowPage);
