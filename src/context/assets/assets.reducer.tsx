import { Config } from '../../config'
import { AS_A, FILES_TYPES,MIS } from '../../types'
import { Asset, AssetsResponse } from './assets.context'

export type AssetsStateType = {
  assets: AssetsResponse
  currentAsset: Asset
  isPreviewerOpened: boolean,
  previewIsImage:boolean,
  currentAssets:Asset[]
}

type Actions =
  | { type: 'CREATE_SUCCESS'; payload: Asset }
  | { type: 'DELETE_SUCCESS'; payload: any }
  | { type: 'OPEN_PREVIEWER'; payload: any }
  | { type: 'CLOSE_PREVIEWER'; payload: any }
  | { type: 'SELECT_ASSET'; payload: any }
  | { type: 'PREV_PREVIEW'; payload: any }
  | { type: 'NEXT_PREVIEW'; payload: any }
  
  
  | { type: 'GET_ASSETS'; payload: any }

const userReducer = (
  state: AssetsStateType,
  action: Actions
): AssetsStateType => {
  const { payload } = action

  switch (action.type) {
    case AS_A.CREATE_SUCCESS:
      console.log(AS_A.CREATE_SUCCESS, { payload })

      switch (payload.typeAsset.id) {
        case FILES_TYPES.IMG:
          console.log('Si entró img')
          return {
            ...state,
            assets: {
              ...state.assets,
              images: [...state.assets.images, payload]
            }
          }
        case FILES_TYPES.IMG_360:
          console.log('Si entró img360')
          return {
            ...state,
            assets: {
              ...state.assets,
              images360: [...state.assets.images360, payload]
            }
          }
        case FILES_TYPES.VIDEO:
          console.log('Si entró video')
          return {
            ...state,
            assets: {
              ...state.assets,
              videos: [...state.assets.videos, payload]
            }
          }
        case FILES_TYPES.VIDEO_360:
          console.log('Si entró video360')
          return {
            ...state,
            assets: {
              ...state.assets,
              videos360: [...state.assets.videos360, payload]
            }
          }
        default:
          return {
            ...state
          }
      }
    case MIS.OPEN_PREVIEWER:
      const previewIsImage = payload.currentAsset.typeAsset.id === FILES_TYPES.IMG||payload.currentAsset.typeAsset.id === FILES_TYPES.IMG_360
      return {
        ...state,
        isPreviewerOpened:true,
        previewIsImage,
        ...payload
      }
    case MIS.SELECT_ASSET:
      console.log({payload})
      return {
        ...state,
        currentAsset:payload
      }
    case MIS.NEXT_PREVIEW:

      let indice = state.currentAssets.findIndex((asset:Asset) => asset.uuid === state.currentAsset.uuid);
      console.log({indice})
      
      return {
        ...state,
        currentAsset:state.currentAssets[indice+1] 
      }
      case MIS.PREV_PREVIEW:
      let indiceCurrent = state.currentAssets.findIndex((asset:Asset) => asset.uuid === state.currentAsset.uuid);
      console.log({payload})
      return {
        ...state,
        currentAsset:state.currentAssets[indiceCurrent-1] 
      } 
      
    case MIS.CLOSE_PREVIEWER:
      return {
        ...state,
        isPreviewerOpened:false,
        previewIsImage:false,
        currentAsset:{
          thumbnail:'',
          url:'',
          typeAsset:{
            name:'',
            id:0
          },
          uuid:''
        },
        currentAssets:[]
      }
    case AS_A.GET_ASSETS:
      return {
        ...state,
        assets: payload
      }

    default:
      return state
  }
}
export default userReducer
