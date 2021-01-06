import { BookGroupTableState } from '@/models/managebook/bookgrouptable';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';

import React from 'react';
import { connect, Dispatch } from 'umi';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Publish Date',
    dataIndex: 'publishDate',
  },
  {
    title: 'Publishing Company',
    dataIndex: 'publishingCompany',
  },
];
interface ViewBookGroupModalProps {
  dispatch: Dispatch;

  rowSelection: any;

  handleRowSelect: Function;

  bookgrouptable: any;
}
interface ViewBookGroupModalState {
  selectedRowKeys: any;
  bookGroup: any;
}
class BookGroupTable extends React.Component<ViewBookGroupModalProps, ViewBookGroupModalState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
      bookGroup: {},
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookgrouptable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      preserveSelectedRowKeys: this.props.rowSelection,
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    const { bookgrouptable, dispatch } = this.props;
    return (
      <>
        <Row style={{ margin: '10px 0px' }}>
          <Col span={10}>
            <Search
              placeholder="input search text"
              style={{ width: 250 }}
              onSearch={(value) => this.handleFilter(value)}
              enterButton
            />
          </Col>
          <Col span={4} offset={10} style={{ textAlign: 'right' }}>
            <Space size={20}>
              <Button
                type="primary"
                onClick={() =>
                  this.props.dispatch({
                    type: 'managebook/showCreateBook',
                    payload: { },
                  })
                }
              >
                <PlusOutlined /> New Book
              </Button>
            </Space>
          </Col>
        </Row>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          loading={bookgrouptable.isLoading}
          pagination={{ ...bookgrouptable.pagination, showSizeChanger: false }}
          dataSource={bookgrouptable.data}
          size={'small'}
          onChange={(pagination) => {
            dispatch({
              type: 'bookgrouptable/fetchData',
              payload: { filterName: bookgrouptable.filterName, pagination: pagination.current },
            });
          }}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                this.props.dispatch({
                  type: 'managebook/showViewBook',
                  payload: {...record},
                })
              }, // double click row
            };
          }}
        />
      </>
    );
  }

  handleFilter(filter: string) {
    const { dispatch, bookgrouptable } = this.props;

    dispatch({
      type: 'bookgrouptable/fetchData',
      payload: { filterName: filter, pagination: bookgrouptable.pagination.current },
    });
  }

  onSelectChange = (selectedRowKeys: any) => {
    this.props.handleRowSelect(selectedRowKeys);
    this.setState({ selectedRowKeys });
  };
}
export default connect((state: BookGroupTableState) => ({
  ...state,
}))(BookGroupTable);
