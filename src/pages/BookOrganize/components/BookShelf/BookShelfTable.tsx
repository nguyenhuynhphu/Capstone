import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import Tag from 'antd/es/tag';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';

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
          <Title level={3} style={{ marginBottom: 5 }}>
            Book Shelf
          </Title>
          <Row style={{ marginBottom: 1 }}>
            <Col span={8}>
              <Search
                placeholder="input search text"
                onSearch={(value) =>
                  this.props.dispatch({
                    type: 'bookshelftable/fetchData',
                    payload: { filterName: value, pagination: bookshelftable.pagination.current },
                  })
                }
                enterButton
                size={'small'}
              />
            </Col>
            {this.props.user.currentUser.role == 'admin' ? (
              <Col span={6} offset={10} style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.dispatch({
                      type: 'organizebook/showCreateBookShelf',
                      payload: {},
                    })
                  }
                  size={'small'}
                >
                  <PlusOutlined /> New Book Shelf
                </Button>
              </Col>
            ) : (
              <></>
            )}
          </Row>
        </div>
        <Table
          dataSource={bookshelftable.data}
          pagination={bookshelftable.pagination}
          loading={bookshelftable.isLoading}
          size={'middle'}
          onRow={(record) => {
            return {
              onDoubleClick: () => {}, // double click row,
            };
          }}
          onChange={(pagination) => {
            this.props.dispatch({
              type: 'bookshelftable/fetchData',
              payload: { filterName: bookshelftable.filterName, pagination: pagination.current },
            });
          }}
        >
          <Column title="Name" dataIndex="name" key="name" />

          <Column title="Total Row" dataIndex="row" key="row" align={'center'} />
          <Column title="Total Column" dataIndex="col" key="col" align={'center'} />

          <Column
            title="Location"
            dataIndex="locationName"
            key="locationId"
            render={(data) => <Tag color={this.state.colors.get(data)}>{data}</Tag>}
          />

          <Column
            //title="Manage Book"
            align={'center'}
            render={(text, record) => (
              <Space size="middle">
                <a onClick={() => this.onEdit(record)}>Edit</a>
              </Space>
            )}
          />
          {this.props.user.currentUser.role == 'admin' ? (
            <Column
              //title="Manage Book"
              align={'center'}
              dataIndex={'id'}
              render={(id) => (
                <>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() =>
                      this.props
                        .dispatch({ type: 'organizebook/deleteBookShelf', payload: [id] })
                        .then(() =>
                          this.props.dispatch({
                            type: 'bookshelftable/fetchData',
                            payload: {
                              filterName: bookshelftable.filterName,
                              pagination: bookshelftable.pagination.current,
                            },
                          }),
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
