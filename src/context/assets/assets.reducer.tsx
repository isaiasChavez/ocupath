import { Config } from "../../config";
import { AS_A,FILES_TYPES } from "../../types";
import { Asset,AssetsResponse } from "./assets.context";

export type AssetsStateType = {
  assets: AssetsResponse
};



type Actions =
  | { type: "CREATE_SUCCESS"; payload: Asset }
  | { type: "DELETE_SUCCESS"; payload: any }
  | { type: "GET_ASSETS"; payload: any };

const userReducer = (
  state: AssetsStateType,
  action: Actions
): AssetsStateType => {
  const { payload } = action;

  switch (action.type) {
    case AS_A.CREATE_SUCCESS:
      console.log(AS_A.CREATE_SUCCESS,{ payload })

      switch (payload.typeAsset.id) {
        case FILES_TYPES.IMG:
          console.log("Si entró img")
          return {
            ...state,
            assets: {
              ...state.assets,
              images: [...state.assets.images,payload]
            }
          };
          case FILES_TYPES.IMG_360:
          console.log("Si entró img360")
          return {
            ...state,
            assets: {
              ...state.assets,
              images360: [...state.assets.images360,payload]
            }
          };
          case FILES_TYPES.VIDEO:
          console.log("Si entró video")
          return {
            ...state,
            assets: {
              ...state.assets,
              videos: [...state.assets.videos,payload]
            }
          };
          case FILES_TYPES.VIDEO_360:
          console.log("Si entró video360")
          return {
            ...state,
            assets: {
              ...state.assets,
              videos360: [...state.assets.videos360,payload]
            }
          };
        default:
          return {
            ...state,
          };
      }
    case AS_A.CREATE_SUCCESS:
      return {
        ...state,
      };
    case AS_A.GET_ASSETS:
      return {
        ...state,
        assets: payload,
      };

    default:
      return state;
  }
};
export default userReducer;
