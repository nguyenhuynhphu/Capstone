import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Row, Col, Button, Drawer } from 'antd';
import React from 'react';

import styles from './ManageBookPage.less';
import { InputForm } from './components/InputForm';
import ViewForm from './components/ViewForm';
import { connect, Dispatch, ManageBookType } from 'umi';
import BookGroupTable from './components/BookGroupTable';

interface ManageBookPageProps {
  dispatch: Dispatch;
  managebook: any;
  bookgrouptable: any;
}

interface ManageBookPageState {
  createDrawerVisible: boolean;
  deleteDrawerVisible: boolean;
  viewDrawerVisible: boolean;
  updateDrawerVisible: boolean;

  isLoadingTable: boolean;
  tableDataSource: any;
  pagination: any;
  filter: string;

  bookGroup: any;
  selectedRowKeys: any;
}

class ManageBookPage extends React.Component<ManageBookPageProps, ManageBookPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      createDrawerVisible: false,
      deleteDrawerVisible: false,
      viewDrawerVisible: false,
      updateDrawerVisible: false,

      isLoadingTable: false,
      tableDataSource: [],
      pagination: {
        current: 1,
        pageSize: 10,
      },
      filter: '',
      bookGroup: {},
      selectedRowKeys: [],
    };
    //#region bind function
    this.hideDeleteDrawer = this.hideDeleteDrawer.bind(this);

    this.hideViewDrawer = this.hideViewDrawer.bind(this);

    this.hideUpdateDrawer = this.hideUpdateDrawer.bind(this);

    this.handelSubmit = this.handelSubmit.bind(this);

    this.handleRowSelect = this.handleRowSelect.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    //#endregion
  }

  componentDidMount(){
    this.props.dispatch({
      type: 'managebook/fetchCategories',
      payload: {},
    })
  }

  render() {
    const { managebook } = this.props;
    return (
      <>
        <PageHeaderWrapper style={{ marginBottom: '20px' }}></PageHeaderWrapper>
        <div className={styles.section}>
          <BookGroupTable
            rowSelection={this.state.selectedRowKeys}
            handleRowSelect={this.handleRowSelect}
          />
        </div>
        <Drawer
          width={700}
          placement="right"
          closable={false}
          onClose={this.hideViewDrawer}
          visible={managebook.viewBookVisible}
          className={styles.viewBookGroupForm}
        >
          <ViewForm bookGroup={managebook.choiceBook} />
        </Drawer>
        <Drawer
          title="Create a new book group"
          width={750}
          onClose={() => this.hideCreateDrawer()}
          visible={managebook.createBookVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.hideCreateDrawer()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button form={'inputForm'} key="submit" htmlType="submit" type="primary">
                Add Book
              </Button>
            </div>
          }
        >
          <InputForm bookGroup={null} handelSubmit={this.handelSubmit} categories={managebook.categories}/>
        </Drawer>
        <Drawer
          placement={'bottom'}
          mask={false}
          visible={managebook.deleteBookVisible}
          key={'bottom'}
          closeIcon={null}
          height={70}
        >
          <Row align={'middle'} style={{ height: '100%', paddingLeft: 50 }}>
            <Col span={8}>
              <p style={{ margin: 0, fontWeight: 'bold' }} >
                Do you want to delete {this.state.selectedRowKeys.length} items ?
              </p>
            </Col>
            <Col span={3} offset={13}>
              <Button type="primary" danger onClick={this.handleDelete}>
                Delete
              </Button>
              <Button style={{ marginLeft: 15 }}>Cancel</Button>
            </Col>
          </Row>
        </Drawer>
        <Drawer
          title="Edit book"
          width={750}
          closable={true}
          onClose={this.hideUpdateDrawer}
          visible={managebook.editBookVisible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={this.hideUpdateDrawer} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button onClick={this.hideUpdateDrawer} type="primary">
                Submit
              </Button>
            </div>
          }
        >
          <InputForm bookGroup={managebook.choiceBook} handelSubmit={() => {}} categories={managebook.categories}/>
        </Drawer>
      </>
    );
  }

  handleDelete() {
    const { dispatch, bookgrouptable } = this.props;
    dispatch({
      type: 'managebook/deleteBookGroup',
      payload: this.state.selectedRowKeys,
    }).then(() => {
      this.setState({ selectedRowKeys: [] });
      dispatch({
        type: 'bookgrouptable/fetchData',
        payload: {
          filterName: bookgrouptable.filterName,
          pagination: bookgrouptable.pagination.current,
        },
      });
    });
  }

  handleRowSelect(selectedRowKeys: any) {
    const { dispatch } = this.props;
    if (selectedRowKeys.length != 0) {
      dispatch({
        type: 'managebook/showDeleteBook',
        payload: {},
      });
    } else {
      dispatch({
        type: 'managebook/hideDeleteBook',
        payload: {},
      });
    }
    this.setState({ selectedRowKeys: selectedRowKeys });
  }

  handelSubmit(bookGroup: any) {
    const { dispatch, bookgrouptable } = this.props;
    dispatch({
      type: 'managebook/insertBookGroup',
      payload: { ...bookGroup },
    }).then(() =>
      dispatch({
        type: 'bookgrouptable/fetchData',
        payload: {
          filterName: bookgrouptable.filterName,
          pagination: bookgrouptable.pagination.current,
        },
      }),
    );
  }

  //#region page effect

  hideViewDrawer() {
    this.props.dispatch({
      type: 'managebook/hideViewBook',
      payload: {},
    });
  }

  hideCreateDrawer() {
    this.props.dispatch({
      type: 'managebook/hideCreateBook',
      payload: {},
    });
  }


  hideDeleteDrawer() {
    this.setState({
      deleteDrawerVisible: false,
    });
  }

  hideUpdateDrawer() {
    this.props.dispatch({
      type: 'managebook/hideEditBook',
      payload: {},
    });
  }
  //#endregion
}
export default connect((state: ManageBookType) => ({ ...state }))(ManageBookPage);
