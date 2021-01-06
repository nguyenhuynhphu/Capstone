import { PlusOutlined } from '@ant-design/icons';
import { Table, Typography, Row, Col, Button, Badge, Drawer, Modal } from 'antd';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from './LocationTable.less';

const { Column, ColumnGroup } = Table;

interface LocationTableProps {
  dispatch: Dispatch;
  global: any;
  locationtable: any;
  organizebook: any;
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
          <Title level={3} style={{ marginBottom: 5 }}>
            Location
          </Title>
          <Row style={{ marginBottom: 1 }}>
            <Col span={12}>
              <Search
                placeholder="Search Location"
                onSearch={(value) =>
                  this.props.dispatch({
                    type: 'locationtable/fetchData',
                    payload: {
                      filterName: value,
                      pagination: locationtable.pagination.current,
                    },
                  })
                }
                enterButton
                size={'small'}
              />
            </Col>
            <Col span={8} offset={4} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={() =>
                  this.props.dispatch({
                    type: 'organizebook/showCreateLocation',
                    payload: {},
                  })
                }
                size={'small'}
              >
                <PlusOutlined /> New Location
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          dataSource={locationtable.data}
          loading={locationtable.isLoading}
          pagination={locationtable.pagination}
          rowSelection={rowSelection}
          size={'middle'}
          onChange={(pagination) => {
            this.props.dispatch({
              type: 'locationtable/fetchData',
              payload: { filterName: locationtable.filterName, pagination: pagination.current },
            });
          }}
          onRow={(record, rowIndex) => {
            return {
              onDoubleClick: (event) => {
                this.props.dispatch({
                  type: 'organizebook/loadSelectLocation',
                  payload: { ...record },
                });
              },
            };
          }}
        >
          <Column title="Name" dataIndex="name" key="name" />

          <Column
            dataIndex="color"
            key="color"
            className={styles.handelBookMark}
            render={(color) => (
              <Badge.Ribbon key={'color'} color={color}>
                <div></div>
              </Badge.Ribbon>
            )}
          ></Column>
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
