import { connect } from "react-redux";
import { Button, Card, CardBody, CardTitle, Col, Input, Row } from "reactstrap";
import * as React from "react";
import { removeTask, submitTask } from "../actions";
import { Dispatch } from "redux";
import { List, Map } from "immutable";
import { Problem } from "../api";
import { State } from "../common";
import { PooledTask } from "../common/PooledTask";

interface Props {
  readonly submit: (problem: string) => void;
  readonly remove: (n: number) => void;
  readonly tasks: List<PooledTask>;
  readonly problems: Map<string, Problem>;
}

interface LocalState {
  input: string;
  suggestions: Problem[];
}

class TodoPage extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: "",
      suggestions: []
    };
  }

  setSuggestions = (input: string) => {
    if (input.length > 0) {
      const suggestions = this.props.problems
        .valueSeq()
        .filter(
          problem =>
            problem.title
              .toLocaleLowerCase()
              .indexOf(input.toLocaleLowerCase()) !== -1
        )
        .slice(0, 5)
        .toArray();
      this.setState({ suggestions });
    } else {
      this.setState({ suggestions: [] });
    }
  };

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
              onChange={e => {
                const input = e.target.value;
                this.setState({ input });
                this.setSuggestions(input);
              }}
              value={this.state.input}
            />
          </Col>
        </Row>
        {this.state.suggestions.map(problem => (
          <Card key={problem.url}>
            <CardBody>
              <CardTitle>{problem.title}</CardTitle>
            </CardBody>
          </Card>
        ))}
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
  tasks: state.tasks,
  problems: state.problems
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submit: (problem: string) => dispatch(submitTask(problem)),
  remove: (n: number) => dispatch(removeTask(n))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);
