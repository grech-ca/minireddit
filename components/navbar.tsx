import { FC, Fragment } from 'react';

import Link from 'next/link';
import {
  Navbar as RSNavbar,
  Container,
  Row,
  Col,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import { useRouter } from 'next/router';

export interface NavbarProps {
  
}

const links = [
  {
    href: '/',
    name: 'Главная',
  },
];

export const Navbar: FC<NavbarProps> = ({  }) => {
  const { pathname } = useRouter();

  return (
    <RSNavbar className="border-bottom border-secondary">
      <Row className="d-flex justify-content-between w-100">
        <Col className="d-flex align-items-center">
          <Link href="/" passHref>
            <a className="text-decoration-none text-dark">
              <b className="fs-5">МиниРеддит</b>
            </a>
          </Link>
        </Col>
        <Col>
          <Nav className="justify-content-end">
            <NavItem>
              <Link href={`/user/grech_ca`} passHref>
                <NavLink>
                  Username
                </NavLink>
              </Link>
            </NavItem>
          </Nav>
        </Col>
      </Row>
    </RSNavbar>
  );
};

