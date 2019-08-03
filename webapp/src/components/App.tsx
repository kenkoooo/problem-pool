import { connect } from "react-redux";
import { State, PooledTask } from "../reducers";
import {
  Button,
  Col,
  Container,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Row,
  UncontrolledDropdown
} from "reactstrap";
import * as React from "react";
import {
  changeInput,
  requestProblems,
  removeProblem,
  submitProblem
} from "../actions";
import { Dispatch } from "redux";
import { List } from "immutable";
import { AtCoderProblem } from "../api";

interface Props {
  readonly change: (input: string) => void;
  readonly submit: (problem: string) => void;
  readonly remove: (n: number) => void;
  readonly fetchProblems: () => void;
  readonly input: string;
  readonly tasks: List<PooledTask>;
  readonly problems: List<AtCoderProblem>;
}

const App = (props: Props) => (
  <div>
    <Navbar color="light" light expand="md">
      <NavbarBrand href="/">reactstrap</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
          <NavLink href="/components/">Components</NavLink>
        </NavItem>
        <NavItem>
          <NavLink href="https://github.com/reactstrap/reactstrap">
            GitHub
          </NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
          <DropdownToggle nav caret>
            Options
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>Option 1</DropdownItem>
            <DropdownItem>Option 2</DropdownItem>
            <DropdownItem divider />
            <DropdownItem>Reset</DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Navbar>
    <Container>
      <Row>
        <Col>
          <Input
            onKeyPress={e => {
              if (e.key === "Enter") {
                props.submit(props.input);
                props.fetchProblems();
              }
            }}
            type="text"
            onChange={e => props.change(e.target.value)}
            value={props.input}
          />
        </Col>
      </Row>
    </Container>
    {props.tasks.map((task, index) => (
      <div key={index}>
        {task.url}
        <Button onClick={() => props.remove(index)}>Remove</Button>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state: State) => {
  return {
    input: state.input,
    tasks: state.tasks,
    problems: state.problems
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  change: (input: string) => dispatch(changeInput(input)),
  submit: (problem: string) => dispatch(submitProblem(problem)),
  remove: (n: number) => dispatch(removeProblem(n)),
  fetchProblems: () => dispatch(requestProblems())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
