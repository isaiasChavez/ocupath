import { useReducer } from "react";
import axios from "../../config/axios";
import AssetsContext, {
  Asset,
  CreateAssetDTO,
  DeleteAssetDto,
} from "./assets.context";
import { AS_A, URLS } from "../../types/index";
import AssetsReducer, { AssetsStateType } from "./assets.reducer";

const UserState = ({ children }) => {
  const [state, dispatch] = useReducer(AssetsReducer, initialState());
  const getAssetsUser = async (createAssetDTO: CreateAssetDTO) => {
    try {
      const { data } = await axios.get(URLS.assets);
      dispatch({
        type: AS_A.GET_ASSETS,
        payload: data.assets,
      });

    } catch (error) {
      console.error({ error });
    }
  };

  const successCreate = async (asset:Asset) => {
    try {
  
      dispatch({
        type: AS_A.CREATE_SUCCESS,
        payload: asset,
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
        successCreate,
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
  let state: AssetsStateType = {
      assets:{
        images: [{
          typeAsset: { id: 0,name: '' },
          thumbnail:"",
          url: ''
        }],
        images360: [{
          thumbnail:'',
          typeAsset:{ 
            id:0,name:''
          },
          url:''
        }],
        videos: [{
          thumbnail:'',
          typeAsset:{ 
            id:0,name:''
          },
          url:''
        }],
        videos360: [{
          thumbnail:'',
          typeAsset:{ 
            id:0,name:''
          },
          url:''
        }]  
      },
  };  
  return state;
};

export default UserState;
