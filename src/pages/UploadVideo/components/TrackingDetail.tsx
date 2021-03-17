import { Avatar, Col, Drawer, List, Row, Space, Table } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import ReactPlayer from 'react-player';
import styles from '../UploadVideo.less';
import { connect, Dispatch } from 'umi';
import Description from './Description';
import BookTrackingItem from './BookTrackingItem';

interface TrackingDetailProps {
  dispatch: Dispatch;
  record: any;
  model: any;

}
interface TrackingDetailState {
  visible: boolean
}

const columns = [
  {
    title: 'Drawer Barcode',
    dataIndex: 'drawerBarcode',
  },
  {
    title: 'Drawer Id',
    dataIndex: 'drawerId',
  },
  {
    title: 'BookShelf',
    dataIndex: 'bookShelfName',
  },
];
class TrackingDetail extends React.Component<TrackingDetailProps, TrackingDetailState> {
  constructor(props: any) {
    super(props);
    this.state = {
      visible: false
    };
  }


  render() {
    return (
      <>
        <Row style={{ height: 550 }}>
          <Col span={8}>
            <ReactPlayer
              controls
              width={'100%'}
              height={'fit-content'}
              url={
                this.props.record.url
              }
            />
            <Title style={{ textAlign: 'left', fontFamily: 'roboto', margin: '20px 0' }} level={2}>
              Tracking Detail
            </Title>
            <Space style={{ width: '100%' }} direction={'vertical'}>
              <Description name={'Video Name:'} value={'Testing Video'} />
              <Description name={'Date'} value={'18/06/2021'} />
              <Description name={'Staff Upload'} value={this.props.record.staffName} />
            </Space>
          </Col>
          <Col span={16} style={{ borderLeft: '1px solid rgba(0, 0, 0, .1)' }}>
            <Row style={{ textAlign: 'left', height: '100%' }}>
              <Col span={24} style={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                <Table
                  columns={columns}
                  loading={this.props.model.isLoading}
                  dataSource={this.props.model.data}
                  bordered
                  onRow={(record) => {
                    return {
                      onDoubleClick: () => {
                        console.log(record);
                        this.onSelectRow(record);
                       
                        
                        this.props.dispatch({
                          type: 'trackingdetail/fetchError',
                          payload: record.id
                        })
                      }, // double click row,
                    
                    };
                  }}
                  className={styles.tablelDrawer}
                  scroll={{ x: 0, y: 485 }}
                  pagination={false}
                  //title={() => <Title level={3}>Drawer Detected</Title>}
                  style={{ height: '100%', marginLeft: 5, borderLeft: 'none' }}
                />
                <Drawer
                  title="Basic Drawer"
                  placement="right"
                  closable={false}
                  onClose={this.onClose}
                  width={600}
                  visible={this.state.visible}
                  getContainer={false}
                  style={{ position: 'absolute' }}
                >
                   <div>
                    {this.props.model.listError.map((record: any) =>  
                      <BookTrackingItem record={record}/>)
                    }
                 
                  </div>
                </Drawer>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }

  showDrawer = () => {
    this.setState({
      visible: true,
    });
  };

  onClose = () => {
    var tmp = document.querySelectorAll(`.${styles.tablelDrawer} tr`);
    tmp.forEach((tr: any) => {
      tr.classList.remove(styles.active);
    });
    this.setState({
      visible: false,
    });
  };

  onSelectRow(record: any) {
    var tmp = document.querySelectorAll(`.${styles.tablelDrawer} tr`);
    tmp.forEach((tr: any) => {
      tr.classList.remove(styles.active);
    });
    tmp.forEach((tr: any) => {
      if (tr.attributes['data-row-key'] != undefined) {
        if (tr.attributes['data-row-key']['value'] == record.key) {
          tr.classList.add(styles.active);
        }
      }
    });
    this.showDrawer();
  }
}
export default connect((state) => ({ ...state }))(TrackingDetail);
