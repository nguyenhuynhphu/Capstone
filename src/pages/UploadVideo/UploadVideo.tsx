import React from 'react';

import { connect, Dispatch, Prompt } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import { Space, Row, Col, Button, Modal, Steps, Spin, notification } from 'antd';
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
} from '@ant-design/icons';
import styles from './UploadVideo.less';
import Select from 'antd/es/select';
import Dragger from 'antd/lib/upload/Dragger';
import axios from 'axios';
import TrackingDetail from './components/TrackingDetail';
import {
  checkingPosition,
  fetchBookInDrawer,
  fetchDrawer,
  getRealPosition,
} from '@/services/upload';
import _ from 'lodash';
import moment from 'moment';
import UploadRecordTable from './components/UploadRecordTable';
import TableHeader from '@/components/CustomDesign/TableHeader';
const { Step } = Steps;
const { Option } = Select;
interface UploadVideoProps {
  dispatch: Dispatch;
  uploadvideo?: any;
  user?: any;
  trackingdetail?: any;
  uploadrecordtable?: any;
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
          'A000202',
          'A000101',
          'D050308',
          'M032611',
          'H562417',
          'R208010',
          'J620311',
          'U238417',
          'A150208',
          'K140611',
          'KS203099',
          'K241209',
          'A008513',
          'O789428',
          'R308011',
        ],
        drawer: 'KS200099',
      },
      {
        books: ['H071210', 'A001102', 'KS201099', 'Z999936', 'A001506', 'K678930', 'A130913'],
        drawer: 'KS201099',
      },
      {
        books: ['A000202', 'KS203099', 'J620311', 'D050308'],
        drawer: 'KS203099',
      },
    ],
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
        <Prompt
          when={this.state.isUpload}
          message="Detecting is in process, leave will cancel process. Are you sure ?"
        />
        <Row>
          <Col span={12}>
            <Row
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '20px 25px',
                marginTop: 15,
              }}
            >
              <Col span={24}>
                <Space style={{ width: '100%', justifyContent: 'space-between', marginBottom: 10 }}>
                  <TableHeader title="List Detection" description="All dectection in system" />
                  <Button
                    type={'primary'}
                    onClick={() => {
                      if (this.state.isUpload && this.state.isHidding) {
                        notification.close(key);
                      }
                      this.props.dispatch({
                        type: 'uploadvideo/renderModel',
                        payload: true,
                      });
                    }}
                  >
                    Upload Video
                  </Button>
                </Space>

                <UploadRecordTable trackingDetail={this.trackingDetail} />
              </Col>
            </Row>
          </Col>
          <Col span={12}></Col>
        </Row>

        <Modal
          className={styles.uploadModal}
          visible={uploadvideo.uploadModalVisible}
          bodyStyle={{ textAlign: 'center', padding: '55px 40px 0 40px' }}
          width={this.state.modalWidth}
          centered
          closeIcon={
            this.state.isUpload ? <ShrinkOutlined style={{ fontSize: 18 }} /> : <CloseOutlined />
          }
          onOk={() => {}}
          footer={() => <Button>Process Detect</Button>}
          onCancel={() => {
            if (!this.state.isUpload) {
              this.setState({ uploadStep: 0, modalWidth: 600 });
            } else {
              this.setState({ isHidding: true });
              this.openNotification();
            }
            this.props.dispatch({
              type: 'uploadvideo/renderModel',
              payload: false,
            });
            this.props.dispatch({
              type: 'uploadvideo/resetState',
              payload: false,
            });
            this.resetTracking()
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
              {this.state.isUpload ? 'Process detecting...' : 'Process complete !'}
            </p>
            {this.state.isUpload ? (
              <Spin indicator={<LoadingOutlined style={{ fontSize: 40 }} spin />} />
            ) : (
              <></>
            )}
          </div>
        </>
      );
    } else {
      return (
        <TrackingDetail record={this.state.selectedRecord} model={this.props.trackingdetail} />
      );
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
    // this.uploadSuccess2(responseDetect[0]);
    axios
      .post('http://127.0.0.1:5000/upload', formData, {
        headers: {
          'content-type': 'multipart/form-data',
        },
      })
      .then((response) => {
        this.uploadSuccess2(response.data[0]);
      })
      .catch(function (error) {
        console.log('ERROR >>', error);
      });
  };

  async uploadSuccess2(data: any) {
    const { dispatch, uploadrecordtable } = this.props;
    var msgToServer: any = {
      staffId: this.props.user.currentUser.id,
      url: data.link,
      bookShelfId: this.state.selectedBookShelf,
      time: moment(),
      thumbnail: 'string',
    };

    var drawerInSystem = await fetchDrawer(this.state.selectedBookShelf);

    var found: any = [];
    var notFound: any = [];
    data.list_code.forEach((scanDrawer: any) => {
      drawerInSystem.forEach((drawerInSystem: any) => {
        if (drawerInSystem.barcode != undefined) {
          if (scanDrawer.drawer.trim() == drawerInSystem.barcode.trim()) {
            found.push(drawerInSystem);
          } else {
            notFound.push(drawerInSystem);
          }
        }
      });
    });
    console.log('FOUND >>>>', found);

    if (found.length != 0) {
      var promises: any = [];
      found.forEach((drawer: any) => {
        promises.push(fetchBookInDrawer(drawer.id));
      });

      var bookInDrawer: any = await Promise.all(promises);

      for (let i = 0; i < found.length; i++) {
        var drawer = found[i];
        drawer.books = bookInDrawer[i].data;
      }

      found.forEach((drawer: any) => {
        // xác định vị trí cho những cuốn sai
        data.list_code.forEach((scanDrawer: any) => {
          //matching pair
          let tmp: any = [];
          let removeBarcode: any = [];
          if (drawer.barcode != undefined) {
            if (drawer.barcode.trim() == scanDrawer.drawer.trim()) {
              drawer.books.map((orgBook: any) => {
                scanDrawer.books.map((barcode: any) => {
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

      //xu ly sach sai vi tri
      var drawerDetection: any = [];
      var checkWrong = new Promise<void>((resolve, reject) => {
        found.forEach(async (drawer: any, index: number, array: any) => {
          var errorMsg: any = [];
          var undefinedError: any = [];
          promises = [];
          if (drawer.wrongPosition != undefined) {
            drawer.wrongPosition.forEach((book: any) => {
              promises.push(checkingPosition(book));
            });
          }
          var realPositions = await Promise.all(promises); // xu ly sach nam sai truoc

          realPositions.forEach((position: any, index: number) => {
            if (position.data.length != 0) {
              errorMsg.push({
                errorMessage: `Sách nằm sai vị trí, bị trí thực sự ở: Bookshelf: ${position.data[0].bookShelfName} Drawer: ${position.data[0].drawerId} !`,
                bookId: position.data[0].id,
                typeError: 2,
              });
            } else {
              undefinedError.push({
                errorMessage: `Phát hiện barcode lạ: "${drawer.wrongPosition[index]}"`,
                typeError: 1,
              });
            }
          });

          //xu ly sach mat
          promises = [];
          if (drawer.books.length != 0) {
            drawer.books.forEach((book: any) => {
              promises.push(getRealPosition(book.id));
            });
          }
          Promise.all(promises).then((detectLocation: any) => {
            detectLocation.forEach((book: any, index: number) => {
              if (book.data.isAvailable == true) {
                // chưa được mượn
                if (book.data.customerId == undefined) {
                  // chưa từng đưọcw mượn
                  errorMsg.push({
                    errorMessage: `Sách mất, cuốn này chưa từng được ai mượn !`,
                    bookId: book.data.id,
                    typeError: 3,
                  });
                } else {
                  // lần cuối mượn và trả rồi
                  errorMsg.push({
                    errorMessage: `Sách mất. Lần cuối được mượn và trả rồi bởi ${book.data.customerName}`,
                    bookId: book.data.id,
                    typeError: 4,
                  });
                }
              } else {
                //được mượn
                errorMsg.push({
                  errorMessage: `Sách mất. Sách chưa được trả bởi ${book.data.customerName}`,
                  bookId: book.data.id,
                  isError: 5,
                });
              }
            });

            drawerDetection.push({
              drawerId: drawer.id,
              detectionError: errorMsg,
              undefinedError: undefinedError,
            });
            if (index == array.length - 1) {
              resolve();
            }
          });
        });
      });
      checkWrong.finally(() => {
        Object.assign(msgToServer, {
          drawerDetection: drawerDetection ? drawerDetection : [],
        });

        dispatch({
          type: 'uploadvideo/insertRecord',
          payload: msgToServer,
        }).finally(() => {
          this.setState({ isUpload: false });
          if (!this.props.uploadvideo.uploadModalVisible) {
            this.changeNotification();
          }
          setTimeout(() => {
            dispatch({
              type: 'uploadvideo/renderModel',
              payload: false,
            });
            dispatch({
              type: 'uploadvideo/resetState',
              payload: false,
            });
            this.resetTracking()
            dispatch({
              type: 'uploadrecordtable/fetchData',
              payload: {
                filterName: uploadrecordtable.filterName,
                pagination: uploadrecordtable.pagination.current,
              },
            }),
              this.setState({
                uploadStep: 0,
                fileList: [],
                modalWidth: 600,
                selectedBookShelf: -1,
                selectedRecord: {},
              });
          }, 2000);
        });
      });
    } else {
      dispatch({
        type: 'uploadvideo/insertRecord',
        payload: msgToServer,
      }).finally(() => {
        this.setState({ isUpload: false });
        if (!this.props.uploadvideo.uploadModalVisible) {
          this.changeNotification();
        }
        setTimeout(() => {
          dispatch({
            type: 'uploadvideo/renderModel',
            payload: false,
          });
          dispatch({
            type: 'uploadvideo/resetState',
            payload: false,
            
          });
          this.resetTracking()
          dispatch({
            type: 'uploadrecordtable/fetchData',
            payload: {
              filterName: uploadrecordtable.filterName,
              pagination: uploadrecordtable.pagination.current,
            },
          });

          this.setState({
            uploadStep: 0,
            fileList: [],
            modalWidth: 600,
            selectedBookShelf: -1,
            selectedRecord: {},
          });
        }, 2000);
      });
    }
  }

  trackingDetail(record: any) {
    this.setState({ selectedRecord: record, uploadStep: 3, modalWidth: 1400 });
    this.props.dispatch({
      type: 'uploadvideo/renderModel',
      payload: true,
    });
    this.props.dispatch({
      type: 'trackingdetail/fetchData',
      payload: record.id,
    });
  }

  openNotification() {
    const { dispatch } = this.props;

    notification.open({
      key: key,
      message: this.state.isUpload ? 'Processing' : 'Process complete !',
      icon: this.state.isUpload ? (
        <RedoOutlined style={{ color: '#108ee9' }} spin={true} />
      ) : (
        <CheckCircleOutlined style={{ color: 'greenBright' }} />
      ),
      placement: 'bottomRight',
      duration: this.state.isUpload ? 0 : 2,
      closeIcon: <ArrowsAltOutlined style={{ fontSize: 20 }} />,
      onClose: () => {
        this.setState({ isHidding: false });
        dispatch({
          type: 'uploadvideo/renderModel',
          payload: true,
        });
      },
    });
  }
  changeNotification() {
    notification.open({
      key: key,
      message: 'Process complete !',
      icon: <CheckCircleOutlined style={{ color: 'green' }} />,
      placement: 'bottomRight',
      duration: 2,
      closeIcon: <ArrowsAltOutlined style={{ fontSize: 20 }} />,
      onClose: () => {
       
      },
    });
  }
  resetTracking(){
    this.props.dispatch({
      type: 'trackingdetail/resetState'
    })
  }
}
export default connect((state) => ({ ...state }))(UploadVideo);
