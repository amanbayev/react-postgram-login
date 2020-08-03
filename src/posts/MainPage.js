import React from 'react';
import styled from 'styled-components';
import { useFirebase } from '../firebase/useFirebase';
import { Link } from '@reach/router';

import { Form, Input, Button, Layout, PageHeader, message } from 'antd';

const MainLayout = styled(Layout)`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

function MainPage() {
  const { user, signout, updatePassword } = useFirebase();
  const [formMessage, setFormMessage] = React.useState('');
  const [changingPass, setChangingPass] = React.useState(false);

  const onLogoutClick = () => {
    try {
      signout();
    } catch (error) {
      console.log('error logging out');
    }
  };

  const triggerChangePassState = () => {
    setChangingPass(!changingPass);
  };

  if (!user) {
    return (
      <MainLayout>
        <div>
          Please login in <Link to="/login">here</Link>
        </div>
        <div>
          or if you forgot your password click{' '}
          <Link to="/forgot-password">here</Link>
        </div>
        <div>
          or register <Link to="/register">here</Link>
        </div>
      </MainLayout>
    );
  }

  const onChangePassFormFinish = async ({ newPass, newPassRepeat }) => {
    if (newPass === newPassRepeat) {
      try {
        let res = await updatePassword(user, newPass, setFormMessage);
        // console.log('res: ', res);
        if (res === true) {
          message.success('Password has been updated!');
          triggerChangePassState();
        }
      } catch (error) {
        console.error(error.message);
      }
    } else {
      setFormMessage('Passwords mismatch');
    }
  };

  return (
    <MainLayout>
      {!changingPass && (
        <div>
          <Button
            style={{ marginRight: '16px' }}
            onClick={triggerChangePassState}
          >
            Change password
          </Button>
          <Button type="primary" onClick={onLogoutClick}>
            Logout
          </Button>
        </div>
      )}
      {changingPass && (
        <>
          <PageHeader>Change your password:</PageHeader>
          <h3>{formMessage}</h3>
          <Form onFinish={onChangePassFormFinish}>
            <Form.Item
              label="New password"
              name="newPass"
              rules={[
                {
                  required: true,
                  message: 'Please type your new password',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              label="New password, repeat input"
              name="newPassRepeat"
              rules={[
                {
                  required: true,
                  message: 'Please type your new password again',
                },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <center>
                <Button
                  style={{ marginRight: '16px' }}
                  type="primary"
                  htmlType="submit"
                >
                  Set new password
                </Button>
                <Button onClick={triggerChangePassState}>Cancel</Button>
              </center>
            </Form.Item>
          </Form>
        </>
      )}
    </MainLayout>
  );
}

export default MainPage;
