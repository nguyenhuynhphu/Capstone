import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col, Drawer, Row } from 'antd';
import React from 'react';

import { connect, Dispatch } from 'umi';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';
import CustomerTable from './components/CustomerTable';
import TableHeader from '@/components/CustomDesign/TableHeader';

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
        <Row style={{marginTop: 15, backgroundColor: 'white', padding: '20px 25px', borderRadius: '15px' }}>
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
