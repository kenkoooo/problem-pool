import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { List, Map } from "immutable";
import { PooledTask } from "../common/PooledTask";
import { State } from "../common";
import { removeTask } from "../actions";
import {
  Button,
  ButtonGroup,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Row
} from "reactstrap";
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
      const problem = task.validUrl
        ? props.problems.get(task.validUrl)
        : undefined;
      return (
        <Row key={task.key}>
          <Col>
            <ListGroup>
              <ListGroupItem>
                <ListGroupItemHeading className="d-flex justify-content-between">
                  {problem ? (
                    <a href={problem.url} target="_blank">
                      {problem.title}
                    </a>
                  ) : (
                    task.key
                  )}
                  <small>s</small>
                </ListGroupItemHeading>
                <ButtonGroup className="d-flex justify-content-end">
                  <Button key="solved" color="success">
                    Solved
                  </Button>
                  <Button key="good">Good</Button>
                  <Button key="hard" color="warning">
                    Hard
                  </Button>
                  <Button key="failed" color="danger">
                    Failed
                  </Button>
                  <Button
                    key="remove"
                    color="dark"
                    onClick={() => props.remove(task.key)}
                  >
                    Remove
                  </Button>
                </ButtonGroup>
              </ListGroupItem>
            </ListGroup>
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
