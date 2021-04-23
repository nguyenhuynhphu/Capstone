import { formatDate } from '@/utils/utils';
import {
  BookOutlined,
  EditOutlined,
  EuroCircleOutlined,
  PlusOutlined,
  StarFilled,
} from '@ant-design/icons';
import { Button, Col, Row, Space, Table, Tooltip } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { Typography, Image } from 'antd';
import styles from '../ManageBookPage.less';
import 'antd/dist/antd.css';
const { Text } = Typography;

const columns: any = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300,
    render: (text: String, record: any) => (
      <Space>
        <Image
          width={20}
          height={35}
          src={record.image.length != 0 ? record.image[0]?.url : null}
        />
        <Tooltip title={text}>
          <Text style={{ width: 250 }} ellipsis={true}>
            {text}
          </Text>
        </Tooltip>
      </Space>
    ),
  },
  {
    title: 'Quantity',
    dataIndex: 'quantity',
    align: 'center',
    width: 90,
  },
  {
    title: 'Author',
    dataIndex: 'author',
    render: (text: String, record: any) => (
      <Space>
        <Tooltip title={text}>
          <Text style={{ width: 150 }} ellipsis={true}>
            {text}
          </Text>
        </Tooltip>
      </Space>
    ),
  },
  {
    title: 'Rate',
    dataIndex: 'ratingAverage',
    width: 100,
    render: (text: string, record: any) => (
      <Space direction="horizontal">
        <p style={{ marginBottom: 0 }}>
          {record.ratingAverage != undefined ? parseFloat(text).toFixed(2) : 0}
        </p>
        <StarFilled style={{ color: 'yellowgreen' }} />
      </Space>
    ),
  },
  {
    title: 'Created Date',
    dataIndex: 'createdDate',
    align: 'right',
    render: (date: any) => <Text>{date?.split('T')[0]}</Text>,
  },
  {
    title: 'Fee',
    dataIndex: 'fee',
    align: 'right',
    render: (fee: any) => (
      <Space>
        <Text>{fee}</Text>
        <EuroCircleOutlined style={{ fontSize: 18, color: '#2db7f5' }} />
      </Space>
    ),
  },
  {
    title: 'Punish Fee',
    dataIndex: 'punishFee',
    align: 'right',
    render: (fee: any) => (
      <Space>
        <Text>{fee}</Text>
        <EuroCircleOutlined style={{ fontSize: 18, color: 'red' }} />
      </Space>
    ),
  },
  {
    title: 'Publish Date',
    dataIndex: 'publishDate',
    align: 'center',
    render: (date: any) => <Text>{formatDate(date)}</Text>,
  },
];
interface BookGroupTableProps {
  dispatch: Dispatch;
  rowSelection: any;
  handleRowSelect: Function;
  bookgrouptable?: any;
  user?: any;
}
interface BookGroupTableStates {
  selectedRowKeys: any;
}
class BookGroupTable extends React.Component<BookGroupTableProps, BookGroupTableStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      selectedRowKeys: [], // Check here to configure the default column
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({
      type: 'bookgrouptable/fetchData',
      payload: { filterName: '', pagination: 1 },
    })
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
              placeholder="Type book group name"
              enterButton="Search"
              style={{ width: 350 }}
              suffix={<BookOutlined style={{ color: '#40A9FF' }} />}
              onSearch={(value) => this.handleFilter(value)}
            />
          </Col>
          {this.props.user.currentUser.roleId != 1 ? (
            <Col span={8} offset={6} style={{ textAlign: 'right' }}>
              <Space size={20}>
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.dispatch({
                      type: 'managebook/showInputBook',
                      payload: {},
                    })
                  }
                >
                  <PlusOutlined /> New Book
                </Button>
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.dispatch({
                      type: 'managebook/showCategories',
                      payload: {},
                    })
                  }
                >
                  <EditOutlined /> Manage Categories
                </Button>
              </Space>
            </Col>
          ) : (
            <></>
          )}
        </Row>
        <Table
          rowSelection={this.props.user.currentUser.role != 1 ? rowSelection : undefined}
          columns={columns}
          loading={bookgrouptable.isLoading}
          className={styles.bookTable}
        
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
                  payload: record.id,
                });
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
export default connect((state: any) => ({
  ...state,
}))(BookGroupTable);
