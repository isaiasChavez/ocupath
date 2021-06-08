import axios from "axios";
import { Config } from ".";

const clienteAxios = axios.create({
  baseURL: Config.BASE_URL,
});

export const tokenAuth = (token) => {
  if (token) {
    console.log(Config.TOKEN_NAME_HEADER, { token });
    clienteAxios.defaults.headers.common[Config.TOKEN_NAME_HEADER] = token;
  } else {
    delete clienteAxios.defaults.headers.common[Config.TOKEN_NAME_HEADER];
  }
};

export default clienteAxios;
