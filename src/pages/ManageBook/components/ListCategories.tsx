import React from 'react';

import { connect, Dispatch } from 'umi';
import { Tag, Input, Divider, Space, Spin, Form, Button } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';
import { PlusOutlined } from '@ant-design/icons';

interface ListCategoriesProps {
  dispatch: Dispatch;
  listcategories?: any;
}
interface ListCategoriesState {
  inputVisible: any;
  inputValue: any;
}

class ListCategories extends React.Component<ListCategoriesProps, ListCategoriesState> {
  constructor(props: any) {
    super(props);
    this.state = {
      inputVisible: false,
      inputValue: '',
    };
    // this.renderTag = this.renderTag.bind(this);
  }
  componentDidMount() {
    this.props.dispatch({
      type: 'listcategories/fetchData',
      payload: {},
    });
  }

  handleClose = (removedTag: any) => {
 
  };
  handleInputConfirm = () => {};

  render() {
    const { listcategories } = this.props;
    let tmp: any = [];
    listcategories.data.forEach((category: any) => {
      tmp.push(
        <Tag
          closable
          style={{ marginBottom: 5 }}
          onClose={(e: any) => {
            e.preventDefault();
            const { dispatch } = this.props;

            dispatch({
              type: 'managebook/deleteCategory',
              payload: [category.id],
            }).then(() => {
              dispatch({
                type: 'listcategories/fetchData',
                payload: {},
              }).then(() =>
                dispatch({
                  type: 'managebook/fetchCategories',
                  payload: {},
                }),
              );
            });
          }}
        >
          {category.name}
        </Tag>,
      );
    });
    return (
      <>
        <Spin spinning={listcategories.isLoading}>
          <TweenOneGroup
            style={{ marginBottom: 15 }}
            enter={{
              scale: 0.8,
              opacity: 0,
              type: 'from',
              duration: 100,
              onComplete: (e: { target: { style: string } }) => {
                e.target.style = '';
              },
            }}
            leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
            appear={false}
          >
            {tmp}
          </TweenOneGroup>
        </Spin>
        <div>
          <Divider style={{ margin: '4px 0' }} />
          <Form
            style={{ marginTop: 20 }}
            onFinish={(newCategory) => this.handelSubmit(newCategory)}
          >
            <Space style={{ textAlign: 'right' }}>
              <Form.Item name="name">
                <Input style={{ flex: 'auto', width: 100 }} />
              </Form.Item>
              <Form.Item>
                <Button htmlType="submit" style={{ border: 'none', boxShadow: 'none' }}>
                  <PlusOutlined /> Add item
                </Button>
              </Form.Item>
            </Space>
          </Form>
        </div>
      </>
    );
  }
  handelSubmit(newCategory: any) {
    const { dispatch } = this.props;
    dispatch({
      type: 'managebook/insertCategory',
      payload: newCategory,
    }).then(() => {
      dispatch({
        type: 'listcategories/fetchData',
        payload: {},
      }).then(() =>
        dispatch({
          type: 'managebook/fetchCategories',
          payload: {},
        }),
      );
    });
  }
}

export default connect((state) => ({ ...state }))(ListCategories);
