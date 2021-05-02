import TableHeader from '@/components/CustomDesign/TableHeader';
import { BlockOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Typography, Row, Col, Button, Badge, Drawer, Modal, Space } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '@/pages/BookOrganize/BookOrganizePage.less';

const { Column, ColumnGroup } = Table;

interface LocationTableProps {
  dispatch: Dispatch;
  global: any;
  locationtable: any;
  organizebook: any;
  user: any;
}
interface LocationTableState {
  selectedRowKeys: any;
  deleteVisible: boolean;
}

class LocationTable extends React.Component<LocationTableProps, LocationTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      deleteVisible: false,
      selectedRowKeys: [],
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'locationtable/fetchData',
      payload: { filterName: '', pagination: 1 },
    }).then(() =>
      dispatch({
        type: 'global/getColors',
        payload: {},
      }),
    );
  }

  render() {
    const { locationtable, organizebook } = this.props;
    const rowSelection = {
      selectedRowKeys: organizebook.selectedRowKeys,
      onChange: this.onSelectChange,
    };
    return (
      <>
        <div style={{ marginBottom: 10, marginTop: 12 }}>
          <Space direction="horizontal" style={{ width: '100%', justifyContent: 'space-between' }}>
            <TableHeader title="Locations" description="List location" />
            <Space direction="horizontal">
              <Search
                placeholder="Search by name"
                enterButton="Search"
                size="middle"
                style={{ width: 230 }}
                suffix={<BlockOutlined style={{ color: '#40A9FF' }} />}
                onSearch={(value) =>
                  this.props.dispatch({
                    type: 'locationtable/fetchData',
                    payload: {
                      filterName: value,
                      pagination: 1,
                    },
                  })
                }
              />
              {this.props.user.currentUser.roleId == 1 ? (
                <Button
                  type="primary"
                  onClick={() =>
                    this.props.dispatch({
                      type: 'organizebook/showCreateLocation',
                      payload: {},
                    })
                  }
                >
                  <PlusOutlined /> Add New
                </Button>
              ) : (
                <></>
              )}
            </Space>
          </Space>
        </div>
        <Table
          className={styles.locationTable}
          dataSource={locationtable.data}
          loading={locationtable.isLoading}
          pagination={locationtable.pagination}
         
          scroll={{ y: 450 }}
          size={'small'}
          onChange={(pagination) => {
            this.props.dispatch({
              type: 'locationtable/fetchData',
              payload: { filterName: locationtable.filterName, pagination: pagination.current },
            });
          }}
        >
          <Column
            title="No"
            key="name"
            width={50}
            align='center'
            render={(name: string, record: any, index: number) => <div>#{index + 1}</div>}
          />
          <Column
            title="Name"
            dataIndex="name"
            key="name"
            render={(name: string, record: any) => (
              <div>
                <Badge key={'color'} color={record.color} /> {name}
              </div>
            )}
          />
          <Column
            //title="Manage Book"
            align={'center'}
            width={100}
            render={(text, record: any) => (
              <Space size="middle">
                <a
                  onClick={() =>
                    this.props.dispatch({
                      type: 'organizebook/onSelectLocation',
                      payload: { ...record },
                    })
                  }
                >
                  Detail
                </a>
              </Space>
            )}
          />
        </Table>
      </>
    );
  }

  onSelectChange = (selectedRowKeys: any) => {
    if (selectedRowKeys.length != 0) {
      this.props.dispatch({
        type: 'organizebook/showDeleteLocation',
        payload: selectedRowKeys,
      });
    } else {
      this.props.dispatch({
        type: 'organizebook/hideDeleteLocation',
        payload: [],
      });
    }
  };
}
export default connect((state) => ({ ...state }))(LocationTable);
