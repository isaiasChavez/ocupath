import { useReducer } from "react";
import NotificationContext from "./notifications.context";
import NotificationReducer, { NotificationStateType } from "./notifications.reducer";
import { toast } from 'react-toastify';
import {TypesNotification} from '../../types'


const NotificationState = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState());


  const sendAlert = async ({msg,type,stop}:{msg:string,type:TypesNotification,stop:boolean}) => {
    try {
        if (type===TypesNotification.success) {
          toast.success(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId:msg.replace(/ /g, "")
            });
            return 
        }
        if (type===TypesNotification.error) {
          toast.error(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId:msg.replace(/ /g, "")
            });
            return 
        }
       
        if (type===TypesNotification.warning) {
          toast.warn(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId:msg.replace(/ /g, "")
            });
            return 
        }
        toast(msg, {
          position: "bottom-center",
          autoClose:stop?false:5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          toastId:msg.replace(/ /g, "")
          });
        
    

    } catch (error) {
      console.error({ error });
    }
  };


 
 

  return (
    <NotificationContext.Provider
      value={{
        sendAlert,
        ...state,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

const initialState = () => {
  let state: NotificationStateType = {
    
  };  
  return state;
};

export default NotificationState;
