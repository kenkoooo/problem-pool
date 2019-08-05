import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { List, Map } from "immutable";
import { PooledTask } from "../common/PooledTask";
import { State } from "../common";
import { removeTask, solveTask } from "../actions";
import { Col, Row } from "reactstrap";
import { Problem, Submission } from "../api";
import ModalCard from "./ModalCard";

interface Props {
  tasks: Map<string, PooledTask>;
  submissions: Map<string, List<Submission>>;
  problems: Map<string, Problem>;
  remove: (key: string) => void;
  solve: (key: string, solvedSecond: number, reviewSecond: number) => void;
}
const TodoCards = (props: Props) => (
  <div>
    {props.tasks.valueSeq().map(task => {
      const problem = task.validUrl
        ? props.problems.get(task.validUrl)
        : undefined;
      const { lastJudgeAccepted, lastSolvedByUser, nextReviewTime } = task;
      return (
        <Row key={task.key}>
          <Col>
            <ModalCard
              taskKey={task.key}
              url={task.validUrl}
              title={problem ? problem.title : null}
              lastJudgeAccepted={lastJudgeAccepted}
              lastSolvedByUser={lastSolvedByUser}
              nextReviewTime={nextReviewTime}
              remove={() => props.remove(task.key)}
              review={(solvedDate: number, reviewDate: number) =>
                props.solve(task.key, solvedDate, reviewDate)
              }
            />
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
  remove: (key: string) => dispatch(removeTask(key)),
  solve: (key: string, solvedSecond: number, reviewSecond: number) =>
    dispatch(solveTask(key, solvedSecond, reviewSecond))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoCards);
