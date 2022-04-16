import { NextPage } from 'next';

import {
  Row,
  Col,
} from 'reactstrap';

import { Layout, PostCard } from 'components';

const HomePage: NextPage = () => {
  return (
    <Layout container>
      <Row>
        <Col className="offset-lg-3 col-lg-6 offset-md-2 col-md-8 col-sm-12">
          <PostCard />
        </Col>
      </Row>
    </Layout>
  );
};

export default HomePage;

