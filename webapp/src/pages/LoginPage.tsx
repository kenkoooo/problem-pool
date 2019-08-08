import { connect } from "react-redux";
import * as React from "react";
import {
  Button,
  Col,
  FormGroup,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  TabPane
} from "reactstrap";
import { State } from "../common";
import { Dispatch } from "redux";
import { requestToken } from "../actions";

interface Props {
  login: (userId: string, password: string, register: boolean) => void;
}
interface LocalState {
  activeTab: "Login" | "Register";
  userId: string;
  password: string;
}
class LoginPage extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = { activeTab: "Login", userId: "", password: "" };
  }
  render() {
    const { activeTab, userId, password } = this.state;
    return (
      <React.Fragment>
        <Nav tabs>
          <NavItem>
            <NavLink
              active={activeTab === "Register"}
              onClick={() => this.setState({ activeTab: "Register" })}
            >
              Register
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              active={activeTab === "Login"}
              onClick={() => this.setState({ activeTab: "Login" })}
            >
              Login
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={1}>
          <TabPane tabId={1}>
            <Row>
              <Col>
                <FormGroup>
                  <Label>User ID</Label>
                  <Input
                    type="text"
                    name="user_id"
                    id="user_id"
                    onChange={e => this.setState({ userId: e.target.value })}
                    value={userId}
                  />
                </FormGroup>
                <FormGroup>
                  <Label>Password</Label>
                  <Input
                    type="password"
                    name="password"
                    id="password"
                    onChange={e => this.setState({ password: e.target.value })}
                    value={password}
                  />
                  <Button
                    onClick={() =>
                      this.props.login(
                        userId,
                        password,
                        activeTab === "Register"
                      )
                    }
                  >
                    {activeTab}
                  </Button>
                </FormGroup>
              </Col>
            </Row>
          </TabPane>
        </TabContent>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: State) => ({});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  login: (userId: string, password: string, register: boolean) =>
    dispatch(requestToken(userId, password, register))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginPage);
