import { select, call, put } from "redux-saga/effects";
import {
  clearToken,
  receiveData,
  receiveToken
} from "../actions/PoolApiActions";
import { syncPoolData, SyncResponse } from "../pool-api";
import { parseToken } from "../common/Token";
import { State } from "../common";
import { convertToSaveData } from "../common/LocalStorage";
import * as LocalStorage from "../common/LocalStorage";

export function* sendDataToPoolApi() {
  console.log("About to send data...");
  const saveData = yield select((state: State) => convertToSaveData(state));

  if (saveData.token !== undefined) {
    try {
      const response = yield call(
        syncPoolData,
        saveData.token.token,
        JSON.stringify(saveData)
      );
      const refreshedToken = parseToken(response.refreshedToken);
      if (refreshedToken !== undefined) {
        yield put(receiveToken(refreshedToken));
      } else {
        yield put(clearToken());
      }
    } catch (e) {
      yield put(clearToken());
    }
  } else {
    yield put(clearToken());
  }
}

export function* saveDataToLocal() {
  const state = yield select((state: State) => state);
  yield call(LocalStorage.saveState, state);
}

export function* pullDataFromPoolApi() {
  const token = yield select((state: State) => state.token);
  if (token !== undefined) {
    try {
      const response: SyncResponse = yield call(
        syncPoolData,
        token.token,
        undefined
      );

      const newToken = parseToken(response.refreshedToken);
      if (newToken !== undefined) {
        yield put(receiveToken(newToken));
      }
      if (response.loadedData !== undefined) {
        yield put(receiveData(response.loadedData));
      }
    } catch (e) {
      console.error(e);
      yield put(clearToken());
    }
  }
}
