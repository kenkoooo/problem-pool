const BASE_URL = "https://pool-api.kenkoooo.com/v1";
export const login = (userId: string, password: string) =>
  fetch(BASE_URL + "/login", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, password }),
    headers: {
      Accept: "application/json"
    }
  });
export const register = (userId: string, password: string) =>
  fetch(BASE_URL + "register", {
    method: "POST",
    body: JSON.stringify({ user_id: userId, password }),
    headers: {
      Accept: "application/json"
    }
  });
