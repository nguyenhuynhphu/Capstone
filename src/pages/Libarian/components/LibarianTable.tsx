import { Popconfirm, Space, Table } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../LibarianPage.less';

interface LibarianPageProps {
  dispatch: Dispatch;
  libariantable?: any;
}
interface LibarianPageState {}

class LibarianTable extends React.Component<LibarianPageProps, LibarianPageState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'libariantable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { libariantable } = this.props;
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
        title: 'Action',
        key: 'action',
        render: (text: any, record: any) => (
          <Popconfirm
            title="Are you sure？"
            okText="Yes"
            cancelText="No"
            onConfirm={() => {
              this.props.dispatch({
                type: 'libarianpage/deleteLibarian',
                payload: [record.id],
              }).then(() => {
                this.props.dispatch({
                  type: 'libariantable/fetchData',
                  payload: {
                    filterName: libariantable.filterName,
                    pagination: libariantable.pagination.current,
                  },
                });
              });
            }}
          >
            <a>Delete</a>
          </Popconfirm>
        ),
      },
    ];
    
    return (
      <Table
        columns={column}
        dataSource={libariantable.data}
        loading={libariantable.isLoading}
        pagination={libariantable.pagination}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              this.props.dispatch({
                type: 'libarianpage/showViewLibarian',
                payload: {...record},
              });
            },
          };
        }}
      />
    );
  }
}

export default connect((state) => ({ ...state }))(LibarianTable);
