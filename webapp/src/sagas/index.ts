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
import { syncPoolData, loginPool } from "../pool-api";
import { convertToSaveData, SaveData } from "../common/LocalStorage";

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
        try {
          const submissions = yield call(
            fetchCodeforcesSubmissions,
            userIds.codeforces
          );
          yield put(Actions.receiveSubmissions(submissions));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    fork(function*() {
      if (userIds.atcoder.length > 0) {
        try {
          const submissions = yield call(
            fetchAtCoderSubmissions,
            userIds.atcoder
          );
          yield put(Actions.receiveSubmissions(submissions));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    fork(function*() {
      if (userIds.yukicoder.length > 0) {
        try {
          const submissions = yield call(
            fetchYukicoderSolvedProblems,
            userIds.yukicoder
          );
          yield put(Actions.receiveSubmissions(submissions));
        } catch (e) {
          console.error(e);
        }
      }
    }),
    fork(function*() {
      if (userIds.aoj.length > 0) {
        try {
          const submissions = yield call(fetchAOJSubmissions, userIds.aoj);
          yield put(Actions.receiveSubmissions(submissions));
        } catch (e) {
          console.error(e);
        }
      }
    })
  ]);
}

function* requestToken() {
  yield takeLatest(Actions.REQUEST_TOKEN, function*(action: Actions.Action) {
    if (action.type === Actions.REQUEST_TOKEN) {
      const { userId, password, register } = action;
      try {
        const { token } = yield call(loginPool, userId, password, register);
        yield put(Actions.receiveToken(token));
        const state = yield select(state => state);
        yield call(LocalStorage.saveState, state);
        yield call(fetchData);
      } catch (e) {
        console.error(e);
        yield put(Actions.failedToken());
      }
    }
  });
}

function* fetchData() {
  const token = yield select((state: State) => state.token);
  const tokenString = token ? token.token : "";

  try {
    // fetch
    const fetchedData = yield call(syncPoolData, tokenString, undefined);

    // merge
    const { refreshedToken, loadedData } = fetchedData;
    yield put(Actions.refreshToken(refreshedToken));
    const saveData: SaveData = JSON.parse(loadedData);
    yield put(Actions.mergeTasks(saveData.tasks));
    yield put(Actions.receiveUsername(saveData.userIds));
  } catch (e) {
    console.error("Failed to fetch ", e);
  }
}

function* syncData() {
  yield call(fetchData);
  yield takeLatest(
    [
      Actions.SOLVE_TASK,
      Actions.REMOVE_TASK,
      Actions.SUBMIT_TASK,
      Actions.SAVE_USERNAME,
      Actions.RECEIVE_TOKEN
    ],
    loadData
  );
}

function* loadData() {
  const token = yield select((state: State) => state.token);
  const tokenString = token ? token.token : "";

  try {
    // save
    const state = yield select(state => state);
    const { refreshedToken } = yield call(
      syncPoolData,
      tokenString,
      JSON.stringify(convertToSaveData(state))
    );
    yield put(Actions.refreshToken(refreshedToken));
  } catch (e) {
    console.error("Failed to save ", e);
  }

  const state = yield select(state => state);
  yield call(LocalStorage.saveState, state);
}

export default function* rootSaga() {
  yield all([
    fork(requestToken),
    fork(requestProblems),
    fork(requestSubmissions),
    fork(syncData)
  ]);
}
