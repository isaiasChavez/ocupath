import { useReducer } from "react";
import axios, { tokenAuth } from "../../config/axios";
import { useRouter } from "next/router";
import UserContext, {
  ConfirmUserPassword,
  CreateAdminDTO,
  CreateUserDTO,
  DeleteAdminUserDTO,
  DeleteUserDTO,
  InviteUserDTO,
  PasswordRecovery,
  ResetPassword,
  UpdateUserAdminDTO,
  UpdateUserDTO,
} from "./user.context";

import { AD_A, US_A, LOG_A, URLS,USERS } from "../../types/index";
import UserReducer, { UserStateType } from "./user.reducer";
import { LoginDTO } from "../../types/types";
import { validateResponse } from "../../config/utils";
import { validateOrReject } from "class-validator";

const UserState = ({ children }) => {
  const router = useRouter();

  const [state, dispatch] = useReducer(UserReducer, initialState());

  const resetPass = async (resetPassword: ResetPassword) => {
    try {
      await validateOrReject(resetPassword);
      const { data } = await axios.put(URLS.recoverpass, resetPassword);
      dispatch({
        type: LOG_A.RESET_PASS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating passRecover ** ", { error });
      console.error({ error });
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
      const response = await axios.get(
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

  const addUserAdm = async (createUserAdmDTO: CreateAdminDTO) => {
    try {

      await validateOrReject(createUserAdmDTO);
      const { data } = await axios.post(URLS.createAdm, createUserAdmDTO);
      if (data.status ===0) {
          alert("Registro exitoso")
      }
      if (data.status ===2) {
          alert("El email ya existe")
      }
      return data.status


      dispatch({ type: AD_A.REGISTER_ADM_SUCCES, payload: data });
    } catch (error) {
      console.error("** Error validating addUserAdm ** ", { error });
    }
  };

  const deleteUserAdm = async (deleteAdminUserDTO: DeleteAdminUserDTO) => {
    try {
      await validateOrReject(deleteAdminUserDTO);
      const { data } = await axios.put(URLS.deleteAdm, deleteAdminUserDTO);
      dispatch({
        type: US_A.DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating deleteUserAdm ** ", { error });
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

  const suspendUserAdm = async (pauseUserAdminDTO: DeleteAdminUserDTO) => {
    try {
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

  const addUser = async (createUserDTO: CreateUserDTO) => {
    try {
      await validateOrReject(createUserDTO);
      const { data } = await axios.post(URLS.create, createUserDTO);
      if (data.status ===0) {
          alert("Registro exitoso")
      }
      if (data.status ===2) {
          alert("El email ya existe")
      } 
      dispatch({
        type: US_A.REGISTER_SUCCES,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating addUser ** ", { error });
    }
  };
  const deleteUser = async (deleteUserDTO: DeleteUserDTO) => {
    try {
      await validateOrReject(deleteUserDTO);
      const { data } = await axios.put(URLS.delete, deleteUserDTO);
      dispatch({
        type: US_A.DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating deleteUser ** ", { error });
    }
  };
  
  const updateUser = async (updateUserDTO: UpdateUserDTO) => {
    try {
      await validateOrReject(updateUserDTO);
      const { data } = await axios.put(URLS.update, updateUserDTO);
      dispatch({
        type: US_A.UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating updateUser ** ", { error });
    }
  };
  const pauseUser = async (pauseUserDTO: DeleteUserDTO) => {
    try {
      await validateOrReject(pauseUserDTO);
      const { data } = await axios.put(URLS.update, pauseUserDTO);
      dispatch({
        type: US_A.PAUSE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating pauseUser ** ", { error });
    }
  };

  const logUser = async (loginDTO: LoginDTO) => {
    try {
      await validateOrReject(loginDTO);
      const {data} = await axios.post(URLS.login, loginDTO);
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
        addUser,
        deleteUser,
        updateUser,
        addUserAdm,
        resetPass,
        suspendUserAdm,
        updateUserAdm,
        confirmPass,
        deleteUserAdm,
        inviteUser,
        passRecover,
        pauseUser,
        logUser,
        ...state,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const initialState = () => {
  let state: UserStateType = {
    profile: {
      id: "",
      token: "",
      name: "",
      lastname: "",
      email: "",
      childrens: [],
    },
    type: 0,
  };
  return state;
};

export default UserState;
