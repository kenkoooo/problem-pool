import { connect } from "react-redux";
import { Badge, Col, Input, ListGroup, ListGroupItem, Row } from "reactstrap";
import * as React from "react";
import { submitTask } from "../actions";
import { Dispatch } from "redux";
import { List, Map } from "immutable";
import { Problem, Submission } from "../api";
import { State } from "../common";
import TodoCards from "../components/TodoCards";

interface Props {
  readonly submit: (problem: string) => void;
  readonly problems: Map<string, Problem>;
  readonly submissions: Map<string, List<Submission>>;
}

interface LocalState {
  input: string;
  suggestions: Problem[];
  focusing: number;
}

class TodoPage extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      input: "",
      suggestions: [],
      focusing: -1
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
      this.setState({ suggestions, focusing: -1 });
    } else {
      this.setState({ suggestions: [], focusing: -1 });
    }
  };

  submit = (key: string) => {
    this.props.submit(key);
    this.setState({
      input: "",
      suggestions: [],
      focusing: -1
    });
  };

  render() {
    const { suggestions, focusing } = this.state;
    const { submissions } = this.props;
    const isAccepted = (problem: Problem) => {
      const list = submissions.get(problem.url);
      return (
        list !== undefined &&
        list.find(s => s.result === "Accepted") !== undefined
      );
    };

    return (
      <div>
        <Row>
          <Col>
            <Input
              onKeyDown={e => {
                if (e.key === "Enter") {
                  if (0 <= focusing && focusing < suggestions.length) {
                    this.submit(suggestions[focusing].url);
                  } else {
                    this.submit(this.state.input);
                  }
                } else if (e.key === "ArrowDown") {
                  this.setState({
                    focusing: Math.min(focusing + 1, suggestions.length - 1)
                  });
                } else if (e.key === "ArrowUp") {
                  this.setState({
                    focusing: Math.max(focusing - 1, -1)
                  });
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
        <Row>
          <Col>
            <ListGroup>
              {this.state.suggestions.map((problem, index) => (
                <ListGroupItem
                  color={isAccepted(problem) ? "success" : undefined}
                  active={index === focusing}
                  key={problem.url}
                  onClick={() => this.submit(problem.url)}
                  action
                >
                  {problem.title} <Badge pill>{problem.judge}</Badge>
                </ListGroupItem>
              ))}
            </ListGroup>
          </Col>
        </Row>
        <TodoCards />
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  problems: state.problems,
  submissions: state.submissions
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  submit: (problem: string) => dispatch(submitTask(problem))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TodoPage);
