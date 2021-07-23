import { useReducer } from "react";
import axios from "../../config/axios";
import AssetsContext, {
  CreateAssetDTO,
  DeleteAssetDto,
} from "./assets.context";
import { AS_A, URLS } from "../../types/index";
import AssetsReducer, { AssetsStateType } from "./assets.reducer";
import { validateResponse } from "../../config/utils";

const UserState = ({ children }) => {
  const [state, dispatch] = useReducer(AssetsReducer, initialState());


  const getAssetsUser = async (createAssetDTO: CreateAssetDTO) => {
    try {
      const { data } = await axios.get(URLS.assets);
      console.log({data})
      dispatch({
        type: AS_A.GET_ASSETS,
        payload: data,
      });

    } catch (error) {
      console.error({ error });
    }
  };

  const create = async (createAssetDTO: CreateAssetDTO) => {
    try {
      const { data } = await axios.post(URLS.createAsset, createAssetDTO);
      dispatch({
        type: AS_A.CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error({ error });
    }
  };
  const deleteAsset = async (deleteAssetDto: DeleteAssetDto) => {
    try {
      const { data } = await axios.post(URLS.deleteAsset, deleteAssetDto);
      dispatch({
        type: AS_A.CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      console.error({ error });
    }
  };

  return (
    <AssetsContext.Provider
      value={{
        create,
        deleteAsset,
        getAssetsUser,
        ...state,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

const initialState = () => {
  let state: AssetsStateType = {};
  return state;
};

export default UserState;
