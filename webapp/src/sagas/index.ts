import { all, call, fork, put, select, takeLatest } from "redux-saga/effects";
import {
  fetchCodeforcesProblems,
  fetchCodeforcesSubmissions
} from "../api/Codeforces";
import * as Actions from "../actions";
import { State } from "../common";
import { fetchAtCoderProblems, fetchAtCoderSubmissions } from "../api/AtCoder";
import {
  fetchYukicoderProblems,
  fetchYukicoderSolvedProblems
} from "../api/Yukicoder";
import { fetchAOJProblems, fetchAOJSubmissions } from "../api/AOJ";
import * as LocalStorage from "../common/LocalStorage";

function* requestProblems() {
  yield all([
    fork(function*() {
      const problems = yield call(fetchAtCoderProblems);
      yield put(Actions.receiveProblems(problems));
    }),
    fork(function*() {
      const problems = yield call(fetchCodeforcesProblems);
      yield put(Actions.receiveProblems(problems));
    }),
    fork(function*() {
      const problems = yield call(fetchYukicoderProblems);
      yield put(Actions.receiveProblems(problems));
    }),
    fork(function*() {
      const problems = yield call(fetchAOJProblems);
      yield put(Actions.receiveProblems(problems));
    })
  ]);
}

function* requestSubmissions() {
  yield put(Actions.clearSubmissions());
  const userIds = yield select((state: State) => state.userIds);
  yield all([
    fork(function*() {
      if (userIds.codeforces.length > 0) {
        const submissions = yield call(
          fetchCodeforcesSubmissions,
          userIds.codeforces
        );
        yield put(Actions.receiveSubmissions(submissions));
      }
    }),
    fork(function*() {
      if (userIds.atcoder.length > 0) {
        const submissions = yield call(
          fetchAtCoderSubmissions,
          userIds.atcoder
        );
        yield put(Actions.receiveSubmissions(submissions));
      }
    }),
    fork(function*() {
      if (userIds.yukicoder.length > 0) {
        const submissions = yield call(
          fetchYukicoderSolvedProblems,
          userIds.yukicoder
        );
        yield put(Actions.receiveSubmissions(submissions));
      }
    }),
    fork(function*() {
      if (userIds.aoj.length > 0) {
        const submissions = yield call(fetchAOJSubmissions, userIds.aoj);
        yield put(Actions.receiveSubmissions(submissions));
      }
    })
  ]);
}

function* saveUserIds() {
  yield takeLatest(Actions.SAVE_USERNAME, function*() {
    const userIds = yield select((state: State) => state.userIds);
    yield call(LocalStorage.saveUserIds, userIds);
    yield call(requestSubmissions);
  });
}

function* saveTasks() {
  yield takeLatest(
    (action: Actions.Action) =>
      action.type === Actions.SUBMIT_TASK ||
      action.type === Actions.REMOVE_TASK ||
      action.type === Actions.SOLVE_TASK,
    function*() {
      const tasks = yield select((state: State) => state.tasks);
      yield call(LocalStorage.saveTasks, tasks);
    }
  );
}

export default function* rootSaga() {
  yield all([
    fork(requestProblems),
    fork(requestSubmissions),
    fork(saveUserIds),
    fork(saveTasks)
  ]);
}
