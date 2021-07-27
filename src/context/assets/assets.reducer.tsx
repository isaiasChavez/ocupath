import { Config } from "../../config";
import { AS_A } from "../../types";
import { AssetsResponse } from "./assets.context";

export type AssetsStateType = {
  assets:AssetsResponse
};

type Actions =
  | { type: "CREATE_SUCCESS"; payload: any }
  | { type: "DELETE_SUCCESS"; payload: any }
  | { type: "GET_ASSETS"; payload: any };

const userReducer = (
  state: AssetsStateType,
  action: Actions
): AssetsStateType => {
  const { payload } = action;

  switch (action.type) {
    case AS_A.CREATE_SUCCESS:
      return {
        ...state,
      };
    case AS_A.CREATE_SUCCESS:
      return {
        ...state,
      };
    case AS_A.GET_ASSETS:
        return {
          ...state,
          assets:payload,
        };

    default:
      return state;
  }
};
export default userReducer;
