import { connect } from "react-redux";
import { Button, Col, Input, Row } from "reactstrap";
import * as React from "react";
import { removeTask, submitTask } from "../actions";
import { Dispatch } from "redux";
import { List } from "immutable";
import { AtCoderProblem } from "../api";
import { PooledTask, State } from "../common";

interface Props {
  readonly submit: (problem: string) => void;
  readonly remove: (n: number) => void;
  readonly tasks: List<PooledTask>;
  readonly problems: List<AtCoderProblem>;
}

interface LocalState {
  input: string;
}

class TodoPage extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: ""
    };
  }
  render() {
    return (
      <div>
        <Row>
          <Col>
            <Input
              onKeyPress={e => {
                if (e.key === "Enter") {
                  this.props.submit(this.state.input);
                  this.setState({ input: "" });
                }
              }}
              type="text"
              onChange={e => this.setState({ input: e.target.value })}
              value={this.state.input}
            />
          </Col>
        </Row>

        {this.props.tasks.map((task, index) => (
          <div key={index}>
            {task.url}
            <Button onClick={() => this.props.remove(index)}>Remove</Button>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  tasks: state.tasks
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submit: (problem: string) => dispatch(submitTask(problem)),
  remove: (n: number) => dispatch(removeTask(n))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);
