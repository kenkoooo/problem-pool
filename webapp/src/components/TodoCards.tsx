import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { Map } from "immutable";
import { PooledTask } from "../common/PooledTask";
import { State } from "../common";
import { removeTask } from "../actions";
import { Button, Card, CardBody, CardTitle } from "reactstrap";
import { Problem, Submission } from "../api";

interface Props {
  tasks: Map<string, PooledTask>;
  submissions: Map<[string, string], Submission>;
  problems: Map<string, Problem>;
  remove: (key: string) => void;
}

const TodoCards = (props: Props) => (
  <div>
    {props.tasks.valueSeq().map(task => (
      <Card key={task.url}>
        <CardBody>
          <CardTitle tag="h3">{task.url}</CardTitle>
          <Button>Solve</Button>
        </CardBody>
      </Card>
    ))}
  </div>
);

const mapStateToProps = (state: State) => ({
  tasks: state.tasks,
  submissions: state.submissions,
  problems: state.problems
});
const mapDispatchToProps = (dispatch: Dispatch) => ({
  remove: (key: string) => dispatch(removeTask(key))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCards);
