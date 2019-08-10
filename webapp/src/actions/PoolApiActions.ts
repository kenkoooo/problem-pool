import { Token } from "../common/Token";

export const REQUEST_LOGIN = "REQUEST_LOGIN";
export const RECEIVE_TOKEN = "RECEIVE_TOKEN";
export const CLEAR_TOKEN = "CLEAR_TOKEN";

export const RECEIVE_DATA = "RECEIVE_DATA";

export const requestLogin = (
  userId: string,
  password: string,
  register: boolean
) => ({
  type: REQUEST_LOGIN as typeof REQUEST_LOGIN,
  userId,
  password,
  register
});

export const receiveToken = (token: Token) => ({
  type: RECEIVE_TOKEN as typeof RECEIVE_TOKEN,
  token
});

export const clearToken = () => ({
  type: CLEAR_TOKEN as typeof CLEAR_TOKEN
});

export const receiveData = (rawData: string) => ({
  type: RECEIVE_DATA as typeof RECEIVE_DATA,
  rawData
});

export type PoolApiActionType =
  | ReturnType<typeof requestLogin>
  | ReturnType<typeof receiveToken>
  | ReturnType<typeof clearToken>
  | ReturnType<typeof receiveData>;
