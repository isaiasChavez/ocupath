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
  ADMIN_CHILD_DETAIL = "ADMIN_CHILD_DETAIL",
  USER_CHILD_DETAIL = "USER_CHILD_DETAIL",
}
export enum US_A {
  CHILD_DETAIL="CHILD_DETAIL",
  UPDATE_NAME="UPDATE_NAME",
  GET_USER_DETAIL="GET_USER_DETAIL",
  REGISTER_SUCCES = "REGISTER_SUCCES",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  UPDATE_SUCCESS = "UPDATE_SUCCESS",
  PAUSE_SUCCESS = "PAUSE_SUCCESS",
  SELECT_USER = "SELECT_USER",
  UPDATE_PERIOD_SUCCESS="UPDATE_PERIOD_SUCCESS",
  CHILDRENS = "CHILDRENS",
}
export enum AS_A {
  CREATE_SUCCESS = "CREATE_SUCCESS",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  GET_ASSETS = "GET_ASSETS",
}




export const URLS = {
  login: "api/sesion",
  decifre: "api/sesion/des/", //:token
  logout: "api/user/logout",
  invite: "api/user/invite",
  childrens: "api/user/childrens",
  reset: "api/sesion/requestreset/", //:email
  confirmpass: "api/user/confirm",
  recoverpass: "api/sesion/recovery",
  validateToken: "api/sesion/validate/",
  //Administrador
  userDetail: "api/user/detail",
  userChildDetail: "api/user/userinfo",
  adminChildDetail: "api/user/admininfo",
  createAdm: "api/sesion/admin",
  updateAdm: "api/user/admin",
  suspendAdm: "/api/user/suspendadmin",
  suspendUser:'/api/user/suspenduser',
  deleteAdm: "api/user/deleteadmin",
  updateName: "api/user/name",
  //Usuarios
  create: "api/sesion/user",
  update: "api/user",
  addPeriod: "api/user/addperiod",
  delete: "api/user/deleteuser",
  //Assets
  createAsset: "api/asset",
  deleteAsset: "/api/asset",
  assets: "api/asset/",
  urlUploadImage:'api/upload/1',
  urlUploadImage360:'api/upload/2',
  urlUploadVideo:'api/upload/3',
  urlUploadVideo360:'api/upload/4',
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
export enum FILES_TYPES {
  IMG = 1,
  IMG_360 = 2,
  VIDEO = 3,
  VIDEO_360 = 4,
}

export enum USERS {
  SUPER = 0,
  ADMIN = 1,
  GUEST = 2,
}
export enum USERS_TYPES {
  SUPER_ADMIN = 1,
  ADMIN = 2,
  GUEST = 3,
}


export const COLORS = {
  gray:'#A8A8A8',
  GRAY_MEDIUM:'#C4C4C4',
}