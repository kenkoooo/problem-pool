import { connect } from "react-redux";
import { Dispatch } from "redux";
import * as React from "react";
import { Button, FormGroup, Input, Label, Row } from "reactstrap";
import { State, UserIds } from "../common";
import { saveUserIds } from "../actions/ConfigActions";

interface Props {
  readonly save: (userIds: UserIds) => void;
  readonly userIds: UserIds;
}

interface LocalState {
  atcoder: string;
  codeforces: string;
  yukicoder: string;
  aoj: string;
}

class SettingsPage extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      atcoder: props.userIds.atcoder,
      yukicoder: props.userIds.yukicoder,
      codeforces: props.userIds.codeforces,
      aoj: props.userIds.aoj
    };
  }

  render() {
    const { atcoder, codeforces, yukicoder, aoj } = this.state;
    const isSaved =
      atcoder === this.props.userIds.atcoder &&
      codeforces === this.props.userIds.codeforces &&
      yukicoder === this.props.userIds.yukicoder &&
      aoj === this.props.userIds.aoj;
    return (
      <div>
        <Row>
          <FormGroup>
            <Label>AtCoder ID</Label>
            <Input
              onChange={e => this.setState({ atcoder: e.target.value })}
              type="text"
              placeholder="AtCoder ID"
              value={atcoder}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
            <Label>AOJ ID</Label>
            <Input
              onChange={e => this.setState({ aoj: e.target.value })}
              type="text"
              placeholder="AOJ ID"
              value={aoj}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
            <Label>yukicoder ID</Label>
            <Input
              onChange={e => this.setState({ yukicoder: e.target.value })}
              type="text"
              placeholder="yukicoder ID"
              value={yukicoder}
            />
          </FormGroup>
        </Row>
        <Row>
          <FormGroup>
            <Label>Codeforces ID</Label>
            <Input
              onChange={e => this.setState({ codeforces: e.target.value })}
              type="text"
              placeholder="Codeforces ID"
              value={codeforces}
            />
          </FormGroup>
        </Row>
        <Row>
          {isSaved ? (
            <Button disabled>Saved</Button>
          ) : (
            <Button
              color="danger"
              onClick={() =>
                this.props.save({ atcoder, codeforces, yukicoder, aoj })
              }
            >
              Save
            </Button>
          )}
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  userIds: state.userIds
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  save: (userIds: UserIds) => dispatch(saveUserIds(userIds))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
