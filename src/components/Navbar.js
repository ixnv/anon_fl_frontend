import React from 'react';
import {Link} from 'react-router';
import {LinkContainer} from 'react-router-bootstrap';
import {Nav, Navbar, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';


export const LoggedInView = props => {
  return (
    <Navbar.Collapse>
      <Nav>
        <LinkContainer to="faq">
          <NavItem>FAQ</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to="/orders/create">
          <NavItem>
            Создать заказ
          </NavItem>
        </LinkContainer>
        <LinkContainer to="/orders/my">
          <NavItem>
            Мои заказы
          </NavItem>
        </LinkContainer>
        <NavDropdown title={props.username} id="basic-nav-dropdown">
          <MenuItem>Настройки</MenuItem>
          <MenuItem divider />
          <MenuItem onClick={() => props.onLogout()}>Выход</MenuItem>
        </NavDropdown>
      </Nav>
    </Navbar.Collapse>
  );
};

export const GuestView = props => (
  <Navbar.Collapse>
    <Nav>
      <LinkContainer to="faq">
        <NavItem>FAQ</NavItem>
      </LinkContainer>
    </Nav>
    <Nav pullRight>
      <NavItem onClick={props.onSignInModalRequestClick}>Войти</NavItem>
      <NavItem onClick={props.onSignUpModalRequestClick}>Регистрация</NavItem>
    </Nav>
  </Navbar.Collapse>
);

const NavBar = props => {
  return (
    <Navbar collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <Link to="/">Anon-lance</Link>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      {props.children}
    </Navbar>
  );
};

export default NavBar;
