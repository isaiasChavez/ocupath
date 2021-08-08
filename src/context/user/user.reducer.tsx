import { Config } from "../../config";
import { US_A,LOG_A,AD_A } from "../../types";


export enum Status {
  ACTIVE=1,
  INACTIVE=2,
  EXPIRED=3,
}


export type Suscription = {
  cost: string,
  createdAt: string,
  finishedAt: string,
  isActive: boolean,
  invitations: number,
  isDeleted: boolean,
  startedAt: string,
};
export type User = {
  avatar: string,
  email: string,
  isActive: boolean,
  uuid: string,
  lastname: string,
  name: string,
  suscriptions: Suscription[],
  lastSuscription: Suscription,
  status:Status
}
export type Childrens = {
  admins: User[],
  users: User[]
}
export type Profile = {
  id: string;
  token: string;
  name: string;
  lastname: string;
  thumbnail: string;
  email: string;
  type: number;
};
export type UserStateType = {
  selectedUser: User,
  typeSelectedUser: number,
  profile: Profile;
  type: number;
  childrens: Childrens,
};

type Actions =
  | { type: "RESET_PASS_SUCCESS"; payload: any }
  | { type: "CONFIRM_PASS_SUCCESS"; payload: any }
  | { type: "RECOVER_PASS_SUCCESS"; payload: any }
  | { type: "INVITE_USER_SUCCESS"; payload: any }
  | { type: "LOGIN_SUCCESS"; payload: any }
  | { type: "CHILDRENS"; payload: any }
  | { type: "GET_USER_DETAIL"; payload: any }
  | { type: "CHILD_DETAIL"; payload: any }
  | { type: "ADMIN_CHILD_DETAIL"; payload: any }
  | { type: "UPDATE_NAME"; payload: any }
  
  | { type: "LOGIN_ERROR"; payload: any }
  | { type: "CLOSE_SESION"; payload: any }
  | { type: "SELECT_USER"; payload: any }
  | { type: "REGISTER_ADM_SUCCES"; payload: any }
  | { type: "DELETE_ADM_SUCCESS"; payload: any }
  | { type: "UPDATE_ADM_SUCCESS"; payload: any }
  | { type: "SUSPEND_ADM_SUCCESS"; payload: any }
  | { type: "DELETE_SUCCESS"; payload: any }
  | { type: "UPDATE_SUCCESS"; payload: any }
  | { type: "PAUSE_SUCCESS"; payload: any }
  | { type: "REGISTER_SUCCES"; payload: any };


const userReducer = (state: UserStateType,action: Actions): UserStateType => {
  const { payload } = action;

  switch (action.type) {
    case LOG_A.LOGIN_SUCCESS:
      console.log(LOG_A.LOGIN_SUCCESS,{ payload });
      localStorage.setItem(Config.TOKEN_NAME_INTERN,payload.profile.token);
      return {
        ...state,
        profile: payload.profile,
        type: payload.profile.type,
      };


    case LOG_A.CONFIRM_PASS_SUCCESS:
      console.log(LOG_A.CONFIRM_PASS_SUCCESS,{ payload });
      return {
        ...state,
      };
    case LOG_A.RECOVER_PASS_SUCCESS:
      console.log(LOG_A.RECOVER_PASS_SUCCESS,{ payload });
      return {
        ...state,
      };
    case LOG_A.INVITE_USER_SUCCESS:
      console.log(LOG_A.INVITE_USER_SUCCESS,{ payload });
      if (payload.status === 0) {
        alert("Se ha registrado correctamente")
      }
      return {
        ...state,
      };
    case LOG_A.LOGIN_ERROR:
      console.log(LOG_A.LOGIN_ERROR,{ payload });
      return {
        ...state,
      };
    case LOG_A.CLOSE_SESION:
      console.log(LOG_A.CLOSE_SESION,{ payload });
      return {
        ...state,
      };
    case US_A.GET_USER_DETAIL:
      let newState = {
        ...state,
        profile: {
          ...state.profile,
          ...payload
        },
        type: payload.type,
      };
      console.log({ newState })
      return newState
    case US_A.CHILDRENS:
      console.log(US_A.CHILDRENS,{ payload });
      return {
        ...state,
        profile: payload.profile,
        type: payload.profile.type,
        childrens: payload.childrens,
      };
    case US_A.SELECT_USER:
      console.log(US_A.SELECT_USER,{ payload });
      return {
        ...state,
        selectedUser: payload.user,
        typeSelectedUser: payload.type
      };
    case US_A.REGISTER_SUCCES:
      console.log(US_A.REGISTER_SUCCES,{ payload });
      return {
        ...state,
      };
    case US_A.DELETE_SUCCESS:
      console.log(US_A.DELETE_SUCCESS,{ payload });
      const newDelete = { ...state.childrens }
      newDelete.users = newDelete.users.filter(user => user.uuid !== payload.user.uuid)
      return {
        ...state,
        childrens: newDelete
      };
    case US_A.PAUSE_SUCCESS:
      console.log(US_A.PAUSE_SUCCESS,{ payload });
      const newChildrens = { ...state.childrens }
      newChildrens.users = newChildrens.users.map(user => {
        if (user.uuid === payload.user.uuid) {
          return {
            ...user,
            ...payload.user
          }
        }
        return user
      })
      return {
        ...state,
        childrens: newChildrens
      };
    case AD_A.SUSPEND_ADM_SUCCESS:
      console.log(AD_A.SUSPEND_ADM_SUCCESS,{ payload });
      const newSupendAdmin = { ...state.childrens }
      newSupendAdmin.admins = newSupendAdmin.admins.map(admin => {
        if (admin.uuid === payload.admin.uuid) {
          return {
            ...admin,
            ...payload.admin
          }
        }
        return admin
      })

      return {
        ...state,
        childrens: newSupendAdmin
      };
    case US_A.UPDATE_SUCCESS:
      console.log(US_A.UPDATE_SUCCESS,{payload})
      return {
        ...state,
        profile:{
          ...state.profile,
          ...payload.user
        }
      };
      case US_A.CHILD_DETAIL:
      console.log(US_A.CHILD_DETAIL,{ payload });
      return {
        ...state,
      };
      case AD_A.ADMIN_CHILD_DETAIL:
        console.log(AD_A.ADMIN_CHILD_DETAIL,{ payload });
        return {
          ...state,
          selectedUser:{
            ...state.selectedUser,
            ...payload.admin
          }
        };
    case AD_A.DELETE_ADM_SUCCESS:
      console.log(AD_A.DELETE_ADM_SUCCESS,{ payload });
      return {
        ...state,
      };
    case AD_A.REGISTER_ADM_SUCCES:
      console.log(AD_A.REGISTER_ADM_SUCCES,{ payload });
      return {
        ...state,
      };

    case AD_A.UPDATE_ADM_SUCCESS:
      console.log(AD_A.UPDATE_ADM_SUCCESS,{ payload });
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
