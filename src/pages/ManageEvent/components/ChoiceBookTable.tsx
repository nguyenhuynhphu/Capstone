import { BookGroupTableState } from '@/models/managebook/bookgrouptable';
import { Col, Row, Table } from 'antd';
import Search from 'antd/lib/input/Search';

import React from 'react';
import { connect, Dispatch } from 'umi';
import { Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import styles from '../ManageEventPage.less';

const { Paragraph } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (data: any) => <Text ellipsis>{data.name}</Text>,
  },
  {
    title: 'Author',
    dataIndex: 'author',
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
  },
];
interface ChoiceBookTableProps {
  dispatch: Dispatch;

  choicebooktable?: any;
}
interface ChoiceBookTableState {
  selectedRowKeys: any;
}

class ChoiceBookTable extends React.Component<ChoiceBookTableProps, ChoiceBookTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'choicebooktable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { choicebooktable, dispatch } = this.props;

    const rowSelection = {
      preserveSelectedRowKeys: this.props.choicebooktable.selectedRowKeys,
      selectedRowKeys,
      onChange: this.onSelectChange,
    };

    return (
      <>
        <Row style={{ margin: '0px 0px 10px 0px' }}>
          <Col span={10}>
            <Search
              placeholder="input search text"
              style={{ width: 250 }}
              onSearch={(value) => this.handleFilter(value)}
              enterButton
            />
          </Col>
        </Row>
        <Table
          className={styles.choiceTable}
          rowSelection={rowSelection}
          loading={choicebooktable.isLoading}
          pagination={{ ...choicebooktable.pagination, showSizeChanger: false }}
          dataSource={choicebooktable.data}
          size={'small'}
          onChange={(pagination) => {
            dispatch({
              type: 'choicebooktable/fetchData',
              payload: { filterName: choicebooktable.filterName, pagination: pagination.current },
            });
          }}
        >
          <Column title="Name" dataIndex="name" key="name" width={220} />
          <Column title="Author" dataIndex="author" key="author" />
        </Table>
      </>
    );
  }

  handleFilter(filter: string) {
    const { dispatch, choicebooktable } = this.props;
    dispatch({
      type: 'choicebooktable/fetchData',
      payload: { filterName: filter, pagination: choicebooktable.pagination.current },
    });
  }

  onSelectChange = (selectedRowKeys: any) => {
    this.setState({ selectedRowKeys });
  };
}
export default connect((state) => ({
  ...state,
}))(ChoiceBookTable);
