import { useReducer, useState } from "react";
import axios from "../../config/axios";
import SesionContext, { ReuestSesionLogOutDTO } from "./sesion.context";
import { LOG_A, URLS } from "../../types/index";
import SesionReducer, { SesionStateType } from "./sesion.reducer";
import { Config } from "../../config";
import { useRouter } from "next/router";

const SesionState = ({ children }) => {
  const [state, dispatch] = useReducer(SesionReducer, initialState());
  const router = useRouter();
  const [loadingSesion, setLoading] = useState<boolean>(false)


  const logout = async () => {
    try {
      const logoutDto = new ReuestSesionLogOutDTO()
      setLoading(true)
      const { data } = await axios.post(URLS.logout,logoutDto);
      setLoading(false)
      
      localStorage.removeItem(Config.TOKEN_NAME_INTERN);
      if (data.status === 0) {
        router.push("/");
      }
      dispatch({
        type: LOG_A.CLOSE_SESION,
        payload: data,
      });
    } catch (error) {
      setLoading(false)
      console.error({ error });
    }
  };

  return (
    <SesionContext.Provider
      value={{
        ...state,
        loadingSesion,
        logout
      }}
    >
      {children}
    </SesionContext.Provider>
  );
};

const initialState = () => {
  let state: SesionStateType = {
      isLogged:false
  };  
  return state;
};

export default SesionState;
