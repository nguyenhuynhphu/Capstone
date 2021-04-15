import { LockOutlined, LockTwoTone, UserOutlined } from '@ant-design/icons';
import { Alert, Button, Divider, Form, Input, Spin } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormCheckbox, ProFormText } from '@ant-design/pro-form';
import { connect, Dispatch, useIntl, FormattedMessage } from 'umi';
import { StateType } from '@/models/login';
import { LoginParamsType } from '@/services/login';
import { ConnectState } from '@/models/connect';

import styles from './index.less';

interface LoginProps {
  dispatch: Dispatch;
  userLogin: StateType;
  submitting?: boolean;
}

const LoginMessage: React.FC<{
  content: string;
}> = ({ content }) => (
  <Alert
    style={{
      marginBottom: 24,
    }}
    message={content}
    type="error"
    showIcon
  />
);

const Login: React.FC<LoginProps> = (props) => {
  const { userLogin = {}, submitting } = props;
  const [isLogin, setLogin] = useState(false);
  const { status, type: loginType } = userLogin;
  const [type] = useState<string>('account');
  const intl = useIntl();

  const handleSubmit = (values: LoginParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'login/login',
      payload: { ...values, type },
    }).finally(() => {
      setLogin(false);
    });
  };

  return (
    <div className={styles.main}>
      <p
        style={{
          textAlign: 'left',
          fontSize: 26,
          fontWeight: 200,
          marginBottom: 0,
        }}
      >
        We are <span style={{ fontWeight: 500, fontSize: 38 }}>PAPV</span>
      </p>
      <div
        style={{ marginBottom: 15, width: 80, borderBottom: '1px solid rgba(0 ,0 ,0 ,.4)' }}
      ></div>
      <Spin spinning={isLogin}>
        <Form
          layout={'vertical'}
          name="basic"
          initialValues={{ remember: false }}
          onFinish={(value) => {
            setLogin(true);
            handleSubmit(value);
          }}
        >
          <Form.Item
            label={
              <p style={{ marginBottom: '0px', fontWeight: 500 }}>
                <UserOutlined style={{ marginRight: 5 }} /> Username
              </p>
            }
            name="username"
            rules={[{ message: 'Please input your username!' }]}
          >
            <Input
              bordered={false}
              style={{ borderBottom: '1px solid rgba(0, 0, 0, .8)' }}
            />
          </Form.Item>

          <Form.Item
            label={
              <p style={{ marginBottom: '0px', fontWeight: 500 }}>
                <LockOutlined style={{ marginRight: 5 }} /> Password
              </p>
            }
            name="password"
            rules={[{ message: 'Please input your password!' }]}
          >
            <Input.Password
              bordered={false}
              style={{ borderBottom: '1px solid rgba(0, 0, 0, .8)' }}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ width: '100%', height: 40 }}>
              Sign In
            </Button>
          </Form.Item>
          {status == 'error' ? (
            <Alert type="error" message="Wrong username and password !" banner />
          ) : (
            <></>
          )}
        </Form>
      </Spin>
    </div>
  );
};

export default connect(({ login, loading }: ConnectState) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))(Login);
