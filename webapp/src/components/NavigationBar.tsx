import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Nav,
  Navbar,
  NavbarBrand,
  UncontrolledDropdown
} from "reactstrap";
import * as React from "react";
import { NavLink as RouterLink } from "react-router-dom";
import { connect } from "react-redux";
import { State } from "../common";
import { Dispatch } from "redux";

interface Props {}
const NavigationBar = (props: Props) => (
  <Navbar color="light" light expand="md">
    <NavbarBrand tag={RouterLink} to="/">
      Problem Pool [beta]
    </NavbarBrand>
    <Nav className="ml-auto" navbar>
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          "Settings"
        </DropdownToggle>
        <DropdownMenu right>
          <DropdownItem tag={RouterLink} to="./settings">
            User IDs
          </DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
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

const mapStateToProps = (state: State) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NavigationBar);
