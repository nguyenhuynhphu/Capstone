import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Row, Col, Button, Drawer, Modal, Space, Spin, Layout } from 'antd';
import React from 'react';

import styles from './ManageBookPage.less';
import InputForm from './components/InputForm';
import ViewForm from './components/ViewForm';
import { connect, Dispatch } from 'umi';
import BookGroupTable from './components/BookGroupTable';
import { storage } from '@/firebase/Firebase';
import { FormInstance } from 'antd/lib/form';
import ListCategories from './components/ListCategories';
import sendNotification from '@/utils/Notification';
import TableHeader from '@/components/CustomDesign/TableHeader';
import NewBookInSystem from './components/NewBookInSystem';
import { RedoOutlined } from '@ant-design/icons';
import CategoriesChart from './components/CategoriesChart';
import { Content } from 'antd/lib/layout/layout';

interface ManageBookPageProps {
  dispatch: Dispatch;

  managebook?: any;
  bookgrouptable?: any;
  user?: any;
  categorieschart?: any;
  location?: any;
}

interface ManageBookPageState {
  createDrawerVisible: boolean;
  deleteDrawerVisible: boolean;
  viewDrawerVisible: boolean;
  updateDrawerVisible: boolean;
  filterBook: number;
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
      filterBook: 0,
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

    this.hideInputBook = this.hideInputBook.bind(this);

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
    this.props.dispatch({
      type: 'categorieschart/fetchData',
    });
  }

  render() {
    const { managebook, categorieschart } = this.props;

    if (this.props.location.state) {
      var bookGroupId = this.props.location.state.bookGroupId;
      var filterBook = this.props.location.state.filterBook;
      this.setState({ filterBook: filterBook });

      this.props
        .dispatch({
          type: 'managebook/showViewBook',
          payload: bookGroupId,
        })
        .then(() => {
          document.getElementById('view-book')?.click();
        });
      this.props.location.state = undefined;
    }

    return (
      <Layout>
        <PageHeaderWrapper style={{ marginBottom: '20px' }}></PageHeaderWrapper>
        <Row gutter={16} style={{ margin: '10px 0' }}>
          <Col
            style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              padding: '20px 25px',
              width: 'calc(100% - 45% - 10px)',
              height: 491,
            }}
          >
            <TableHeader title={'Book Group by Category'} description={''} />
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {categorieschart.isLoading ? (
                <Space direction="vertical" style={{ alignItems: 'center' }}>
                  <p style={{ marginBottom: 4 }}>Loading Chart</p>
                  <Spin spinning />
                </Space>
              ) : (
                <CategoriesChart />
              )}
            </div>
          </Col>

          <Col
            style={{
              width: '45%',
              backgroundColor: 'white',
              padding: '20px 25px',
              borderRadius: '15px',
              marginLeft: 10,
            }}
          >
            <Space
              direction="horizontal"
              style={{ width: '100%', justifyContent: 'space-between' }}
            >
              <TableHeader
                title={'New book group'}
                description={'The newest book group have just been added to the system'}
              />
              <Button
                type="primary"
                icon={<RedoOutlined />}
                onClick={() => {
                  this.props.dispatch({
                    type: 'newbooklist/fetchData',
                  });
                }}
              >
                Refresh
              </Button>
            </Space>

            <NewBookInSystem />
          </Col>
        </Row>
        <Row style={{ backgroundColor: 'white', borderRadius: '15px', padding: '20px 25px' }}>
          <Col span={24}>
            <TableHeader title={'List Book Group'} description={'All book group in system'} />
            <BookGroupTable
              rowSelection={this.state.selectedRowKeys}
              handleRowSelect={this.handleRowSelect}
            />
          </Col>
        </Row>
        <Drawer
          width={700}
          placement="right"
          closable={false}
          mask={true}
          onClose={this.hideViewDrawer}
          visible={managebook.viewBookVisible}
          className={styles.viewBookGroupForm}
          style={{ zIndex: 999 }}
        >
          <ViewForm bookGroup={managebook.choiceBook} filterBook={this.state.filterBook} />
        </Drawer>
        <Drawer
          title={
            managebook.choiceBook.id != undefined ? 'Edit book detail' : 'Create a new book group'
          }
          destroyOnClose
          width={750}
          onClose={() => this.hideInputBook()}
          mask={true}
          visible={managebook.inputBookVisible}
          bodyStyle={{ paddingBottom: 80 }}
          style={{ zIndex: 9999 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.hideInputBook()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button
                loading={managebook.loadingButton}
                form={'inputForm'}
                key="submit"
                htmlType="submit"
                type="primary"
              >
                Save
              </Button>
            </div>
          }
        >
          <InputForm handelSubmit={this.handelSubmit} />
        </Drawer>
        <Drawer
          placement={'bottom'}
          visible={managebook.deleteBookVisible}
          mask={false}
          key={'bottom'}
          closeIcon={null}
          height={70}
        >
          <Space style={{ width: '100%', height: '100%', justifyContent: 'space-between' }}>
          
              <p style={{ margin: 0, fontWeight: 'bold' }}>
                Do you want to delete {this.state.selectedRowKeys.length} items ?
              </p>
    
          
              <Button type="primary" danger onClick={this.handleDelete}>
                Delete
              </Button>
         
          </Space>
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
      </Layout>
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
      }).then(() =>
        dispatch({
          type: 'managebook/hideDeleteBook',
          payload: {},
        }),
      );
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

    if (managebook.choiceBook.id != undefined) {
      //update

      bookGroup.quantity = managebook.choiceBook.quantity;
      //bookGroup.publishDate = bookGroup.publishDate.format();
      if (bookGroup.images != undefined) {
        //up hinh
        if (bookGroup.images.fileList != 0) {
          //kiem tra xoa het
          var promises: any = [];
          var promises2: any = [];
          var oldImage: any = [];
          bookGroup.images.forEach((image: any) => {
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
                    type: 'managebook/hideInputBook',
                    payload: managebook.choiceBook,
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
          delete bookGroup.images;
          dispatch({
            type: 'managebook/editBookGroup',
            payload: bookGroup,
          }).then(() =>
            dispatch({
              type: 'managebook/hideInputBook',
              payload: managebook.choiceBook,
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
        delete bookGroup.images;
        bookGroup.image = managebook.choiceBook.image;
        dispatch({
          type: 'managebook/editBookGroup',
          payload: bookGroup,
        }).then(() =>
          dispatch({
            type: 'managebook/hideInputBook',
            payload: managebook.choiceBook,
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
      bookGroup.images.forEach((image: any) => {
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
            bookGroup.staffId = this.props.user.currentUser.id;
            sendNotification('Insert BookGroup Success !', '', 'success');
            dispatch({
              type: 'managebook/insertBookGroup',
              payload: bookGroup,
            }).then(
              () =>
                dispatch({
                  type: 'bookgrouptable/fetchData',
                  payload: {
                    filterName: bookgrouptable.filterName,
                    pagination: bookgrouptable.pagination.current,
                  },
                }),
              dispatch({
                type: 'managebook/hideInputBook',
                payload: {},
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
    this.setState({ filterBook: 0 });
  }

  hideInputBook() {
    this.props.dispatch({
      type: 'managebook/hideInputBook',
      payload: this.props.managebook.choiceBook,
    });
  }

  hideDeleteDrawer() {
    this.setState({
      deleteDrawerVisible: false,
    });
  }
  //#endregion
}
export default connect((state) => ({ ...state }))(ManageBookPage);
