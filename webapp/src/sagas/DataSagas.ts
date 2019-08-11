import { select, call } from "redux-saga/effects";
import { State } from "../common";
import * as LocalStorage from "../common/LocalStorage";

export function* saveDataToLocal() {
  const state = yield select((state: State) => state);
  yield call(LocalStorage.saveState, state);
}
