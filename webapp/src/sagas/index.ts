import { all, call, fork, put, select, takeEvery } from "redux-saga/effects";
import {
  fetchCodeforcesProblems,
  fetchCodeforcesSubmissions
} from "../api/Codeforces";
import * as Actions from "../actions";
import { State } from "../common";
import { fetchAtCoderProblems, fetchAtCoderSubmissions } from "../api/AtCoder";

function* requestProblems() {
  yield all([
    put(Actions.receiveProblems(yield call(fetchAtCoderProblems))),
    put(Actions.receiveProblems(yield call(fetchCodeforcesProblems)))
  ]);
}

function* requestSubmissions() {
  const userIds = yield select((state: State) => state.userIds);
  if (userIds.codeforces.length > 0) {
    const submissions = yield call(
      fetchCodeforcesSubmissions,
      userIds.codeforces
    );
    yield put(Actions.receiveSubmissions(submissions));
  }
  if (userIds.atcoder.length > 0) {
    const submissions = yield call(fetchAtCoderSubmissions, userIds.atcoder);
    yield put(Actions.receiveSubmissions(submissions));
  }
}

function* saveUserName() {
  yield takeEvery(Actions.SAVE_USERNAME, requestSubmissions);
}

export default function* rootSaga() {
  yield all([
    fork(requestProblems),
    fork(requestSubmissions),
    fork(saveUserName)
  ]);
}
