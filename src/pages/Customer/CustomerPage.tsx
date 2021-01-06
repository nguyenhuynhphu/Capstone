import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { Button, Col, Drawer, Row, Space } from 'antd';
import React from 'react';
import LibarianTable from './components/LibarianTable';
import styles from '../LibarianPage.less';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';
import { InputForm } from './components/InputForm';

class LibarianPageProps {}
class LibarianPageState {
  libarianTable: any;

  createLibarianVisible: boolean; 
}
class CustomerPage extends React.Component<LibarianPageProps, LibarianPageState> {
  constructor(props: any) {
    super(props);
    this.state = {
      libarianTable: {
        dataSource: [
          {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
          },
        ],
        pagination: {
          current: 1,
        },
        isLoading: false,
      },
      createLibarianVisible: false,
    };
  }
  render() {
    return (
      <>
        <PageHeaderWrapper></PageHeaderWrapper>
        <Row>
          <Col span={24}>
            <Row style={{ margin: '10px 0px' }}>
              <Col span={10}>
                <Search
                  placeholder="input search text"
                  style={{ width: 250 }}
                  // onSearch={(value) => this.handleFilter(value)}
                  enterButton
                />
              </Col>
              <Col span={4} offset={10} style={{ textAlign: 'right' }}>
                <Space size={20}>
                  <Button type="primary" onClick={() => this.showCreateLibarianDrawer()}>
                    <PlusOutlined /> New Libarian
                  </Button>
                </Space>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                {/* <LibarianTable {...this.state.libarianTable} /> */}
              </Col>
            </Row>
          </Col>
        </Row>
        {/* <Drawer
          width={700}
          placement="right"
          closable={false}
          onClose={this.hideViewDrawer}
          visible={this.state.viewDrawerVisible}
          className={styles.viewBookGroupForm}
        >
          <ViewForm bookGroup={this.state.bookGroup} openEditForm={this.showUpdateDrawer} />
        </Drawer> */}
        <Drawer
          title="Create Libarian"
          width={550}
          onClose={() => this.hideCreateLibarianDrawer()}
          visible={this.state.createLibarianVisible}
          bodyStyle={{ paddingBottom: 80 }}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button onClick={() => this.hideCreateLibarianDrawer()} style={{ marginRight: 8 }}>
                Cancel
              </Button>
              <Button form={'inputForm'} key="submit" htmlType="submit" type="primary">
                Add Book
              </Button>
            </div>
          }
        >
          
        </Drawer>
        {/* <Drawer
          title="Edit book"
          width={750}
          closable={true}
          onClose={this.hideUpdateDrawer}
          visible={this.state.updateDrawerVisible}
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
          <InputForm bookGroup={this.state.bookGroup} />
        </Drawer> */}
      </>
    );
  }

  showCreateLibarianDrawer() {
    document.getElementsByTagName('body')[0].style.overflow = 'hidden';
    document.getElementsByTagName('body')[0].style.paddingRight = '17px';
    this.setState({
      createLibarianVisible: true,
    });
  }

  hideCreateLibarianDrawer() {
    document.getElementsByTagName('body')[0].style.overflow = 'auto';
    document.getElementsByTagName('body')[0].style.paddingRight = '0px';
    this.setState({
        createLibarianVisible: false,
    });
  }
}

export default CustomerPage;
