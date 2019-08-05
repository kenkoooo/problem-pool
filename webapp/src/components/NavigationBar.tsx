import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  UncontrolledDropdown
} from "reactstrap";
import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";

const NavigationBar = () => (
  <Navbar color="light" light expand="md">
    <NavbarBrand tag={RouterLink} to="/">
      Problem Pool
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <NavItem>
        <NavLink tag={RouterLink} to="/settings">
          Settings
        </NavLink>
      </NavItem>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Links
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem
            href="https://github.com/kenkoooo/problem-pool"
            target="_blank"
          >
            GitHub
          </DropdownItem>
          <DropdownItem
            href="https://onlinejudge.u-aizu.ac.jp/"
            target="_blank"
          >
            AOJ
          </DropdownItem>
          <DropdownItem href="https://atcoder.jp/" target="_blank">
            AtCoder
          </DropdownItem>
          <DropdownItem href="https://codeforces.com/" target="_blank">
            Codeforces
          </DropdownItem>
          <DropdownItem href="https://yukicoder.me/" target="_blank">
            yukicoder
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    </Nav>
  </Navbar>
);

export default NavigationBar;
