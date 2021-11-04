import React, { useCallback, useContext, useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import { Space, Spin } from 'antd'
import { Popover, Button as ButtonAnt } from 'antd'
import Tab from '@material-ui/core/Tab'
import {
  COLORS,
  FILES,
  URLS,
  FILES_TYPES,
  Images,
  TypesNotification
} from '../../types'
import Grid from '@material-ui/core/Grid'
import { Box, Button, CircularProgress } from '@material-ui/core'
import clienteAxios from '../../config/axios'
import AssetsContext, { Asset } from '../../context/assets/assets.context'
import NotificationsContext from '../../context/notifications/notifications.context'
import { Config } from '../../config'
import { nameLengthValidator } from '../../config/utils'
import Previwer from '../login/Previwer'

interface StyledTabProps {
  label: string
}

const Constants = {
  MB: 1e6
}

const FilesConfiguration = {
  images: {
    minSize: Constants.MB * 1,
    maxSize: Constants.MB * 2,
    filesAcepted: 'image/jpeg, image/png'
  },
  images360: {
    minSize: Constants.MB * 1,
    maxSize: Constants.MB * 4.5,
    filesAcepted: 'image/jpeg, image/png'
  },
  videos: {
    minSize: Constants.MB * 1,
    maxSize: Constants.MB * 10,
    filesAcepted: 'image/jpeg, image/png'
  },
  videos360: {
    minSize: Constants.MB * 1,
    maxSize: Constants.MB * 10,
    filesAcepted: 'video/mp4'
  },
  nameToUpload: 'upload'
}

export interface TableFilesProps {}
const TableFiles: React.FC<TableFilesProps> = () => {
  const [currentTab, setCurrentTab] = useState(0)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  const classes = useStyles()
  useEffect(() => {
    getAssetsUser()
  }, [currentTab])
  const { getAssetsUser, isPreviewerOpened } = useContext(AssetsContext)

  const [loading, setLoading] = useState(false)

  return (
    <>
      {isPreviewerOpened && <Previwer />}
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
    </>
  )
}

export default TableFiles

export interface DropZoneProps {
  isDragActive: boolean
  loading: boolean
  isEmpty: boolean
  text: string
  type: FILES_TYPES
}

const DropZone: React.FC<DropZoneProps> = ({
  isDragActive,
  isEmpty,
  loading,
  text,
  type
}) => {
  const correctImage = () => {
    switch (type) {
      case FILES_TYPES.IMG:
        return Images.drop.dropimages
      case FILES_TYPES.IMG_360:
        return Images.drop.dropimages360
      case FILES_TYPES.VIDEO:
        return Images.drop.dropvideo
      case FILES_TYPES.VIDEO_360:
        return Images.drop.dropvideo360
      default:
        return Images.drop.dropimages
        break
    }
  }

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
      {isEmpty && !loading && !isDragActive && (
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
              src={correctImage()}
              alt='Upload your image'
            />
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
  const { assets, successCreate, openPreviewer } = useContext(AssetsContext)

  const classes = useStyles()
  const { sendAlert } = useContext(NotificationsContext)

  const [files, setFiles] = useState<FileList | []>([])
  useEffect(() => {
    const hasSelectedSomething = files && files.length !== 0
    if (hasSelectedSomething) {
      setImage()
    }
  }, [files])

  const uploadImage = (data: FileList) => {
    const hasSelectedSomething = data && data.length !== 0
    if (hasSelectedSomething) {
      const statusImage = Config.isImageValid(data[0])
      if (statusImage.isValid) {
        setFiles(data)
      } else {
        if (statusImage.errors.weight) {
          sendAlert({
            type: TypesNotification.warning,
            msg: `The maximum allowed file weight is: ${FilesConfiguration
              .images.maxSize / Constants.MB}MBs, your file has: ${
              statusImage.dataImage.sizeImage
            } MBs`
          })
        }
        setFiles([])
      }
    }
  }

  const onDrop = useCallback((acceptedFiles, errors) => {
    errors.map(error => {
      console.log({ errors })
      if (error.errors[0].code === 'file-too-large') {
        sendAlert({
          type: TypesNotification.warning,
          msg: `File is larger than ${FilesConfiguration.images.maxSize /
            Constants.MB}MBs`
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
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: FilesConfiguration.images.filesAcepted,
    maxFiles: 1,
    maxSize: FilesConfiguration.images.maxSize,
    noClick: true,
    validator: nameLengthValidator,
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })

  const uploadThumbnail = async (
    formDataImageRaw: FormData,
    selectedFile: File
  ) => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.toBlob(async function (blob) {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append(
          FilesConfiguration.nameToUpload,
          blob,
          selectedFile.name
        )
        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadImage,
          formData
        )

        const response = await clienteAxios.post(
          URLS.urlUploadImage,
          formDataImageRaw
        )
        const DTO = {
          url: response.data,
          thumbnail: urlThumnail,
          typeAsset: FILES_TYPES.IMG
        }

        const responseUploadUser = await clienteAxios.post(
          URLS.createAsset,
          DTO
        )
        setLoading(false)
        if (responseUploadUser.data.status === 0) {
          sendAlert({
            type: TypesNotification.success,
            msg: 'Your image has been uploaded successfully'
          })
          setFiles(null)
          successCreate(responseUploadUser.data.asset)
        }
      } catch (error) {
        setLoading(false)
        sendAlert({
          type: TypesNotification.error,
          msg: 'Error uploading thumbnail'
        })
      }
    })
  }

  const setImage = async () => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append(FilesConfiguration.nameToUpload, selectedFile)
      const newImage = URL.createObjectURL(selectedFile)

      const image = new Image()
      const _CANVAS = document.querySelector(
        '#canvas-element'
      ) as HTMLCanvasElement
      _CANVAS.width = Config.WIDTH_THUMBNAIL
      _CANVAS.height = Config.HEIGTH_THUMBNAIL

      const _CANVAS_CTX = _CANVAS.getContext('2d')
      image.src = newImage
      image.onload = () => {
        _CANVAS_CTX.drawImage(
          image,
          0,
          0,
          Config.WIDTH_THUMBNAIL,
          Config.HEIGTH_THUMBNAIL
        )
        uploadThumbnail(formData, selectedFile)
      }
    } catch (error) {
      setLoading(false)
      sendAlert({
        type: TypesNotification.error,
        msg: 'An error occurred while uploading the images'
      })
    }
  }
  const onOpenPreviewer = (currentAsset: Asset) => {
    openPreviewer(currentAsset, assets.images)
  }
  const isEmpty = assets.images.length == 0

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
              {assets.images.map((asset: Asset, i) => (
                <ImageGrid onOpenPreviewer={onOpenPreviewer} asset={asset} />
              ))}
            </div>
          </Box>
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

        <DropZone
          type={FILES_TYPES.IMG}
          isEmpty={isEmpty}
          text='Drop your files here png/jpg'
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
              {FilesConfiguration.images.maxSize / Constants.MB} MB
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
              onChange={e => uploadImage(e.target.files)}
              multiple={false}
              accept={FilesConfiguration.images.filesAcepted}
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
                Upload file
              </Button>
            </label>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

const ImageGrid = ({
  asset,
  onOpenPreviewer
}: {
  asset: Asset
  onOpenPreviewer: Function
}) => {
  const { deleteAsset } = useContext(AssetsContext)

  const [isPopperVisible, setIsPopperVisible] = useState<boolean>(false)
  const [isDeleteHoverd, setIsDeleteHoverd] = useState(false)
  const [isImageHovered, setIsImageHoverd] = useState(false)
  const classes = useStyles()
  const assetIsVideo =
    asset.typeAsset.id === FILES_TYPES.VIDEO ||
    asset.typeAsset.id === FILES_TYPES.VIDEO_360

  const [currentImage, setCurrentImage] = useState(null)

  useEffect(() => {
    const heavyImage: HTMLImageElement = document.createElement('img')
    heavyImage.onload = () => setCurrentImage(heavyImage.src)
    heavyImage.src = assetIsVideo ? asset.thumbnail : asset.url
  }, [assetIsVideo ? asset.thumbnail : asset.url])

  const onDeleteAsset = () => {
    deleteAsset(asset.uuid)
  }

  return (
    <div
      style={{
        borderRadius: '0.3rem',
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer'
      }}
      onMouseEnter={() => setIsImageHoverd(true)}
      onMouseLeave={() => {
        setIsPopperVisible(false)
        setIsImageHoverd(false)
      }}
      onClick={() => {
        if (!isDeleteHoverd && !isPopperVisible) {
          onOpenPreviewer(asset)
        }
      }}
    >
      {isImageHovered && (
        <Box
          position='absolute'
          className='animate-fadein-1s'
          top={0}
          height='2rem'
          width='2rem'
          display='flex'
          justifyContent='center'
          alignItems='center'
          borderRadius='100%'
          right={0}
          ml={1}
          style={{
            backgroundColor: '#374980',
            margin: '0.1rem'
          }}
        >
          <Popover
            placement='bottom'
            content={
              <Space direction='vertical' align='end'>
                <span style={{ fontFamily: 'font2' }}>
                  Are you sure you want to <br /> delete this image?
                </span>
                <Space>
                  <ButtonAnt
                    onClick={() => setIsPopperVisible(false)}
                    size='small'
                    className={classes.buttonCancel}
                  >
                    Cancel
                  </ButtonAnt>
                  <ButtonAnt
                    onClick={onDeleteAsset}
                    size='small'
                    className={classes.buttonOk}
                  >
                    Delete
                  </ButtonAnt>
                </Space>
              </Space>
            }
            trigger='click'
            visible={isPopperVisible}
          >
            <DeleteOutlineOutlinedIcon
              onMouseEnter={() => setIsDeleteHoverd(true)}
              onMouseLeave={() => setIsDeleteHoverd(false)}
              onClick={() => setIsPopperVisible(!isPopperVisible)}
              style={{
                color: 'white'
              }}
            />
          </Popover>
        </Box>
      )}
      {currentImage ? (
        <img
          style={{
            width: '100%',
            minHeight: '100%',
            objectFit: 'cover'
          }}
          alt='Image'
          title='Image'
          src={assetIsVideo ? asset.thumbnail : asset.url}
        />
      ) : (
        <div
          style={{
            width: '100%',
            minHeight: '100%',
            objectFit: 'cover',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Spin />
        </div>
      )}
    </div>
  )
}

export interface Img360Props {
  loading: boolean
  setLoading: Function
}

const Img360: React.FC<Img360Props> = ({ loading, setLoading }) => {
  const [files, setFiles] = useState<FileList | []>([])
  const { assets, successCreate, openPreviewer } = useContext(AssetsContext)
  const { sendAlert } = useContext(NotificationsContext)

  useEffect(() => {
    const hasSelectedSomething = files && files.length !== 0
    if (hasSelectedSomething) {
      setImage()
    }
  }, [files])
  const classes = useStyles()

  const uploadImage = (data: FileList) => {
    const hasSelectedSomething = data && data.length !== 0
    if (hasSelectedSomething) {
      const statusImage = Config.isImage360Valid(data[0])
      if (statusImage.isValid) {
        setFiles(data)
      } else {
        if (statusImage.errors.weight) {
          sendAlert({
            type: TypesNotification.warning,
            msg: `The maximum allowed file weight is: ${FilesConfiguration
              .images360.maxSize / Constants.MB}MBs, your file has: ${
              statusImage.dataImage.sizeImage
            } MBs`
          })
        }
        setFiles([])
      }
    }
  }
  const onDrop = useCallback((acceptedFiles, errors) => {
    console.log({ acceptedFiles })
    errors.map(error => {
      if (error.errors[0].code === 'file-too-large') {
        sendAlert({
          type: TypesNotification.warning,
          msg: `File is larger than ${FilesConfiguration.images360.maxSize /
            Constants.MB}MBs`
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
  }, [])

  const {
    getRootProps,
    getInputProps,
    isDragActive,
  } = useDropzone({
    onDrop,
    accept: FilesConfiguration.images360.filesAcepted,
    maxFiles: 1,
    maxSize: FilesConfiguration.images360.maxSize,
    noClick: true,
    validator: nameLengthValidator,
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })

  const uploadThumbnail = async (formDataImageRaw, selectedFile: File) => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement
    _CANVAS.toBlob(async function (blob) {
      try {
        setLoading(true)
        const formData = new FormData()
        formData.append(
          FilesConfiguration.nameToUpload,
          blob,
          selectedFile.name
        )
        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadImage,
          formData
        )

        const response = await clienteAxios.post(
          URLS.urlUploadImage360,
          formDataImageRaw
        )
        setLoading(false)
        const DTO = {
          url: response.data,
          thumbnail: urlThumnail,
          typeAsset: FILES_TYPES.IMG_360
        }
        const { data } = await clienteAxios.post(URLS.createAsset, DTO)
        if (data.status === 0) {
          successCreate(data.asset)
          setFiles(null)
          sendAlert({
            type: TypesNotification.success,
            msg: 'Your image has been uploaded successfully'
          })
        }
      } catch (error) {
        setLoading(false)
        sendAlert({
          type: TypesNotification.error,
          msg: 'Error uploading thumbnail'
        })
      }
    })
  }

  const setImage = async () => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append(FilesConfiguration.nameToUpload, selectedFile)
      setLoading(true)

      const newImage = URL.createObjectURL(selectedFile)

      const image = new Image()
      const _CANVAS = document.querySelector(
        '#canvas-element'
      ) as HTMLCanvasElement
      _CANVAS.width = Config.WIDTH_THUMBNAIL
      _CANVAS.height = Config.HEIGTH_THUMBNAIL

      const _CANVAS_CTX = _CANVAS.getContext('2d')
      image.src = newImage
      image.onload = () => {
        _CANVAS_CTX.drawImage(
          image,
          0,
          0,
          Config.WIDTH_THUMBNAIL,
          Config.HEIGTH_THUMBNAIL
        )
        uploadThumbnail(formData, selectedFile)
      }
    } catch (error) {
      setLoading(false)
      sendAlert({
        type: TypesNotification.error,
        msg: 'An error occurred while uploading the image'
      })
    }
  }
  const onOpenPreviewer = (currentAsset: Asset) => {
    openPreviewer(currentAsset, assets.images360)
  }
  const isEmpty = assets.images360.length == 0
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
              {assets.images360.map((asset: Asset, i) => (
                <ImageGrid onOpenPreviewer={onOpenPreviewer} asset={asset} />
              ))}
            </div>
          </Box>
        </Box>
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
        <DropZone
          type={FILES_TYPES.IMG_360}
          isEmpty={isEmpty}
          text='Drop your 360 images here | png/jpg'
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
              The files should not exceed a weight greater than $
              {FilesConfiguration.images360.maxSize / Constants.MB} MB
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
              onChange={e => uploadImage(e.target.files)}
              accept={FilesConfiguration.images360.filesAcepted}
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
                Upload file
              </Button>
            </label>
          </Box>
        </Paper>
      </Box>
    </>
  )
}

const Video: React.FC<VideoProps> = ({ loading, setLoading }) => {
  const { assets, successCreate, openPreviewer } = useContext(AssetsContext)
  const [files, setFiles] = useState<FileList>(null)
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
    uploadVideo(acceptedFiles)
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: FilesConfiguration.videos.filesAcepted,
    maxFiles: 1,
    maxSize: FilesConfiguration.videos.maxSize,
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
        formData.append(FilesConfiguration.nameToUpload, blob, 'filename.png')
        const { data: urlThumnail } = await clienteAxios.post(
          URLS.urlUploadImage,
          formData
        )
        console.log({ urlThumnail })
        setVideo(urlThumnail)
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
  const setVideo = async (thumbnail: string) => {
    try {
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append(FilesConfiguration.nameToUpload, selectedFile)
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

  const onOpenPreviewer = (currentAsset: Asset) => {
    openPreviewer(currentAsset, assets.videos)
  }
  const classes = useStyles()
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
              The files should not exceed a weight greater than ${FilesConfiguration.videos.maxSize /
            Constants.MB} MB
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
              onChange={e => uploadVideo(e.target.files)}
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

export interface Video360Props {
  loading: boolean
  setLoading: Function
}

const Video360: React.FC<Video360Props> = ({ loading, setLoading }) => {
  const classes = useStyles()
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
        formData.append(FilesConfiguration.nameToUpload, blob, 'filename.png')
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
            The files should not exceed a weight greater than ${FilesConfiguration.videos360.maxSize/Constants.MB} MB
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
  gridImages: {
    display: 'grid',
    gridAutoRows: '1fr',
    gridTemplateColumns: '200px 200px'
  },
  paper: {
    height: '100%'
  },
  warn: {
    backgroundColor: 'rgba(36, 37, 38, 0.6)'
  },
  containerUpload: {
    padding: '1rem',
    flex: 1
  },
  uploadButton: {
    marginLeft: '1rem',
    minWidth: '10rem',
    backgroundColor: '#45A0C5',
    fontSize: '0.75rem',
    textTransform: 'capitalize'
  },
  gridList: {
    width: '100%',
    height: '90%'
  },
  buttonCancel: {
    borderRadius: '2px',
    borderColor: 'rgba(69, 160, 197, 1)',
    color: '#45A0C5'
  },
  buttonOk: {
    borderRadius: '2px',
    backgroundColor: '#45A0C5',
    color: 'white'
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
      width: 200,

      minHeight: '4rem',
      fontSize: '1.125rem',
      color: '#A6ABAF',
      marginRight: theme.spacing(4),
      fontFamily: [
        'font3',
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
        color: '#242526',
        opacity: 1
      },
      '&$selected': {
        color: '#242526'
      },
      '&:focus': {
        color: '#242526'
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)
