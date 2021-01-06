import { PlusOutlined } from '@ant-design/icons';
import { Button, Col, Row, Table } from 'antd';
import Tag from 'antd/es/tag';
import Search from 'antd/lib/input/Search';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';

const { Column } = Table;

interface BookShelfTableProps {
  dispatch: Dispatch;
  bookshelftable: any;
  global: any;

  onCreate: Function;
  onView: Function;
  onOrganize: Function;
  dataSource: any;
  pagination: any;
  isLoading: boolean;
}
interface BookShelfTableState {
  colors: any;
}
class BookShelfTable extends React.Component<BookShelfTableProps, BookShelfTableState> {
  constructor(props: any) {
    super(props);
    this.state = {
      colors: new Map<string, string>(),
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'bookshelftable/fetchData',
      payload: { filterName: '', pagination: 1 },
    });
  }
  componentWillMount() {
    const { bookshelftable } = this.props;
    var colors = this.state.colors;
    bookshelftable.data.forEach((bookshelf: any) => {
      colors.set(bookshelf.locationName, bookshelf.locationColor);
    });
  }
  render() {
    const { bookshelftable } = this.props;
    bookshelftable.data.forEach((bookshelf: any) => {
      this.state.colors.set(bookshelf.locationName, bookshelf.locationColor);
    });
    return (
      <>
        <div style={{ marginBottom: 10, marginTop: 12 }}>
          <Title level={3} style={{ marginBottom: 5 }}>
            Book Shelf
          </Title>
          <Row style={{ marginBottom: 1 }}>
            <Col span={8}>
              <Search
                placeholder="input search text"
                onSearch={(value) =>
                  this.props.dispatch({
                    type: 'bookshelftable/fetchData',
                    payload: { filterName: value, pagination: bookshelftable.pagination.current },
                  })
                }
                enterButton
                size={'small'}
              />
            </Col>
            <Col span={6} offset={10} style={{ textAlign: 'right' }}>
              <Button
                type="primary"
                onClick={() =>
                  this.props.dispatch({
                    type: 'organizebook/showCreateBookShelf',
                    payload: {  },
                  })
                }
                size={'small'}
              >
                <PlusOutlined /> New Book Shelf
              </Button>
            </Col>
          </Row>
        </div>
        <Table
          dataSource={bookshelftable.data}
          pagination={bookshelftable.pagination}
          loading={bookshelftable.isLoading}
          size={'middle'}
          onRow={(record) => {
            return {
              onDoubleClick: () => {
                this.props.onView(record);
              }, // double click row,
            };
          }}
        >
          <Column title="Name" dataIndex="name" key="name" />

          <Column title="Total Row" dataIndex="row" key="row" align={'center'} />
          <Column title="Total Column" dataIndex="col" key="col" align={'center'} />

          <Column
            title="Location"
            dataIndex="locationName"
            key="locationId"
            render={(data) => <Tag color={this.state.colors.get(data)}>{data}</Tag>}
          />

          <Column
            //title="Manage Book"
            align={'center'}
            render={() => (
              <>
                <a style={{ textAlign: 'center' }} onClick={() => this.props.onOrganize()}>
                  Edit
                </a>
              </>
            )}
          />
          <Column
            //title="Manage Book"
            align={'center'}
            render={() => (
              <>
                <a style={{ textAlign: 'center' }} onClick={() => this.props.onOrganize()}>
                  Delete
                </a>
              </>
            )}
          />
        </Table>
      </>
    );
  }
}
export default connect((state) => ({ ...state }))(BookShelfTable);
