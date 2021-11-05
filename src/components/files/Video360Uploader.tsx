import { useCallback, useContext, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Config } from "../../config"
import { nameLengthValidator } from "../../config/utils"
import AssetsContext, { Asset, CreateNewAssetDTO } from "../../context/assets/assets.context"
import clienteAxios from '../../config/axios'
import NotificationsContext from "../../context/notifications/notifications.context"
import {
  TypesNotification, URLS,
  FILES_TYPES,
  Images,
} from '../../types'
import { Constants, FilesConfiguration, ImageGrid, useStylesFiles } from "./TableFiles"
import { Box, Button, Paper } from "@material-ui/core"
import DropZone from "./DropZone"

export interface Video360Props {
  loading: boolean
  setLoading: Function
}

const Video360Uploader: React.FC<Video360Props> = ({ loading, setLoading }) => {
  const classes = useStylesFiles()
  const { assets, successCreate, openPreviewer } = useContext(AssetsContext)
  const [files, setFiles] = useState<FileList>()
  const { sendAlert } = useContext(NotificationsContext)
  const [urlVideo, setUrlVideo] = useState<string>('')

  useEffect(() => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.height = 10
  }, [])

  const uploadVideo360 = (filesUploaded: FileList) => {
    const url = URL.createObjectURL(filesUploaded[0])
    setUrlVideo(url)
    setFiles(filesUploaded)
  }

  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      if (error.errors[0].code === 'file-too-large') {
        sendAlert({
          type: TypesNotification.warning,
          msg: `File is larger than ${FilesConfiguration.videos360.maxSize/Constants.MB} mb`
        })
      } else {
        sendAlert({
          type: TypesNotification.warning,
          msg: error.errors[0].message
        })
      }
    })
    if (errors.length > 0) {
      return
    }
    setFiles(acceptedFiles)
    uploadVideo360(acceptedFiles)
  }, [])
  const uploadThumbnail = async () => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.toBlob(async function (blob) {
      try {
        setLoading(true)
        const formData = new FormData()
        //Aquí se cambia para modificar el nombre con el que se sube el archivo, no lo pude modificar, pero debería ser el nombre original en lugar de filename
        formData.append(FilesConfiguration.nameToUpload, blob, 'thumbnail360.png')
        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadImage360,
          formData
        )
        setVideo360(urlThumnail)
      } catch (error) {
        setLoading(false)
      }
    })
  }
  const onLoadMetadata = async () => {
    const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.width = Config.WIDTH_THUMBNAIL
    _CANVAS.height = Config.HEIGTH_THUMBNAIL
    _VIDEO.currentTime = 3
  }
  const onTimeVideoIsUpdated = async () => {
    const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    const _CANVAS_CTX = _CANVAS.getContext('2d')
    _CANVAS_CTX.drawImage(
      _VIDEO,
      0,
      0,
      Config.WIDTH_THUMBNAIL,
      Config.HEIGTH_THUMBNAIL
    )
    if (_CANVAS.height !== 10) {
      await uploadThumbnail()
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: FilesConfiguration.videos360.filesAcepted,
    maxFiles: 1,
    maxSize: FilesConfiguration.videos360.maxSize,
    noClick: true,
    validator: nameLengthValidator,
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })

  const setVideo360 = async (thumbnail: string) => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append(FilesConfiguration.nameToUpload, selectedFile)
      const response = await clienteAxios.post(URLS.urlUploadVideo360, formData)

      const DTO:CreateNewAssetDTO = {
        url: response.data,
        typeAsset: FILES_TYPES.VIDEO_360,
        thumbnail,
        nameAsset:selectedFile.name
      }
      const { data } = await clienteAxios.post(URLS.createAsset, DTO)
      setLoading(false)

      if (data.status === 0) {
        setFiles(null)
        const _CANVAS = document.querySelector(
          '#canvas-element'
        ) as HTMLCanvasElement
        _CANVAS.height = 10
        sendAlert({
          type: TypesNotification.success,
          msg: 'Your video has been uploaded successfully'
        })
        successCreate(data.asset)
      }
    } catch (error) {
      setLoading(false)
      sendAlert({
        type: TypesNotification.error,
        msg: 'An error occurred while uploading the video'
      })
    }
  }

  const isEmpty = assets.videos360.length == 0
  const onOpenPreviewer = (currentAsset: Asset) => {
    openPreviewer(currentAsset, assets.videos360)
  }

  return (
    <>
      <Box {...getRootProps()} width='100%' height='100%' position='relative'>
        <Box height='81%' width='100%'>
          <Box width='82%' mx='auto' pt={1}>
            <div
              style={{
                display: 'grid',
                gridAutoRows: '160px',
                gridTemplateColumns: 'repeat(7,minmax(10rem,1fr))',
                gap: '0.3rem'
              }}
            >
              {assets.videos360.map((asset: Asset, i) => (
                <ImageGrid onOpenPreviewer={onOpenPreviewer} asset={asset} />
              ))}
            </div>
          </Box>
        </Box>
        <DropZone
          type={FILES_TYPES.VIDEO_360}
          isEmpty={isEmpty}
          text='Drop your video here | mp4'
          isDragActive={isDragActive}
          loading={loading}
        />
        <Box
          display='flex'
          justifyContent='center'
          fontSize='1rem'
          className={classes.warn}
          py={1}
          width={'100%'}
        >
          <img className='mr-2' src={Images.iconoInfo} alt='icon info' />

          <Box color='white' fontFamily='font2'>
            The files should not exceed a weight greater than {FilesConfiguration.videos360.maxSize/Constants.MB} MB
          </Box>
        </Box>
        <Paper>
          <Box
            display='flex'
            alignItems='center'
            className={classes.containerUpload}
          >
            <Box
              flex={1}
              ml={24}
              fontFamily='font2'
              fontSize='1rem'
              textAlign='center'
            >
              Drop files to upload them instantly
            </Box>
            <input
              {...getInputProps()}
              onChange={e => uploadVideo360(e.target.files)}
              accept={FilesConfiguration.videos360.filesAcepted}
              id='upload'
              type='file'
            />
            <label htmlFor='upload'>
              <Button
                variant='contained'
                color='primary'
                className={classes.uploadButton}
                component='span'
              >
                Upload file
              </Button>
            </label>
            <video
              style={{
                height: '200px',
                width: '200px',
                position: 'fixed',
                left: '-1000%',
                display: 'hidden',
                visibility: 'hidden'
              }}
              onTimeUpdate={onTimeVideoIsUpdated}
              onLoadedMetadata={onLoadMetadata}
              id='video-element'
              src={urlVideo}
              controls
            >
              <source src={urlVideo} type='video/mp4' />
            </video>
            <canvas
              style={{
                position: 'fixed',
                left: '-1000%',
                display: 'hidden',
                visibility: 'hidden'
              }}
              id='canvas-element'
            ></canvas>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

export default Video360Uploader