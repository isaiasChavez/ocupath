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

tokenAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InV1aWQiOiI2MTY3Yjk5ZS1kZTkxLTRiNzAtODgxYy04YTVhOTBiZjE1YzEiLCJ0eXBlIjoyfSwiaWF0IjoxNjI3MDEyNjc2LCJleHAiOjE2NjMwMTI2NzZ9.bGi7xQ7zDnC62ngFUTxDNfxvK92t356_lD7OXoSiI5E')

export default clienteAxios;
