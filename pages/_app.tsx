import { FC, Fragment } from 'react';

import { AppProps } from 'next/app';
import { ToastContainer } from 'react-toastify';

import 'styles/index.scss';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <Fragment>
      <Component {...pageProps} />
      <ToastContainer />
    </Fragment>
  );
};

export default App;

