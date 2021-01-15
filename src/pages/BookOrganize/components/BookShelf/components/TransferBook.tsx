import { Transfer, Button, Space, Spin, Table, Row, Col, Result } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../BookShelfTable.less';
const columns = [
  {
    title: 'Book Name',
    dataIndex: 'bookName',
    width: 150,
  },
  {
    title: 'Book Id',
    dataIndex: 'id',
    width: 150,
  },
];

interface TransferBookProps {
  dispatch: Dispatch;
  transferbook?: any;
  drawergrid?: any;
}

interface TransferBookState {}

class TransferBook extends React.Component<TransferBookProps, TransferBookState> {
  constructor(props: any) {
    super(props);
    this.displayBookDrawer = this.displayBookDrawer.bind(this);
    this.handelTransfer = this.handelTransfer.bind(this);
    this.removeBooks = this.removeBooks.bind(this);
  }

  render() {
    const { transferbook, drawergrid, dispatch } = this.props;
    const rowBooksSelection = {
      preserveSelectedRowKeys: transferbook.selectedBooks,
      selectedRowKeys: transferbook.selectedBooks,
      onChange: this.onSelectBooksChange,
    };

    const rowBooksDrawerSelection = {
      preserveSelectedRowKeys: transferbook.selectedBooksDrawer,
      selectedRowKeys: transferbook.selectedBooksDrawer,
      onChange: this.onSelectBooksDrawerChange,
    };

    return (
      <>
        <div
          className={styles.booksInSystem}
          style={{
            padding: '0 10px',
            borderLeft: '1px solid rgba(0, 0, 0, 0.2)',
            left: transferbook.allBooksVisible,
          }}
        >
          <Spin spinning={transferbook.isLoading}>
            <Title level={3} className={styles.titleTransfer}>
              Books In System
            </Title>
            <Row>
              <Col span={10}>
                <Search
                  size="small"
                  placeholder="Input Book Name"
                  style={{ width: 180, marginBottom: 5 }}
                  onSearch={(value) => {
                    dispatch({
                      type: 'transferbook/fetchData',
                      payload: {
                        bookGroupId: '',
                        drawerId: '',
                        isInDrawer: false,
                        pageNumber: transferbook.paginationBook.current,
                        filterName: value, // ddoanj nay roi lam, cai State cua no trong kia khac nhung param truyeen ve server la filter Name
                        pagination: transferbook.paginationBook.current,
                      },
                    });
                  }}
                  enterButton
                />
              </Col>
            </Row>
            <Table
              size={'small'}
              columns={columns}
              loading={transferbook.isLoading}
              dataSource={transferbook.bookData}
              pagination={transferbook.paginationBook}
              onChange={(pagination) => {
                this.props.dispatch({
                  type: 'transferbook/fetchData',
                  payload: {
                    bookGroupId: '',
                    drawerId: '',
                    isInDrawer: false,
                    pageNumber: pagination.current,
                    filterName: transferbook.filterNameBook,
                    pagination: pagination.current,
                  },
                });
              }}
              rowSelection={rowBooksSelection}
              scroll={{ y: 240 }}
              className={styles.tableCustome}
            />
            <Button
              style={{
                position: 'absolute',
                bottom: 22,
                right: 10,
                transition: 'all 0.2s',
                opacity: transferbook.selectedBooks.length != 0 ? 1 : 0,
              }}
              onClick={this.handelTransfer}
            >
              Add To Drawer
            </Button>
          </Spin>
        </div>
        <div
          style={{
            zIndex: 999,
            position: 'relative',
            backgroundColor: 'white',
            padding: '0 10px',
            height: 'calc(100% - 10px)',
          }}
        >
          {drawergrid.selectDrawer != undefined ? (
            <>
              {console.log(drawergrid.selectDrawer)}
              <Spin spinning={transferbook.isLoadingDrawer}>
                <Title level={3} className={styles.titleTransfer}>
                  Selected Drawer: {drawergrid.selectDrawer.id}
                </Title>
                <Row>
                  <Col span={12}>
                    <Search
                      size="small"
                      placeholder="Input Book Name"
                      style={{ width: 180, marginBottom: 5 }}
                      onSearch={(value) => {
                        dispatch({
                          type: 'transferbook/fetchBooksInDrawer',
                          payload: {
                            bookGroupId: '',
                            drawerId: drawergrid.selectDrawer.id,
                            isInDrawer: true,
                            pageNumber: transferbook.paginationDrawer.current,
                            filterName: value, // ddoanj nay roi lam, cai State cua no trong kia khac nhung param truyeen ve server la filter Name
                            pagination: transferbook.paginationDrawer.current,
                          },
                        });
                      }}
                      enterButton
                    />
                  </Col>
                  <Col span={12} style={{ textAlign: 'right' }} onClick={this.displayBookDrawer}>
                    <Button size="small" type={'primary'}>
                      {transferbook.allBooksVisible == '0px' ? 'Add Books' : 'Hide Books'}
                    </Button>
                  </Col>
                </Row>
                <Table
                  size={'small'}
                  columns={columns}
                  rowSelection={rowBooksDrawerSelection}
                  loading={transferbook.isLoadingDrawer}
                  dataSource={transferbook.bookInDrawer}
                  pagination={transferbook.paginationDrawer}
                  onChange={(pagination) => {
                    this.props.dispatch({
                      type: 'transferbook/fetchBooksInDrawer',
                      payload: {
                        bookGroupId: '',
                        drawerId: drawergrid.selectDrawer.id,
                        isInDrawer: true,
                        pageNumber: pagination.current,
                        filterName: transferbook.filterNameBookDrawer,
                        pagination: pagination.current,
                      },
                    });
                  }}
                  scroll={{ y: 240 }}
                  className={styles.tableCustome}
                />
                <Button
                  style={{
                    position: 'absolute',
                    bottom: 25,
                    right: 10,
                    transition: 'all 0.2s',
                    opacity: transferbook.selectedBooksDrawer.length != 0 ? 1 : 0,
                  }}
                  onClick={this.removeBooks}
                >
                  Remove From Drawer
                </Button>
              </Spin>
            </>
          ) : (
            <div
              style={{
                position: 'absolute',
                width: '100%',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Result style={{ height: '100%' }} title="Please select drawer to process !" />
            </div>
          )}
        </div>
      </>
    );
  }

  removeBooks() {
    const { transferbook, dispatch, drawergrid } = this.props;
    var promises: any = [];
    promises.push(
      dispatch({
        type: 'transferbook/removeBookToDrawer',
        payload: transferbook.selectedBooksDrawer,
      }),
      promises.push(
        dispatch({
          type: 'transferbook/changeLoadingState',
          payload: {},
        }),
      ),
    );
    Promise.all(promises).then(() => {
      promises = [];
      promises.push(
        dispatch({
          type: 'transferbook/fetchData',
          payload: {
            bookGroupId: '',
            drawerId: '',
            isInDrawer: false,
            pageNumber: transferbook.paginationBook.current,
            filterName: '',
            pagination: transferbook.paginationBook.current,
          },
        }),
        dispatch({
          type: 'transferbook/fetchBooksInDrawer',
          payload: {
            bookGroupId: '',
            drawerId: drawergrid.selectDrawer.id,
            isInDrawer: true,
            pageNumber: transferbook.paginationDrawer.current,
            filterName: '',
            pagination: transferbook.paginationDrawer.current,
          },
        }),
      );
      Promise.all(promises);
    });
  }
  handelTransfer() {
    const { transferbook, dispatch, drawergrid } = this.props;
    var promises: any = [];
    promises.push(
      dispatch({
        type: 'transferbook/insertBookToDrawer',
        payload: { data: transferbook.selectedBooks, drawerId: drawergrid.selectDrawer.id },
      }),
    );
    promises.push(
      dispatch({
        type: 'transferbook/changeLoadingState',
        payload: {},
      }),
    );
    Promise.all(promises).then(() => {
      promises = [];
      promises.push(
        dispatch({
          type: 'transferbook/fetchData',
          payload: {
            bookGroupId: '',
            drawerId: '',
            isInDrawer: false,
            pageNumber: transferbook.paginationBook.current,
            filterName: '',
            pagination: transferbook.paginationBook.current,
          },
        }),
      );
      promises.push(
        dispatch({
          type: 'transferbook/fetchBooksInDrawer',
          payload: {
            bookGroupId: '',
            drawerId: drawergrid.selectDrawer.id,
            isInDrawer: true,
            pageNumber: transferbook.paginationDrawer.current,
            filterName: '',
            pagination: transferbook.paginationDrawer.current,
          },
        }),
      );
    });
    Promise.all(promises);
  }

  displayBookDrawer() {
    const { dispatch, transferbook } = this.props;
    if (transferbook.allBooksVisible == '0px') {
      dispatch({
        type: 'transferbook/showAllBooks',
        payload: {},
      });
    } else {
      dispatch({
        type: 'transferbook/hideAllBooks',
        payload: {},
      });
    }
  }

  onSelectBooksChange = (selectedRowKeys: any) => {
    if (selectedRowKeys.length != 0) {
      this.props.dispatch({
        type: 'transferbook/selectedBooks',
        payload: selectedRowKeys,
      });
    } else {
      this.props.dispatch({
        type: 'transferbook/selectedBooks',
        payload: [],
      });
    }
  };
  onSelectBooksDrawerChange = (selectedRowKeys: any) => {
    if (selectedRowKeys.length != 0) {
      this.props.dispatch({
        type: 'transferbook/selectedBooksDrawer',
        payload: selectedRowKeys,
      });
    } else {
      this.props.dispatch({
        type: 'transferbook/selectedBooksDrawer',
        payload: [],
      });
    }
  };
}

export default connect((state: any) => ({ ...state }))(TransferBook);
