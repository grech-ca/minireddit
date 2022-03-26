import { FC } from 'react';
import { AppProps } from 'next/app';

import 'bootstrap/dist/css/bootstrap.css';

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />
};

export default App;

