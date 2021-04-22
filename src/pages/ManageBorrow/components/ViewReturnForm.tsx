import { BookOutlined, EuroCircleOutlined, EuroOutlined, UserOutlined } from '@ant-design/icons';
import { Badge, Descriptions, Image, List, Space, Tooltip, Typography } from 'antd';
import React from 'react';
import { connect, Dispatch } from 'umi';
const { Text } = Typography;

interface ViewReturnFormProps {
  dispatch: Dispatch;
  manageborrowpage?: any;
}
class ViewReturnForm extends React.Component<ViewReturnFormProps> {
  constructor(props: any) {
    super(props);
  }
  render() {
    const { manageborrowpage } = this.props;
    const { choiceReturn } = manageborrowpage;
    console.log('choiceReturn', choiceReturn);

    return (
      <div>
        <Descriptions column={2} bordered>
          <Descriptions.Item label="Patron Name"> {choiceReturn.patronName}</Descriptions.Item>
          <Descriptions.Item label="User Name"> {choiceReturn.username}</Descriptions.Item>
          <Descriptions.Item label="Return Time">
            <Space>
              <p style={{ marginBottom: 0 }}>{choiceReturn.returnTime?.split('T')[0]}</p>
              <Badge status="processing" title="Valid" />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Quantity">
            <Space>
              <p style={{ marginBottom: 0 }}>{choiceReturn.quantity}</p>
              <BookOutlined style={{ color: '#3FA8FF' }} />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Librarian">
            <Space>
              <p style={{ marginBottom: 0 }}>{choiceReturn.staffName}</p>
              <UserOutlined style={{ color: '#3FA8FF' }} />
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="Total Fee">
            <Space>
              <p style={{ marginBottom: 0 }}> {choiceReturn.fee}</p>
              <EuroOutlined style={{ color: '#EEBB33' }} />
            </Space>
          </Descriptions.Item>
        </Descriptions>
        <div style={{ marginTop: 15 }}>
          <List
            grid={{ gutter: 20, column: 2 }}
            dataSource={choiceReturn.borrowDetail}
            renderItem={(item: any) => (
              <List.Item>
                <Space style={{ width: '100%' }}>
                  <Image width={50} height={77} src={item.image != undefined ? item.image : null} />
                  <Space direction="vertical">
                    <Space direction="horizontal">
                      <Tooltip title={item.bookName}>
                        <Text style={{ maxWidth: 150, fontWeight: 500 }} ellipsis={true}>
                          {item.bookName}
                        </Text>
                      </Tooltip>
                      <span>-</span>
                      <Tooltip title={item.author}>
                        <Text style={{ maxWidth: 100 }} ellipsis={true}>
                          {item.author}
                        </Text>
                      </Tooltip>
                    </Space>
                    <Space direction="horizontal">
                      <p style={{ marginBottom: 0}}> BookID: {item.bookId}</p>

                      <p
                        style={{
                          marginBottom: 0,
                          color: ' rgba(0, 0, 0, .5)',
                          fontStyle: 'italic',
                        }}
                      >
                        #{item.barcode}
                      </p>
                    </Space>
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
                </Space>
              </List.Item>
            )}
          />
        </div>
      </div>
    );
  }
}

export default connect((state) => ({ ...state }))(ViewReturnForm);