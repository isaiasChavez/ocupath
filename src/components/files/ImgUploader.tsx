import { useCallback, useContext, useEffect, useState } from "react"
import { useDropzone } from "react-dropzone"
import { Config } from "../../config"
import {  validateFile } from "../../config/utils"
import AssetsContext, { Asset } from "../../context/assets/assets.context"
import NotificationsContext from "../../context/notifications/notifications.context"
import {
  TypesNotification, 
  FILES_TYPES,
  Images,
} from '../../types'
import { Constants, FilesConfiguration, ImageGrid, useStylesFiles } from "./TableFiles"
import { Box, Button, Paper } from "@material-ui/core"
import DropZone from "./DropZone"
export interface ImgProps {
  loading: boolean
  setLoading: Function
}

const ImgUploader: React.FC<ImgProps> = ({ loading, setLoading }) => {
  const { assets, openPreviewer,uploadImage } = useContext(AssetsContext)

  const classes = useStylesFiles()

  const { sendAlert } = useContext(NotificationsContext)

  const [files, setFiles] = useState<FileList | []>([])
  useEffect(() => {
    const hasSelectedSomething = files && files.length !== 0
    if (hasSelectedSomething) {
      setImage()
    }
  }, [files])

  const handleUploadImage = (data: FileList) => {
    const hasSelectedSomething = data && data.length !== 0
    if (hasSelectedSomething) {
      const statusImage = validateFile(data[0],{
        maxLengthName:Config.MAX_LENGTH_NAME_SIZE,
        maxSize:FilesConfiguration.images.maxSize / Constants.MB
      })
      if (!statusImage) {
        setFiles(data)
      } else {
          sendAlert({
            type: TypesNotification.warning,
            msg: statusImage.message
          })
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
    validator: (file:File)=>{
      return validateFile(file,{
        maxLengthName:Config.MAX_LENGTH_NAME_SIZE,
        maxSize:FilesConfiguration.images.maxSize/ Constants.MB
      })
    },
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

        const formDataThumnail = new FormData()
        formDataThumnail.append(
          FilesConfiguration.nameToUpload,
          blob,
          selectedFile.name
        )

         await uploadImage({
          formDataFile:formDataImageRaw,
          formDataThumbnail:formDataThumnail,
          file:selectedFile
        }) 
       


        setFiles(null)
        setLoading(false)

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
      const formDataImage = new FormData()
      formDataImage.append(FilesConfiguration.nameToUpload, selectedFile)
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
        uploadThumbnail(formDataImage, selectedFile)
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
              onChange={e => handleUploadImage(e.target.files)}
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
export default ImgUploader