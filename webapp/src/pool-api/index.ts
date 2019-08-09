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

export const syncPoolData = (token: string, saved_data: string | undefined) => {
  const body = JSON.stringify({ token, saved_data });
  return fetch(BASE_URL + "/sync", {
    method: "POST",
    body
  })
    .then(r => r.json())
    .then(
      (r: { token: string; loaded_data: string | null }): SyncResponse => ({
        refreshedToken: r.token,
        loadedData: r.loaded_data
      })
    );
};

export interface SyncResponse {
  refreshedToken: string;
  loadedData: string | null;
}
