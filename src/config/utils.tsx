import { AxiosResponse } from "axios";
import { LOG_A } from "../types";

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
export const verifyPassword = (pass: string) => {
  if (pass.length >= 8) {
    let mayuscula = false;
    let minuscula = false;
    let numero = false;
    let caracter_raro = false;

    for (let i = 0; i < pass.length; i++) {
      if (pass.charCodeAt(i) >= 65 && pass.charCodeAt(i) <= 90) {
        mayuscula = true;
      } else if (pass.charCodeAt(i) >= 97 && pass.charCodeAt(i) <= 122) {
        minuscula = true;
      } else if (pass.charCodeAt(i) >= 48 && pass.charCodeAt(i) <= 57) {
        numero = true;
      } else {
        caracter_raro = true;
      }
    }
    if (
      mayuscula == true &&
      minuscula == true &&
      caracter_raro == true &&
      numero == true
    ) {
      return true;
    }
  }
  return false;
};

export const validateResponse = (res: AxiosResponse, type: string): boolean => {
  const NOT_FOUND = 1;
  let isValid: boolean = false;
  const { data } = res;
  const { status } = data;
  if (status === 0) {
    isValid = true;
    alert("Todo ok");
  } else {
    switch (type) {
      case LOG_A.RECOVER_PASS_SUCCESS:
        switch (status) {
          case NOT_FOUND:
            alert("No se ha encontrado el usuario solicitado");
            break;
          case 5:
            alert("Operación no permitida");
            break;
          default:
            break;
        }
        break;
      default:
        break;
    }
  }

  return isValid;
};

export const preventDefault = (event) => event.preventDefault();
