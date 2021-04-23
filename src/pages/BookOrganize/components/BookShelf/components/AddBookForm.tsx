import { Button, Col, Descriptions, Divider, Row, Select } from 'antd';
import Text from 'antd/lib/typography/Text';
import React from 'react';
import { connect, Dispatch } from 'umi';
import styles from '../BookShelfTable.less';
const { Option } = Select;

interface AddBookFormProps {
  dispatch: Dispatch;

  organizebook?: any;
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
    for (let index = 0; index < this.props.organizebook.choiceBookShelf.row; index++) {
      tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }
  handelEndRow() {
    let tmp: any = [];
    for (let index = 0; index < this.props.organizebook.choiceBookShelf.row; index++) {
      if (index + 1 >= this.state.choiceStartRow)
        tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }
  handelStartColumn() {
    let tmp: any = [];
    for (let index = 0; index < this.props.organizebook.choiceBookShelf.col; index++) {
      tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }
  handelEndColumn() {
    let tmp: any = [];
    for (let index = 0; index < this.props.organizebook.choiceBookShelf.col; index++) {
      if (index + 1 >= this.state.choiceStartCol)
        tmp.push(<Option value={index + 1}>{index + 1}</Option>);
    }
    return tmp;
  }

  resetForm() {
    this.setState({
      choiceStartRow: 1,
      choiceEndRow: 1,
      choiceStartCol: 1,
      choiceEndCol: 1,
    });
  }

  render() {
    const { organizebook } = this.props;

    return (
      <>
        <Row style={{ padding: '0px 25px' }}>
          <Divider orientation={'left'}>Details</Divider>
          <Col span={24}>
            <Row>
              <Col span={24}>
                <Descriptions column={2}>
                  <Descriptions.Item label="Bookshelf Name" span={2}>{organizebook.choiceBookShelf.name.trim()}</Descriptions.Item>
                  <Descriptions.Item label="Row">{organizebook.choiceBookShelf.row}</Descriptions.Item>
                  <Descriptions.Item label="Column">{organizebook.choiceBookShelf.col}</Descriptions.Item>
                  <Descriptions.Item label="Location">{organizebook.choiceBookShelf.locationName}</Descriptions.Item>
                </Descriptions>
                
              </Col>
            </Row>
            <Divider orientation={'left'}>Filter</Divider>
            <Row style={{ marginBottom: 15 }} justify={'start'}>
              <Col span={4}>
                <Text style={{ lineHeight: 2 }}>Row</Text>
              </Col>
              <Col span={19}>
                <Select
                  defaultValue={`${this.state.choiceStartRow}`}
                  style={{ width: 100 }}
                  onChange={(value) => this.setState({ choiceStartRow: Number.parseInt(value) })}
                >
                  {this.handelStartRow()}
                </Select>
                <Text className={styles.textTable}>~</Text>
                <Select
                  defaultValue={`${this.state.choiceEndRow}`}
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
                  defaultValue={`${this.state.choiceStartCol}`}
                  style={{ width: 100 }}
                  onChange={(value) => this.setState({ choiceStartCol: Number.parseInt(value) })}
                >
                  {this.handelStartColumn()}
                </Select>
                <Text className={styles.textTable}>~</Text>
                <Select
                  defaultValue={`${this.state.choiceEndCol}`}
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

export default connect((state) => ({ ...state }))(AddBookForm);
