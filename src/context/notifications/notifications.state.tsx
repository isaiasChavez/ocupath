import { useReducer } from "react";
import axios from "../../config/axios";
import NotificationContext from "./notifications.context";
import { AS_A, URLS } from "../../types/index";
import NotificationReducer, { NotificationStateType } from "./notifications.reducer";
import { toast } from 'react-toastify';

const NotificationState = ({ children }) => {
  const [state, dispatch] = useReducer(NotificationReducer, initialState());


  const sendAlert = async ({msg,type,stop}) => {
    try {
        if (type==='success') {
          toast.success(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        if (type==='error') {
          toast.error(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        if (type==='error') {
          toast.error(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        if (type==='warning') {
          toast.warn(msg, {
            position: "bottom-center",
            autoClose:stop?false:5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
        }
        
    

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
