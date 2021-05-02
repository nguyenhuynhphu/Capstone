import TableHeader from '@/components/CustomDesign/TableHeader';
import { BlockOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import Tag from 'antd/es/tag';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from './BookShelfTable.less';
import sendNotification from '@/utils/Notification';
const { Column } = Table;

interface BookShelfTableProps {
  dispatch: Dispatch;
  bookshelftable?: any;
  organizebook?: any;
  global?: any;
  user?: any;
}
interface BookShelfTableState {
  colors: any;
}
class BookShelfTable extends React.Component<BookShelfTableProps, BookShelfTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      colors: new Map<string, string>(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookshelftable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }
  componentWillMount() {
    const { bookshelftable } = this.props;
    var colors = this.state.colors;
    bookshelftable.data.forEach((bookshelf: any) => {
      colors.set(bookshelf.locationName, bookshelf.locationColor);
    });
  }
  render() {
    const { bookshelftable } = this.props;
    bookshelftable.data.forEach((bookshelf: any) => {
      this.state.colors.set(bookshelf.locationName, bookshelf.locationColor);
    });

    return (
      <>
        <div style={{ marginBottom: 10, marginTop: 12 }}>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
            <TableHeader title="List Bookshelf" description="List all bookshelf in system" />
            <Space direction="horizontal">
              <Search
                placeholder="Search by name"
                enterButton="Search"
                size="middle"
                style={{ width: 300 }}
                suffix={<BlockOutlined style={{ color: '#40A9FF' }} />}
                onSearch={(value) =>
                  this.props.dispatch({
                    type: 'bookshelftable/fetchData',
                    payload: { filterName: value, pagination: 1 },
                  })
                }
              />
              {this.props.user.currentUser.roleId == 1 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.dispatch({
                      type: 'organizebook/showCreateBookShelf',
                      payload: {},
                    })
                  }
                >
                  <PlusOutlined /> Add New
                </Button>
              ) : (
                <></>
              )}
            </Space>
          </Space>
        </div>
        <Table
          className={styles.bookShelfTable}
          dataSource={bookshelftable.data}
          pagination={bookshelftable.pagination}
          loading={bookshelftable.isLoading}
          size={'small'}
          scroll={{ y: 450 }}
          
          onChange={(pagination) => {
            this.props.dispatch({
              type: 'bookshelftable/fetchData',
              payload: { filterName: bookshelftable.filterName, pagination: pagination.current },
            });
          }}
        >
          <Column title="Name" dataIndex="name" key="name" />
          <Column title="Rows" dataIndex="row" key="row" align={'center'} width={80} />
          <Column title="Columns" dataIndex="col" key="col" align={'center'} width={80} />
          <Column
            title="Location"
            dataIndex="locationName"
            key="locationId"
            align="center"
            render={(data) => <Tag color={this.state.colors.get(data)}>{data}</Tag>}
          />

          <Column
            //title="Manage Book"
            align={'center'}
            width={80}
            key={'##'}
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => this.onEdit(record)}>Detail</a>
              </Space>
            )}
          />
          {this.props.user.currentUser.roleId == 1 ? (
            <Column
              //title="Manage Book"
              align={'center'}
              dataIndex={'id'}
              key={'###'}
              width={80}
              render={(id) => (
                <>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() =>
                      this.props
                        .dispatch({ type: 'organizebook/deleteBookShelf', payload: id })
                        .then(() => {
                          sendNotification('Delete BookShelf Successfull !', '', 'success');
                          this.props.dispatch({
                            type: 'bookshelftable/fetchData',
                            payload: {
                              filterName: bookshelftable.filterName,
                              pagination: bookshelftable.pagination.current,
                            },
                          })}
                        )
                    }
                  >
                    <a style={{ textAlign: 'center' }} href={'#'}>
                      Delete
                    </a>
                  </Popconfirm>
                </>
              )}
            />
          ) : (
            <></>
          )}
        </Table>
      </>
    );
  }

  onEdit(record: any) {
    let promises: any = [];
    const { dispatch } = this.props;
    dispatch({
      type: 'organizebook/onSelectBookShelf',
      payload: record,
    }).then(() => {
      promises.push(
        dispatch({
          type: 'transferbook/hideAllBooks',
          payload: {},
        }),
        dispatch({
          type: 'drawergrid/fetchData',
          payload: {
            ...this.props.organizebook.bookshelfLocate,
            bookSheflId: record.id,
          },
        }),
        dispatch({
          type: 'drawergrid/onSelectDrawer',
          payload: {},
        }),
        dispatch({
          type: 'transferbook/selectedBooksDrawer',
          payload: [],
        }),
        dispatch({
          type: 'transferbook/selectedBooks',
          payload: [],
        }),
        dispatch({
          type: 'transferbook/fetchData',
          payload: {
            bookGroupId: '',
            drawerId: '',
            isInDrawer: false,
            pageNumber: 1,
            filterName: '',
            pagination: 1,
          },
        }),
      );
      Promise.all(promises);
    });
  }
}
export default connect((state) => ({ ...state }))(BookShelfTable);
