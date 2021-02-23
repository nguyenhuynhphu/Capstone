import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Drawer, Row, Space } from 'antd';
import React from 'react';

import { connect, Dispatch } from 'umi';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';
import ManageBorrowTable from './components/ManageBorrowTable';

interface ManageBorrowPageProps {
  dispatch: Dispatch;
  manageborrowpage?: any;
  manageborrowtable?: any;
}
interface ManageBorrowPageState {
  form: any;
}
class ManageBorrowPage extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
    };

    this.hideViewBorrow = this.hideViewBorrow.bind(this);
  }

  render() {
    const { manageborrowpage } = this.props;
    return (
      <>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <ManageBorrowTable />
              </Col>
            </Row>
          </Col>
        </Row>
        <Drawer
          width={420}
          placement="right"
          closable={false}
          onClose={this.hideViewBorrow}
          visible={manageborrowpage.viewBorrowVisible}
        >
          <ViewForm />
        </Drawer>
      </>
    );
  }


  hideViewBorrow() {
    this.props.dispatch({
      type: 'manageborrowpage/hideViewBorrow',
      payload: {},
    });
  }
}

export default connect((state) => ({ ...state }))(ManageBorrowPage);
