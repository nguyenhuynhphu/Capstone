import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Drawer, Row, Space } from 'antd';
import React from 'react';
import LibarianTable from './components/LibarianTable';
import Search from 'antd/lib/input/Search';
import {
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';

import { connect, Dispatch } from 'umi';
import InputForm from './components/InputForm';
import ViewForm from './components/ViewForm';
import { FormInstance } from 'antd/lib/form';

import TableHeader from '@/components/CustomDesign/TableHeader';
import { storage } from '@/firebase/Firebase';
import UpdateForm from './components/UpdateForm';

interface LibarianPageProps {
  dispatch: Dispatch;
  libarianpage?: any;
  libariantable?: any;
}
interface LibarianPageState {
  createForm: any;
  updateForm: any;
}
class LibarianPage extends React.Component<LibarianPageProps, LibarianPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      createForm: React.createRef<FormInstance>(),
      updateForm: React.createRef<FormInstance>(),
    };

    this.handelSubmit = this.handelSubmit.bind(this);
    this.handelUpdate = this.handelUpdate.bind(this);
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
                <TableHeader title={'List Librarian'} description={'Current librarians in system'} />
              </Col>
              <Col
                span={10}
                style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end' }}
              >
                <Space size={20} style={{ justifyItems: 'center' }}>
                  <Button
                    type="primary"
                    size="middle"
                    onClick={() => {
                      this.initCreateForm();
                      this.props.dispatch({
                        type: 'libarianpage/displayInputForm',
                        payload: true,
                      });
                      this.props.dispatch({
                        type: 'libarianpage/displayScrollBar',
                        payload: false,
                      });
                    }}
                  >
                    <UserAddOutlined style={{ fontSize: 18 }} /> New Libarian
                  </Button>
                  <Search
                    placeholder="Search by name"
                    enterButton="Search"
                    size="middle"
                    style={{ width: 300 }}
                    suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
                    onSearch={(value: string) => {
                      this.props.dispatch({
                        type: 'libariantable/fetchData',
                        payload: {
                          filterName: value,
                          pagination: this.props.libariantable.pagination.current,
                        },
                      });
                    }}
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
          onClose={() => {
            this.props.dispatch({
              type: 'libarianpage/displayInputForm',
              payload: false,
            });
            this.props.dispatch({
              type: 'libarianpage/displayScrollBar',
              payload: true,
            });
          }}
          visible={libarianpage.inputLibarianVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  this.props.dispatch({
                    type: 'libarianpage/displayInputForm',
                    payload: false,
                  });
                  this.props.dispatch({
                    type: 'libarianpage/displayScrollBar',
                    payload: true,
                  });
                }}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button form={'inputLibarian'} key="submit" htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          }
        >
          <InputForm form={this.state.createForm} handelSubmit={this.handelSubmit} />
        </Drawer>
        <Drawer
          title="Update Librarian"
          width={550}
          onClose={() => {
            this.props.dispatch({
              type: 'libarianpage/displayUpdateLibrarian',
              payload: false,
            });
          }}
          visible={libarianpage.updateLibrarianVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button
                onClick={() => {
                  this.props.dispatch({
                    type: 'libarianpage/displayUpdateLibrarian',
                    payload: false,
                  });
                }}
                style={{ marginRight: 8 }}
              >
                Cancel
              </Button>
              <Button form={'updateLibarian'} key="submit" htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          }
        >
          <UpdateForm handelSubmit={this.handelUpdate} />
        </Drawer>
      </>
    );
  }

  handelSubmit(libarian: any) {
    const { dispatch, libariantable } = this.props;
    const task = storage
      .ref()
      .child(`${libarian.name}/${libarian.image.uid}_${libarian.image.name}`)
      .put(libarian.image, { contentType: libarian.image.type });
   
    task.on(
      'state_changed',
      function progress(snapshot) {},
      function error() {},
      async () => {
        const loadUrl = await task.snapshot.ref.getDownloadURL();
        libarian.image = loadUrl;
        libarian.roleId = 3;
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
  handelUpdate(libarian: any) {
    const { dispatch, libarianpage, libariantable } = this.props;
    libarian.id = libarianpage.choiceLibarian.id;
    libarian.password = libarianpage.choiceLibarian.password;
    libarian.roleId = libarianpage.choiceLibarian.roleId;

    if (libarian.image.url == undefined) {
      // co up hinh moi
      const task = storage
        .ref()
        .child(`${libarian.name}/${libarian.image.uid}_${libarian.image.name}`)
        .put(libarian.image, { contentType: libarian.image.type });

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
  }

  hideViewLibarian() {
    this.props.dispatch({
      type: 'libarianpage/hideViewLibarian',
      payload: {},
    });
  }

  initCreateForm() {
    this.state.createForm.current?.resetFields();
  }
}

export default connect((state) => ({ ...state }))(LibarianPage);
