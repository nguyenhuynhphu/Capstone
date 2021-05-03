import React from 'react';

import { connect, Dispatch, Prompt } from 'umi';
import { PageHeaderWrapper } from '@ant-design/pro-layout';

import {
  Space,
  Row,
  Col,
  Button,
  Modal,
  Steps,
  Spin,
  notification,
  DatePicker,
  message,
} from 'antd';
import {
  ArrowsAltOutlined,
  BarcodeOutlined,
  CheckCircleOutlined,
  CloseOutlined,
  DoubleLeftOutlined,
  DoubleRightOutlined,
  FilterOutlined,
  InboxOutlined,
  LoadingOutlined,
  RedoOutlined,
  SettingOutlined,
  ShrinkOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import styles from './UploadVideo.less';
import Select from 'antd/es/select';
import Dragger from 'antd/lib/upload/Dragger';
import axios from 'axios';
import TrackingDetail from './components/TrackingDetail';
import _ from 'lodash';
import moment from 'moment';
import UploadRecordTable from './components/UploadRecordTable';
import TableHeader from '@/components/CustomDesign/TableHeader';
import PeriorChart from './components/PeriorChart';
import NewDetect from './components/NewDetect';
import ManageDetectStatistic from './components/ManageDetectStatistic';
const { RangePicker } = DatePicker;

const { Step } = Steps;
const { Option } = Select;
interface UploadVideoProps {
  dispatch: Dispatch;
  uploadvideo?: any;
  user?: any;
  trackingdetail?: any;
  uploadrecordtable?: any;
  newdetect?: any;
  managedetectstatistic?: any;
  location?: any;
}
interface UploadVideoState {
  uploadStep: number;
  fileList: any;
  modalWidth: number;
  selectedBookShelf: number;
  selectedRecord: any;
  isUpload: boolean;
  isHidding: boolean;
  filterRecord: any;
}

const responseDetect = [
  {
    link:
      'https://papv.blob.core.windows.net/videos/DJI_0502_1618185243.mp4?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-31T21%3A36%3A09Z&st=2021-04-10T13%3A36%3A09Z&spr=https&sig=te5dpk%2FASSegm2WRSVxQZEHX7HIB92MRFuPbv7E70Pg%3D',
    list_code: [
      {
        books: [
          'A003811',
          'A002103',
          'A003003',
          'A003508',
          'A003407',
          'A003710',
          'sadasdasdasd',
          'A001708',
          'A002810',
          'A002709',
        ],
        drawer: 'KS001800',
      },
      {
        books: [
          'A002911',
          'A002608',
          'A003104',
          'A003912',
          'A004004',
          'A003609',
          'A001910',
          'A001405',
          'A002406',
          'A004206',
          'A004509',
        ],
        drawer: 'KS001300',
      },
      {
        books: [
          'A003205',
          'A003306',
          'A002002',
          'A002507',
          'A004812',
          'A002305',
          'A002204',
          'A001607',
          'A004307',
          'A001304',
        ],
        drawer: 'KS000700',
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
      filterRecord: [],
    };
    this.openNotification = this.openNotification.bind(this);
    this.trackingDetail = this.trackingDetail.bind(this);
  }

  componentDidMount() {
    this.refreshPage();
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
        <Row
          style={{
            height: 300,
            backgroundColor: 'white',
            borderRadius: '15px',
            padding: '20px 25px',
            marginTop: 15,
          }}
        >
          <Col span={24} style={{ width: '100%', height: '100%' }}>
            <TableHeader title="Schedule Scanning" description="Schedule scanning in year" />
            <PeriorChart />
          </Col>
        </Row>
        <Row>
          <Col style={{ width: 'calc(45% - 15px)' }}>
            <Row
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '20px 25px',
                width: '100%',
                height: 280,
                marginTop: 15,
              }}
            >
              <Col span={24}>
                {this.props.newdetect.isLoading ? (
                  <Space
                    direction="vertical"
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <p style={{ marginBottom: 4 }}>Loading</p>
                    <Spin spinning />
                  </Space>
                ) : (
                  <NewDetect trackingDetail={this.trackingDetail} />
                )}
              </Col>
            </Row>
            <Row
              style={{
                backgroundColor: 'white',
                borderRadius: '15px',
                padding: '20px 25px',
                width: '100%',
                height: 330,
                marginTop: 15,
              }}
            >
              <Col span={24}>
                {this.props.managedetectstatistic.isLoading ? (
                  <Space
                    direction="vertical"
                    style={{
                      alignItems: 'center',
                      width: '100%',
                      height: '100%',
                      justifyContent: 'center',
                    }}
                  >
                    <p style={{ marginBottom: 4 }}>Loading</p>
                    <Spin spinning />
                  </Space>
                ) : (
                  <ManageDetectStatistic />
                )}
              </Col>
            </Row>
          </Col>
          <Col style={{ width: '55%', marginLeft: 15 }}>
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
                  <Space direction="vertical" style={{ alignItems: 'flex-end' }}>
                    {this.props.user.currentUser.roleId != 1 ? (
                      <Button
                        type={'primary'}
                        icon={<UploadOutlined />}
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
                    ) : (
                      <></>
                    )}

                    <Space direction="horizontal">
                      <RangePicker onChange={(value) => this.setState({ filterRecord: value })} />
                      <Button
                        onClick={() => {
                          if (this.state.filterRecord) {
                            if (this.state.filterRecord[0] && this.state.filterRecord[1])
                              this.props.dispatch({
                                type: 'uploadrecordtable/fetchData',
                                payload: {
                                  pagination: this.props.uploadrecordtable.pagination.current,
                                  filterRecord: this.state.filterRecord,
                                },
                              });
                          }
                        }}
                        icon={<FilterOutlined />}
                        type="primary"
                      >
                        Filter
                      </Button>
                    </Space>
                  </Space>
                </Space>

                <UploadRecordTable trackingDetail={this.trackingDetail} />
              </Col>
            </Row>
          </Col>
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
            this.resetTracking();
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
                option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
      return <TrackingDetail record={this.state.selectedRecord} />;
    }
  }

  handleChange = (info: any) => {
    let fileList = [...info.fileList];
    let error = false;
    fileList = fileList.slice(-1);
    fileList = fileList.map((file) => {
      if (file.type === 'video/mp4') {
        if (file.response) {
          file.url = file.response.url;
        }
        return file;
      } else {
        error = true;
      }
    });
    if (error) {
      message.error(`File upload is not a video file`);
      fileList = [];
    }
    console.log('fileList', fileList);

    this.setState({ fileList });
  };

  refreshPage() {
    const { dispatch, uploadrecordtable } = this.props;
    dispatch({
      type: 'uploadvideo/loadBookShelf',
      payload: '',
    });
    dispatch({
      type: 'periorchart/fetchData',
    });
    dispatch({
      type: 'managedetectstatistic/fetchData',
    });
    dispatch({
      type: 'newdetect/fetchData',
    });
    dispatch({
      type: 'uploadvideo/renderModel',
      payload: false,
    });
    dispatch({
      type: 'uploadvideo/resetState',
      payload: false,
    });
    dispatch({
      type: 'uploadrecordtable/fetchData',
      payload: {
        filterName: uploadrecordtable.filterName,
        pagination: uploadrecordtable.pagination.current,
      },
    });
  }

  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();

    formData.append('files', fileList[0].originFileObj);
    var videoCu = {
      link:
        'https://papv.blob.core.windows.net/videos/DJI_0502_1618185243.mp4?sv=2020-02-10&ss=bfqt&srt=sco&sp=rwdlacupx&se=2021-05-31T21%3A36%3A09Z&st=2021-04-10T13%3A36%3A09Z&spr=https&sig=te5dpk%2FASSegm2WRSVxQZEHX7HIB92MRFuPbv7E70Pg%3D',
      list_code: [
        {
          drawer: 'KS002500',
          books: [
            'A002103',
            'A002406',
            'A003205',
            'A003306',
            'A003003',
            'A002810',
            'A001607',
            'A002002',
          ],
        },
        {
          drawer: 'KS002600',
          books: [
            'A000404',
            'A004307',
            'A001910',
            'A002204',
            'A004509',
            'A002911',
            'A002608',
            'A001304',
            'A001708',
            'A003912',
            'A004004',
            'A004206',
            'A002709',
          ],
        },
        {
          drawer: 'KS002700',
          books: [
            'A002507',
            'A003104',
            'A003811',
            'A002305',
           
            'A003710',
            'A004812',
            'A003609',
            'ádasdasdasd'
          ],
        },
      ],
    };
    this.uploadSuccess(videoCu);
    // axios
    //   .post('http://127.0.0.1:5000/upload', formData, {
    //     headers: {
    //       'content-type': 'multipart/form-data',
    //     },
    //   })
    //   .then((response) => {
    //     console.log(response);

    //     this.uploadSuccess(response.data[0]);
    //   })
    //   .catch(function (error) {
    //     console.log('ERROR >>', error);
    //   });
  };

  async uploadSuccess(data: any) {
    const { dispatch } = this.props;
    var msgToServer: any = {
      staffId: this.props.user.currentUser.id,
      url: data.link,
      bookShelfId: this.state.selectedBookShelf,
      time: moment(),
      thumbnail: 'string',
    };
    dispatch({
      type: 'uploadvideo/insertRecord',
      payload: {
        msgToServer: msgToServer,
        data: data,
        selectedBookShelf: this.state.selectedBookShelf,
      },
    }).finally(() => {
      this.setState({ isUpload: false });
      if (!this.props.uploadvideo.uploadModalVisible) {
        this.changeNotification();
      }
      setTimeout(() => {
        this.refreshPage();
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
      onClose: () => {},
    });
  }
  resetTracking() {
    this.props.dispatch({
      type: 'trackingdetail/resetState',
    });
  }
}
export default connect((state) => ({ ...state }))(UploadVideo);
