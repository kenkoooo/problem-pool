import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { List, Map } from "immutable";
import { PooledTask } from "../common/PooledTask";
import { State } from "../common";
import { removeTask } from "../actions";
import {
  Badge,
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardHeader,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
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
      const problem = props.problems.get(task.url);
      return (
        <Row key={task.url}>
          <Col>
            <Card>
              <CardHeader tag="h3">
                {problem ? <Badge>{problem.judge}</Badge> : null}{" "}
                {problem ? (
                  <CardLink href={problem.url} target={"_blank"}>
                    {problem.title}
                  </CardLink>
                ) : (
                  task.url
                )}
              </CardHeader>
              <CardBody>
                <CardTitle tag="h3">
                  {problem ? (
                    <CardLink href={problem.url} target={"_blank"}>
                      {problem.title}
                    </CardLink>
                  ) : (
                    task.url
                  )}
                </CardTitle>
                <CardText className="text-right">
                  <ButtonGroup>
                    <Button key={"a"} onClick={() => props.remove(task.url)}>
                      Solve
                    </Button>
                    <Button key={"b"} onClick={() => props.remove(task.url)}>
                      Solve
                    </Button>
                    <Button key={"c"} onClick={() => props.remove(task.url)}>
                      Solve
                    </Button>
                  </ButtonGroup>
                </CardText>
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
