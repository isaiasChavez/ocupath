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
      switch (payload.typeAsset.id) {
        case FILES_TYPES.IMG:
          return {
            ...state,
            assets: {
              ...state.assets,
              images: [...state.assets.images, payload]
            }
          }
        case FILES_TYPES.IMG_360:
          return {
            ...state,
            assets: {
              ...state.assets,
              images360: [...state.assets.images360, payload]
            }
          }
        case FILES_TYPES.VIDEO:
          return {
            ...state,
            assets: {
              ...state.assets,
              videos: [...state.assets.videos, payload]
            }
          }
        case FILES_TYPES.VIDEO_360:
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
      
    case AS_A.DELETE_SUCCESS:
      let newImages =  state.assets.images
      let newImages360 =  state.assets.images360
      let newVideos =  state.assets.videos
      let newVideos360 =  state.assets.videos360
      
      const isImage = payload.asset.typeAsset.id === FILES_TYPES.IMG
      const isImage360 = payload.asset.typeAsset.id === FILES_TYPES.IMG_360
      const isVideo = payload.asset.typeAsset.id === FILES_TYPES.VIDEO
      const isVideo360 = payload.asset.typeAsset.id === FILES_TYPES.VIDEO_360

      if (isImage) newImages = state.assets.images.filter((asset:Asset)=>asset.uuid!==payload.asset.uuid)
      if (isImage360) newImages360 = state.assets.images360.filter((asset:Asset)=>asset.uuid!==payload.asset.uuid)
      if (isVideo) newVideos = state.assets.videos.filter((asset:Asset)=>asset.uuid!==payload.asset.uuid)
      if (isVideo360) newVideos360 = state.assets.videos360.filter((asset:Asset)=>asset.uuid!==payload.asset.uuid)
      const newCurrentImages =  state.currentAssets.filter((asset:Asset)=>asset.uuid!==payload.asset.uuid)

      let newCurrentAsset:Asset ={
        thumbnail:'',
        typeAsset:{
          id:0,name:''
        },
        url:'',
        uuid:'',
        name:''
      }
      if (newCurrentImages.length>0) {
        newCurrentAsset =  newCurrentImages[0]
      }
      return{
        ...state,
        assets:{
          images:newImages, 
          images360:newImages360,
          videos:newVideos,
          videos360:newVideos360
        },
        currentAssets:newCurrentImages,
        currentAsset:newCurrentAsset
      }
    case MIS.OPEN_PREVIEWER:
      const previewIsImage = payload.currentAsset.typeAsset.id === FILES_TYPES.IMG||payload.currentAsset.typeAsset.id === FILES_TYPES.IMG_360
      return {
        ...state,
        isPreviewerOpened:true,
        previewIsImage,
        ...payload
      }
      //
    case MIS.SELECT_ASSET:
      return {
        ...state,
        currentAsset:payload
      }
    case MIS.NEXT_PREVIEW:
      let indice = state.currentAssets.findIndex((asset:Asset) => asset.uuid === state.currentAsset.uuid);
      
      return {
        ...state,
        currentAsset:state.currentAssets[indice+1] 
      }
      case MIS.PREV_PREVIEW:
      let indiceCurrent = state.currentAssets.findIndex((asset:Asset) => asset.uuid === state.currentAsset.uuid);
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
          uuid:'',
          name:''
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
