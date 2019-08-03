import { connect } from "react-redux";
import { State, Task } from "../reducers";
import { Button, FormGroup, Input, Label } from "reactstrap";
import * as React from "react";
import {
  changeInput,
  fetchProblems,
  removeProblem,
  submitProblem
} from "../actions";
import { Dispatch } from "redux";
import { List } from "immutable";
import { AtCoderProblem } from "../api";

interface Props {
  change: (input: string) => void;
  submit: (problem: string) => void;
  remove: (n: number) => void;
  fetchProblems: (problems: List<AtCoderProblem>) => void;
  input: string;
  tasks: List<Task>;
  problems: List<AtCoderProblem>;
}

const App = (props: Props) => (
  <div>
    <FormGroup>
      <Label>Email</Label>
      <Input
        type="text"
        onChange={e => props.change(e.target.value)}
        value={props.input}
      />
    </FormGroup>
    <Button
      onClick={() => {
        props.submit(props.input);
        props.fetchProblems(props.problems);
      }}
    >
      A
    </Button>
    {props.tasks.map((task, index) => (
      <div key={index}>
        {task.url}
        <Button onClick={() => props.remove(index)}>Remove</Button>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state: State) => {
  console.log(state);
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
  fetchProblems: (problems: List<AtCoderProblem>) =>
    dispatch(fetchProblems(problems))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
