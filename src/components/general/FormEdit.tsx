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
import { USERS } from '../../types/index'
import EditIcon from '@material-ui/icons/Edit'
import UserContext from '../../context/user/user.context'

interface FormEditProps {
  type: number
  toggleEditAvatar: Function
}

const FormEdit: React.FC<FormEditProps> = ({ type, toggleEditAvatar }) => {
  const { profile, updateName,loading } = useContext(UserContext)
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
      setError('Ingrese un nombre válido')
      isValid = false
    } else if (name.trim().includes(' ')) {
      setHasError(true)
      setError('No puedes incluir espacios')
      isValid = false
    } else if (name.trim().length < 5) {
      setHasError(true)
      setError('Deben ser al menos 5 caracteres.')
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
      <Typography
        gutterBottom
      >
        <Box fontSize={32} fontWeight='fontWeightBold' >
          {headerText}
        </Box>
      </Typography>
    )
  }
  return (
    <Box width={'100%'} className={classes.root} pl={3}>
      <Header />
      <Box height='6%' display='flex' alignItems='center' fontSize={18} fontWeight="fontWeightBold">
        Information
      </Box>
      <Box height='94%' minWidth='12rem' width='14%'>
        <Box
          display='flex'
          justifyContent='space-between'
          flexDirection='column'
          alignItems='center'
        >
          <Box textAlign='left' width='100%' fontSize={16} fontWeight='fontWeightBold'    >
            <h4 className={classes.information}>Avatar</h4>
          </Box>
          <Avatar
            src={profile.thumbnail}
            alt='Remy Sharp'
            className={classes.large}
          />
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
          <Box my={1} alignItems='center' display='flex' >
            <h3 className={classes.information}>
              Personal information
              <EditIcon
                onClick={handleUnlock}
                color='primary'
                style={{
                  marginLeft: '0.4rem',
                  position:'relative',
                  fontSize:'1.2rem',
                  cursor: 'pointer'
                }}
              />
            </h3>
          </Box>
          <Box>
            <Box mb={4}>
              <TextField
              
              size="small"
              error={hasError}
              helperText={error}
                datatype='text'
                onChange={onChange}
                placeholder={profile.name}
                value={name}
                required
                id='cardName'
                variant='outlined'
                disabled={loading||isBlocked}
                label='NickName'
                fullWidth
                />
                          

            </Box>
            <TextField
                size="small"
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
        <Box mt={5}>
          <ButtonSave 
            disabled={loading}
          fullWidth={true} size="large" onClick={onSubmit} variant='contained' color='secondary'>
            Save
          </ButtonSave>

        </Box>
        )}
      </Box>
    </Box>
  )
}

const ButtonSave = withStyles({
  root: {
    textTransform: 'none',
    fontSize: '0.9rem',
    color:'white'
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
  large: {
    marginTop: '-0.2rem',
    width: theme.spacing(15),
    height: theme.spacing(15),
    marginBottom: '0.5rem'
  },
  buttonEdit: {
    textTransform: 'capitalize',
    marginTop: '0.5rem',
    borderWidth: '2px',
    fontWeight: 'bold',
  }
}))
export default FormEdit
