import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Drawer, Row, Space } from 'antd';
import React from 'react';
import LibarianTable from './components/LibarianTable';
import styles from './LibarianPage.less';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';

import { connect, Dispatch } from 'umi';
import InputForm from './components/InputForm';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';
import { library } from '@fortawesome/fontawesome-svg-core';

interface LibarianPageProps {
  dispatch: Dispatch;
  libarianpage?: any;
  libariantable?: any;
}
interface LibarianPageState {
  form: any;
}
class LibarianPage extends React.Component<LibarianPageProps, LibarianPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      form: React.createRef<FormInstance>(),
    };

    this.handelSubmit = this.handelSubmit.bind(this);
    this.hideEditLibarian = this.hideEditLibarian.bind(this);
    this.hideViewLibarian = this.hideViewLibarian.bind(this);
  }

  render() {
    const { libarianpage } = this.props;
    return (
      <>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Row>
          <Col span={24}>
            <Row style={{ margin: '10px 0px' }}>
              <Col span={10}>
                <Search
                  placeholder="input search text"
                  style={{ width: 250 }}
                  // onSearch={(value) => this.handleFilter(value)}
                  enterButton
                />
              </Col>
              <Col span={4} offset={10} style={{ textAlign: 'right' }}>
                <Space size={20}>
                  <Button
                    type="primary"
                    onClick={() =>
                      this.props.dispatch({
                        type: 'libarianpage/showCreateLibarian',
                        payload: {},
                      })
                    }
                  >
                    <PlusOutlined /> New Libarian
                  </Button>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <LibarianTable />
              </Col>
            </Row>
          </Col>
        </Row>
        <Drawer
          width={420}
          placement="right"
          closable={false}
          onClose={this.hideViewLibarian}
          visible={libarianpage.viewLibarianVisible}
        >
          <ViewForm />
        </Drawer>
        <Drawer
          title="Create Libarian"
          width={550}
          onClose={() => this.hideCreateLibarianDrawer()}
          visible={libarianpage.createLibarianVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.hideCreateLibarianDrawer()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button form={'inputLibarian'} key="submit" htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          }
        >
          <InputForm formRef={this.state.form} handelSubmit={this.handelSubmit} />
        </Drawer>
        <Drawer
          title="Edit Libarian"
          width={550}
          closable={true}
          onClose={this.hideEditLibarian}
          visible={libarianpage.editLibarianVisible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.hideEditLibarian} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button form={'inputLibarian'} key="submit" htmlType="submit" type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <InputForm  formRef={this.state.form} handelSubmit={this.handelSubmit} />
        </Drawer>
      </>
    );
  }

  handelSubmit(libarian: any) {
    const { dispatch, libarianpage, libariantable } = this.props;
    if (libarianpage.choiceLibarian.id != undefined) {
      //update
      libarian.id = libarianpage.choiceLibarian.id;
      dispatch({
        type: 'libarianpage/editLibarian',
        payload: libarian,
      }).then(() => {
        dispatch({
          type: 'libariantable/fetchData',
          payload: {
            filterName: libariantable.filterName,
            pagination: libariantable.pagination.current,
          },
        });
      });
    } else {
      //insert
      dispatch({
        type: 'libarianpage/insertLibarian',
        payload: libarian,
      }).then(() => {
        dispatch({
          type: 'libariantable/fetchData',
          payload: {
            filterName: libariantable.filterName,
            pagination: libariantable.pagination.current,
          },
        });
      });
    }
  }

  hideCreateLibarianDrawer() {
    this.props.dispatch({
      type: 'libarianpage/hideCreateLibarian',
      payload: {},
    });
  }

  hideViewLibarian() {
    this.props.dispatch({
      type: 'libarianpage/hideViewLibarian',
      payload: {},
    });
  }
  hideEditLibarian() {
    this.props.dispatch({
      type: 'libarianpage/hideEditLibarian',
      payload: {},
    });
  }
}

export default connect((state) => ({ ...state }))(LibarianPage);
