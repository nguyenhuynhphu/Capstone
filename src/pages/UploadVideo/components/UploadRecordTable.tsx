import React from 'react';

import { connect, Dispatch } from 'umi';

import { Space, Table, Button } from 'antd';

import _ from 'lodash';

interface UploadRecordTableProps {
  dispatch: Dispatch;
  trackingDetail: Function;
  uploadrecordtable?: any;
}
interface UploadRecordTableState {}

const columns = [
  {
    title: '#',
    dataIndex: 'id',
    align: 'center',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Book Shelf',
    dataIndex: 'bookShelfName',
    align: 'left',
    width: 200
  },
  {
    title: 'Staff Upload',
    dataIndex: 'staffName',
    align: 'center',
  }
];

class UploadRecordTable extends React.Component<UploadRecordTableProps, UploadRecordTableState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'uploadrecordtable/fetchData',
    });
  }

  render() {
    const { uploadrecordtable } = this.props;
    return (
      <>
        <Table
          columns={columns}
          dataSource={uploadrecordtable.data}
          loading={uploadrecordtable.isLoading}
          bordered
          onRow={(record) => {
            return {
              onDoubleClick: () => this.props.trackingDetail(record), // double click row,
            };
          }}
        />
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(UploadRecordTable);
