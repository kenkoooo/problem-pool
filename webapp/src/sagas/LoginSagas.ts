import Action from "../actions";
import { receiveToken, REQUEST_LOGIN } from "../actions/PoolApiActions";
import { call, put } from "@redux-saga/core/effects";
import { loginPool } from "../pool-api";
import { parseToken } from "../common/Token";

export function* requestAndReceiveToken(action: Action) {
  if (action.type === REQUEST_LOGIN) {
    const { userId, password, register } = action;
    const { token: tokenString } = yield call(
      loginPool,
      userId,
      password,
      register
    );
    const token = parseToken(tokenString);
    if (token !== undefined) {
      yield put(receiveToken(token));
    }
  }
}
