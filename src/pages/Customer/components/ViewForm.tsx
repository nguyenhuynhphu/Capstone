import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../CustomerPage.less';

interface ViewFormProps {
  dispatch: Dispatch;
  customerpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { customerpage } = this.props;
    const { choiceCustomer } = customerpage;
    const titleSpace = 7;
    const fieldSpace = 17;
    return (
      <div>
        <Row align={'middle'} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={4} style={{ marginTop: 6 }}>
              Customer Detail
            </Title>
          </Col>
        </Row>
        <Divider />
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Name:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceCustomer.name}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Gender:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceCustomer.gender}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Date Of Birth:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceCustomer.doB}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Phone:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceCustomer.phone}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Address:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceCustomer.address}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Mail:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceCustomer.email}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
