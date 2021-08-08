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
// Admin
// tokenAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InV1aWQiOiI2MTY3Yjk5ZS1kZTkxLTRiNzAtODgxYy04YTVhOTBiZjE1YzEiLCJ0eXBlIjoyfSwiaWF0IjoxNjI4MDUxOTcxLCJleHAiOjE2NjQwNTE5NzF9.dOARmTZcMq4ITGaoWGNLySBVfk_Rp4qbwTsOZdkTJjI')
//Superadmin

// tokenAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InV1aWQiOiI3MTA1ZDNmYy05M2ZiLTQzZmMtYWRmNC0wYjhkZmY3NTdlNzQiLCJ0eXBlIjoxfSwiaWF0IjoxNjI4MDQ5MDE5LCJleHAiOjE2NjQwNDkwMTl9.FoPEVDEKasV8eCWTc11mrwsTW7KZvaJgstXyXHdJDR4')


// Usuario
// tokenAuth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c3VhcmlvIjp7InV1aWQiOiJmOWYwYWVhNC1jMTAyLTQ0NzgtYWZjYS02ZDc5YTk2OTdkMGQiLCJ0eXBlIjozfSwiaWF0IjoxNjI4MTI5NTMxLCJleHAiOjE2NjQxMjk1MzF9.d114hAKu4Pri5VmpHNngB7w516xL2DlYmcsQaYFd_r0')

export default clienteAxios;
