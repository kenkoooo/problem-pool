import { Token } from "../common/Token";
import { SaveData } from "../common/LocalStorage";

export const REQUEST_TOKEN = "REQUEST_TOKEN";
export const RECEIVE_TOKEN = "RECEIVE_TOKEN";
export const SEND_DATA = "SEND_DATA";
export const REQUEST_DATA = "REQUEST_DATA";
export const RECEIVE_DATA = "RECEIVE_DATA";

export const requestToken = (
  userId: string,
  password: string,
  register: boolean
) => ({
  type: REQUEST_TOKEN as typeof REQUEST_TOKEN,
  userId,
  password,
  register
});

export const receiveToken = (token: Token) => ({
  type: RECEIVE_TOKEN as typeof RECEIVE_TOKEN,
  token
});

export const sendData = (saveData: SaveData, token: Token) => ({
  type: SEND_DATA as typeof SEND_DATA,
  saveData,
  token
});

export const requestData = (token: Token) => ({
  type: REQUEST_DATA as typeof REQUEST_DATA,
  token
});

export const receiveData = (token: Token, rawData: string) => ({
  type: RECEIVE_DATA as typeof RECEIVE_DATA,
  rawData
});

export type PoolApiActionType =
  | ReturnType<typeof requestToken>
  | ReturnType<typeof receiveToken>
  | ReturnType<typeof sendData>
  | ReturnType<typeof requestData>
  | ReturnType<typeof receiveData>;
