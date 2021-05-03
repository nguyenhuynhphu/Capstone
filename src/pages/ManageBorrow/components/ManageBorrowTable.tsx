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
        title: 'Name',
        dataIndex: 'patronName',
        key: 'patronName',

        render: (text: string, record: any) => (
          <Space>
            <Avatar size='small' src={record.image} />
            <p style={{ marginBottom: '0px' }}>{text}</p>
          </Space>
        ),
      },
      {
        title: 'Start Time',
        dataIndex: 'startTime',
        key: 'startTime',
        width: 130,
        
        render: (text: any) => <p style={{ marginBottom: 0 }}>{text.split('T')[0]}</p>,
      },
      {
        title: 'End Time',
        dataIndex: 'endTime',
        key: 'endTime',
        width: 130,
        align: 'center',
        render: (text: any, record: any) =>
          isLate(record.endTime) ? (
            <Popover
              content={
                <>
                  <Row gutter={16}>
                    <Col span={24} style={{ marginTop: 32 }}>
                      <Countdown value={moment(record.endTime).valueOf()} format="DD:HH:mm:ss" />
                    </Col>
                  </Row>
                </>
              }
            >
              <Badge
                style={{ marginLeft: 5 }}
                count={true ? <ClockCircleOutlined style={{ color: '#f5222d' }} /> : 0}
              >
                <p style={{ cursor: 'pointer', marginBottom: 0, padding: '2px 10px' }}>
                  {text.split('T')[0]}
                </p>
              </Badge>
            </Popover>
          ) : (
            <Popover
              content={
                <>
                  <Row gutter={16}>
                    <Col span={24} style={{ marginTop: 32 }}>
                      <Countdown
                        title={'Time remaining'}
                        value={moment(record.endTime).valueOf()}
                        format="DD:HH:mm:ss"
                      />
                    </Col>
                  </Row>
                </>
              }
            >
              <Badge
                style={{ marginLeft: 5 }}
                count={true ? <ClockCircleOutlined style={{ color: '#87d068' }} /> : 0}
              >
                <p style={{ cursor: 'pointer', marginBottom: 0, padding: '2px 10px' }}>
                  {text.split('T')[0]}
                </p>
              </Badge>
            </Popover>
          ),
      },
      {
        title: 'Quantity',
        dataIndex: 'quantity',
        key: 'quantity',
        align: 'center',
        width: 90
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
          <TableHeader title="List Borrow" description="List borrow detail" />
          <Search
            placeholder="Type patron name"
            enterButton="Search"
            style={{ width: 350 }}
            suffix={<UserOutlined style={{ color: '#40A9FF' }} />}
            onSearch={(value) =>
              this.props.dispatch({
                type: 'manageborrowtable/fetchData',
                payload: {
                  filterName: value,
                  pagination: 1,
                },
              })
            }
          />
        </Space>
        <Table
          columns={column}
          scroll={{ y: 450 }}
          size={'small'}
          dataSource={manageborrowtable.data}
          loading={manageborrowtable.isLoading}
          pagination={manageborrowtable.pagination}
          onChange={(pagination: any) => {
            this.props.dispatch({
              type: 'manageborrowtable/fetchData',
              payload: { filterName: manageborrowtable.filterName, pagination: pagination.current },
            });
          }}
          className={styles.borrowTable}
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                this.props.dispatch({
                  type: 'manageborrowpage/showViewBorrow',
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

export default connect((state) => ({ ...state }))(ManageBorrowTable);
