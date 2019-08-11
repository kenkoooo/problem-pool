import { all, call, takeLatest } from "redux-saga/effects";
import { SAVE_USER_IDS } from "../actions/ConfigActions";
import {
  requestAndReceiveProblems,
  requestAndReceiveSubmissions
} from "./ExternalApiSagas";
import { saveDataToLocal } from "./DataSagas";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../actions/TaskActions";

function* syncSubmissions() {
  yield takeLatest(SAVE_USER_IDS, requestAndReceiveSubmissions);
}

function* backupLocal() {
  yield takeLatest(
    [CREATE_TASK, DELETE_TASK, UPDATE_TASK, SAVE_USER_IDS],
    saveDataToLocal
  );
}

function* rootSaga() {
  yield all([
    call(backupLocal),
    call(requestAndReceiveProblems),
    call(syncSubmissions)
  ]);
}

export default rootSaga;
