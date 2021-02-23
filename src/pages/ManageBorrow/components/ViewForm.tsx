import { Button, Col, Divider, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../ManageBorrowPage.less';

interface ViewFormProps {
  dispatch: Dispatch;
  manageborrowpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { manageborrowpage } = this.props;
    const { choiceBorrow } = manageborrowpage;
    const titleSpace = 7;
    const fieldSpace = 17;
    return (
      <div>
        <Row align={'middle'} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={4} style={{ marginTop: 6 }}>
              Borrow Detail
            </Title>
          </Col>
        </Row>
        <Divider />
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Customer Name:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceBorrow.customerName}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Start Time:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceBorrow.startTime}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            End Time:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceBorrow.endTime}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Quantity:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceBorrow.quantity}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Total Fee:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceBorrow.total}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
