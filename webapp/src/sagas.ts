import { all, call, put, select, takeLatest } from "redux-saga/effects";
import { fetchAtCoderProblems, fetchAtCoderSubmissions } from "./api/AtCoder";
import {
  receiveProblems,
  receiveSubmissions
} from "./actions/ExternalApiActions";
import {
  fetchCodeforcesProblems,
  fetchCodeforcesSubmissions
} from "./api/Codeforces";
import { fetchAOJProblems, fetchAOJSubmissions } from "./api/AOJ";
import {
  fetchYukicoderProblems,
  fetchYukicoderSolvedProblems
} from "./api/Yukicoder";
import { State } from "./common";
import { SAVE_USER_IDS } from "./actions/ConfigActions";

function* requestAndRecieveProblems() {
  const fns = [
    fetchAtCoderProblems,
    fetchCodeforcesProblems,
    fetchAOJProblems,
    fetchYukicoderProblems
  ];
  yield all([
    fns.map(f =>
      call(function*() {
        try {
          const problems = yield call(f);
          yield put(receiveProblems(problems));
        } catch (e) {
          console.error("Failed to fetch problems. " + e);
        }
      })
    )
  ]);
}

function* requestAndReceiveSubmissions() {
  const userIds = yield select((state: State) => state.userIds);
  const callers = [
    { f: fetchAtCoderSubmissions, id: userIds.atcoder },
    { f: fetchCodeforcesSubmissions, id: userIds.codeforces },
    { f: fetchAOJSubmissions, id: userIds.aoj },
    { f: fetchYukicoderSolvedProblems, id: userIds.yukicoder }
  ];
  yield all(
    callers
      .filter(c => c.id.length > 0)
      .map(c =>
        call(function*() {
          try {
            const submissions = yield call(c.f, c.id);
            yield put(receiveSubmissions(submissions));
          } catch (e) {
            console.error("Failed to fetch submissions. " + e);
          }
        })
      )
  );
}

function* syncSubmissions() {
  yield takeLatest(SAVE_USER_IDS, requestAndReceiveSubmissions);
}

function* rootSaga() {
  yield all([call(requestAndRecieveProblems), call(syncSubmissions)]);
}

export default rootSaga;
