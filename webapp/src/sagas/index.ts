import { takeEvery, all, call, put, fork } from "redux-saga/effects";
import * as Api from "../api";
import * as Actions from "../actions";

function* requestProblems() {
  yield takeEvery(Actions.FETCH_PROBLEMS, function*() {
    const problems = yield call(Api.fetchAtCoderProblems);
    yield put(Actions.receiveProblems(problems));
  });
}

export function* rootSaga() {
  yield all([fork(requestProblems)]);
}
