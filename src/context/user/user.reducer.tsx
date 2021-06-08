import { Config } from "../../config";
import { US_A, LOG_A, AD_A } from "../../types";
export type Profile = {
  id: string;
  token: string;
  name: string;
  lastname: string;
  email: string;
  childrens: [];
};
export type UserStateType = {
  profile: Profile;
  type: number;
};

type Actions =
  | { type: "RESET_PASS_SUCCESS"; payload: any }
  | { type: "CONFIRM_PASS_SUCCESS"; payload: any }
  | { type: "RECOVER_PASS_SUCCESS"; payload: any }
  | { type: "INVITE_USER_SUCCESS"; payload: any }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "LOGIN_ERROR"; payload: any }
  | { type: "CLOSE_SESION"; payload: any }
  | { type: "REGISTER_ADM_SUCCES"; payload: any }
  | { type: "DELETE_ADM_SUCCESS"; payload: any }
  | { type: "UPDATE_ADM_SUCCESS"; payload: any }
  | { type: "SUSPEND_ADM_SUCCESS"; payload: any }
  | { type: "DELETE_SUCCESS"; payload: any }
  | { type: "UPDATE_SUCCESS"; payload: any }
  | { type: "PAUSE_SUCCESS"; payload: any }
  | { type: "REGISTER_SUCCES"; payload: any };

const userReducer = (state: UserStateType, action: Actions): UserStateType => {
  const { payload } = action;

  switch (action.type) {
    case LOG_A.LOGIN_SUCCESS:
      console.log(LOG_A.LOGIN_SUCCESS, { payload });
      localStorage.setItem(Config.TOKEN_NAME_INTERN, payload.profile.token);
      return {
        ...state,
        profile: payload.profile,
        type: payload.type,
      };
    case LOG_A.CONFIRM_PASS_SUCCESS:
      console.log(LOG_A.CONFIRM_PASS_SUCCESS, { payload });
      return {
        ...state,
      };
    case LOG_A.RECOVER_PASS_SUCCESS:
      console.log(LOG_A.RECOVER_PASS_SUCCESS, { payload });
      return {
        ...state,
      };
    case LOG_A.INVITE_USER_SUCCESS:
      console.log(LOG_A.INVITE_USER_SUCCESS, { payload });
      return {
        ...state,
      };
    case LOG_A.LOGIN_ERROR:
      console.log(LOG_A.LOGIN_ERROR, { payload });
      return {
        ...state,
      };
    case LOG_A.CLOSE_SESION:
      console.log(LOG_A.CLOSE_SESION, { payload });
      return {
        ...state,
      };
    case US_A.REGISTER_SUCCES:
      console.log(US_A.REGISTER_SUCCES, { payload });
      return {
        ...state,
      };
    case US_A.DELETE_SUCCESS:
      console.log(US_A.DELETE_SUCCESS, { payload });
      return {
        ...state,
      };
    case US_A.PAUSE_SUCCESS:
      console.log(US_A.PAUSE_SUCCESS, { payload });
      return {
        ...state,
      };
    case US_A.UPDATE_SUCCESS:
      console.log(US_A.UPDATE_SUCCESS, { payload });
      return {
        ...state,
      };
    case AD_A.DELETE_ADM_SUCCESS:
      console.log(AD_A.DELETE_ADM_SUCCESS, { payload });
      return {
        ...state,
      };
    case AD_A.REGISTER_ADM_SUCCES:
      console.log(AD_A.REGISTER_ADM_SUCCES, { payload });
      return {
        ...state,
      };
    case AD_A.SUSPEND_ADM_SUCCESS:
      console.log(AD_A.SUSPEND_ADM_SUCCESS, { payload });
      return {
        ...state,
      };
    case AD_A.UPDATE_ADM_SUCCESS:
      console.log(AD_A.UPDATE_ADM_SUCCESS, { payload });
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
