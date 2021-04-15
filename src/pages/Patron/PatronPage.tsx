import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Col, Drawer, Row } from 'antd';
import React from 'react';

import { connect, Dispatch } from 'umi';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';
import PatronTable from './components/PatronTable';
import TableHeader from '@/components/CustomDesign/TableHeader';

interface PatronPageProps {
  dispatch: Dispatch;
  patronpage?: any;
  patrontable?: any;
}
interface PatronPageState {
  form: any;
}
class PatronPage extends React.Component<PatronPageProps, PatronPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
    };

    this.hideViewPatron = this.hideViewPatron.bind(this);
  }

  render() {
    const { patronpage } = this.props;
    return (
      <>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Row style={{marginTop: 15, backgroundColor: 'white', padding: '20px 25px', borderRadius: '15px' }}>
          <Col span={24}>
            <Row>
              <Col span={24}>
               
                <PatronTable />
              </Col>
            </Row>
          </Col>
        </Row>
        <Drawer
          width={420}
          placement="right"
          closable={false}
          onClose={this.hideViewPatron}
          visible={patronpage.viewPatronVisible}
        >
          <ViewForm />
        </Drawer>
      </>
    );
  }

  hideViewPatron() {
    this.props.dispatch({
      type: 'patronpage/hideViewPatron',
      payload: {},
    });
  }
}

export default connect((state) => ({ ...state }))(PatronPage);
