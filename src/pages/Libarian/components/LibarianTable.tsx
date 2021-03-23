import { DeleteOutlined, EditOutlined, MoreOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Popover, Space, Table } from 'antd';
import Column from 'antd/lib/table/Column';
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

    return (
      <Table
        // columns={column}
        className={styles.librarianTable}
        dataSource={libariantable.data}
        size={'small'}
        loading={libariantable.isLoading}
        pagination={libariantable.pagination}
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              this.props.dispatch({
                type: 'libarianpage/showViewLibarian',
                payload: { ...record },
              });
            },
            onMouseEnter: (event: any) => {
              console.log('YEAH');

              <Popover content={'YEAH'} visible={true}>
                {' '}
              </Popover>;
            },
          };
        }}
      >
        <Column
          key="deco"
          render={(text: any, record: any) => (
            <>
              <div
                style={{ width: 4, height: 80, backgroundColor: '#40A9FF', borderRadius: '10px' }}
              ></div>
            </>
          )}
        />
        <Column
          title={'#'}
          dataIndex={'id'}
          key={'id'}
          render={(text: any, record: any) => (
            <>
              <p style={{ marginBottom: '0px' }}>#{text}</p>
            </>
          )}
        />
        <Column
          title={'Name'}
          dataIndex={'name'}
          key={'name'}
          render={(text: any, record: any) => (
            <>
              <Space>
                <Avatar size={50} src={record.image} />
                <p style={{ marginBottom: '0px' }}>{text}</p>
              </Space>
            </>
          )}
        />
        <Column title="Gender" dataIndex="gender" key="gender" align="center" />
        <Column title="Username" dataIndex="username" key="username" align="center" />
        <Column title="Email" dataIndex="email" key="email" align="left" />
        <Column
          title="Created Time"
          dataIndex="createdTime"
          key="createdTime"
          render={(text: any, record: any) => (
            <>
              <p style={{ marginBottom: '0px' }}>{text?.split('T')[0]}</p>
            </>
          )}
        />
        <Column title="Address" dataIndex="address" key="address" />
        <Column
          title="Action"
          key="action"
          align="center"
          render={(text: any, record: any) => (
            <Popover
              content={
                <Space direction="vertical" >
                  <Space direction="horizontal" align={'center'} style={{marginBottom: 8, cursor: 'pointer'}} >
                    <EditOutlined style={{ color: '#40A9FF', fontSize: 20 }} />
                    <p style={{ marginBottom: '0px' }}>Edit</p>
                  </Space>
                  <Popconfirm
                    title="Are you sure？"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => {
                      this.props
                        .dispatch({
                          type: 'libarianpage/deleteLibarian',
                          payload: [record.id],
                        })
                        .then(() => {
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
                    <Space direction="horizontal" align={'center'} style={{cursor: 'pointer'}}>
                      <DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
                      <p style={{ marginBottom: '0px' }}>Delete</p>
                    </Space>
                  </Popconfirm>
                </Space>
              }
              title="Actions"
              trigger="click"
            >
              <MoreOutlined style={{ fontSize: 20 }} />
            </Popover>
          )}
        />
      </Table>
    );
  }
}

export default connect((state) => ({ ...state }))(LibarianTable);
