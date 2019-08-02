import { connect } from "react-redux";
import { State } from "../reducers";
import { Button, FormGroup, Input, Label } from "reactstrap";
import * as React from "react";
import { changeInput, removeProblem, submitProblem } from "../actions";
import { Dispatch } from "redux";
import { List } from "immutable";

interface Props {
  change: (input: string) => void;
  submit: (problem: string) => void;
  remove: (n: number) => void;
  input: string;
  tasks: List<string>;
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
    <Button onClick={() => props.submit(props.input)}>A</Button>
    {props.tasks.map((url, index) => (
      <div key={index}>
        {url}
        <Button onClick={() => props.remove(index)}>Remove</Button>
      </div>
    ))}
  </div>
);

const mapStateToProps = (state: State) => {
  console.log(state);
  return {
    input: state.input,
    tasks: state.tasks.map(t => t.url)
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  change: (input: string) => dispatch(changeInput(input)),
  submit: (problem: string) => dispatch(submitProblem(problem)),
  remove: (n: number) => dispatch(removeProblem(n))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
