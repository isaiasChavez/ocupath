import { useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import { Config } from '../../config'
import {  validateFile } from '../../config/utils'
import AssetsContext, {
  Asset
} from '../../context/assets/assets.context'
import NotificationsContext from '../../context/notifications/notifications.context'
import { TypesNotification,  FILES_TYPES, Images } from '../../types'
import {
  Constants,
  FilesConfiguration,
  ImageGrid,
  useStylesFiles
} from './TableFiles'
import { Box, Button, Paper } from '@material-ui/core'
import DropZone from './DropZone'

export interface VideoProps {
  loading: boolean
  setLoading: Function
}

const VideoUploader: React.FC<VideoProps> = ({ loading, setLoading }) => {
  const { assets, openPreviewer, uploadVideo } = useContext(AssetsContext)
  const [files, setFiles] = useState<FileList|[]>(null)
  const [urlVideo, setUrlVideo] = useState<string>('')
  const { sendAlert } = useContext(NotificationsContext)

  useEffect(() => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.height = 10
  }, [])
  
  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      if (error.errors[0].code === 'file-too-large') {
        sendAlert({
          type: TypesNotification.warning,
          msg: `File is larger than ${FilesConfiguration.videos.maxSize /
            Constants.MB} MB`
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
    handleUploadVideo(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: FilesConfiguration.videos.filesAcepted,
    maxFiles: 1,
    maxSize: FilesConfiguration.videos.maxSize,
    noClick: true,
    validator: (file: File) => {
      return validateFile(file, {
        maxLengthName: Config.MAX_LENGTH_NAME_SIZE,
        maxSize: FilesConfiguration.videos.maxSize / Constants.MB
      })
    },
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })
  const handleUploadVideo = (filesUploaded: FileList) => {

    const statusVideo = validateFile(filesUploaded[0], {
      maxLengthName: Config.MAX_LENGTH_NAME_SIZE,
      maxSize: FilesConfiguration.videos.maxSize / Constants.MB
    })
    
    if (!statusVideo) {
      const url = URL.createObjectURL(filesUploaded[0])
      setUrlVideo(url)
      setFiles(filesUploaded)
    } else {
      sendAlert({
        type: TypesNotification.warning,
        msg: statusVideo.message
      })
      setFiles([])
    }
  }

  const uploadThumbnail = async () => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.toBlob(async function (blob) {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append(FilesConfiguration.nameToUpload, blob, 'thumbnail.png')
        setVideo(formData)
      } catch (error) {
        setLoading(false)
        sendAlert({
          type: 'error',
          msg: 'Error uploading thumbnail'
        })
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
  const setVideo = async (formDataThumbnail: FormData) => {
    try {
      const file = files[0]
      const formDataFile = new FormData()
      formDataFile.append(FilesConfiguration.nameToUpload, file)
      const success = await uploadVideo({
        formDataFile,
        formDataThumbnail,
        file
      })
       if (success) {
        const _CANVAS = document.querySelector(
          '#canvas-element'
        ) as HTMLCanvasElement
        _CANVAS.height = 10
      }
      setFiles(null)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      sendAlert({
        type: TypesNotification.error,
        msg: 'An error occurred while uploading the video'
      })
    }
  }

  const onOpenPreviewer = (currentAsset: Asset) => {
    openPreviewer(currentAsset, assets.videos)
  }
  const classes = useStylesFiles()
  const isEmpty = assets.videos.length == 0
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
              {assets.videos.map((asset: Asset, i) => (
                <ImageGrid onOpenPreviewer={onOpenPreviewer} asset={asset} />
              ))}
            </div>
          </Box>
        </Box>

        <DropZone
          type={FILES_TYPES.VIDEO}
          isEmpty={isEmpty}
          text='Drop your video here | mp4'
          isDragActive={isDragActive}
          loading={loading}
        />

        <Paper>
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
              The files should not exceed a weight greater than{' '}
              {FilesConfiguration.videos.maxSize / Constants.MB} MB
            </Box>
          </Box>
          <Box
            display='flex'
            justifyContent='flex-end'
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
              onChange={e => handleUploadVideo(e.target.files)}
              accept={FilesConfiguration.videos.filesAcepted}
              id='video_uploader'
              type='file'
            />
            <label htmlFor='video_uploader'>
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
                backgroundColor: 'red',
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

export default VideoUploader
