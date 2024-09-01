import axios from "axios";
import httpStatus from "http-status";

export const isUnAuthorizedError = (error: Error) => {
  if (axios.isAxiosError(error) && error.response) {
    return error.response.status === httpStatus.UNAUTHORIZED;
  }
  if (error instanceof Error) {
    return error.message.includes("401") ||error.message.toLowerCase().includes('unauthorized');
  }
  return false;
}