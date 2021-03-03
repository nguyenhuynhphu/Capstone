import { Button, Col, Popconfirm, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../ManageBorrowPage.less';

interface ManageBorrowPageProps {
  dispatch: Dispatch;
  manageborrowtable?: any;
}
interface ManageBorrowPageState {}

class ManageBorrowTable extends React.Component<ManageBorrowPageProps, ManageBorrowPageState> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'manageborrowtable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { manageborrowtable } = this.props;
    const column = [
      {
        title: 'Customer Name',
        dataIndex: 'customerName',
        key: 'customerName',
        render: (text: any) => <a>{text}</a>,
      },
      {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
      },
      {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
      },
      {
        title: 'Total Fee',
        dataIndex: 'total',
        key: 'total',
      }
    ];
    
    return (
      <>
      <div style={{ marginBottom: 10, marginTop: 12 }}>
          <Title level={3} style={{ marginBottom: 5 }}>
            Customer
          </Title>
          <Row style={{ marginBottom: 1 }}>
            <Col span={8}>
              <Search
                placeholder="input search text"
                onSearch={(value) =>
                  this.props.dispatch({
                    type: 'manageborrowtable/fetchData',
                    payload: { filterName: value, pagination: manageborrowtable.pagination.current },
                  })
                }
                enterButton
                size={'small'}
              />
            </Col>
          </Row>
        </div>
        <Table
        columns={column}
        dataSource={manageborrowtable.data}
        loading={manageborrowtable.isLoading}
        pagination={manageborrowtable.pagination}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              this.props.dispatch({
                type: 'manageborrowpage/showViewBorrow',
                payload: {...record},
              });
            },
          };
        }}
       />
      </>      
    );
  }
}

export default connect((state) => ({ ...state }))(ManageBorrowTable);
