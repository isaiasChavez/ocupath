import { Config } from "../../config";
import { LOG_A } from "../../types";
export type SesionStateType = {
  isLogged:boolean
};


type Actions =
  | { type: "CLOSE_SESION"; payload: any }

const sesionReducer = (
  state: SesionStateType,
  action: Actions
): SesionStateType => {
  const { payload } = action;

  switch (action.type) {
    case LOG_A.CLOSE_SESION:
      console.log(LOG_A.CLOSE_SESION,{ payload })
      
      
          return {
            ...state,
          }

    default:

      return state;
  }
};
export default sesionReducer;
