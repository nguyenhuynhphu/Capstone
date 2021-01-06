import { Button, Col, Row, Select, Space } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import React from 'react';
const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
const ViewForm = (props: any) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Name" content="[Book Group Name]" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Row" content="[Author Name]" />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DescriptionItem title="Column" content="[Author Name]" />
            </Col>
          </Row>
          <Row>
            <Col span={10}>
              <DescriptionItem title="Location" content="99999" />
            </Col>
            <Col span={12}></Col>
          </Row>
          <Row>
            <Col span={24}>
              <Space style={{textAlign: 'right'}}>
                  <Button
                    onClick={() => props.onEdit()}
                    icon={<EditOutlined style={{ color: '#0078d4' }} />}
                  >
                    Edit
                  </Button>
                  <Button
            
                    onClick={() => {}}
                    icon={<DeleteOutlined style={{ color: 'red' }} />}
                  >
                    Delete
                  </Button>
                </Space>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ViewForm;
