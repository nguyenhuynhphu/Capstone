import { Dispatch } from '@/.umi/plugin-dva/connect';
import sendNotification from '@/utils/Notification';
import {
  CheckCircleOutlined,
  CheckOutlined,
  CloseOutlined,
  ExclamationCircleOutlined,
  MoreOutlined,
  QuestionCircleOutlined,
  RadiusUpleftOutlined,
  StopOutlined,
  WarningOutlined,
} from '@ant-design/icons';
import { Alert, Button, Col, Popover, Row, Space, Table } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

interface BookTrackingItemProps {
  dispatch: Dispatch;
  record: any;
  trackingdetail?: any;
  user?: any;
}

class BookTrackingItem extends React.Component<BookTrackingItemProps> {
  constructor(props: any) {
    super(props);
    this.handelConfirm = this.handelConfirm.bind(this);
    this.handelReject = this.handelReject.bind(this);
  }

  render() {
    return (
      <>
        <Row
          style={{
            fontFamily: 'roboto',
            borderBottom: '1px solid rgba(0, 0, 0, .2)',
            marginBottom: 10,
            paddingBottom: 10,
          }}
        >
          <Col span={20}>
            <Space direction="vertical" style={{ alignItems: 'start', width: '100%' }}>
              {this.props.record.bookId != undefined ? (
                <>
                  <p style={{ fontWeight: 500, marginBottom: 0, fontSize: 16 }}>
                    {this.props.record.bookName}
                  </p>
                  <Space direction="horizontal">
                    <p style={{ marginBottom: 0 }}>#{this.props.record.bookBarcode}</p>
                    <p style={{ marginBottom: 0 }}>ID: {this.props.record.bookId}</p>
                  </Space>
                  <Alert message={this.props.record.errorMessage} type="warning" />
                </>
              ) : (
                <Alert message={this.props.record.errorMessage} type="error" />
              )}
              {this.props.user.currentUser.roleId != 1 ? this.handelAlert() : <></>}
            </Space>
          </Col>
          <Col span={2} offset={2}>
            <Space style={{ height: '100%' }}>{this.handelIcon(this.props.record.typeError)}</Space>
          </Col>
        </Row>
      </>
    );
  }

  handelConfirm() {
    const { record, dispatch } = this.props;
    record.isConfirm = true;
    record.isRejected = false;
    if (record.bookId != undefined) {
      dispatch({ type: 'trackingdetail/updateError', payload: record });
    } else {
      dispatch({ type: 'trackingdetail/updateErrorUndefined', payload: record });
    }
    sendNotification("Confirm error success !", "", "success")
  }
  handelReject() {
    const { record, dispatch } = this.props;
    record.isConfirm = false;
    record.isRejected = true;
    if (record.bookId != undefined) {
      dispatch({ type: 'trackingdetail/updateError', payload: record });
    } else {
      dispatch({ type: 'trackingdetail/updateErrorUndefined', payload: record });
    }
    sendNotification("Reject error success !", "", "success")
  }

  handelIcon(typeError: any) {
    if (typeError == 1) {
      // barcode lạ
      return <QuestionCircleOutlined style={{ color: '#F7C700', fontSize: 24 }} />;
    } else if (typeError == 2) {
      //sách nằm sai vị trí
      return <RadiusUpleftOutlined style={{ color: 'black', fontSize: 24 }} />;
    } else if (typeError == 3) {
      //sách mất chưa từng được ai mượn
      return <StopOutlined style={{ color: 'red', fontSize: 24 }} />;
    } else if (typeError == 4) {
      //sách mất lần cuối được người này mượn
      return <WarningOutlined style={{ color: 'red', fontSize: 24 }} />;
    } else if (typeError == 5) {
      //sách mất mượn và trả rồi
      return <ExclamationCircleOutlined style={{ color: 'green', fontSize: 24 }} />;
    }
  }
  handelAlert() {
    if (!this.props.record.isConfirm && !this.props.record.isRejected) {
      return (
        <Space direction="horizontal" style={{ width: '100%', justifyContent: 'end' }}>
          <Button
            onClick={this.handelReject}
            style={{ width: 100 }}
            danger
            icon={<CloseOutlined />}
          >
            Reject
          </Button>
          <Button
            onClick={this.handelConfirm}
            style={{ width: 100 }}
            icon={<CheckOutlined />}
            type="primary"
          >
            Confirm
          </Button>
        </Space>
      );
    } else if (this.props.record.isConfirm && !this.props.record.isRejected) {
      return <Alert type="success" showIcon message="Confirmed !" />;
    } else if (!this.props.record.isConfirm && this.props.record.isRejected) {
      return <Alert type="error" showIcon message="Reject !" />;
    }
  }
}
export default connect((state) => ({ ...state }))(BookTrackingItem);
