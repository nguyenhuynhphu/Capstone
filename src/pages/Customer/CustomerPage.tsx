import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Drawer, Row, Space } from 'antd';
import React from 'react';
import styles from './CustomerPage.less';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';

import { connect, Dispatch } from 'umi';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';
import { library } from '@fortawesome/fontawesome-svg-core';
import CustomerTable from './components/CustomerTable';

interface CustomerPageProps {
  dispatch: Dispatch;
  customerpage?: any;
  customertable?: any;
}
interface CustomerPageState {
  form: any;
}
class CustomerPage extends React.Component<CustomerPageProps, CustomerPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
    };

    this.hideViewCustomer = this.hideViewCustomer.bind(this);
  }

  render() {
    const { customerpage } = this.props;
    return (
      <>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Row>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <CustomerTable />
              </Col>
            </Row>
          </Col>
        </Row>
        <Drawer
          width={420}
          placement="right"
          closable={false}
          onClose={this.hideViewCustomer}
          visible={customerpage.viewCustomerVisible}
        >
          <ViewForm />
        </Drawer>
      </>
    );
  }


  hideViewCustomer() {
    this.props.dispatch({
      type: 'customerpage/hideViewCustomer',
      payload: {},
    });
  }
}

export default connect((state) => ({ ...state }))(CustomerPage);
