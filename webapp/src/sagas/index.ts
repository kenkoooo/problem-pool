import { takeEvery, all, call, put, fork } from "redux-saga/effects";
import { fetchAtCoderProblems } from "../api";
import { FETCH_PROBLEMS, fetchProblems, putProblems } from "../actions";

function* requestProblems() {
  yield takeEvery(FETCH_PROBLEMS, function*(
    action: ReturnType<typeof fetchProblems>
  ) {
    console.log(action);
    if (action.problems.isEmpty()) {
      const problems = yield call(fetchAtCoderProblems);
      yield put(putProblems(problems));
    }
  });
}

export function* rootSaga() {
  yield all([fork(requestProblems)]);
}
