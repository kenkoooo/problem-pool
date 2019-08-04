import { connect } from "react-redux";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardSubtitle,
  CardTitle,
  Col,
  Input,
  Row
} from "reactstrap";
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
        .slice(0, 10)
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
          <SuggestionCard
            key={problem.url}
            problem={problem}
            onClick={() => {
              this.props.submit(problem.url);
              this.setState({ input: "", suggestions: [] });
            }}
          />
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

interface SuggestionCardProps {
  onClick: () => void;
  problem: Problem;
}
interface SuggestionCardState {
  hover: boolean;
}

class SuggestionCard extends React.Component<
  SuggestionCardProps,
  SuggestionCardState
> {
  constructor(props: SuggestionCardProps) {
    super(props);
    this.state = { hover: false };
  }

  render() {
    const style = this.state.hover
      ? { background: "#cccccc", cursor: "pointer" }
      : {};
    return (
      <Card
        style={style}
        onClick={this.props.onClick}
        onMouseOver={() => this.setState({ hover: true })}
        onMouseLeave={() => this.setState({ hover: false })}
      >
        <CardBody>
          <CardTitle tag="h5">
            {this.props.problem.title} <Badge>{this.props.problem.judge}</Badge>
          </CardTitle>
        </CardBody>
      </Card>
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
