import { takeEvery, all, call, put, fork, select } from "redux-saga/effects";
import * as Api from "../api";
import * as Actions from "../actions";
import { getProblems } from "../selectors";

function* requestProblems() {
  yield takeEvery(Actions.FETCH_PROBLEMS, function*() {
    const currentProblems = yield select(getProblems);
    if (currentProblems.isEmpty()) {
      const problems = yield call(Api.fetchAtCoderProblems);
      yield put(Actions.receiveProblems(problems));
    }
  });
}

export function* rootSaga() {
  yield all([fork(requestProblems)]);
}
