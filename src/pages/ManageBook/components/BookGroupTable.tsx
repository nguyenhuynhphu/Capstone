import { formatDate } from '@/utils/utils';
import {
  BookOutlined,
  EditOutlined,
  EuroCircleOutlined,
  ExclamationOutlined,
  PayCircleOutlined,
  PlusOutlined,
  StarFilled,
  TagOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Button, Col, Popover, Rate, Row, Space, Table, Tag } from 'antd';
import Search from 'antd/lib/input/Search';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { Typography, Image } from 'antd';
import styles from '../ManageBookPage.less';
import 'antd/dist/antd.css';
import LoadingDrone from '@/components/CustomDesign/LoadingDrone';
const { Text } = Typography;

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    width: 300,
    render: (text: String, record: any) => (
      <Space>
        <Image
          width={50}
          height={77}
          src={record.image.length != 0 ? record.image[0]?.url : null}
        />
        <p style={{ marginBottom: 0 }}>{text}</p>
      </Space>
    ),
  },
  {
    title: 'Categories',
    dataIndex: 'category',
    align: 'left',
    render: (text: string, record: any) => {
      if (record.category != undefined) {
        var tmp: any = [];
        if (record.category.length >= 2) {
          return (
            <Popover
              content={
                <div style={{ width: 50 }}>
                  {record.category.map((cate: any, index: number) => (
                    <Tag icon={<TagOutlined />} color="#2db7f5">
                      {cate.name}
                    </Tag>
                  ))}
                </div>
              }
              title="All Categories"
              trigger="hover"
            >
              {record.category.map((cate: any, index: number) =>
                index <= 1 ? (
                  <Tag icon={<TagOutlined />} color="#2db7f5">
                    {cate.name}
                  </Tag>
                ) : (
                  <></>
                ),
              )}
              <p
                style={{
                  fontSize: 14,
                  marginBottom: 0,
                  width: '100%',
                  textAlign: 'center',
                  color: '#2db7f5',
                }}
              >
                ...
              </p>
            </Popover>
          );
        } else {
          record.category.map((cate: any) =>
            tmp.push(
              <Tag key={cate.id} icon={<TagOutlined />} color="#2db7f5">
                {cate.name}
              </Tag>,
            ),
          );
        }

        return tmp;
      } else {
        return (
          <Tag icon={<WarningOutlined />} color="#cd201f">
            No category
          </Tag>
        );
      }
    },
  },
  {
    title: 'Rate',
    dataIndex: 'ratingAverage',
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
    title: 'Author',
    dataIndex: 'author',
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
    title: 'PunishFee',
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
              placeholder="Type book name"
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
          rowSelection={rowSelection}
          columns={columns}
          loading={bookgrouptable.isLoading}
          className={styles.bookTable}
          scroll={{ y: 500 }}
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
                  payload: { ...record },
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
