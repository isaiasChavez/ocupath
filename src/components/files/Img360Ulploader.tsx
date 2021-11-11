import { useCallback, useContext, useEffect, useState } from "react"
import { Config } from "../../config"
import {validateFile } from "../../config/utils"
import AssetsContext, { Asset } from "../../context/assets/assets.context"
import NotificationsContext from "../../context/notifications/notifications.context"
import { Constants, FilesConfiguration, ImageGrid, useStylesFiles } from "./TableFiles"
import { TypesNotification,FILES_TYPES, Images } from "../../types"
import { useDropzone } from "react-dropzone"
import { Box, Button, Paper } from "@material-ui/core"
import DropZone from "./DropZone"

export interface Img360Props {
  loading: boolean
  setLoading(status:boolean): any
}

const Img360Uploader: React.FC<Img360Props> = ({ loading, setLoading }) => {
  const [files, setFiles] = useState<FileList | []>([])
  const { assets, openPreviewer,uploadImage360 } = useContext(AssetsContext)
  const { sendAlert } = useContext(NotificationsContext)

  useEffect(() => {
    const hasSelectedSomething = files && files.length !== 0
    if (hasSelectedSomething) {
      setImage()
    }
  }, [files])
  const classes = useStylesFiles()

  const uploadImage = (data: FileList) => {
    const hasSelectedSomething:boolean = data && data.length !== 0
    if (hasSelectedSomething) {

      const statusImage = validateFile(data[0],{
        maxLengthName:Config.MAX_LENGTH_NAME_SIZE,
        maxSize:FilesConfiguration.images360.maxSize/ Constants.MB
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
    validator: (file:File)=>{
      return validateFile(file,{
        maxLengthName:Config.MAX_LENGTH_NAME_SIZE,
        maxSize:FilesConfiguration.images360.maxSize/ Constants.MB
      })
    },
    multiple: false,
    noKeyboard: true,
    disabled: loading
  })

  const generateThumbnail = async (formDataImageRaw:FormData, selectedFile: File) => {
    const _CANVAS = document.querySelector(
      '#canvas-element'
    ) as HTMLCanvasElement

    _CANVAS.toBlob(async function (blob) {
      try {
        const formDataThumbnail:FormData = new FormData()
        formDataThumbnail.append(
          FilesConfiguration.nameToUpload,
          blob,
          selectedFile.name
        )

        await uploadImage360({
          file:selectedFile,
          formDataFile:formDataImageRaw,
          formDataThumbnail
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
        generateThumbnail(formData, selectedFile)
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
  const sizeInNumber:number  = FilesConfiguration.images360.maxSize / Constants.MB
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
              The files should not exceed a weight greater than {sizeInNumber} MB
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


export default Img360Uploader