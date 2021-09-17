import { useContext, useReducer, useState } from "react";
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
  SendEmailInfo,
  UpdateUserAdminDTO,
  UpdateUserDTO,
} from "./user.context";

import { AD_A, US_A, LOG_A, URLS,USERS } from "../../types/index";
import UserReducer, { Profile, User, UserStateType } from "./user.reducer";
import { LoginDTO } from "../../types/types";
import { validateResponse } from "../../config/utils";
import { validateOrReject } from "class-validator";
import NotificationsContext from "../notifications/notifications.context";

const UserState = ({ children }) => {
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false)
  const [state, dispatch] = useReducer(UserReducer, initialState());
  const {sendAlert} = useContext(NotificationsContext)

  const resetPass = async (resetPassword: ResetPassword) => {
    try {
      await validateOrReject(resetPassword);
      setLoading(true)
      const { data } = await axios.put(URLS.recoverpass, resetPassword);
      console.log({data})
      setLoading(false)
      if (data.status ===0) {
        sendAlert({
          type:'success',
          msg:"Your password has been reset"
        })
        router.push("/login")
      }
      if (data.status ===5||data.status ==10) {
        sendAlert({
          type:'error',
          msg:"Token error"
        })
      }
    } catch (error) {
      sendAlert({
        type:'error',
        msg:error.message,
      })
      setLoading(false)
      console.error("** Error validating passRecover ** ", { error });
      console.error({ error });
    }
  };
  const passRecover = async (passwordRecovery: ResetPassword) => {
    try {
      await validateOrReject(passwordRecovery);
      setLoading(true)
      const response = await axios.post(
        `${URLS.reset}${passwordRecovery.email}`
        );
        setLoading(false)
        if (validateResponse(response, LOG_A.RECOVER_PASS_SUCCESS)) {
          if (response.data.status ===0) {
            sendAlert({
              type:'success',
              msg:"An email has been sent with the data to restore your password"
            })
            dispatch({
              type: LOG_A.RECOVER_PASS_SUCCESS,
              payload: response.data,
            });
          }
          if (response.data.status ===1) {
            sendAlert({
              type:'success',
              msg:"User does not exist"
            })
          }
          if (response.data.status ===2) {
            sendAlert({
              type:'warning',
              msg:"We have not been able to contact this email"
            })
          }
          return response.data.status
        }
      } catch (error) {
        sendAlert({
          type:'error',
          msg:error.message
        })
      setLoading(false)
      console.error("** Error validating passRecover ** ", { error });
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

 

  const inviteUser = async (inviteUserDTO: InviteUserDTO): Promise<number>  => {
    try {

      const newInvite = new InviteUserDTO(inviteUserDTO)
      await validateOrReject(newInvite);
      setLoading(true)
      const { data } = await axios.post(URLS.invite,inviteUserDTO);
      setLoading(false)
      console.log({data})
      if (data.status===0) {
        sendAlert({
          type:'success',
          msg:"The invitation has been sent successfully"
        })
        dispatch({
          type: LOG_A.INVITE_USER_SUCCESS,
          payload: data,
        });
      }
      if (data.status===5) {
        sendAlert({
          type:'error',
          msg:"Operation not allowed"
        })
      }
      if (data.status===3) {
        sendAlert({
          type:'warning',
          msg:"There is not a email whith this address"
        })
      }
      if (data.status===8) {
        sendAlert({
          type:'warning',
          msg:"The invitation already existed, the previous invitation has been resent",
          stop:true
        })
        sendAlert({
          type:'success',
          msg:"The invitation has been sent successfully"
        })
      }
      if (data.status===9) {
        sendAlert({
          type:'warning',
          msg:"User already exists"
        })
      }
      return data.status
    } catch (error) {
      setLoading(false)
      sendAlert({
        type:'error',
        msg:error.message
      })

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
      return data.status
    } catch (error) {
      setLoading(false)
      sendAlert({
        type:'error',
        msg:error.message
      })
      console.error("** Error geting user childrens ** ", { error });
    }
  };

  const addUserAdm = async (createUserAdmDTO: CreateAdminDTO) => {
    try {
      await validateOrReject(createUserAdmDTO);
      const { data } = await axios.post(URLS.createAdm, createUserAdmDTO);
      if (data.status ===0) {
        sendAlert({
          type:'success',
          msg:'The invitation has been sent'
        })
          router.push("/login");
      }
      if (data.status ===2) {
        sendAlert({
          type:'warning',
          msg:'This email is already registered'
        })
      }
      if (data.status === 3) {
        sendAlert({
          type:'warning',
          msg:'The invitation has been sent but the email does not exist'
        })
      }
      dispatch({ type: AD_A.REGISTER_ADM_SUCCES, payload: data });
      return data.status
    } catch (error) {
      sendAlert({
        type:'error',
        msg:'An error has occurred | code (u2)'
      })
      console.error("** Error validating addUserAdm ** ", { error });
    }
  };

  const getUserDetail = async () => {
    try {
      
      setLoading(true)
      const { data } = await axios.get(URLS.userDetail);

      setLoading(false)
      if (data.status ===0) {
        dispatch({ type: US_A.GET_USER_DETAIL, payload: data.profile });
      }
    } catch (error) {
      setLoading(false)
      sendAlert({
        type:'error',
        msg:'An error has occurred code (u1)'
      })
      console.error("** Error validating addUserAdm ** ", { error });
    }
  };
  
  const getUserChildDetail = async () => {
    try {
      const dto = new GetUserDetailDTO(state.selectedUser.uuid)
      await validateOrReject(dto);
      setLoading(true)
      const { data } = await axios.post(URLS.userChildDetail, dto);
      setLoading(false)
  
      if (data.status ===0) {
        dispatch({ type: AD_A.USER_CHILD_DETAIL, payload: data });
      }
      if (data.status ===2) {
        sendAlert({
          type:'warning',
          msg:'An error has occurred'
        })
      }

    } catch (error) {
      sendAlert({
        type:'error',
        msg:'An error has occurred code (u0)'
      })
      setLoading(false)
      console.error("** Error validating getUserChildDetail ** ", { error });
    }
  };
  const getAdminChildDetail = async (uuid) => {
    sendAlert({
      type:'success',
      msg:'Prueba para ver color de notificación success'
    })
    try {
      const dto = new GetAdminDetailDTO(uuid)
      console.log({dto})
      await validateOrReject(dto);
      const { data } = await axios.post(URLS.adminChildDetail, dto);
      console.log({data},AD_A.ADMIN_CHILD_DETAIL)
      dispatch({ type: AD_A.ADMIN_CHILD_DETAIL, payload: data });


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
      setLoading(true)
      const { data } = await axios.post(URLS.updateName, changeNameDTO);
      setLoading(false)
      if (data.status ===0) {
        dispatch({
          type: US_A.UPDATE_SUCCESS,
          payload: name,
        });
        sendAlert({
          type:'success',
          msg:'User have been updated'
        })
        return {status:data.status,name}
      }
      return null
    } catch (error) {
      setLoading(false)
      sendAlert({
        type:'error',
        msg:error.message,
      })
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
      setLoading(true)
      
      const { data } = await axios.put(URLS.suspendAdm, pauseUserAdminDTO);
      setLoading(false)
      if (data.status===0) {
        dispatch({
          type: AD_A.SUSPEND_ADM_SUCCESS,
          payload: data,
        });
      }
      if (data.status===2) {
        sendAlert({
          type:'warning',
          msg:'User not found'
        })
      }
    } catch (error) {
      setLoading(false)
      console.error("** Error validating suspendUserAdm ** ", { error });
    }
  };

  const suspendUser = async () => {
    try {
      const suspendUserDTO = new DeleteOrSuspendUserDTO(state.selectedUser.uuid,!state.selectedUser.isActive)
      await validateOrReject(suspendUserDTO);
      setLoading(true)
      const { data } = await axios.put(URLS.suspendUser, suspendUserDTO);
      setLoading(false)
      if (data.status===0) {
        dispatch({
          type: US_A.PAUSE_SUCCESS,
          payload: data,
        });
      }
      if (data.status===2) {
        sendAlert({
          type:'warning',
          msg:'User not found'
        })
      }
    } catch (error) {
      setLoading(false)
      console.error("** Error validating suspendUser ** ", { error });
    }
  };

  const addUser = async (createUserDTO: CreateUserDTO) => {
    try {
      await validateOrReject(createUserDTO);
      const { data } = await axios.post(URLS.create, createUserDTO);
      if (data.status ===0) {
          sendAlert({
            type:'success',
            msg:'Successful registration'
          })
          dispatch({
            type: US_A.REGISTER_SUCCES,
            payload: data,
          });
      }
      if (data.status ===2) {
        sendAlert({
          type:'warning',
          msg:"The email already exists"
        })
      } 
        
    } catch (error) {
      console.error("** Error validating addUser ** ", { error });
    }
  };
  
  
   const updateUser = async (updateUserDTO: UpdateUserDTO) => {
    try {
      await validateOrReject(updateUserDTO);
      setLoading(true)
      const { data } = await axios.put(URLS.update, updateUserDTO);
      setLoading(false)
      
      if (data.status ===0) {
        dispatch({
          type: US_A.UPDATE_SUCCESS,
          payload: data,
        });
        sendAlert({
          type:'success',
          msg:'User have been updated'
        })
      }
      return data.status
    } catch (error) {
      sendAlert({
        type:'error',
        msg:error.message
      })
      setLoading(false)
      console.error("** Error validating updateUser ** ", { error });
    }
  };
 

  const addNewPeriod = async (addNewSuscriptionSuscriptionDTO: AddNewSuscriptionSuscriptionDTO) => {
    try {

      setLoading(true)
      await validateOrReject(addNewSuscriptionSuscriptionDTO);
      setLoading(false)
      
      const { data } = await axios.put(URLS.addPeriod, addNewSuscriptionSuscriptionDTO);
      console.log("addNewPeriod:",{data})
      if (data.status ===0) {
        await getUserChildrens()
      }
    } catch (error) {
      setLoading(false)
      console.error("** Error validating updateUser ** ", { error });
    }
  };


  const logUser = async (loginDTO: LoginDTO) => {
    try {
      await validateOrReject(loginDTO);
      setLoading(true)
      const {data} = await axios.post(URLS.login, loginDTO);
      console.log({data})
      setLoading(false)
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
      setLoading(false)
      sendAlert({
        type:'warning',
        msg:"Could not log in"
      })
    }
  };
  const sendInformationForm = async (sendInformationDTO: SendEmailInfo):Promise<number>=> {
    try {
      await validateOrReject(sendInformationDTO);
      setLoading(true)
      const {data} = await axios.post(URLS.urlSendInformation, sendInformationDTO);
      setLoading(false)
      return data.status
    } catch (error) {
      setLoading(false)
      sendAlert({
        type:'warning',
        msg:"Could send email"
      })
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
        sendInformationForm,
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
      thumbnail:'',
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
      roomImage:'',
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
