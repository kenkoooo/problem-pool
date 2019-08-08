const BASE_URL = "https://pool-api.kenkoooo.com/v1";

export const loginPool = (
  userId: string,
  password: string,
  register: boolean
) =>
  fetch(BASE_URL + "/login", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, password, register })
  })
    .then(r => r.json())
    .then(r => r as LoginResponse);

export interface LoginResponse {
  readonly token: string;
}
