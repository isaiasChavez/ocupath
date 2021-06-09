import { useReducer } from "react";
import axios, { tokenAuth } from "../../config/axios";
import { useRouter } from "next/router";
import UserContext, {
  ConfirmUserPassword,
  CreateUserDTO,
  DeleteAdminUserDTO,
  DeleteUserDTO,
  InviteUserDTO,
  PasswordRecovery,
  ResetPassword,
  UpdateUserAdminDTO,
  UpdateUserDTO,
} from "./user.context";

import { AD_A, US_A, LOG_A, URLS } from "../../types/index";
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
      const { data } = await axios.post(URLS.reset);
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

  const passRecover = async (passwordRecovery: PasswordRecovery) => {
    try {
      await validateOrReject(passwordRecovery);
      const response = await axios.post(
        `${URLS.reset}${passwordRecovery.email}`
      );
      if (validateResponse(response)) {
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
      await validateOrReject(inviteUserDTO);
      const { data } = await axios.post(URLS.invite);
      dispatch({
        type: LOG_A.INVITE_USER_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error("** Error validating inviteUser ** ", { error });
    }
  };

  const addUserAdm = async (createUserAdmDTO: UpdateUserAdminDTO) => {
    try {
      await validateOrReject(createUserAdmDTO);

      const { data } = await axios.post(URLS.createAdm, createUserAdmDTO);
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
      console.log({ loginDTO });
      const res = await axios.post(URLS.login, loginDTO);
      if (validateResponse(res)) {
        let { data } = res;
        tokenAuth(data.profile.token);
        dispatch({
          type: LOG_A.LOGIN_SUCCESS,
          payload: {
            ...data,
            type: 2,
          },
        });
        router.push("/panel");
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
