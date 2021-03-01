import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Row, Col, Button, Drawer, Modal } from 'antd';
import React from 'react';

import styles from './ManageBookPage.less';
import InputForm from './components/InputForm';
import ViewForm from './components/ViewForm';
import { connect, Dispatch, ManageBookType } from 'umi';
import BookGroupTable from './components/BookGroupTable';
import { storage } from '@/firebase/Firebase';
import { FormInstance } from 'antd/lib/form';
import ListCategories from './components/ListCategories';
import sendNotification from '@/utils/Notification';

interface ManageBookPageProps {
  dispatch: Dispatch;

  managebook: any;
  bookgrouptable: any;
 
}

interface ManageBookPageState {
  createDrawerVisible: boolean;
  deleteDrawerVisible: boolean;
  viewDrawerVisible: boolean;
  updateDrawerVisible: boolean;

  isLoadingTable: boolean;
  tableDataSource: any;
  pagination: any;
  filter: string;

  bookGroup: any;
  selectedRowKeys: any;
  formRef: any;
}

class ManageBookPage extends React.Component<ManageBookPageProps, ManageBookPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      createDrawerVisible: false,
      deleteDrawerVisible: false,
      viewDrawerVisible: false,
      updateDrawerVisible: false,

      isLoadingTable: false,
      tableDataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
      filter: '',
      bookGroup: {},
      selectedRowKeys: [],
      formRef: React.createRef<FormInstance>(),
    };
    //#region bind function
    this.hideDeleteDrawer = this.hideDeleteDrawer.bind(this);

    this.hideViewDrawer = this.hideViewDrawer.bind(this);

    this.hideUpdateDrawer = this.hideUpdateDrawer.bind(this);

    this.handelSubmit = this.handelSubmit.bind(this);
    this.hideCategoriesModal = this.hideCategoriesModal.bind(this);
    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    //#endregion
  }

  componentDidMount() {
    
    this.props.dispatch({
      type: 'managebook/fetchCategories',
      payload: {},
    });
  }

  render() {
    const { managebook } = this.props;
    return (
      <>
        <PageHeaderWrapper style={{ marginBottom: '20px' }}></PageHeaderWrapper>
        <div className={styles.section}>
          <BookGroupTable
            rowSelection={this.state.selectedRowKeys}
            handleRowSelect={this.handleRowSelect}
          />
        </div>
        <Drawer
          width={700}
          placement="right"
          closable={false}
          onClose={this.hideViewDrawer}
          visible={managebook.viewBookVisible}
          className={styles.viewBookGroupForm}
        >
          <ViewForm bookGroup={managebook.choiceBook} />
        </Drawer>
        <Drawer
          title="Create a new book group"
          width={750}
          onClose={() => this.hideCreateDrawer()}
          visible={managebook.createBookVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.hideCreateDrawer()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                loading={managebook.loadingButton}
                form={'inputForm'}
                key="submit"
                htmlType="submit"
                type="primary"
              >
                Add Book
              </Button>
            </div>
          }
        >
          <InputForm handelSubmit={this.handelSubmit} formRef={this.state.formRef} />
        </Drawer>
        <Drawer
          placement={'bottom'}
          mask={false}
          visible={managebook.deleteBookVisible}
          key={'bottom'}
          closeIcon={null}
          height={70}
        >
          <Row align={'middle'} style={{ height: '100%', paddingLeft: 50 }}>
            <Col span={8}>
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                Do you want to delete {this.state.selectedRowKeys.length} items ?
              </p>
            </Col>
            <Col span={3} offset={13}>
              <Button type="primary" danger onClick={this.handleDelete}>
                Delete
              </Button>
              <Button style={{ marginLeft: 15 }}>Cancel</Button>
            </Col>
          </Row>
        </Drawer>
        <Drawer
          title="Edit book"
          width={750}
          closable={true}
          onClose={this.hideUpdateDrawer}
          visible={managebook.editBookVisible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.hideUpdateDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                form={'inputForm'}
                key="submit"
                htmlType="submit"
                type="primary"
                onClick={this.hideUpdateDrawer}
                loading={managebook.loadingButton}
              >
                Save
              </Button>
            </div>
          }
        >
          <InputForm handelSubmit={this.handelSubmit} formRef={this.state.formRef} />
        </Drawer>
        <Modal
          visible={managebook.categoriesModalVisible}
          title="Manage Categories"
          centered
          width={460}
          bodyStyle={{ paddingBottom: 0 }}
          //className={styles.locationViewModal}
          onCancel={this.hideCategoriesModal}
          footer={null}
        >
          <ListCategories />
        </Modal>
      </>
    );
  }

  handleDelete() {
    const { dispatch, bookgrouptable } = this.props;
    dispatch({
      type: 'managebook/deleteBookGroup',
      payload: this.state.selectedRowKeys,
    }).then(() => {
      sendNotification(
        'Delete Success !',
        `Successfull delete ${this.state.selectedRowKeys.length} items`,
        'success',
      );
      this.setState({ selectedRowKeys: [] });
      dispatch({
        type: 'bookgrouptable/fetchData',
        payload: {
          filterName: bookgrouptable.filterName,
          pagination: bookgrouptable.pagination.current,
        },
      });
    });
  }

  handleRowSelect(selectedRowKeys: any) {
    const { dispatch } = this.props;
    if (selectedRowKeys.length != 0) {
      dispatch({
        type: 'managebook/showDeleteBook',
        payload: {},
      });
    } else {
      dispatch({
        type: 'managebook/hideDeleteBook',
        payload: {},
      });
    }
    this.setState({ selectedRowKeys: selectedRowKeys });
  }

  async handelSubmit(bookGroup: any) {
    const { dispatch, bookgrouptable, managebook } = this.props;
    console.log('bookGroup >> ', bookGroup);
    if (managebook.choiceBook.id != undefined) {
      //update
      if (bookGroup.images != undefined) {
        //up hinh
        if (bookGroup.images.fileList != 0) {
          //kiem tra xoa het
          var promises: any = [];
          var promises2: any = [];
          var oldImage: any = [];
          bookGroup.images.fileList.forEach((image: any) => {
            if (image.key == undefined) {
              //kiem tra tam nao moi tam nao cu
              //tam nay moi
              const task = storage
                .ref()
                .child(`${bookGroup.name}/${image.uid}_${image.name}`)
                .put(image.originFileObj, { contentType: image.type });
              promises.push(task);
              task.on(
                'state_changed',
                function progress(snapshot) {},
                function error() {},
                () => {
                  const loadUrl = task.snapshot.ref.getDownloadURL();
                  promises2.push(loadUrl);
                },
              );
            } else {
              //hinh cu
              oldImage.push(image);
            }
          });
          let tmp: any = [];
          Promise.all(promises).then((values) => {
            Promise.all(promises2)
              .then((images) => {
                images.forEach((url) => {
                  tmp.push({ url: url });
                });
                oldImage.forEach((image: any) => {
                  tmp.push(image);
                });
              })
              .finally(() => {
                delete bookGroup.images;
                Object.assign(bookGroup, { image: tmp });
                dispatch({
                  type: 'managebook/editBookGroup',
                  payload: bookGroup,
                }).then(() =>
                  dispatch({
                    type: 'managebook/hideViewBook',
                    payload: {},
                  }).then(() =>
                    dispatch({
                      type: 'bookgrouptable/fetchData',
                      payload: {
                        filterName: bookgrouptable.filterName,
                        pagination: bookgrouptable.pagination.current,
                      },
                    }),
                  ),
                );
              });
          });
          //xoa het
        } else {
          console.log('Xoa Het');
          delete bookGroup.images;
          dispatch({
            type: 'managebook/editBookGroup',
            payload: bookGroup,
          }).then(() =>
            dispatch({
              type: 'managebook/hideViewBook',
              payload: {},
            }).then(() =>
              dispatch({
                type: 'bookgrouptable/fetchData',
                payload: {
                  filterName: bookgrouptable.filterName,
                  pagination: bookgrouptable.pagination.current,
                },
              }),
            ),
          );
        }
        //khong up hinh
      } else {
        console.log('Khong Up Hinh');
        delete bookGroup.images;
        bookGroup.image = managebook.choiceBook.image;
        dispatch({
          type: 'managebook/editBookGroup',
          payload: bookGroup,
        }).then(() =>
          dispatch({
            type: 'managebook/hideViewBook',
            payload: {},
          }).then(() =>
            dispatch({
              type: 'bookgrouptable/fetchData',
              payload: {
                filterName: bookgrouptable.filterName,
                pagination: bookgrouptable.pagination.current,
              },
            }),
          ),
        );
      }
      sendNotification(
        'Update BookGroup Success !',
        'Successfull update informationn of ' + bookGroup.name,
        'success',
      );
    } else {
      //insert
      var promises: any = [];
      var promises2: any = [];
      bookGroup.images.fileList.forEach((image: any) => {
        const task = storage
          .ref()
          .child(`${bookGroup.name}/${image.uid}_${image.name}`)
          .put(image.originFileObj, { contentType: image.type });
        promises.push(task);
        task.on(
          'state_changed',
          function progress(snapshot) {},
          function error() {},
          () => {
            const loadUrl = task.snapshot.ref.getDownloadURL();
            promises2.push(loadUrl);
          },
        );
      });
      let tmp: any = [];
      Promise.all(promises).then((values) => {
        Promise.all(promises2)
          .then((images) => {
            images.forEach((url) => {
              tmp.push({ url: url });
            });
          })
          .finally(() => {
            delete bookGroup.images;
            Object.assign(bookGroup, { image: tmp });
            sendNotification('Insert BookGroup Success !', '', 'success');
            dispatch({
              type: 'managebook/insertBookGroup',
              payload: bookGroup,
            }).then(() =>
              dispatch({
                type: 'bookgrouptable/fetchData',
                payload: {
                  filterName: bookgrouptable.filterName,
                  pagination: bookgrouptable.pagination.current,
                },
              }),
            );
          });
      });
    }
  }

  //#region page effect

  hideCategoriesModal() {
    this.props.dispatch({
      type: 'managebook/hideCategories',
      payload: {},
    });
  }
  hideViewDrawer() {
    this.props
      .dispatch({
        type: 'managebook/hideViewBook',
        payload: {},
      })
      .then(
        this.props.dispatch({
          type: 'listcomments/resetData',
          payload: {},
        }),
      );
  }

  hideCreateDrawer() {
    this.props.dispatch({
      type: 'managebook/hideCreateBook',
      payload: {},
    });
  }

  hideDeleteDrawer() {
    this.setState({
      deleteDrawerVisible: false,
    });
  }

  hideUpdateDrawer() {
    this.props.dispatch({
      type: 'managebook/hideEditBook',
      payload: {},
    });
  }
  //#endregion
}
export default connect((state) => ({ ...state }))(ManageBookPage);
