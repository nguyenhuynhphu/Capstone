import TableHeader from '@/components/CustomDesign/TableHeader';
import { UserOutlined } from '@ant-design/icons';
import { Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../CustomerPage.less';

interface CustomerPageProps {
  dispatch: Dispatch;
  customertable?: any;
}
interface CustomerPageState {}

class CustomerTable extends React.Component<CustomerPageProps, CustomerPageState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'customertable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { customertable } = this.props;
    const column = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: 'Address',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Created Time',
        dataIndex: 'createdTime',
        key: 'createdTime',
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
          <TableHeader title={'List Customers'} description="List of all customer in system !" />

          <Search
            placeholder="Search by name"
            enterButton="Search"
            size="middle"
            style={{ width: 300 }}
            suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
            onSearch={(value: any) => {
              this.props.dispatch({
                type: 'customertable/fetchData',
                payload: { filterName: value, pagination: customertable.pagination.current },
              });
            }}
          />
        </Space>
        <Table
          columns={column}
          dataSource={customertable.data}
          loading={customertable.isLoading}
          pagination={customertable.pagination}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                this.props.dispatch({
                  type: 'customerpage/showViewCustomer',
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

export default connect((state) => ({ ...state }))(CustomerTable);
