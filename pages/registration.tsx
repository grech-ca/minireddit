import { useEffect } from 'react';

import { NextPage } from 'next';
import Head from 'next/head';

import { Container, Row, Col } from 'reactstrap';

import { AuthForm } from 'components';

const RegistrationPage: NextPage = () => {

  return (
    <Container>
      <Head>
        <title>Регистрация</title>
      </Head>
      <Row>
        <Col className="offset-sm-12 offset-md-2 col-md-8 col-lg-4 offset-lg-4">
          <AuthForm type='registration' />
        </Col>
      </Row>
    </Container>
  );
};

export default RegistrationPage;

