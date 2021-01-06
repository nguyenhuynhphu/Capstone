import { Button, Col, Divider, Row, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import styles from '../BookShelfTable.less';
const { Option } = Select;
const DescriptionItem = ({ title, content }: any) => (
  <div className="site-description-item-profile-wrapper">
    <p className="site-description-item-profile-p-label">{title}:</p>
    {content}
  </div>
);
interface AddBookFormProps {
  column: number;
  row: number;
  onPassingFilter: Function;
}
interface AddBookFormState {
  choiceStartRow: number;
  choiceEndRow: number;

  choiceStartCol: number;
  choiceEndCol: number;
}
class AddBookForm extends React.Component<AddBookFormProps, AddBookFormState> {
  constructor(props: any) {
    super(props);
    this.state = {
      choiceStartRow: 1,
      choiceEndRow: 1,
      choiceStartCol: 1,
      choiceEndCol: 1,
    };
  }
  handelStartRow() {
    let tmp: any = [];
    for (let index = 0; index < this.props.row; index++) {
      tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }
  handelEndRow() {
    let tmp: any = [];
    for (let index = 0; index < this.props.row; index++) {
      if (index + 1 >= this.state.choiceStartRow)
        tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }
  handelStartColumn() {
    let tmp: any = [];
    for (let index = 0; index < this.props.column; index++) {
      tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }
  handelEndColumn() {
    let tmp: any = [];
    for (let index = 0; index < this.props.column; index++) {
      if (index + 1 >= this.state.choiceStartCol)
        tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }

  render() {
    return (
      <>
        <Row style={{ padding: '0px 25px' }}>
          <Divider orientation={'left'}>Details</Divider>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Book Shelf Name" content="[Book Group Name]" />
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <DescriptionItem title="Row" content={'15'} />
              </Col>
              <Col span={12}>
                <DescriptionItem title="Column" content={'15'} />
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <DescriptionItem title="Location" content={'15'} />
              </Col>
            </Row>
            <Divider orientation={'left'}>Filter</Divider>
            <Row style={{ marginBottom: 15 }} justify={'start'}>
              <Col span={4}>
                <Text style={{ lineHeight: 2 }}>Row</Text>
              </Col>
              <Col span={19}>
                <Select
                  defaultValue="1"
                  style={{ width: 100 }}
                  onChange={(value) => this.setState({ choiceStartRow: Number.parseInt(value) })}
                >
                  {this.handelStartRow()}
                </Select>
                <Text className={styles.textTable}>~</Text>
                <Select
                  defaultValue="1"
                  style={{ width: 100 }}
                  onChange={(value) => this.setState({ choiceEndRow: Number.parseInt(value) })}
                >
                  {this.handelEndRow()}
                </Select>
              </Col>
            </Row>
            <Row style={{ marginBottom: 15 }} justify={'start'}>
              <Col span={4}>
                <Text style={{ lineHeight: 2 }}>Column</Text>
              </Col>
              <Col span={19}>
                <Select
                  defaultValue="1"
                  style={{ width: 100 }}
                  onChange={(value) => this.setState({ choiceStartCol: Number.parseInt(value) })}
                >
                  {this.handelStartColumn()}
                </Select>
                <Text className={styles.textTable}>~</Text>
                <Select
                  defaultValue="1"
                  style={{ width: 100 }}
                  onChange={(value) => this.setState({ choiceEndCol: Number.parseInt(value) })}
                >
                  {this.handelEndColumn()}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: 'left' }}>
                <Button
                  type={'primary'}
                  onClick={() =>
                    this.props.onPassingFilter(
                      this.state.choiceStartRow,
                      this.state.choiceEndRow,
                      this.state.choiceStartCol,
                      this.state.choiceEndCol,
                    )
                  }
                >
                  Filter
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  }
}

export default AddBookForm;
