import { DeleteOutlined } from '@ant-design/icons';
import { Avatar, Popconfirm, Space, Table, Tooltip, Typography } from 'antd';
import Column from 'antd/lib/table/Column';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../LibarianPage.less';
const { Text } = Typography;

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
        onChange={(pagination: any) => {
          this.props.dispatch({
            type: 'libariantable/fetchData',
            payload: { filterName: libariantable.filterName, pagination: pagination.current },
          });
        }}

        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              this.props.dispatch({
                type: 'libarianpage/showViewLibarian',
                payload: { ...record },
              });
            },
          };
        }}
      >
        <Column
          key="deco"
          width={20}
          render={(text: any, record: any) => (
            <>
              <div
                style={{ width: 3, height: 35, backgroundColor: '#40A9FF', borderRadius: '10px' }}
              ></div>
            </>
          )}
        />
        <Column
          title={'No'}
          dataIndex={'id'}
          key={'id'}
          width={50}
          align={'center'}
          render={(text: any, record: any, index: number) => (
            <>
              <p style={{ marginBottom: '0px' }}>{index + 1}</p>
            </>
          )}
        />
        <Column
          title={'Name'}
          dataIndex={'name'}
          key={'name'}
          width={230}
          render={(text: any, record: any) => (
            <>
              <Space>
                <Avatar size={'small'} src={record.image} />
                <p style={{ marginBottom: '0px' }}>{text}</p>
              </Space>
            </>
          )}
        />
        <Column title="Gender" dataIndex="gender" key="gender" align="left" width={80} />
        <Column title="Username" dataIndex="username" key="username" align="left" width={150} />
        <Column title="Email" dataIndex="email" key="email" align="left" />
        <Column
          title="Created"
          dataIndex="createdTime"
          key="createdTime"
          width={130}
          align="left"
          render={(text: any, record: any) => (
            <>
              <p style={{ marginBottom: '0px' }}>{text?.split('T')[0]}</p>
            </>
          )}
        />
        <Column
          title="Address"
          dataIndex="address"
          key="address"
          width={200}
          render={(text: any, record: any) => (
            <Tooltip title={text}>
              <Text style={{ width: 200 }} ellipsis={true}>
                {text}
              </Text>
            </Tooltip>
          )}
        />
        <Column
          key="action"
          align="center"
          width={80}
          render={(text: any, record: any) => (
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
              <Space direction="horizontal" align={'center'} style={{ cursor: 'pointer' }}>
                <DeleteOutlined style={{ color: 'red', fontSize: 20 }} />
              </Space>
            </Popconfirm>
          )}
        />
      </Table>
    );
  }
}

export default connect((state) => ({ ...state }))(LibarianTable);
