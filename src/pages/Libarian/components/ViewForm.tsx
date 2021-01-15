import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Row, Space, Typography } from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../LibarianPage.less';

interface ViewFormProps {
  dispatch: Dispatch;
  libarianpage?: any;
}
class ViewForm extends React.Component<ViewFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { libarianpage } = this.props;
    const { choiceLibarian } = libarianpage;
    const titleSpace = 7;
    const fieldSpace = 17;
    return (
      <div>
        <Row align={'middle'} style={{ marginBottom: 20 }}>
          <Col span={12}>
            <Title level={4} style={{ marginTop: 6 }}>
              Libarian Detail
            </Title>
          </Col>
          <Col span={12} style={{ textAlign: 'right' }}>
            <Space>
              <Button
                onClick={() =>
                  this.props.dispatch({
                    type: 'libarianpage/showEditLibarian',
                    payload: {},
                  })
                }
                icon={<EditOutlined style={{ color: '#0078d4' }} />}
              >
                Edit
              </Button>
              <Button icon={<DeleteOutlined style={{ color: 'red' }} />}>Delete</Button>
            </Space>
          </Col>
        </Row>
        <Divider />
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Name:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.name}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Gender:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.gender}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Date Of Birth:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.doB}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Phone:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.phone}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Address:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.address}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            User Name:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.username}
          </Col>
        </Row>
        <Row className={styles.viewFormRow}>
          <Col span={titleSpace} className={styles.viewFormTitle}>
            Mail:
          </Col>
          <Col span={fieldSpace} className={styles.viewFormField}>
            {choiceLibarian.email}
          </Col>
        </Row>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
