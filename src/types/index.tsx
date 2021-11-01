const logo = 'https://ocupath.fra1.digitaloceanspaces.com/app/logo.png'
const logo2x = 'https://ocupath.fra1.digitaloceanspaces.com/app/logo2x.svg'
const logosvg = 'https://ocupath.fra1.digitaloceanspaces.com/app/multi.svg'
const upload = 'https://ocupath.fra1.digitaloceanspaces.com/app/Group%20348.svg'
const dropimages = 'https://ocupath.fra1.digitaloceanspaces.com/app/dropimages.svg'
const dropimages360 = 'https://ocupath.fra1.digitaloceanspaces.com/app/dropimages360.svg'
const dropvideo = 'https://ocupath.fra1.digitaloceanspaces.com/app/dropvideos.svg'
const dropvideo360 = 'https://ocupath.fra1.digitaloceanspaces.com/app/dropvideos360.svg'
const landing1 = 'https://ocupath.fra1.digitaloceanspaces.com/app/landing1.png'
const landing2 = 'https://ocupath.fra1.digitaloceanspaces.com/app/landing2.png'
const landing3 = 'https://ocupath.fra1.digitaloceanspaces.com/app/landing3.png'
const landing4 = 'https://ocupath.fra1.digitaloceanspaces.com/app/landing.png'
const landingLogin = 'https://ocupath.fra1.digitaloceanspaces.com/app/login.png'
const godown = 'https://ocupath.fra1.digitaloceanspaces.com/app/godown.png'
const sidequest = 'https://ocupath.fra1.digitaloceanspaces.com/app/sidequest.png'
const steam = 'https://ocupath.fra1.digitaloceanspaces.com/app/steam.png'
const logichiquito = 'https://ocupath.fra1.digitaloceanspaces.com/app/logochiquito.png'
const powered = 'https://ocupath.fra1.digitaloceanspaces.com/app/powered.png'
const iconoInfo = 'https://ocupath.fra1.digitaloceanspaces.com/app/powered.png'
const preload = '/assets/images/preload.png'
const preview = 'https://ocupath.fra1.digitaloceanspaces.com/app/preview.png'



//logging
export enum LOG_A {
  RESET_PASS_SUCCESS = "RESET_PASS_SUCCESS",
  CONFIRM_PASS_SUCCESS = "CONFIRM_PASS_SUCCESS",
  RECOVER_PASS_SUCCESS = "RECOVER_PASS_SUCCESS",
  INVITE_USER_SUCCESS = "INVITE_USER_SUCCESS",
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_ERROR = "LOGIN_ERROR",
  CLOSE_SESION = "CLOSE_SESION",
}
//admins
export enum AD_A {
  REGISTER_ADM_SUCCES = "REGISTER_ADM_SUCCES",
  DELETE_ADM_SUCCESS = "DELETE_ADM_SUCCESS",
  UPDATE_ADM_SUCCESS = "UPDATE_ADM_SUCCESS",
  SUSPEND_ADM_SUCCESS = "SUSPEND_ADM_SUCCESS",
  ADMIN_CHILD_DETAIL = "ADMIN_CHILD_DETAIL",
  USER_CHILD_DETAIL = "USER_CHILD_DETAIL",
  DELETE_PERIOD = "DELETE_PERIOD",
  INVITE_USER_ERROR_EMAIL = "INVITE_USER_ERROR_EMAIL",
  DELETE_SUCCESS = "DELETE_SUCCESS",
}
//Users-Guest
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
//Assets
export enum AS_A {
  CREATE_SUCCESS = "CREATE_SUCCESS",
  DELETE_SUCCESS = "DELETE_SUCCESS",
  GET_ASSETS = "GET_ASSETS",
}
//miscelanea
export enum MIS {
  OPEN_PREVIEWER = "OPEN_PREVIEWER",
  CLOSE_PREVIEWER = "CLOSE_PREVIEWER",
  SELECT_ASSET = "SELECT_ASSET",
  NEXT_PREVIEW = "NEXT_PREVIEW",
  PREV_PREVIEW = "PREV_PREVIEW",

}


export const ROUTES = {
  login: "/login",

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
  //Usuarios
  create: "api/sesion/user",
  update: "api/user",
  addPeriod: "api/user/addperiod",
  deletePeriod: "api/user/deleteperiod",
  delete: "api/user/deleteuser",
  //Assets
  createAsset: "api/asset",
  deleteAsset: "/api/asset",
  assets: "api/asset/",
  urlUploadImage:'api/upload/1',
  urlUploadImage360:'api/upload/2',
  urlUploadVideo:'api/upload/3',
  urlUploadVideo360:'api/upload/4',
  urlUploadRoom:'api/upload/6',
  //emails
  urlSendInformation:'api/sesion/info'
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
  white:'#fff',
  gray:'#A8A8A8',
  GRAY_MEDIUM:'#C4C4C4',
  gray_header:'#767b8a',
  gray_primary:'#a6abaf',
  gray_secondary:'#7a8690',
  gray_admin:'#2b334a',
  blue_primary:'#000D34',
  blue_secondary:'#45A0C5',
  blue_selected:'#76D3F8',
  selected:'#2c3d71',
  blue_header:'#32406a',
  red_error:'#bb2929',
}

export const Images = {
  drop:{
    dropimages,
    dropimages360,
    dropvideo,
    dropvideo360
  },
  preview,
  logo,
  logo2x,
  logosvg,
  upload,
  landing1,
  landing2,
  landing3,
  landing4,
  landingLogin,
  godown,
  sidequest,
  steam,
  logichiquito,
  powered,
  preload
}