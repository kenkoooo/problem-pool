import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { List, Map } from "immutable";
import { PooledTask } from "../common/PooledTask";
import { State } from "../common";
import { removeTask } from "../actions";
import { Badge, Button, Card, CardBody, CardTitle, Col, Row } from "reactstrap";
import { Problem, Submission } from "../api";

interface Props {
  tasks: Map<string, PooledTask>;
  submissions: Map<string, List<Submission>>;
  problems: Map<string, Problem>;
  remove: (key: string) => void;
}

const TodoCards = (props: Props) => (
  <div>
    {props.tasks.valueSeq().map(task => {
      const problem = props.problems.get(task.url);
      return (
        <Row key={task.url}>
          <Col>
            <Card>
              <CardBody>
                <CardTitle tag="h3">
                  {problem ? problem.title : task.url}{" "}
                  {problem ? <Badge>{problem.judge}</Badge> : null}
                </CardTitle>
                <Button onClick={() => props.remove(task.url)}>Solve</Button>
              </CardBody>
            </Card>
          </Col>
        </Row>
      );
    })}
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
