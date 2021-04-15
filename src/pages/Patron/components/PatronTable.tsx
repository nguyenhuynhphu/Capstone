import TableHeader from '@/components/CustomDesign/TableHeader';
import { UserOutlined } from '@ant-design/icons';
import { Avatar, Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../PatronPage.less';

interface PatronPageProps {
  dispatch: Dispatch;
  patrontable?: any;
}
interface PatronPageState {}

class PatronTable extends React.Component<PatronPageProps, PatronPageState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'patrontable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { patrontable } = this.props;
    const column = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        width: 250,
        render: (text: any, record: any) => (
          <>
            <Space>
              <Avatar size={50} src={record.image} />
              <p style={{ marginBottom: '0px' }}>{text}</p>
            </Space>
          </>
        ),
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
          <TableHeader title={'List Patrons'} description="List of all patron in system !" />

          <Search
            placeholder="Search by name"
            enterButton="Search"
            size="middle"
            style={{ width: 300 }}
            suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
            onSearch={(value: any) => {
              this.props.dispatch({
                type: 'patrontable/fetchData',
                payload: { filterName: value, pagination: patrontable.pagination.current },
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
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
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
