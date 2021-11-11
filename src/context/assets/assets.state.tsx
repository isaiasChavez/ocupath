import { useContext, useReducer, useState } from 'react'
import axios from '../../config/axios'
import AssetsContext, {
  Asset,
  CreateAssetDTO,
  CreateNewAssetDTO,
  DeleteAssetDto,
  UploadFile
} from './assets.context'
import NotificationsContext from '../notifications/notifications.context'
import clienteAxios from '../../config/axios'
import { FILES_TYPES } from '../../types'

import { AS_A, URLS, MIS, TypesNotification } from '../../types/index'
import AssetsReducer, { AssetsStateType } from './assets.reducer'
import { validateOrReject } from 'class-validator'
import { AxiosResponse } from 'axios'

const UserState = ({ children }) => {
  const { sendAlert } = useContext(NotificationsContext)
  const [state, dispatch] = useReducer(AssetsReducer, initialState())
  const [loading, setLoading] = useState<boolean>(false)

  const getAssetsUser = async () => {
    try {
      const { data } = await axios.get(URLS.assets)
      dispatch({
        type: AS_A.GET_ASSETS,
        payload: data.assets
      })
    } catch (error) {
      genericHandlerError(error)
    }
  }

  const openPreviewer = async (currentAsset: Asset, currentAssets: Asset[]) => {
    dispatch({
      type: MIS.OPEN_PREVIEWER,
      payload: { currentAsset, currentAssets }
    })
  }
  const selectAsset = async (currentAsset: Asset) => {
    dispatch({
      type: MIS.SELECT_ASSET,
      payload: currentAsset
    })
  }
  const nextPreview = async () => {
    dispatch({
      type: MIS.NEXT_PREVIEW,
      payload: null
    })
  }
  const prevPreview = async () => {
    dispatch({
      type: MIS.PREV_PREVIEW,
      payload: null
    })
  }
  const closePreviewer = async () => {
    dispatch({
      type: MIS.CLOSE_PREVIEWER,
      payload: null
    })
  }

  const uploadImage = async (data: UploadFile): Promise<boolean> => {
    try {
      const { data: urlThumnail } = await clienteAxios.post(
        URLS.urlUploadThumbnailImages,
        data.formDataFile
      )

      const response = await clienteAxios.post(
        URLS.urlUploadImage,
        data.formDataThumbnail
      )

      const DTO: CreateNewAssetDTO = {
        url: response.data,
        thumbnail: urlThumnail,
        typeAsset: FILES_TYPES.IMG,
        nameAsset: data.file.name
      }

      const responseUploadImage = await clienteAxios.post(URLS.createAsset, DTO)
      if (responseUploadImage.data.status === 0) {
        sendAlert({
          type: TypesNotification.success,
          msg: 'Your image has been uploaded successfully'
        })
        successCreate(responseUploadImage.data.asset)
      }

      return true
    } catch (error) {
      genericHandlerError(error)
      return false
    }
  }
  const uploadImage360 = async (data: UploadFile) => {
    try {

      const { data: urlThumnail } = await clienteAxios.post(
        URLS.urlUploadThumbnailImages,
        data.formDataThumbnail
      )

      const response = await clienteAxios.post(
        URLS.urlUploadImage360,
        data.formDataFile
      )

      const DTO: CreateNewAssetDTO = {
        url: response.data,
        thumbnail: urlThumnail,
        typeAsset: FILES_TYPES.IMG_360,
        nameAsset: data.file.name
      }

      const responseUploadAsset: AxiosResponse = await clienteAxios.post(
        URLS.createAsset,
        DTO
      )

      if (responseUploadAsset.data.status === 0) {
        successCreate(responseUploadAsset.data.asset)
        sendAlert({
          type: TypesNotification.success,
          msg: 'Your image has been uploaded successfully'
        })
      }
      return true
    } catch (error) {
      genericHandlerError(error)
      return false
    }
  }
  const uploadVideo = async (data: UploadFile):Promise<boolean> => {
    try {
      setLoading(true)

      const response = await clienteAxios.post(URLS.urlUploadVideo, data.formDataFile)

        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadThumbnailVideos,
          data.formDataThumbnail
        )

      const DTO:CreateNewAssetDTO = {
        url: response.data,
        typeAsset: FILES_TYPES.VIDEO,
        thumbnail:urlThumnail,
        nameAsset:data.file.name
      }

      const reponseUploadVideo:AxiosResponse = await clienteAxios.post(URLS.createAsset, DTO)
     
      if (reponseUploadVideo.data.status === 0) {
        sendAlert({
          type: TypesNotification.success,
          msg: 'Your video has been uploaded successfully'
        })
        successCreate(reponseUploadVideo.data.asset)
      }
      setLoading(false)
      return true
      
    } catch (error) {
      genericHandlerError(error)
      return false
    }
  }
  const uploadVideo360 = async (data: UploadFile):Promise<boolean> => {
    try {

      const response = await clienteAxios.post(URLS.urlUploadVideo360, data.formDataFile)

      const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadThumbnailVideos,
          data.formDataThumbnail
        )
      const DTO:CreateNewAssetDTO = {
        url: response.data,
        typeAsset: FILES_TYPES.VIDEO_360,
        thumbnail:urlThumnail,
        nameAsset:data.file.name
      }

      const responseUploadVideo:AxiosResponse = await clienteAxios.post(URLS.createAsset, DTO)

      if (responseUploadVideo.data.status === 0) {
        sendAlert({
          type: TypesNotification.success,
          msg: 'Your video has been uploaded successfully'
        })
        successCreate(responseUploadVideo.data.asset)
      }
      return true
    } catch (error) {
      genericHandlerError(error)
      return false
    }
  }

  const successCreate = (asset: Asset) => {
    try {
      dispatch({
        type: AS_A.CREATE_SUCCESS,
        payload: asset
      })
    } catch (error) {
      console.error({ error })
    }
  }

  const deleteAsset = async (uuid: string) => {
    const deleteAssetDto = new DeleteAssetDto(uuid)
    try {
      setLoading(true)
      await validateOrReject(deleteAssetDto)

      const { data } = await axios.put(URLS.deleteAsset, deleteAssetDto)
      setLoading(false)

      if (data.status === 0) {
        dispatch({
          type: AS_A.DELETE_SUCCESS,
          payload: data
        })
        sendAlert({
          type: TypesNotification.success,
          msg: 'Asset successfully removed'
        })
      } else {
        sendAlert({
          type: TypesNotification.error,
          msg: 'an unexpected error has occurred'
        })
      }
    } catch (error) {
      setLoading(false)
      console.error({ error })
    }
  }

  const genericHandlerError = async (error: ErrorEvent) => {
    sendAlert({
      type: TypesNotification.error,
      msg: `An unexpected error has occurred: ${error.message}`
    })
  }

  return (
    <AssetsContext.Provider
      value={{
        ...state,
        loading,
        successCreate,
        nextPreview,
        prevPreview,
        selectAsset,
        closePreviewer,
        openPreviewer,
        deleteAsset,
        getAssetsUser,
        uploadImage,
        uploadImage360,
        uploadVideo,
        uploadVideo360
      }}
    >
      {children}
    </AssetsContext.Provider>
  )
}

const AssetExample = {
  thumbnail: '',
  typeAsset: {
    id: 0,
    name: ''
  },
  uuid: '',
  url: '',
  name: ''
}

const initialState = () => {
  let state: AssetsStateType = {
    isPreviewerOpened: false,
    previewIsImage: false,
    currentAssets: [],
    currentAsset: AssetExample,
    assets: {
      images: [
        {
          typeAsset: { id: 0, name: '' },
          thumbnail: '',
          url: '',
          uuid: '',
          name: ''
        }
      ],
      images360: [AssetExample],
      videos: [AssetExample],
      videos360: [AssetExample]
    }
  }
  return state
}

export default UserState
