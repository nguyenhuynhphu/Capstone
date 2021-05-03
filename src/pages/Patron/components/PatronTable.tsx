import TableHeader from '@/components/CustomDesign/TableHeader';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Popconfirm, Row, Space, Table, Tooltip, Typography } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../PatronPage.less';
const { Text } = Typography;

interface PatronPageProps {
  dispatch: Dispatch;
  patrontable?: any;
}
const column: any = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: 250,
    render: (text: any, record: any) => (
      <>
        <Space>
          <Avatar size={'small'} src={record.image} />
          <p style={{ marginBottom: '0px' }}>{text}</p>
        </Space>
      </>
    ),
  },
  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    align: 'left',
  },
  {
    title: 'Gender',
    dataIndex: 'gender',
    key: 'address',
    align: 'center',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
    render: (text: any, record: any) => (
      <Tooltip title={text}>
        <Text style={{ width: 130 }} ellipsis={true}>
          {text}
        </Text>
      </Tooltip>
    ),
  },
  {
    title: 'Created',
    dataIndex: 'createdTime',
    key: 'createdTime',
    render: (text: any, record: any) => (
      <>
        <p style={{ marginBottom: '0px' }}>{text.split('T')[0]}</p>
      </>
    ),
  },
  {
    title: 'Email',
    dataIndex: 'email',
    key: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
  },
];
class PatronTable extends React.Component<PatronPageProps, {}> {
  constructor(props: any) {
    super(props);
  }
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'patrontable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { patrontable } = this.props;

    return (
      <>
        <Space
          style={{
            marginBottom: 10,
            marginTop: 12,
            width: '100%',
            justifyContent: 'space-between',
          }}
        >
          <TableHeader title={'List Patron'} description="List of all patrons in system " />

          <Search
            placeholder="Search by name"
            enterButton="Search"
            size="middle"
            style={{ width: 300 }}
            suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
            onSearch={(value: any) => {
              this.props.dispatch({
                type: 'patrontable/fetchData',
                payload: { filterName: value, pagination: 1 },
              });
            }}
          />
        </Space>
        <Table
          className={styles.patronTable}
          columns={column}
          dataSource={patrontable.data}
          loading={patrontable.isLoading}
          pagination={patrontable.pagination}
          size="small"
          onChange={(pagination: any) => {
            this.props.dispatch({
              type: 'patrontable/fetchData',
              payload: { filterName: patrontable.filterName, pagination: pagination.current },
            });
          }}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                this.props.dispatch({
                  type: 'patronpage/showViewPatron',
                  payload: { ...record },
                });
              },
            };
          }}
        />
      </>
    );
  }
}

export default connect((state) => ({ ...state }))(PatronTable);
