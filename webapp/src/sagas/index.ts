import { all, call, takeLatest, take } from "redux-saga/effects";
import { SAVE_USER_IDS } from "../actions/ConfigActions";
import {
  RECEIVE_DATA,
  RECEIVE_TOKEN,
  REQUEST_LOGIN
} from "../actions/PoolApiActions";
import {
  requestAndReceiveProblems,
  requestAndReceiveSubmissions
} from "./ExternalApiSagas";
import { requestAndReceiveToken } from "./LoginSagas";
import {
  pullDataFromPoolApi,
  saveDataToLocal,
  sendDataToPoolApi
} from "./DataSagas";
import { CREATE_TASK, DELETE_TASK, UPDATE_TASK } from "../actions/TaskActions";

function* login() {
  yield takeLatest(REQUEST_LOGIN, function*(action) {
    yield call(requestAndReceiveToken, action);
    yield call(pullDataFromPoolApi);
    yield call(sendDataToPoolApi);
  });
}

function* syncSubmissions() {
  yield takeLatest(SAVE_USER_IDS, requestAndReceiveSubmissions);
}

function* backupLocal() {
  yield takeLatest(
    [
      CREATE_TASK,
      DELETE_TASK,
      UPDATE_TASK,
      SAVE_USER_IDS,
      RECEIVE_TOKEN,
      RECEIVE_DATA
    ],
    saveDataToLocal
  );
}

function* backupRemote() {
  yield takeLatest(
    [CREATE_TASK, DELETE_TASK, UPDATE_TASK, SAVE_USER_IDS],
    sendDataToPoolApi
  );
}

function* backupRemoteOnce() {
  yield take(RECEIVE_TOKEN);
  yield call(pullDataFromPoolApi);
  yield call(sendDataToPoolApi);
}

function* rootSaga() {
  yield all([
    call(backupRemoteOnce),
    call(backupLocal),
    call(backupRemote),
    call(pullDataFromPoolApi),
    call(requestAndReceiveProblems),
    call(syncSubmissions),
    call(login)
  ]);
}

export default rootSaga;
