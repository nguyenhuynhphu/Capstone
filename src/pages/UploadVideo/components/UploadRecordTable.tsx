import React from 'react';

import { connect, Dispatch } from 'umi';

import { Space, Table, Button } from 'antd';
import styles from '../UploadVideo.less';
import _ from 'lodash';

interface UploadRecordTableProps {
  dispatch: Dispatch;
  trackingDetail: Function;
  uploadrecordtable?: any;
}
interface UploadRecordTableState {}

const columns: any = [
  {
    title: '#',
    dataIndex: 'id',
    key: 'id',
    align: 'center',
    width: 80,
    render: (text: string) => <p style={{marginBottom: 0}}>{text}</p>,
  },
  {
    title: 'Bookshelf',
    dataIndex: 'bookShelfName',
    key: 'bookShelfName',
    align: 'left',
    width: 200,
  },
  {
    title: 'Staff Uploaded',
    dataIndex: 'staffName',
    key: 'staffName',
    align: 'left',
  },
  {
    title: 'Date Uploaded',
    dataIndex: 'time',
    key: 'time',
    align: 'left',
    render: (text: string) => <p style={{marginBottom: 0}}>{text.split('T')[0]}</p>,
  },
];

class UploadRecordTable extends React.Component<UploadRecordTableProps, UploadRecordTableState> {
  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'uploadrecordtable/fetchData',
      payload: {filterRecord: ['', ''], pagination: 1}
    });
  }

  render() {
    const { uploadrecordtable, dispatch } = this.props;
    return (
      <>
        <Table
          columns={columns}
          dataSource={uploadrecordtable.data}
          pagination={uploadrecordtable.pagination}
          loading={uploadrecordtable.isLoading}
          size='middle'
          onChange={(pagination) => {
            dispatch({
              type: 'uploadrecordtable/fetchData',
              payload: { filterRecord: uploadrecordtable.filterRecord, pagination: pagination.current },
            });
          }}
          scroll={{y: 400}}
          className={styles.uploadVideo}
          onRow={(record) => {
            return {
              onClick: () => this.props.trackingDetail(record), // double click row,
            };
          }}
        />
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(UploadRecordTable);
