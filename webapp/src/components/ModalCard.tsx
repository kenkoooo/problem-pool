import * as React from "react";
import {
  Badge,
  Button,
  ButtonGroup,
  FormGroup,
  Input,
  Label,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table
} from "reactstrap";
import { formatDate, OnlineJudge } from "../common";
import { ReviewResult, suggestNextReviewTime } from "../common/Reviewer";

interface Props {
  taskKey: string;
  url: string | null;
  title: string | null;
  lastJudgeAccepted: number | null;
  lastSolvedByUser: number | null;
  nextReviewTime: number;
  judge: OnlineJudge | null;
  remove: () => void;
  review: (solvedDate: number, reviewDate: number) => void;
}

interface LocalState {
  isModalOpen: boolean;
  modalSolvedDate: string | null;
  modalReviewDate: string | null;
  modalType: ReviewResult | "Remove";
}

const parseDate = (dateString: string) => {
  const year = parseInt(dateString.slice(0, 4));
  const month = parseInt(dateString.slice(5, 7));
  const date = parseInt(dateString.slice(8, 10));
  const d = new Date();
  d.setFullYear(year);
  d.setMonth(month - 1);
  d.setDate(date);
  return d.getTime() / 1000;
};

class ModalCard extends React.Component<Props, LocalState> {
  constructor(props: Props) {
    super(props);
    this.state = {
      modalSolvedDate: null,
      modalReviewDate: null,
      isModalOpen: false,
      modalType: "Remove"
    };
  }
  render() {
    const {
      isModalOpen,
      modalType,
      modalSolvedDate,
      modalReviewDate
    } = this.state;
    const nowSecond = Date.now() / 1000;
    const {
      title,
      url,
      taskKey,
      lastJudgeAccepted,
      lastSolvedByUser,
      nextReviewTime,
      judge
    } = this.props;
    const nextReviewSuggestion =
      modalType !== "Remove"
        ? suggestNextReviewTime(lastSolvedByUser, modalType)
        : -1;
    const solvedDate =
      modalSolvedDate !== null ? modalSolvedDate : formatDate(nowSecond);
    const reviewDate =
      modalReviewDate !== null
        ? modalReviewDate
        : formatDate(nextReviewSuggestion);
    const outDated = formatDate(nowSecond) >= formatDate(nextReviewTime);
    return (
      <ListGroup>
        <ListGroupItem>
          <ListGroupItemHeading>
            {title && url && judge ? (
              <div>
                <Badge>{judge}</Badge>{" "}
                <a href={url} target="_blank">
                  {title}
                </a>
              </div>
            ) : (
              taskKey
            )}
          </ListGroupItemHeading>
          <Table>
            <tbody>
              {
                <tr>
                  <th scope="row">Next review</th>
                  {outDated ? (
                    <td style={{ color: "red" }}>
                      <strong> {formatDate(nextReviewTime)}</strong>
                    </td>
                  ) : (
                    <td>{formatDate(nextReviewTime)}</td>
                  )}
                </tr>
              }
              {lastSolvedByUser !== null ? (
                <tr>
                  <th scope="row">Last solved</th>
                  <td>{formatDate(lastSolvedByUser)}</td>
                </tr>
              ) : null}
              {lastJudgeAccepted !== null ? (
                <tr>
                  <th scope="row">Last accepted</th>
                  <td>{formatDate(lastJudgeAccepted)}</td>
                </tr>
              ) : null}
            </tbody>
          </Table>

          <ButtonGroup className="d-flex justify-content-end">
            <Button
              key="solved"
              color="success"
              onClick={() =>
                this.setState({
                  isModalOpen: true,
                  modalType: "Solved"
                })
              }
            >
              Solved
            </Button>
            <Button
              key="good"
              onClick={() =>
                this.setState({
                  isModalOpen: true,
                  modalType: "Good"
                })
              }
            >
              Good
            </Button>
            <Button
              key="hard"
              color="warning"
              onClick={() =>
                this.setState({
                  isModalOpen: true,
                  modalType: "Hard"
                })
              }
            >
              Hard
            </Button>
            <Button
              key="failed"
              color="danger"
              onClick={() =>
                this.setState({
                  isModalOpen: true,
                  modalType: "Failed"
                })
              }
            >
              Failed
            </Button>
            <Button
              key="remove"
              color="dark"
              onClick={() =>
                this.setState({
                  isModalOpen: true,
                  modalType: "Remove"
                })
              }
            >
              Remove
            </Button>
          </ButtonGroup>
          <Modal
            isOpen={isModalOpen}
            toggle={() => this.setState({ isModalOpen: !isModalOpen })}
          >
            {modalType === "Remove" ? (
              <div>
                <ModalHeader>Remove this card?</ModalHeader>
                <ModalBody>{title ? title : taskKey}</ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => {
                      this.setState({ isModalOpen: false });
                      this.props.remove();
                    }}
                  >
                    Remove
                  </Button>
                  <Button onClick={() => this.setState({ isModalOpen: false })}>
                    Cancel
                  </Button>
                </ModalFooter>
              </div>
            ) : (
              <div>
                <ModalHeader>Next review will be ...</ModalHeader>
                <ModalBody>
                  <FormGroup>
                    <Label>Solved:</Label>
                    <Input
                      type="date"
                      value={solvedDate}
                      onChange={e =>
                        this.setState({ modalSolvedDate: e.target.value })
                      }
                    />
                  </FormGroup>
                  <Label>Next Review:</Label>
                  <Input
                    type="date"
                    value={reviewDate}
                    onChange={e =>
                      this.setState({ modalReviewDate: e.target.value })
                    }
                  />
                </ModalBody>
                <ModalFooter>
                  <Button
                    onClick={() => {
                      this.setState({ isModalOpen: false });
                      const solvedSecond = parseDate(solvedDate);
                      const reviewSecond = parseDate(reviewDate);
                      this.props.review(solvedSecond, reviewSecond);
                    }}
                  >
                    Submit
                  </Button>
                  <Button onClick={() => this.setState({ isModalOpen: false })}>
                    Cancel
                  </Button>
                </ModalFooter>
              </div>
            )}
          </Modal>
        </ListGroupItem>
      </ListGroup>
    );
  }
}

export default ModalCard;
