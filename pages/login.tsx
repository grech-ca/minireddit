import { useRef, useEffect } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import {
  Container,
  Row,
  Col,
} from 'reactstrap';

import { AuthForm, Input, VKButton } from 'components';

const LoginPage: NextPage = () => {
  return (
    <Container>
      <Head>
        <title>Вход</title>
      </Head>
      <Row>
        <Col className="offset-sm-12 offset-md-2 col-md-8 col-lg-4 offset-lg-4">
          <AuthForm type="login" />
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;

