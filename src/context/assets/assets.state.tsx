import { useContext, useReducer, useState } from 'react'
import axios from '../../config/axios'
import AssetsContext, {
  Asset,
  CreateAssetDTO,
  DeleteAssetDto
} from './assets.context'
import NotificationsContext from '../notifications/notifications.context'

import { AS_A, URLS, MIS,TypesNotification } from '../../types/index'
import AssetsReducer, { AssetsStateType } from './assets.reducer'
import { validateOrReject } from 'class-validator'

const UserState = ({ children }) => {
  const { sendAlert } = useContext(NotificationsContext)
  const [state, dispatch] = useReducer(AssetsReducer, initialState())
  const [loading, setLoading] = useState<boolean>(false)

  const getAssetsUser = async (createAssetDTO: CreateAssetDTO) => {
    try {
      const { data } = await axios.get(URLS.assets)
      dispatch({
        type: AS_A.GET_ASSETS,
        payload: data.assets
      })
    } catch (error) {
      console.error({ error })
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

  const successCreate = async (asset: Asset) => {
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
        getAssetsUser
      }}
    >
      {children}
    </AssetsContext.Provider>
  )
}

const initialState = () => {
  let state: AssetsStateType = {
    isPreviewerOpened: false,
    previewIsImage: false,
    currentAssets: [],
    currentAsset: {
      uuid: '',
      thumbnail: '',
      url: '',
      typeAsset: {
        id: null,
        name: ''
      }
    },
    assets: {
      images: [
        {
          typeAsset: { id: 0, name: '' },
          thumbnail: '',
          url: '',
          uuid: ''
        }
      ],
      images360: [
        {
          thumbnail: '',
          typeAsset: {
            id: 0,
            name: ''
          },
          uuid: '',
          url: ''
        }
      ],
      videos: [
        {
          thumbnail: '',
          typeAsset: {
            id: 0,
            name: ''
          },
          uuid: '',
          url: ''
        }
      ],
      videos360: [
        {
          thumbnail: '',
          typeAsset: {
            id: 0,
            name: ''
          },
          uuid: '',
          url: ''
        }
      ]
    }
  }
  return state
}

export default UserState
