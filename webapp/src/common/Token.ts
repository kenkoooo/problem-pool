export interface Token {
  expireTimeSecond: number;
  userId: string;
  token: string;
}
export const parseToken = (token: string): Token | null => {
  try {
    const tokens = token.split(".");
    const { expire_time_second, user_id } = JSON.parse(atob(tokens[1]));
    return { expireTimeSecond: expire_time_second, userId: user_id, token };
  } catch {
    return null;
  }
};

export const isValidToke = (token: Token) =>
  token.expireTimeSecond > Date.now() / 1000;
