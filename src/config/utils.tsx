import { AxiosResponse } from "axios";

export const verifyEmail = (email: string): boolean => {
  if (
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
      email
    )
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateResponse = (res: AxiosResponse): boolean => {
  let isValid: boolean;
  const { data } = res;
  if (data.status === 0) {
    isValid = true;
  }
  return isValid;
};

export const preventDefault = (event) => event.preventDefault();
