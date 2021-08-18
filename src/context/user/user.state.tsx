import { useReducer, useState } from "react";
import axios, { tokenAuth } from "../../config/axios";
import { useRouter } from "next/router";
import UserContext, {
  AddNewSuscriptionSuscriptionDTO,
  ChangeName,
  ConfirmUserPassword,
  CreateAdminDTO,
  CreateUserDTO,
  DeleteOrSuspendAdminUserDTO,
  DeleteOrSuspendUserDTO,
  GetAdminDetailDTO,
  GetUserDetailDTO,
  InviteUserDTO,
  ResetPassword,
  UpdateUserAdminDTO,
  UpdateUserDTO,
} from "./user.context";

import { AD_A, US_A, LOG_A, URLS,USERS } from "../../types/index";
import UserReducer, { Profile, User, UserStateType } from "./user.reducer";
import { LoginDTO } from "../../types/types";
import { validateResponse } from "../../config/utils";
import { validateOrReject } from "class-validator";

const UserState = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true)
  const [state, dispatch] = useReducer(UserReducer, initialState());
  const resetPass = async (resetPassword: ResetPassword) => {
    try {
      await validateOrReject(resetPassword);
      const { data } = await axios.post(URLS.recoverpass, resetPassword);
      
      console.log({data})
      dispatch({
        type: LOG_A.RESET_PASS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating passRecover ** ", { error });
      console.error({ error });
    }
  };
  const validateToken = async (token: string) => {
    try {
      setLoading(true)
      const url =  `${URLS.validateToken}${token}`
      const { data } = await axios.post( `${url}`, );
      setLoading(false)
      console.log({data})
      return data.status
    } catch (error) {
      setLoading(false)

      console.error({ error });
      alert("Error en el servidor")
      return 1
    }
  };

  const confirmPass = async (confirmUserPassword: ConfirmUserPassword) => {
    try {
      await validateOrReject(confirmUserPassword);
      const { data } = await axios.post(URLS.confirmpass);
      dispatch({
        type: LOG_A.CONFIRM_PASS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating passRecover ** ", { error });
    }
  };

  const passRecover = async (passwordRecovery: ResetPassword) => {
    try {
      await validateOrReject(passwordRecovery);
      console.log({ passwordRecovery });
      const response = await axios.post(
        `${URLS.reset}${passwordRecovery.email}`
      );
      if (validateResponse(response, LOG_A.RECOVER_PASS_SUCCESS)) {
        dispatch({
          type: LOG_A.RECOVER_PASS_SUCCESS,
          payload: response.data,
        });
      }
    } catch (error) {
      console.error("** Error validating passRecover ** ", { error });
    }
  };

  const inviteUser = async (inviteUserDTO: InviteUserDTO) => {
    try {
      const newInvite = new InviteUserDTO(inviteUserDTO)
      await validateOrReject(newInvite);

      console.log({inviteUserDTO})
      const { data } = await axios.post(URLS.invite,inviteUserDTO);
      

      dispatch({
        type: LOG_A.INVITE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating inviteUser ** ", { error });
    }
  };
  const getUserChildrens = async () => {
    try {
      setLoading(true)
      const { data } = await axios.post(URLS.childrens);
      console.log({data})
      setLoading(false)
      if (data.status ===0) {
        dispatch({
          type: US_A.CHILDRENS,
          payload: data,
        });
        
      }
    } catch (error) {
      setLoading(false)
      console.error("** Error geting user childrens ** ", { error });
    }
  };

  const addUserAdm = async (createUserAdmDTO: CreateAdminDTO) => {
    try {
      await validateOrReject(createUserAdmDTO);
      const { data } = await axios.post(URLS.createAdm, createUserAdmDTO);
      if (data.status ===0) {
          alert("Registro exitoso")
          router.push("/login");
      }
      if (data.status ===2) {
          alert("El email ya existe")
      }
      if (data.status === 3) {
        alert("Se ha enviado la invitación pero el correo no existe")
      }
      dispatch({ type: AD_A.REGISTER_ADM_SUCCES, payload: data });
      return data.status
    } catch (error) {
      console.error("** Error validating addUserAdm ** ", { error });
    }
  };

  const getUserDetail = async () => {
    try {
      console.log("getUserDetail")
      setLoading(true)
      const { data } = await axios.get(URLS.userDetail);
      setLoading(false)
      if (data.status ===0) {
        dispatch({ type: US_A.GET_USER_DETAIL, payload: data.profile });
      }
    } catch (error) {
      setLoading(false)
      console.error("** Error validating addUserAdm ** ", { error });
    }
  };
  
  const getUserChildDetail = async () => {
    try {
      console.log("==================================")
      console.log(state.selectedUser,"<===")
      const dto = new GetUserDetailDTO(state.selectedUser.uuid)
      await validateOrReject(dto);
      setLoading(true)
      const { data } = await axios.post(URLS.userChildDetail, dto);
      setLoading(false)
  
      if (data.status ===0) {
        dispatch({ type: AD_A.USER_CHILD_DETAIL, payload: data });
      }
      if (data.status ===2) {
        alert("El email ya existe")
      }

    } catch (error) {
      setLoading(false)
      console.error("** Error validating getUserChildDetail ** ", { error });
    }
  };
  const getAdminChildDetail = async (uuid) => {
    try {
      const dto = new GetAdminDetailDTO(uuid)
      console.log({dto})
      await validateOrReject(dto);
      const { data } = await axios.post(URLS.adminChildDetail, dto);
      console.log({data},AD_A.ADMIN_CHILD_DETAIL)
      dispatch({ type: AD_A.ADMIN_CHILD_DETAIL, payload: data });
      // if (data.status ===0) {
      //     alert("Registro exitoso")
      // }
      // if (data.status ===2) {
      //     alert("El email ya existe")
      // }
      // return data.status


    } catch (error) {
      console.error("** Error validating addUserAdm ** ", { error });
    }
  };

  const selectUser = async (user:User,type:number) => {
    console.log("selectUser")
    try {
      dispatch({
        type: US_A.SELECT_USER,
        payload: {
        user,type
        },
      });
    } catch (error) {
      console.error("** Error  selecting User ** ", { error });
    }
  };

  const updateName =async (name:string): Promise<{status:number,name:string}> => {
    try {
      const changeNameDTO = new ChangeName(name)
      await validateOrReject(changeNameDTO);
      const { data } = await axios.post(URLS.updateName, changeNameDTO);
      if (data.status ===0) {
        dispatch({
          type: US_A.UPDATE_SUCCESS,
          payload: name,
        });
        return {status:data.status,name}
      }
      return null
    } catch (error) {
      console.error("** Error validating deleteUserAdm ** ", { error });
    }
  }
  

  const deleteUserAdm = async () => {
    try {

      const deleteAdminUserDTO = new DeleteOrSuspendAdminUserDTO(state.selectedUser.uuid,!state.selectedUser.isActive)
      await validateOrReject(deleteAdminUserDTO);
      const { data } = await axios.put(URLS.deleteAdm, deleteAdminUserDTO);
      console.log({data})
      // dispatch({
      //   type: US_A.DELETE_SUCCESS,
      //   payload: data,
      // });
    } catch (error) {
      console.error("** Error validating deleteUserAdm ** ", { error });
    }
  };
  const deleteUser = async () => {
    try {
      const deleteUserDTO = new DeleteOrSuspendUserDTO(state.selectedUser.uuid,!state.selectedUser.isActive)
      await validateOrReject(deleteUserDTO);
console.log({deleteUserDTO})
      const { data } = await axios.put(URLS.delete, deleteUserDTO);
      dispatch({
        type: US_A.DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating deleteUser ** ", { error });
    }
  };

  const updateUserAdm = async (updateUserAdminDTO: UpdateUserAdminDTO) => {
    try {
      await validateOrReject(updateUserAdminDTO);
      const { data } = await axios.put(URLS.updateAdm, updateUserAdminDTO);
      dispatch({
        type: AD_A.UPDATE_ADM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating updateUserAdm ** ", { error });
    }
  };

  const suspendUserAdm = async () => {
    try {
      const pauseUserAdminDTO = new DeleteOrSuspendAdminUserDTO(state.selectedUser.uuid,!state.selectedUser.isActive)
      await validateOrReject(pauseUserAdminDTO);
      const { data } = await axios.put(URLS.suspendAdm, pauseUserAdminDTO);
      dispatch({
        type: AD_A.SUSPEND_ADM_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating suspendUserAdm ** ", { error });
    }
  };

  const suspendUser = async () => {
    try {
      const suspendUserDTO = new DeleteOrSuspendUserDTO(state.selectedUser.uuid,!state.selectedUser.isActive)
      await validateOrReject(suspendUserDTO);
      console.log({suspendUserDTO})
      const { data } = await axios.put(URLS.suspendUser, suspendUserDTO);
      console.log({data})
      dispatch({
        type: US_A.PAUSE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating suspendUser ** ", { error });
    }
  };

  const addUser = async (createUserDTO: CreateUserDTO) => {
    try {
      await validateOrReject(createUserDTO);
      const { data } = await axios.post(URLS.create, createUserDTO);
      if (data.status ===0) {
          alert("Registro exitoso")
          dispatch({
            type: US_A.REGISTER_SUCCES,
            payload: data,
          });
      }
      if (data.status ===2) {
          alert("El email ya existe")
      } 
        
    } catch (error) {
      console.error("** Error validating addUser ** ", { error });
    }
  };
  
  
  const updateUser = async (updateUserDTO: UpdateUserDTO) => {
    try {

      await validateOrReject(updateUserDTO);
      const { data } = await axios.put(URLS.update, updateUserDTO);
      console.log({data},US_A.UPDATE_SUCCESS)
      if (data.status ===0) {
        dispatch({
          type: US_A.UPDATE_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      console.error("** Error validating updateUser ** ", { error });
    }
  };
 

  const addNewPeriod = async (addNewSuscriptionSuscriptionDTO: AddNewSuscriptionSuscriptionDTO) => {
    try {

      setLoading(true)
      await validateOrReject(addNewSuscriptionSuscriptionDTO);
      
      const { data } = await axios.put(URLS.addPeriod, addNewSuscriptionSuscriptionDTO);
      console.log("addNewPeriod:",{data})
      if (data.status ===0) {
        await getUserChildrens()
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.error("** Error validating updateUser ** ", { error });
    }
  };


  const logUser = async (loginDTO: LoginDTO) => {
    try {
      await validateOrReject(loginDTO);
      const {data} = await axios.post(URLS.login, loginDTO);
      console.log({data})
      if (data.status === 0) {
        tokenAuth(data.profile.token);
        dispatch({
          type: LOG_A.LOGIN_SUCCESS,
          payload: {
            ...data
          },
        });
        if (data.profile.type === USERS.SUPER +1) {
          router.push("/superadmin");
        }
        if (data.profile.type === USERS.ADMIN +1 ) {
          router.push("/panel/admin");
        }
        if (data.profile.type === USERS.GUEST+1) {
          router.push("/panel/user");
        }
        return null
      } else {
        return data
      }
    } catch (error) {
      alert("No se ha podido logguear");
    }
  };



  
  return (
    <UserContext.Provider
      value={{
        ...state,
        loading,
        addUser,
        validateToken,
        deleteUser,
        updateUser,
        addUserAdm,
        resetPass,
        suspendUserAdm,
        addNewPeriod,
        updateUserAdm,
        confirmPass,
        deleteUserAdm,
        inviteUser,
        passRecover,
        suspendUser,
        updateName,
        logUser,
        selectUser,
        getUserChildrens,
        getUserDetail,
        getAdminChildDetail,
        getUserChildDetail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const initialState = () => {
  let state: UserStateType = {
    selectedUser:{
      name:'',
      avatar:'',
      email:'',
      isActive:false,
      lastSuscription:{
        cost:"",
        createdAt:"",
        finishedAt:"",
        invitations:0,
        isActive:false,
        isDeleted:false,
        startedAt:""
      },
      suscriptionWaiting:null,
      totalCost:0,
      status:0,
      lastname:'',
      suscriptions:[],
      uuid:''
    },
    typeSelectedUser:0,
    childrens:{
      users:[],
      admins:[],
    },
    profile: {
      id: "",
      token: "",
      name: "",
      lastname: "",
      thumbnail:"",
      email: "",
      type:0
    },
    type: 0,
  };
  return state;
};

export default UserState;
