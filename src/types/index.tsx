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
  decifre: "api/sesion/des/", //:token
  logout: "api/sesion/logout",
  invite: "api/user/invite",
  reset: "api/sesion/requestreset/", //:email
  confirmpass: "api/user/confirm",
  recoverpass: "api/sesion/recovery",
  //Administrador
  createAdm: "api/sesion/admin",
  updateAdm: "api/user/admin",
  suspendAdm: "/api/user/suspend",
  deleteAdm: "api/user/deleteadmin",
  //Usuarios
  create: "api/sesion/user",
  update: "api/user",
  delete: "api/user/deleteuser",
  //Assets
  createAsset: "api/asset",
  deleteAsset: "/api/asset",
  assets: "api/asset/",
};

export const COMPANIES =0
export const GUEST =1

export enum INVITATIONS {
  COMPANIES = "COMPANIES",
  GUEST = "GUEST",
}

export enum FILES {
  IMG = 0,
  IMG_360 = 1,
  VIDEO = 2,
  VIDEO_360 = 3,
}

export enum USERS {
  SUPER = 0,
  ADMIN = 1,
  GUEST = 2,
}

export const COLORS = {
  gray:'#A8A8A8',
  GRAY_MEDIUM:'#C4C4C4',
}