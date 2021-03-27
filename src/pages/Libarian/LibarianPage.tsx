import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Drawer, Row, Space } from 'antd';
import React from 'react';
import LibarianTable from './components/LibarianTable';
import styles from './LibarianPage.less';
import Search from 'antd/lib/input/Search';
import {
  PlusOutlined,
  UserAddOutlined,
  UsergroupAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { connect, Dispatch } from 'umi';
import InputForm from './components/InputForm';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';
import { library } from '@fortawesome/fontawesome-svg-core';
import Title from 'antd/lib/typography/Title';
import Text from 'antd/lib/typography/Text';
import TableHeader from '@/components/CustomDesign/TableHeader';
import { storage } from '@/firebase/Firebase';

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
        <PageHeaderWrapper onBack={() => window.history.back()} />
        <Row
          style={{
            backgroundColor: 'white',
            padding: '20px 25px',
            margin: '20px 0',
            borderRadius: 15,
          }}
        >
          <Col span={24}>
            <Row style={{ marginBottom: 15 }}>
              <Col span={14}>
                <TableHeader title={'List Librarian'} description={'Current librarian in system'} />
              </Col>
              <Col
                span={10}
                style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}
              >
                <Space size={20} style={{ justifyItems: 'center' }}>
                  <Button
                    type="primary"
                    size="middle"
                    onClick={() =>
                      this.props.dispatch({
                        type: 'libarianpage/showCreateLibarian',
                        payload: {},
                      })
                    }
                  >
                    <UserAddOutlined style={{ fontSize: 18 }} /> New Libarian
                  </Button>
                  <Search
                    placeholder="Search by name"
                    enterButton="Search"
                    size="middle"
                    style={{ width: 300 }}
                    suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
                    //onSearch={onSearch}
                  />
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
          <InputForm formRef={this.state.form} handelSubmit={this.handelSubmit} />
        </Drawer>
      </>
    );
  }

  handelSubmit(libarian: any) {
    const { dispatch, libarianpage, libariantable } = this.props;

    if (libarianpage.choiceLibarian.id != undefined) {
      //update
      libarian.id = libarianpage.choiceLibarian.id;
      libarian.password = libarianpage.choiceLibarian.password;
      libarian.roleId = libarianpage.choiceLibarian.roleId;

      if (libarian.image.url == undefined) {
        // co up hinh moi
        const task = storage
          .ref()
          .child(`${libarian.name}/${libarian.image.uid}_${libarian.image.name}`)
          .put(libarian.image.originFileObj, { contentType: libarian.image.type });

        task.on(
          'state_changed',
          function progress(snapshot) {},
          function error() {},
          async () => {
            const loadUrl = await task.snapshot.ref.getDownloadURL();
            libarian.image = loadUrl;
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
          },
        );
      } else {
        // khong up hinh
        libarian.image = libarian.image.url;
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
      }
    } else {
      //insert
      const task = storage
        .ref()
        .child(`${libarian.name}/${libarian.image.uid}_${libarian.image.name}`)
        .put(libarian.image.originFileObj, { contentType: libarian.image.type });

      task.on(
        'state_changed',
        function progress(snapshot) {},
        function error() {},
        async () => {
          const loadUrl = await task.snapshot.ref.getDownloadURL();
          libarian.image = loadUrl;
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
        },
      );
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
