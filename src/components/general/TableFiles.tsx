import React, { useCallback, useContext, useEffect, useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import { Image } from 'antd'

import Tab from '@material-ui/core/Tab'
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import { COLORS, FILES, URLS, FILES_TYPES, Images } from '../../types'
import Grid from '@material-ui/core/Grid'
import { Box, Button, Card, CircularProgress } from '@material-ui/core'
import clienteAxios from '../../config/axios'
import AssetsContext, {
  Asset,
  CreateAssetDTO
} from '../../context/assets/assets.context'
import NotificationsContext from '../../context/notifications/notifications.context'
import { useDropzone } from 'react-dropzone'
import { Config } from '../../config'

interface StyledTabProps {
  label: string
}
export interface TableFilesProps {}
const nameLengthValidator = file => {
  console.log({ file })

  if (file.name.length > Config.MAX_LENGTH_NAME_SIZE) {
    return {
      code: 'name-too-large',
      message: `Name is larger than ${Config.MAX_LENGTH_NAME_SIZE} characters`
    }
  }

  return null
}

const TableFiles: React.FC<TableFilesProps> = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  const classes = useStyles()
  useEffect(() => {
    getAssetsUser()
  }, [currentTab])
  const { getAssetsUser } = useContext(AssetsContext)

  const [loading, setLoading] = useState(false)

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12}>
        <Paper className={classes.paper}>
          <AntTabs
            value={currentTab}
            onChange={handleChange}
            aria-label='ant example'
          >
            <AntTab label='Images' />
            <AntTab label='360 Images' />
            <AntTab label='Video' />
            <AntTab label='360 Videos' />
          </AntTabs>

          {currentTab === FILES.IMG && (
            <Img loading={loading} setLoading={setLoading} />
          )}
          {currentTab === FILES.IMG_360 && (
            <Img360 loading={loading} setLoading={setLoading} />
          )}
          {currentTab === FILES.VIDEO && (
            <Video loading={loading} setLoading={setLoading} />
          )}
          {currentTab === FILES.VIDEO_360 && (
            <Video360 loading={loading} setLoading={setLoading} />
          )}
        </Paper>
      </Grid>
    </Grid>
  )
}

export default TableFiles

export interface DropZoneProps {
  isDragActive: boolean
  loading: boolean
  isEmpty: boolean
  text: string
}

const DropZone: React.FC<DropZoneProps> = ({
  isDragActive,
  isEmpty,
  loading,
  text
}) => {
  return (
    <>
      {isDragActive && (
        <Box
          className='animate-fadein'
          position='absolute'
          zIndex={40}
          display='flex'
          justifyContent='center'
          alignItems='center'
          mb={1.3}
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{
            backgroundColor: 'rgba(255,255,255,0.4)'
          }}
        >
          <Box display='flex' flexDirection='column'>
            <img
              style={{ opacity: '0.5' }}
              src={Images.upload}
              alt='Upload your image'
            />
            <Box mt={2} fontSize={12}>
              {text}{' '}
            </Box>
          </Box>
        </Box>
      )}
      {isEmpty && !loading && (
        <Box
          className='animate-fadein'
          position='absolute'
          zIndex={40}
          display='flex'
          justifyContent='center'
          alignItems='center'
          mb={10}
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{
            backgroundColor: 'rgba(255,255,255,0.4)'
          }}
        >
          <Box display='flex' flexDirection='column'>
            <img
              style={{ opacity: '0.5' }}
              src={Images.upload}
              alt='Upload your image'
            />
            <Box mt={2} fontSize={12}>
              Drop files to instantly upload them{' '}
            </Box>
          </Box>
        </Box>
      )}
      {loading && (
        <Box
          position='absolute'
          display='flex'
          zIndex={30}
          justifyContent='center'
          alignItems='center'
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{
            background: 'rgba(0, 13, 52, 0.1)'
          }}
        >
          <CircularProgress color='secondary' size='2rem' />
        </Box>
      )}
    </>
  )
}

const Img: React.FC<ImgProps> = ({ loading, setLoading }) => {
  const { assets, successCreate } = useContext(AssetsContext)
  const classes = useStyles()
  const { sendAlert } = useContext(NotificationsContext)
  const [files, setFiles] = useState([])
  useEffect(() => {
    if (files && files.length !== 0) {
      setImage()
    }
  }, [files])

  const uploadImage = data => {
    setFiles(data)
  }
  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      sendAlert({
        type: 'warning',
        msg: error.errors[0].message
      })
    })
    if (errors.length > 0) {
      return
    }
    setFiles(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    maxSize: Config.MAX_IMAGE_SIZE,
    noClick: true,
    validator: nameLengthValidator,
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })

  const setImage = async () => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append('upload', selectedFile)
      setLoading(true)
      const response = await clienteAxios.post(URLS.urlUploadImage, formData)
      const DTO = {
        url: response.data,
        typeAsset: FILES_TYPES.IMG
      }

      const responseUploadUser = await clienteAxios.post(URLS.createAsset, DTO)
      setLoading(false)
      if (responseUploadUser.data.status === 0) {
        sendAlert({
          type: 'success',
          msg: 'Your image has been uploaded successfully'
        })
        setFiles(null)
        successCreate(responseUploadUser.data.asset)
      }
    } catch (error) {
      setLoading(false)
      console.log({ error })
      sendAlert({
        type: 'error',
        msg: 'An error occurred while uploading the images'
      })
    }
  }
  const isEmpty = assets.images.length == 0

  return (
    <Box {...getRootProps()} width='100%' height='100%' position='relative'>
      <Image.PreviewGroup>
        {assets.images.map((asset: Asset, i) => (
          <Image
            style={{ 
              objectFit:'cover'
            }}
            height={200}
 src={asset.url} />
        ))}
      </Image.PreviewGroup>
      {/*  <GridList  cellHeight={ 100 } className={ classes.gridList } cols={ 7 }>
        { assets.images.map((asset: Asset,i) => (
          <GridListTile key={ i } cols={ 1 } style={ { height: 180 } }>
            <img className='animate-fadein' src={ asset.url } alt={ "Imagen normal" } />
          </GridListTile>
        )) }
      <DropZone isEmpty={isEmpty} text="Drop your files here png/jpg" isDragActive={isDragActive} loading={loading}/>
      </GridList> */}
      <Paper>
        <Box
          display='flex'
          justifyContent='flex-end'
          alignItems='center'
          className={classes.containerUpload}
        >
          <input
            {...getInputProps()}
            onChange={e => uploadImage(e.target.files)}
            multiple
            accept='image/*'
            id='upload'
            type='file'
          />
          <label htmlFor='upload'>
            <Button
              disabled={loading}
              variant='contained'
              color='primary'
              className={classes.uploadButton}
              component='span'
            >
              Upload
            </Button>
          </label>
        </Box>
      </Paper>
    </Box>
  )
}

export interface Img360Props {
  loading: boolean
  setLoading: Function
}

const Img360: React.FC<Img360Props> = ({ loading, setLoading }) => {
  const [files, setFiles] = useState([])
  const { assets, successCreate } = useContext(AssetsContext)
  const { sendAlert } = useContext(NotificationsContext)

  useEffect(() => {
    if (files && files.length !== 0) {
      setImage()
    }
  }, [files])
  const classes = useStyles()

  const uploadImage = data => {
    setFiles(data)
  }
  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      sendAlert({
        type: 'warning',
        msg: error.errors[0].message
      })
    })
    if (errors.length > 0) {
      return
    }
    setFiles(acceptedFiles)
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    fileRejections
  } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    maxFiles: 1,
    maxSize: Config.MAX_IMAGE_SIZE,
    noClick: true,
    validator: nameLengthValidator,
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })

  const setImage = async () => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append('upload', selectedFile)
      setLoading(true)

      const response = await clienteAxios.post(URLS.urlUploadImage360, formData)
      setLoading(false)
      const DTO = {
        url: response.data,
        typeAsset: FILES_TYPES.IMG_360
      }
      const { data } = await clienteAxios.post(URLS.createAsset, DTO)
      if (data.status === 0) {
        successCreate(data.asset)
        setFiles(null)
        sendAlert({
          type: 'success',
          msg: 'Your image has been uploaded successfully'
        })
      }
    } catch (error) {
      setLoading(false)
      console.log({ error })
      sendAlert({
        type: 'error',
        msg: 'An error occurred while uploading the image'
      })
    }
  }
  const isEmpty = assets.images360.length == 0
  return (
    <>
      <Box {...getRootProps()} width='100%' height='100%' position='relative'>
        <GridList cellHeight={100} className={classes.gridList} cols={7}>
          {assets.images360.map((asset: Asset) => (
            <GridListTile key={asset.url} cols={1} style={{ height: 180 }}>
              <img
                className='animate-fadein'
                src={asset.url}
                alt='Imagen 360'
              />
            </GridListTile>
          ))}
        </GridList>
        <DropZone
          isEmpty={isEmpty}
          text='Drop your 360 images here | png/jpg'
          isDragActive={isDragActive}
          loading={loading}
        />
        <Paper>
          <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            className={classes.containerUpload}
          >
            <input
              {...getInputProps()}
              onChange={e => uploadImage(e.target.files)}
              accept='image/*'
              id='image360_uploader'
              type='file'
            />
            <label htmlFor='image360_uploader'>
              <Button
                variant='contained'
                color='primary'
                className={classes.uploadButton}
                disabled={loading}
                component='span'
              >
                Upload img 360
              </Button>
            </label>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

const Video: React.FC<VideoProps> = ({ loading, setLoading }) => {
  const { assets, successCreate } = useContext(AssetsContext)
  const [files, setFiles] = useState<FileList>(null)
  const [urlVideo, setUrlVideo] = useState<string>('')
  const { sendAlert } = useContext(NotificationsContext)
  const [urlThumnail, seturlThumnail] = useState<string>(null)

  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      sendAlert({
        type: 'warning',
        msg: error.errors[0].message
      })
    })
    if (errors.length > 0) {
      return
    }
    console.log('OK FILES', { acceptedFiles })
    setFiles(acceptedFiles)
    uploadVideo(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/mp4',
    maxFiles: 1,
    maxSize: Config.MAX_VIDEO_SIZE,
    noClick: true,
    validator: nameLengthValidator,
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })
  const uploadVideo = (filesUploaded: FileList) => {
    const url = URL.createObjectURL(filesUploaded[0])
    setUrlVideo(url)
    setFiles(filesUploaded)
  }
  const uploadThumbnail = async () => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.toBlob(async function (blob) {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append('upload', blob, 'filename.png')
        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadImage,
          formData
        )
        setVideo(urlThumnail)
      } catch (error) {
        setLoading(false)
        console.log({ error })
      }
    })
  }
  const onLoadMetadata = async () => {
    const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.width = _VIDEO.videoWidth
    _CANVAS.height = _VIDEO.videoHeight
    _VIDEO.currentTime = 3
  }
  const onTimeVideoIsUpdated = async () => {
    const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    const _CANVAS_CTX = _CANVAS.getContext('2d')
    _CANVAS_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight)
    console.log(_CANVAS.height)
    console.log(_CANVAS.height == 720)
    if (_CANVAS.height == 720) {
      await uploadThumbnail()
    }
  }

  const setVideo = async (thumbnail: string) => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append('upload', selectedFile)
      setLoading(true)
      const response = await clienteAxios.post(URLS.urlUploadVideo, formData)
      setLoading(false)

      const DTO = {
        url: response.data,
        typeAsset: FILES_TYPES.VIDEO,
        thumbnail
      }
      const { data } = await clienteAxios.post(URLS.createAsset, DTO)
      setLoading(false)
      console.log({ data })

      if (data.status === 0) {
        setFiles(null)
        const _CANVAS = document.querySelector(
          '#canvas-element'
        ) as HTMLCanvasElement
        _CANVAS.height = 150
        sendAlert({
          type: 'success',
          msg: 'Your video has been uploaded successfully'
        })
        successCreate(data.asset)
      }
    } catch (error) {
      setLoading(false)
      console.log({ error })
      sendAlert({
        type: 'error',
        msg: 'An error occurred while uploading the video'
      })
    }
  }
  const classes = useStyles()
  const isEmpty = assets.videos.length == 0
  return (
    <>
      <Box {...getRootProps()} width='100%' height='100%' position='relative'>
        <GridList cellHeight={100} className={classes.gridList} cols={7}>
          {assets.videos.map((video, i) => (
            <GridListTile key={i} cols={1} style={{ height: 180 }}>
              <img src={video.thumbnail} alt={`Video ${i}`} />
            </GridListTile>
          ))}
        </GridList>

        <DropZone
          isEmpty={isEmpty}
          text='Drop your video here | mp4'
          isDragActive={isDragActive}
          loading={loading}
        />

        <Paper>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='flex-end'
            alignItems='flex-end'
            className={classes.containerUpload}
          >
            <input
              {...getInputProps()}
              onChange={e => uploadVideo(e.target.files)}
              accept='video/*'
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
                Upload video
              </Button>
            </label>
            <video
              style={{
                height: '200px',
                width: '200px',
                position: 'fixed',
                left: '-1000%',
                backgroundColor: 'red',
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

export interface Video360Props {
  loading: boolean
  setLoading: Function
}

const Video360: React.FC<Video360Props> = ({ loading, setLoading }) => {
  const classes = useStyles()
  const { assets, successCreate } = useContext(AssetsContext)
  const [files, setFiles] = useState<FileList>()
  const { sendAlert } = useContext(NotificationsContext)
  const [urlVideo, setUrlVideo] = useState<string>('')

  const uploadVideo360 = (filesUploaded: FileList) => {
    const url = URL.createObjectURL(filesUploaded[0])
    setUrlVideo(url)
    setFiles(filesUploaded)
  }

  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      sendAlert({
        type: 'warning',
        msg: error.errors[0].message
      })
    })
    if (errors.length > 0) {
      return
    }
    console.log('OK FILES', { acceptedFiles })
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
        formData.append('upload', blob, 'filename.png')
        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadImage,
          formData
        )
        setVideo360(urlThumnail)
      } catch (error) {
        setLoading(false)
        console.log({ error })
      }
    })
  }
  const onLoadMetadata = async () => {
    const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.width = _VIDEO.videoWidth
    _CANVAS.height = _VIDEO.videoHeight
    _VIDEO.currentTime = 3
  }
  const onTimeVideoIsUpdated = async () => {
    const _VIDEO = document.querySelector('#video-element') as HTMLVideoElement
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    const _CANVAS_CTX = _CANVAS.getContext('2d')
    _CANVAS_CTX.drawImage(_VIDEO, 0, 0, _VIDEO.videoWidth, _VIDEO.videoHeight)
    console.log(_CANVAS.height)
    console.log(_CANVAS.height == 720)
    if (_CANVAS.height == 720) {
      await uploadThumbnail()
    }
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'video/mp4',
    maxFiles: 1,
    maxSize: Config.MAX_VIDEO_360_SIZE,
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
      formData.append('upload', selectedFile)
      const response = await clienteAxios.post(URLS.urlUploadVideo360, formData)

      const DTO = {
        url: response.data,
        typeAsset: FILES_TYPES.VIDEO_360,
        thumbnail
      }
      const { data } = await clienteAxios.post(URLS.createAsset, DTO)
      setLoading(false)

      if (data.status === 0) {
        setFiles(null)
        const _CANVAS = document.querySelector(
          '#canvas-element'
        ) as HTMLCanvasElement
        _CANVAS.height = 150
        sendAlert({
          type: 'success',
          msg: 'Your video has been uploaded successfully'
        })
        successCreate(data.asset)
      }
    } catch (error) {
      setLoading(false)
      console.log({ error })
      sendAlert({
        type: 'error',
        msg: 'An error occurred while uploading the video'
      })
    }
  }

  const isEmpty = assets.videos360.length == 0

  return (
    <>
      <Box {...getRootProps()} width='100%' height='100%' position='relative'>
        <GridList cellHeight={100} className={classes.gridList} cols={7}>
          {assets.videos360.map((asset: Asset, i) => (
            <GridListTile key={i} cols={1} style={{ height: 180 }}>
              <img src={asset.thumbnail} />
            </GridListTile>
          ))}
        </GridList>
        <DropZone
          isEmpty={isEmpty}
          text='Drop your video here | mp4'
          isDragActive={isDragActive}
          loading={loading}
        />

        <Paper>
          <Box
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
            className={classes.containerUpload}
          >
            <input
              {...getInputProps()}
              onChange={e => uploadVideo360(e.target.files)}
              accept='video/*'
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
                Upload video 360
              </Button>
            </label>
            <video
              style={{
                height: '200px',
                width: '200px',
                position: 'fixed',
                left: '-1000%',
                backgroundColor: 'red',
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

export interface VideoProps {
  loading: boolean
  setLoading: Function
}

export interface ImgProps {
  loading: boolean
  setLoading: Function
}
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    borderBottom: '2rem solid',
    borderTopColor: COLORS.GRAY_MEDIUM,
    borderBottomColor: COLORS.GRAY_MEDIUM
  },
  paper: {
    height: '100%'
  },
  containerUpload: {
    padding: '1rem'
  },
  uploadButton: {
    marginLeft: '1rem'
  },
  gridList: {
    width: '100%',
    height: '90%'
  }
}))

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs)

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)
