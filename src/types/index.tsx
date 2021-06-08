export enum LOG_A {
  RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS",
  CONFIRM_PASS_SUCCESS = "CONFIRM_PASS_SUCCESS",
  RECOVER_PASS_SUCCESS = "RECOVER_PASS_SUCCESS",
  INVITE_USER_SUCCESS = "INVITE_USER_SUCCESS",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  CLOSE_SESION = "CLOSE_SESION",
}
export enum AD_A {
  REGISTER_ADM_SUCCES = "REGISTER_ADM_SUCCES",
  DELETE_ADM_SUCCESS = "DELETE_ADM_SUCCESS",
  UPDATE_ADM_SUCCESS = "UPDATE_ADM_SUCCESS",
  SUSPEND_ADM_SUCCESS = "SUSPEND_ADM_SUCCESS",
}
export enum US_A {
  REGISTER_SUCCES = "REGISTER_SUCCES",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  UPDATE_SUCCESS = "UPDATE_SUCCESS",
  PAUSE_SUCCESS = "PAUSE_SUCCESS",
}
export enum AS_A {
  CREATE_SUCCESS = "CREATE_SUCCESS",
  DELETE_SUCCESS = "DELETE_SUCCESS",
}

export const URLS = {
  login: "api/sesion",
  logout: "api/sesion/logout",
  invite: "api/user/invite",
  reset: "api/user/requestreset/", //:email
  confirmpass: "api/user/confirm",
  recoverpass: "api/user/confirm",
  //Administrador
  createAdm: "api/user/admin",
  updateAdm: "api/user/admin",
  suspendAdm: "/api/user/suspend",
  deleteAdm: "api/user/deleteadmin",
  //Usuarios
  create: "api/user",
  update: "api/user",
  delete: "api/user/deleteuser",
  //Assets
  createAsset: "api/asset",
  deleteAsset: "/api/asset",
  assets: "api/asset/",
};
