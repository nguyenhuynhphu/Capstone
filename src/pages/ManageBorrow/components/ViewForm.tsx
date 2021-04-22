import { BookOutlined, EuroCircleOutlined, EuroOutlined } from '@ant-design/icons';
import { Badge, Button, Descriptions, Image, List, Space } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
import { history } from 'umi';

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

    return (
      <div>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="Patron Name"> {choiceBorrow.patronName}</Descriptions.Item>
          <Descriptions.Item label="Start Time">
            {choiceBorrow.startTime?.split('T')[0]}
          </Descriptions.Item>
          <Descriptions.Item label="Return Time">
            <Space>
              <p style={{ marginBottom: 0 }}>{choiceBorrow.endTime?.split('T')[0]}</p>
              <Badge status="processing" title="Valid" />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            <Space>
              <p style={{ marginBottom: 0 }}>{choiceBorrow.quantity}</p>
              <BookOutlined style={{ color: '#3FA8FF' }} />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Total Fee">
            <Space>
              <p style={{ marginBottom: 0 }}> {choiceBorrow.total}</p>
              <EuroOutlined style={{ color: '#EEBB33' }} />
            </Space>
          </Descriptions.Item>
        </Descriptions>
        <div>
          <List
            itemLayout="horizontal"
            dataSource={choiceBorrow.borrowDetail}
            renderItem={(item: any) => (
              <List.Item>
                <Space style={{ width: '100%' }}>
                  <Image width={50} height={77} src={item.image != undefined ? item.image : null} />
                  <Space direction="vertical">
                    <p style={{ marginBottom: 0 }}>{item.bookName}</p>
                    <Space direction="horizontal">
                      <p style={{ marginBottom: 0 }}>
                        Fee: {item.fee}{' '}
                        <EuroCircleOutlined style={{ color: 'rgb(238, 187, 51)' }} />
                      </p>
                      <p style={{ marginBottom: 0, marginLeft: 25 }}>
                        Punish Fee: {item.punishFee}{' '}
                        <EuroCircleOutlined style={{ color: '#FF4D4F' }} />
                      </p>
                    </Space>
                  </Space>
                  <Button
                    type="link"
                    onClick={() => {
                      history.push(`/book/manage-book`, {
                        bookGroupId: item.bookGroupId,
                        filterBook: item.bookId
                      });
                    }}
                  >
                    Book Detail
                  </Button>
                </Space>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewForm);
