import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Row,
  Select,
  Transfer,
  TreeSelect,
  Upload,
} from 'antd';
import Title from 'antd/lib/typography/Title';
import React from 'react';

interface InputCampaignFormState {
  loading: boolean;
  imageUrl: any;
  mockData: any;
  targetKeys: any;
}
class InputCampaignForm extends React.Component<{}, InputCampaignFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: null,

      mockData: [],
      targetKeys: [],
    };
  }
  getBase64(img: Blob, callback: (arg0: string | ArrayBuffer | null) => any) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChange = (info: { file: { status: string; originFileObj: any } }) => {
    if (info.file.status === 'uploading') {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === 'done') {
      // Get this url from response in real world.
      this.getBase64(info.file.originFileObj, (imageUrl: any) =>
        this.setState({
          imageUrl,
          loading: false,

          mockData: [],
          targetKeys: [],
        }),
      );
    }
  };
  getMock = () => {
    const targetKeys = [];
    const mockData = [];
    for (let i = 0; i < 20; i++) {
      const data = {
        key: i.toString(),
        title: `content${i + 1}`,
        description: `description of content${i + 1}`,
        chosen: Math.random() * 2 > 1,
      };
      if (data.chosen) {
        targetKeys.push(data.key);
      }
      mockData.push(data);
    }
    this.setState({ mockData, targetKeys });
  };

  filterOption = (inputValue: any, option: { description: string | any[] }) =>
    option.description.indexOf(inputValue) > -1;

  handleTransferChange = (targetKeys: any) => {
    this.setState({ targetKeys });
  };

  handleSearch = (dir: any, value: any) => {
    console.log('search:', dir, value);
  };

  render() {
    var { loading, imageUrl } = this.state;
    return (
      <>
        <Form layout="vertical">
          <Row gutter={16}>
            <Col span={6}>
              <Title level={4}>Choice Banner</Title>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                //action="https://www.mocky.io/v2/5cc8019d300000980a055e76"

                onChange={this.handleChange}
              >
                {imageUrl ? (
                  <img src={imageUrl} alt="avatar" style={{ width: '100%', height: 100 }} />
                ) : (
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                )}
              </Upload>
            </Col>
            <Col span={18}>
              <Form.Item
                name="title"
                label="Title"
                rules={[{ required: true, message: 'Please enter title' }]}
              >
                <Input placeholder="Please enter user name" style={{ width: 285 }} />
              </Form.Item>
              <Form.Item
                name="start"
                label="Time"
                rules={[{ required: true, message: 'Please select an owner' }]}
              >
                <DatePicker.RangePicker />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}></Col>
          </Row>
          <Row gutter={16}></Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
          <Title level={4}>Books in Campaign</Title>
          <Row>
            <Col span={24}>
              <Transfer
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'auto auto auto',
                  justifyContent: 'center',
                }}
                dataSource={this.state.mockData}
                showSearch
                filterOption={this.filterOption}
                targetKeys={this.state.targetKeys}
                onChange={this.handleTransferChange}
                onSearch={this.handleSearch}
                render={(item) => item.title}
              />
            </Col>
          </Row>
        </Form>
      </>
    );
  }
}
export default InputCampaignForm;
