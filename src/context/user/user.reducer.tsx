import { Config } from "../../config";
import { US_A,LOG_A,AD_A,USERS_TYPES } from "../../types";


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
  thumbnail: string,
  email: string,
  isActive: boolean,
  uuid: string,
  lastname: string,
  name: string,
  suscriptions: Suscription[],
  lastSuscription: Suscription,
  suscriptionWaiting:Suscription|null,
  status:Status
  totalCost:undefined|string,
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
  roomImage:string,
  lastSuscription: {
    invitations: number
  }
};
export type UserStateType = {
  canAddMoreChilds:boolean,
  selectedUser: User,
  typeSelectedUser: number,
  profile: Profile;
  type: number;
  childrens: Childrens,
  isSuperAdmin:boolean,
  isAdmin:boolean,
  isGuest:boolean,
  tokenError: string|null,
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
  | { type: "USER_CHILD_DETAIL"; payload: any }
  | { type: "DELETE_PERIOD"; payload: any }
  

  | { type: "UPDATE_NAME"; payload: any }
  | { type: "UPDATE_PERIOD_SUCCESS"; payload: any }
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
      localStorage.setItem(Config.TOKEN_NAME_INTERN,payload.profile.token);
      const isAdmin = payload.profile.type ===USERS_TYPES.ADMIN
      const isGuest = payload.profile.type ===USERS_TYPES.GUEST
      const isSuperAdmin = payload.profile.type ===USERS_TYPES.SUPER_ADMIN
      return {
        ...state,
        profile:{
          ...state.profile,
          ...payload.profile
        },
        type: payload.profile.type,
        isAdmin,
        isGuest,
        isSuperAdmin
      };
    case LOG_A.CONFIRM_PASS_SUCCESS:
      return {
        ...state,
      };
    case LOG_A.RECOVER_PASS_SUCCESS:
      return {
        ...state,
      };
    case LOG_A.INVITE_USER_SUCCESS:
      if (payload.status === 3) {
        return {
          ...state,
          tokenError:payload.token
        };
      }
      return {
        ...state,
        tokenError:payload.token
      };
    case LOG_A.LOGIN_ERROR:
      return {
        ...state,
      };
    case LOG_A.CLOSE_SESION:
      return {
        ...state,
      };
    case US_A.GET_USER_DETAIL:

     const isAdminn = payload.type ===USERS_TYPES.ADMIN
      const isGuestt = payload.type ===USERS_TYPES.GUEST
      const isSuperAdminn = payload.type ===USERS_TYPES.SUPER_ADMIN
      let newState = {
        ...state,
        profile: {
          ...state.profile,
          ...payload,
        },
        isAdmin: isAdminn,
        isGuest:isGuestt,
        isSuperAdminn:isSuperAdminn
      };
      return newState
    case US_A.CHILDRENS:

    if (payload.status ===2) {
      return {
        ...state,
        canAddMoreChilds:true
      }
    }
    const isAdminnn = payload.profile.type === USERS_TYPES.ADMIN
    let canAddMoreChilds:boolean
    if (isAdminnn) {
      const maxAvailableInvitations = state.profile.lastSuscription.invitations 
      const totalChildrensAdded = payload.childrens.admins.length + payload.childrens.users.length
      if (totalChildrensAdded ===0) {
        canAddMoreChilds=true
      }else{
        canAddMoreChilds =  totalChildrensAdded < maxAvailableInvitations  
      }
    }

    return {
        ...state,
        profile:{
          ...state.profile,
          ...payload.profile
        },
        type: payload.profile.type,
        childrens: payload.childrens,
        canAddMoreChilds
      };
    case US_A.SELECT_USER:
      return {
        ...state,
        selectedUser: payload.user,
        typeSelectedUser: payload.type
      };
    case US_A.REGISTER_SUCCES:
      return {
        ...state,
      };
    case US_A.DELETE_SUCCESS:
      const newDelete = { ...state.childrens }
      newDelete.users = newDelete.users.filter(user => user.uuid !== payload.user.uuid)
      return {
        ...state,
        childrens: newDelete
      };
    case US_A.PAUSE_SUCCESS:
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
      return {
        ...state,
        profile:{
          ...state.profile,
          ...payload.user
        }
      };

      
      case US_A.CHILD_DETAIL:
      return {
        ...state,
      };
      case AD_A.DELETE_PERIOD:

      return {
        ...state,
        selectedUser:{
          ...state.selectedUser,
          suscriptionWaiting:null
        }
      };
      
      case AD_A.ADMIN_CHILD_DETAIL:
  
        return {
          ...state,
          selectedUser:{
            ...state.selectedUser,
            ...payload.admin
          }
        };
        case AD_A.USER_CHILD_DETAIL:
          return {
            ...state,
            selectedUser:{
              ...state.selectedUser,
              ...payload.user
            }
          };
    case AD_A.DELETE_ADM_SUCCESS:
      return {
        ...state,
      };
    case AD_A.REGISTER_ADM_SUCCES:
      return {
        ...state,
      };

    case AD_A.UPDATE_ADM_SUCCESS:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default userReducer;
