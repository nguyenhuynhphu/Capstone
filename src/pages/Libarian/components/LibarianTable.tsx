import { Space, Table } from 'antd';
import React from 'react';
import styles from '../LibarianPage.less';

class LibarianPageProps {
  pagination: any;
  isLoading: boolean;
  dataSource: any;
}
class LibarianPageState {}
const column = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>,
  },
  {
    title: 'Age',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: 'Address',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: 'Action',
    key: 'action',
    render: (text: any, record: any) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];
class LibarianTable extends React.Component<LibarianPageProps, LibarianPageState> {
  constructor(props: any) {
    super(props);
  }
  render() {
    return (
      <Table
        columns={column}
        dataSource={this.props.dataSource}
        loading={this.props.isLoading}
        pagination={this.props.pagination}
      ></Table>
    );
  }
}

export default LibarianTable;
