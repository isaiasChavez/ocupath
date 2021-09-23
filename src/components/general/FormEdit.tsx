import React, { useContext, useEffect, useState } from 'react'
import {
  Typography,
  TextField,
  Grid,
  Avatar,
  Box,
  Button,
  makeStyles,
  withStyles,
  LinearProgress
} from '@material-ui/core'
import { Images, URLS, USERS,USERS_TYPES } from '../../types/index'
import EditIcon from '@material-ui/icons/Edit'
import UserContext, { UpdateUserDTO } from '../../context/user/user.context'
import clienteAxios from '../../config/axios'
import NotificationsContext from '../../context/notifications/notifications.context'
import { useDropzone } from 'react-dropzone'
import { Config } from '../../config'
import { Image, Spin, Upload } from 'antd'

interface FormEditProps {
  type: number
  toggleEditAvatar: Function
}

const FormEdit: React.FC<FormEditProps> = ({ type, toggleEditAvatar }) => {
  const { profile, updateName, loading,isSuperAdmin } = useContext(UserContext)
  const classes = useStyles()
  const [isBlocked, setIsBlocked] = useState(true)
  const [error, setError] = useState('')
  const [hasError, setHasError] = useState(false)
  const [name, setName] = useState(profile.name)

  const handleUnlock = () => {
    setIsBlocked(!isBlocked)
    setError('')
    setHasError(false)
  }
  const onChange = e => {
    setHasError(false)
    setError('')
    setName(e.target.value)
  }
  useEffect(() => {
    setName(profile.name)
  }, [])

  const validateName = () => {
    let isValid = true
    if (!name || name.trim().length === 0 || name.trim().length >= 100) {
      setHasError(true)
      setError('Please enter a valid name')
      isValid = false
    } else if (name.trim().includes(' ')) {
      setHasError(true)
      setError('You cannot include spaces')
      isValid = false
    } else if (name.trim().length < 5) {
      setHasError(true)
      setError('They must be at least 5 characters.')
      isValid = false
    }
    return isValid
  }

  const onSubmit = async () => {
    if (validateName()) {
      const res = await updateName(name.trim())
      if (res.status === 0) {
        setName(res.name)
      } else {
        setName(profile.name)
      }
      handleUnlock()
    }
  }
  const Header = () => {
    let headerText: string = 'Invitación'
    if (type === USERS.ADMIN) {
      headerText = 'Administrator'
    }
    if (type === USERS.SUPER) {
      headerText = 'Super Administrator'
    }
    if (type === USERS.GUEST) {
      headerText = 'Guest'
    }
    return (
      <Typography gutterBottom>
        <Box fontSize={32} fontWeight='fontWeightBold'>
          {headerText}
        </Box>
      </Typography>
    )
  }
  console.log({isSuperAdmin})
  return (
    <Box width={'100%'} className={classes.root} pl={3}>
      <Header />
      <Box
        height='6%'
        display='flex'
        alignItems='center'
        fontSize={18}
        fontWeight='fontWeightBold'
      >
        Information
      </Box>
      <Box height='94%' display='flex'>
        <Box height='100%' minWidth='12rem' width='14%' mr={8}>
          <Box
            display='flex'
            justifyContent='space-between'
            flexDirection='column'
            alignItems='center'
          >
            <Box
              textAlign='left'
              width='100%'
              fontSize={16}
              fontWeight='fontWeightBold'
            >
              <h4 className={classes.information}>Avatar</h4>
            </Box>
            <Box width='100%' display='flex' justifyContent='center'>
              <Image
                src={profile.thumbnail}
                className={classes.large}
                preview={false}
                alt={profile.name}
                placeholder={
                  <Box
                    flex={1}
                    width='100%'
                    height='100%'
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                  >
                    <Spin />
                  </Box>
                }
              />
            </Box>
           
            <Button
              fullWidth={true}
              variant='outlined'
              color='secondary'
              onClick={() => toggleEditAvatar()}
              className={classes.buttonEdit}
              size='large'
            >
              Edit Avatar
            </Button>
          </Box>
          <Box
            display='flex'
            flexDirection='column'
            justifyContent='space-between'
          >
            <Box my={1} alignItems='center' display='flex'>
              <h3 className={classes.information}>
                Personal information
                <EditIcon
                  onClick={handleUnlock}
                  color='primary'
                  style={{
                    marginLeft: '0.4rem',
                    position: 'relative',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                />
              </h3>
            </Box>
            <Box>
              <Box mb={4}>
                <TextField
                  size='small'
                  error={hasError}
                  helperText={error}
                  datatype='text'
                  onChange={onChange}
                  placeholder={profile.name}
                  value={name}
                  required
                  id='cardName'
                  variant='outlined'
                  disabled={loading || isBlocked}
                  label='NickName'
                  fullWidth
                />
              </Box>
              <TextField
                size='small'
                value={profile.email}
                variant='outlined'
                disabled={true}
                required
                label='E-mail'
                fullWidth
              />
            </Box>
          </Box>

          {!isBlocked && (
            <Box mt={5} width='100%'>
              <ButtonSave
                disabled={loading}
                fullWidth={true}
                size='large'
                onClick={onSubmit}
                variant='contained'
                color='secondary'
                disableElevation
              >
                Save
              </ButtonSave>
            </Box>
          )}
        </Box>
        {type!==USERS_TYPES.SUPER_ADMIN&&<RightSide />}
      </Box>
    </Box>
  )
}

const RightSide = () => {
  const classes = useStyles()
  const [files, setFiles] = useState([])
  const { updateUser, profile, loading } = useContext(UserContext)
  const [urlPreview, setUrlPreview] = useState<ArrayBuffer | string>(null)
  const { sendAlert } = useContext(NotificationsContext)
  const [imageRoom, setImageRoom] = useState(Images.preload)
  
  const handleUpload = async () => {
    try {
      console.log("handle")
      const selectedFile = files[0]
      const formData = new FormData()
      formData.append('upload', selectedFile)
      const { data } = await clienteAxios.post(URLS.urlUploadRoom, formData)
      const updateUserDto = new UpdateUserDTO({
        avatar: null,
        name: null,
        thumbnail: null,
        roomImage: data
      })
      const status = await updateUser(updateUserDto)
      if (status === 0) {
        setFiles([])
        setUrlPreview(null)
      }
    } catch (error) {
      console.log(error)
      sendAlert({
        type: 'error',
        msg: 'An error occurred while uploading the images'
      })
    }
  }

  const props = {
    accept:'image/png, image/jpeg',
    beforeUpload: file => {
      const okFiles= ['image/png','image/jpeg','image/jpg']
      console.log(file.type)
      if (!okFiles.includes(file.type)) {

        sendAlert({
        type: 'warning',
        msg: 'Only .png / .jpg'
      })
        return 
      }

      const reader = new FileReader()
      reader.onload = function () {
        setUrlPreview(reader.result)
      }
      reader.readAsDataURL(file)
      setFiles([...files,file])
      return okFiles.includes(file.type) ? true : Upload.LIST_IGNORE
    },
          multiple: false,
    onChange: info => {
      console.log(info.fileList)
    }
  }

  useEffect(() => {
    const imageRoomUser: HTMLImageElement = document.createElement('img')
    imageRoomUser.onload = () => setImageRoom(imageRoomUser.src)
    imageRoomUser.src = profile.roomImage
  }, [profile.roomImage])

  return (
    <Box pl={8} height='100%' minWidth='12rem' width='20%'>
      <Box
        textAlign='left'
        width='100%'
        fontSize={16}
        mb={2}
        fontWeight='fontWeightBold'
      >
        <h4 className={classes.information}>Logo</h4>
      </Box>
      <Box fontFamily='font2'>
        Select your company logo image. This will be displayed within the virtual reality environmet as shown in the image below
      </Box>
      <Box
        maxHeight='8rem'
        minHeight='8rem'
        minWidth='100%'
        width='100%'
        display="flex"
        justifyContent="center"
        borderRadius='0.25rem'
        overflow='hidden'
        mt={1}
        mb={1}
      >
        <img
          src={imageRoom}
          style={{ height: '100%',width:'100%', objectFit: 'contain' }}
          alt='Room image'
        />
      </Box>
      <Box display='flex' width="100%"  justifyContent='center'>
        <Upload showUploadList={false} listType='picture' {...props}>
          <Button
            size='large'
            color='secondary'
            fullWidth
            variant='outlined'
            className={classes.submit}
            disableElevation
          >
            <span
              className='ITCAvantGardeStdBkSemiBold'
              style={{
                textTransform: 'capitalize'
              }}
            >
              Upload logo
            </span>
          </Button>
        </Upload>
      </Box>

      {urlPreview && (
        <>
          <Box
            textAlign='left'
            width='100%'
            fontSize={16}
            mb={2}
            mt={2}
            fontWeight='fontWeightBold'
          >
            <h4 className={classes.information}>Your logo</h4>
          </Box>
          <Box
          maxHeight='8rem'
        minHeight='8rem'
        width='100%'
        display="flex"
        justifyContent="center"
        borderRadius='0.25rem'
        overflow='hidden'
        mt={1}
        mb={1}
          >
            <img
              style={{ height: '100%', objectFit: 'contain' }}

              src={urlPreview as string}
              alt='Default app image'
            />
          </Box>
          <Button
            size='large'
            color='secondary'
            type='submit'
            disabled={loading}
            fullWidth
            variant='contained'
            onClick={handleUpload}
            className={classes.submit}
            disableElevation
          >
            <span
              className='ITCAvantGardeStdBkSemiBold'
              style={{
                color: 'white',
                textTransform: 'capitalize'
              }}
            >
              Save
            </span>
          </Button>
        </>
      )}
    </Box>
  )
}

const ButtonSave = withStyles({
  root: {
    textTransform: 'none',
    fontSize: '0.9rem',
    color: 'white'
  }
})(Button)

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
    flexDirection: 'column'
  },
  information: {
    justifyContent: 'flex-end',
    fontSize: '0.9rem'
  },
  subtitle: {
    fontsize: '1.5rem',
    textTransform: 'capitalize'
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
    minWidth: '14.2rem',
    width: '100%',
    paddingTop: '0.45rem'
  },
  large: {
    borderRadius: '100%',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '-0.2rem',
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: '0.5rem'
  },
  buttonEdit: {
    textTransform: 'capitalize',
    marginTop: '0.5rem',
    borderWidth: '2px',
    fontWeight: 'bold'
  }
}))
export default FormEdit
