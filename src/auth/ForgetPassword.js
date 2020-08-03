import React from 'react';
import styled from 'styled-components';
import { Form, Input, Button, Layout, PageHeader, message } from 'antd';
import { Link } from '@reach/router';
import { useNavigate } from '@reach/router';
// import { useFirebase } from '../firebase/useFirebase';
import { useFirebase } from '../firebase/useFirebase';

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

const ForgetPassword = () => {
  const navigate = useNavigate();
  const { sendResetPasswordLink } = useFirebase();

  const onForgetPassFormFinish = async (values) => {
    try {
      let res = await sendResetPasswordLink(values.email);
      if (res === true) {
        message.success('Reset email has been sent!');
        navigate('/');
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <MainLayout>
      <PageHeader>Did you forget your password?</PageHeader>
      <Form onFinish={onForgetPassFormFinish}>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Please input your email!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <center>
            <Button type="primary" htmlType="submit">
              Send reset password link
            </Button>
          </center>
        </Form.Item>
        <Form.Item>
          <center>
            <Link to="/">Nevermind, go back.</Link>
          </center>
        </Form.Item>
      </Form>
    </MainLayout>
  );
};

export default ForgetPassword;
