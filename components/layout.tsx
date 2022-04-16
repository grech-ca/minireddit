import { FC, Fragment } from 'react';

import { Container } from 'reactstrap';

import { Navbar } from 'components';

export interface LayoutProps {
  container?: boolean; 
}

export const Layout: FC<LayoutProps> = ({ container, children }) => {
  return (
    <Fragment>
      <Navbar />
      {container ? (
        <Container className="my-5">{children}</Container>
      ) : children}
    </Fragment>
  );
};

