import { fetchAtCoderProblems, fetchAtCoderSubmissions } from "../api/AtCoder";
import {
  fetchCodeforcesProblems,
  fetchCodeforcesSubmissions
} from "../api/Codeforces";
import { fetchAOJProblems, fetchAOJSubmissions } from "../api/AOJ";
import {
  fetchYukicoderProblems,
  fetchYukicoderSolvedProblems
} from "../api/Yukicoder";
import { all, call, put, select } from "redux-saga/effects";
import {
  receiveProblems,
  receiveSubmissions
} from "../actions/ExternalApiActions";
import { State } from "../common";

export function* requestAndReceiveProblems() {
  const fns = [
    fetchAtCoderProblems,
    fetchCodeforcesProblems,
    fetchAOJProblems,
    fetchYukicoderProblems
  ];
  yield all(
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
  );
}

export function* requestAndReceiveSubmissions() {
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
