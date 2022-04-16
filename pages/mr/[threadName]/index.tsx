import { NextPage } from 'next';

import { useRouter } from 'next/router';

import { Layout } from 'components';

const ThreadPage: NextPage = () => {
  const { query } = useRouter();
  const { threadName } = query;

  return (
    <Layout>
      <div>{threadName}</div>
    </Layout>
  );
};

export default ThreadPage;

