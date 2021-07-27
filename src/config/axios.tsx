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

tokenAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InV1aWQiOiI3MTA1ZDNmYy05M2ZiLTQzZmMtYWRmNC0wYjhkZmY3NTdlNzQiLCJ0eXBlIjoxfSwiaWF0IjoxNjI3MzQwNTM4LCJleHAiOjE2NjMzNDA1Mzh9.Pk76xiqXXgg4LupeZghep7A3_89tQFt7RzSxRm48x8U')
// tokenAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InV1aWQiOiI2MTY3Yjk5ZS1kZTkxLTRiNzAtODgxYy04YTVhOTBiZjE1YzEiLCJ0eXBlIjoyfSwiaWF0IjoxNjI3MzQ1NDM2LCJleHAiOjE2NjMzNDU0MzZ9.RuxIJ6yhbKYy0g_tVvE_ws7gw_Mf68p_C6eEl4MrRTY')


export default clienteAxios;
