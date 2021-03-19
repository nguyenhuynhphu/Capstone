import React from 'react';

import { connect, Dispatch, Prompt } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Space, Row, Col, Table, Button, Modal, Steps, Spin, notification } from 'antd';
import {
  ArrowsAltOutlined,
  BarcodeOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  InboxOutlined,
  LoadingOutlined,
  RedoOutlined,
  SettingOutlined,
  ShrinkOutlined,
  SmileOutlined,
} from '@ant-design/icons';
import styles from './UploadVideo.less';
import Select from 'antd/es/select';
import Dragger from 'antd/lib/upload/Dragger';
import axios from 'axios';
import TrackingDetail from './components/TrackingDetail';
import { lowerFirst } from 'lodash';
import { checkingPosition, fetchBookInDrawer, fetchDrawer, getRealPosition } from '@/services/upload';
import useSelection from 'antd/lib/table/hooks/useSelection';
import _ from 'lodash';
import moment from 'moment';
import UploadRecordTable from './components/UploadRecordTable';
import { greenBright } from 'chalk';
const { Step } = Steps;
const { Option } = Select;
interface UploadVideoProps {
  dispatch: Dispatch;
  uploadvideo?: any;
  user?: any;
  trackingdetail?: any;
}
interface UploadVideoState {
  uploadStep: number;
  fileList: any;
  modalWidth: number;
  selectedBookShelf: number;
  selectedRecord: any;
  isUpload: boolean;
  isHidding: boolean;
}

const responseDetect = [
  {
    link:
      'https://firebasestorage.googleapis.com/v0/b/capstone-96378.appspot.com/o/webadmin.MP4?alt=media&token=1fc47b6f-a46d-4e54-afa4-78227e5aebc0',
    list_code: [
      {
        books: [
          'LS000380',
          'KH000044',
          'TT000336',
          'LN000346',
          'KH000050',
          'LS000320',
          'LN000248',
          'LN000220',
          'KH000070',
          //'LN000290',
          'LS000416',
          'KH000020',
          //'KH000034',
          'KH000038',
          'KH000036',
          'LN000276',
          'LS000332',
          'LS000368',
        ],
        drawler: 'KS008000',
      },
      {
        books: ['KH000010'],
        drawler: 'KS003000',
      },
      {
        books: [
          'LN000332',
          'TT000372',
          'LS000356',
          'LS000392',
          'LS000428',
          'KH000100',
          'TT000396',
          'TT000300',
        ],
        drawler: 'KS006000',
      },
      {
        books: [
          'LS000332',
          'LS000368',
          'TT000360',
          'LN000318',
          'LN000234',
          'LN000262',
          'KH000090',
          'TT000384',
          'LN000304',
          'TT000312',
          'TT000324',
          'LS000344',
        ],
        drawler: 'KS009000',
      },
    ],
  },
];

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    render: (text) => <p>{text}</p>,
  },
  {
    title: 'Cash Assets',
    className: 'column-money',
    dataIndex: 'money',
    align: 'right',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];
const key = 'updatable';
class UploadVideo extends React.Component<UploadVideoProps, UploadVideoState> {
  constructor(props: any) {
    super(props);
    this.state = {
      uploadStep: 0,
      fileList: [],
      modalWidth: 600,
      selectedBookShelf: -1,
      selectedRecord: {},
      isUpload: false,
      isHidding: false,
    };
    this.uploadSuccess = this.uploadSuccess.bind(this);
    this.openNotification = this.openNotification.bind(this);
    this.trackingDetail = this.trackingDetail.bind(this);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'uploadvideo/loadBookShelf',
      payload: '',
    });
  }

  render() {
    const { uploadvideo } = this.props;
    return (
      <>
        <PageHeaderWrapper />
        <Prompt when={this.state.isUpload} message="Detecting is in process, leave will cancel process. Are you sure ?" />
        <Row style={{ backgroundColor: 'white', marginTop: '20px' }}>
          <Col span={24}>
            <Space style={{padding: 20}}>
            <Button
            type={'primary'}
              onClick={() =>{
                if(this.state.isUpload && this.state.isHidding){
                  notification.close(key);
                }
                  this.props.dispatch({
                    type: 'uploadvideo/renderModel',
                    payload: true,
                  })
                }
              }
            >
              Upload Video
            </Button>
            </Space>
          
            <UploadRecordTable trackingDetail={this.trackingDetail}/>
          </Col>
        </Row>
        <Modal
          className={styles.uploadModal}
          visible={uploadvideo.uploadModalVisible}
          bodyStyle={{ textAlign: 'center', padding: '55px 40px 0 40px' }}
          width={this.state.modalWidth}
          centered
          closeIcon={this.state.isUpload ? <ShrinkOutlined style={{fontSize: 18}}/> : <CloseOutlined />}
          onOk={() => {}}
          footer={() => <Button>Process Detect</Button>}
          onCancel={() => {
            if(!this.state.isUpload){
              this.setState({ uploadStep: 0, modalWidth: 600 });
            }else{
              this.setState({isHidding: true})
              this.openNotification();
            }
            this.props.dispatch({
              type: 'uploadvideo/renderModel',
              payload: false,
            });
            
          }}
        >
          {this.state.uploadStep != 3 ? (
            <Steps size="small" current={this.state.uploadStep}>
              <Step title="Select bookshelf" />
              <Step title="Upload Video" />
              <Step title="Processing" />
            </Steps>
          ) : (
            <></>
          )}
          {this.handelStep(this.state.uploadStep)}
        </Modal>
      </>
    );
  }
  handelStep(step: number) {
    if (step == 0) {
      return (
        <div style={{ marginTop: '40px', marginBottom: '40px' }}>
          <SettingOutlined style={{ fontSize: 60, color: '#1890FF' }} />
          <p
            style={{ fontFamily: 'Roboto', margin: '12px', fontSize: '18px', marginBottom: '20px' }}
          >
            Select bookshelf you want to tracking
          </p>
          <div style={{ marginBottom: 15 }}>
            <Select
              showSearch
              style={{ width: 200 }}
              placeholder="Select a bookshelf"
              optionFilterProp="children"
              onChange={(value) => this.setState({ selectedBookShelf: value })}
              value={this.state.selectedBookShelf != -1 ? this.state.selectedBookShelf : undefined}
              //defaultValue={this.state.selectedBookShelf != -1 ? this.state.selectedBookShelf : }
              onSearch={(value) =>
                this.props.dispatch({
                  type: 'uploadvideo/loadBookShelf',
                  payload: value,
                })
              }
              filterOption={(input, option): any =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {this.props.uploadvideo.bookshelfData.map((bookshelf: any) => (
                <Option value={bookshelf.id}>{bookshelf.name}</Option>
              ))}
            </Select>
          </div>
          {this.state.selectedBookShelf != -1 ? (
            <Button type="primary" onClick={() => this.setState({ uploadStep: 1 })}>
              Next Step <DoubleRightOutlined />
            </Button>
          ) : (
            <></>
          )}
        </div>
      );
    } else if (step == 1) {
      return (
        <div style={{ position: 'relative' }}>
          <Dragger
            onChange={this.handleChange}
            fileList={this.state.fileList}
            multiple={false}
            beforeUpload={() => false}
            action="http://127.0.0.1:5000/upload"
            className={styles.dragSection}
            style={{ marginTop: 40 }}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined style={{ fontSize: 60, color: '#1890FF' }} />
            </p>
            <p style={{ fontFamily: 'Roboto', fontSize: 18 }} className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
          </Dragger>
          <Space style={{ justifyContent: 'space-between', width: '100%', marginTop: 30 }}>
            <Button type="dashed" onClick={() => this.setState({ uploadStep: 0 })}>
              <DoubleLeftOutlined />
              Back
            </Button>
            {this.state.fileList.length != 0 ? (
              <Button
                type="primary"
                style={{ transition: 'all 0.2s' }}
                onClick={() => {
                  this.handleUpload();
                  this.setState({ uploadStep: 2, isUpload: true });
                }}
              >
                Process <DoubleRightOutlined />
              </Button>
            ) : (
              <></>
            )}
          </Space>
        </div>
      );
    } else if (step == 2) {
      return (
        <>
          <div style={{ marginTop: '40px', marginBottom: '40px' }}>
            <BarcodeOutlined style={{ fontSize: 60, color: '#1890FF' }} />
            <p
              style={{
                fontFamily: 'Roboto',
                margin: '12px',
                fontSize: '18px',
                marginBottom: '20px',
              }}
            >
              {this.state.isUpload ? "Process detecting..." : "Process complete !"}
            </p>
            {this.state.isUpload ? <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} /> : <></>}
          </div>
         
        </>
      );
    } else {
      return <TrackingDetail record={this.state.selectedRecord} model={this.props.trackingdetail}/>;
    }
  }

  handleChange = (info: any) => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    this.setState({ fileList });
  };

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();

    formData.append('files', fileList[0].originFileObj);
    axios
      .post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log("yyyyyyyyyyyyyyyyyyyyy >>>>" , response);
        
       // this.uploadSuccess(response.data[0]);
      })
      .catch(function (error) {
        console.log("ERROR >>", error);
      });
      
  };

  async uploadSuccess(data: any) {
    
    var msgToServer: any = {
      staffId: this.props.user.currentUser.id,
      url: data.link,
      imageThumbnail: "string",
    }
    await fetchDrawer(this.state.selectedBookShelf)
    .then((values) => {

      var promises: any = [];
      values.forEach((drawer: any) => {
        promises.push(fetchBookInDrawer(drawer.id));
      });

      Promise.all(promises)
        .then((bookDrawers: any) => {
          for (let i = 0; i < values.length; i++) {
            var drawer = values[i];
            var bookInDrawer = bookDrawers[i];
            drawer.books = bookInDrawer.data;
          }
        })
        .finally(async () => {
          await values.forEach((drawer: any) => { // xác định vị trí cho những cuốn sai
            data.list_code.forEach((scanDrawer: any) => {
              //matching pair
              let tmp: any = [];
              let removeBarcode: any = [];
              if (drawer.drawerBarcode != undefined) {
                if (drawer.drawerBarcode.trim() == scanDrawer.drawler.trim()) {
                  drawer.books.map((orgBook: any) => {
                    scanDrawer.books.map((barcode: any) => {
                      console.log(barcode);
                      if (orgBook.barCode != undefined && orgBook.barCode.trim() == barcode.trim()) {
                        tmp.push(orgBook);
                        removeBarcode.push(barcode);
                      }
                    });
                  });
                  _.pullAll(drawer.books, tmp);
                  _.pullAll(scanDrawer.books, removeBarcode);
                  drawer.wrongPosition = scanDrawer.books;
                }
              }
            });
          });
          let removeDrawer: any = [];
          values.forEach((drawer: any) => {
            if((drawer.books.length == 0 && drawer.wrongPosition == undefined) || drawer.drawerBarcode == undefined){
              removeDrawer.push(drawer);
            }
          });
          _.pullAll(values, removeDrawer);
          console.log("REMOVE => ", values);
          
          // => xác định những cuốn sai
          var checkWrong = new Promise<void>((resolve, reject) => {
            
            values.forEach((drawer: any, index: number, array: any) => { //những cuốn bị còn lại trong list check
              var errorMsg: any = [];
              var promises: any = [];
              var promises2: any = [];
              var promises3: any = [];

              if(drawer.wrongPosition != undefined){ // những cuốn sách bị quét dư ra => bị sai vị trí
                if(drawer.wrongPosition.length != 0){
           
                  //phat hien sach sai vi tri va fetch data cho no
                  drawer.wrongPosition.forEach((barcode: any) => {
                    promises.push(checkingPosition(barcode));
                  });
                }
              }
              Promise.all(promises).then((listPosition: any) => {
                listPosition.forEach((position: any) => {
                  promises2.push(getRealPosition(position.data[0].id));
                });
              }).finally(() => {
                Promise.all(promises2).then((values: any) => {
                  values.forEach((realPosition: any) => {
                    let data = realPosition.data;
                    errorMsg.push({
                      errorMessage: `Book wrong position. Actual position is in BookShelf: ${data.bookShelfName}, Drawer ID: ${data.drawerId}`,
                      bookId: data.id,
                      isError: true
                    })
                  });
                }).finally(() => {
                  if(drawer.books != undefined){ //những cuốn sách bị quét thiếu => bị mất
                    if(drawer.books.length != 0){ 
               
                      drawer.books.forEach((book: any) => {
                        promises3.push(getRealPosition(book.id));
                      });
                      Promise.all(promises3).then((values: any) => {
                        values.forEach((book: any, index: number) => {
                          if(book.data.isAvailable == true){ // chưa được mượn
                            if(book.data.customerId == undefined){ // chưa từng đưọcw mượn
                              errorMsg.push({
                                errorMessage: `Sách mất, cuốn này chưa từng được ai mượn !`,
                                bookId: book.data.id,
                                isError: true
                              })
                            }else{ // lần cuối mượn và trả rồi
                              errorMsg.push({
                                errorMessage: `Sách mất. Lần cuối được mượn và trả rồi bởi ${book.data.customerName}`,
                                bookId: book.data.id,
                                isError: true
                              })
                            }
                          }else{ //được mượn
                            errorMsg.push({
                              errorMessage: `Sách mất. Sách chưa được trả bởi ${book.data.customerName}`,
                              bookId: book.data.id,
                              isError: true
                            })
                          }
                        });
                      }).then(() => Object.assign(drawer, {errorMsg: errorMsg})).finally(() => {
                        let drawerDetection: any = [];
                        values.forEach((drawer: any, index: number) => { 
                          var tmp: any = {
                            drawerId: drawer.id,
                            time: moment(),
                            detectionError: drawer.errorMsg
                          }
                          drawerDetection.push(tmp);
                        })
                        Object.assign(msgToServer, {drawerDetection: drawerDetection ? drawerDetection : []});
                        if(index == array.length -1){
                          resolve()
                        }
                      })
                    }
                  }
                })
              })
              
            })
          });


          checkWrong.finally(() => {
            console.log("FINAL MSG >>>>>>>>>", msgToServer);
            
            this.props.dispatch({
              type: 'uploadvideo/insertRecord',
              payload: msgToServer
            }).finally(() => {
              this.setState({isUpload: false})
              if(!this.props.uploadvideo.uploadModalVisible){
                this.changeNotification();
              }
              setTimeout(() => {
                this.props.dispatch({
                  type: 'uploadvideo/renderModel',
                  payload: false,
                });
                this.props.dispatch({
                  type: 'uploadrecordtable/fetchData'
                })
                this.setState({
                  uploadStep: 0,
                  fileList: [],
                  modalWidth: 600,
                  selectedBookShelf: -1,
                  selectedRecord: {}
                })
              }, 2000)
            })
          })
          
    
          
        });
    })
    
    

    // call api roi so sanh o day luon, xong mo popup len thoi
    // this.setState({ modalWidth: 1400, uploadStep: 3 });
  }

  trackingDetail(record: any){
    console.log(">>>>>>>>>>>>>", record);
    
    this.setState({selectedRecord: record, uploadStep: 3, modalWidth: 1400});
    this.props.dispatch({
      type: 'uploadvideo/renderModel',
      payload: true,
    });
    this.props.dispatch({
      type: 'trackingdetail/fetchData',
      payload: record.id
    })
  }

  openNotification() {
    const { dispatch } = this.props;

    notification.open({
      key: key,
      message: this.state.isUpload ? 'Processing' : "Process complete !",
      icon: this.state.isUpload ? <RedoOutlined style={{ color: '#108ee9' }} spin={true} /> : <CheckCircleOutlined style={{color: 'greenBright'}}/>,
      placement: 'bottomRight',
      duration: this.state.isUpload ? 0 : 2,
      closeIcon: <ArrowsAltOutlined style={{ fontSize: 20 }} />,
      onClose: () => {
        this.setState({isHidding: false})
        dispatch({
          type: 'uploadvideo/renderModel',
          payload: true,
        });
      },
    });
  }
  changeNotification(){
    notification.open({
      key: key,
      message: "Process complete !",
      icon: <CheckCircleOutlined style={{color: 'green'}}/>,
      placement: 'bottomRight',
      duration: 2,
      closeIcon: <ArrowsAltOutlined style={{ fontSize: 20 }} />,
      onClose: () => {
        // dispatch({
        //   type: 'uploadvideo/renderModel',
        //   payload: true,
        // });
      },
    });
  }

}
export default connect((state) => ({ ...state }))(UploadVideo);
