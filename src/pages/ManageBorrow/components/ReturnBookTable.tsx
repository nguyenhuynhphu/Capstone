import TableHeader from '@/components/CustomDesign/TableHeader';
import { compareTime, isLate } from '@/utils/utils';
import { ClockCircleOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Badge, Button, Col, Popconfirm, Popover, Row, Space, Table } from 'antd';
import Search from 'antd/lib/input/Search';
import Countdown from 'antd/lib/statistic/Countdown';
import Title from 'antd/lib/typography/Title';
import moment from 'moment';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../ManageBorrowPage.less';

interface ReturnBookTableProps {
  dispatch: Dispatch;
  returnbooktable?: any;
}

class ReturnBookTable extends React.Component<ReturnBookTableProps> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'returnbooktable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }

  render() {
    const { returnbooktable } = this.props;
    const column = [
      {
        title: 'Name',
        dataIndex: 'customerId',
        key: 'customerId',
        width: 200,
        render: (text: string, record: any) => (
          <Space>
            <Avatar size={50} src={record.image} />
            <p style={{ marginBottom: '0px' }}>{record.customerName}</p>
          </Space>
        ),
      },

      {
        title: 'Return Time',
        dataIndex: 'returnTime',
        key: 'returnTime',
        width: 90,
        render: (text: any) => <p style={{ marginBottom: 0 }}>{text.split('T')[0]}</p>,
      },
      {
        title: 'Total',
        dataIndex: 'fee',
        key: 'fee',
        align: 'center',
        width: 80,
      },
    ];

    return (
      <>
        <Space
          style={{
            marginBottom: 15,
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <TableHeader title="List Return" description="List return detail" />
          <Search
            placeholder="Type customer name"
            enterButton="Search"
            style={{ width: 250 }}
            suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
            onSearch={(value) =>
              this.props.dispatch({
                type: 'returnbooktable/fetchData',
                payload: {
                  filterName: value,
                  pagination: returnbooktable.pagination.current,
                },
              })
            }
          />
        </Space>
        <Table
          columns={column}
          dataSource={returnbooktable.data}
          loading={returnbooktable.isLoading}
          pagination={returnbooktable.pagination}
          scroll={{ y: 800 }}
          className={styles.returnTable}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                this.props.dispatch({
                  type: 'returnbooktable/showViewBorrow',
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

export default connect((state) => ({ ...state }))(ReturnBookTable);
