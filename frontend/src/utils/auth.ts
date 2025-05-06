import { jwtDecode } from "jwt-decode";
import { TokenPayload } from "../interfaces/TokenPayload"

export const isTokenValid = (token: string | null): TokenPayload | null => {
  if (!token) return null;

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const now = Date.now() / 1000;
    return decoded.exp > now ? decoded : null;
  } catch (error) {
    console.error("Invalid token format or decoding error.");
    return null;
  }
};
