import Head from 'next/head'
import { message } from 'antd';

import {
  Link,
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  InputLabel,
  InputAdornment,
  IconButton,
  OutlinedInput
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useContext,useEffect,useState } from 'react'
import { verifyEmail } from '../../src/config/utils'
import UserContext,{
  ReuestSesionDTO
} from '../../src/context/user/user.context'
import { COLORS,Images } from '../../src/types/index'
import { withStyles } from '@material-ui/styles'
import { Visibility,VisibilityOff } from '@material-ui/icons'
import HeaderSimple from '../../src/components/general/HeaderSimple'
import withAuth from '../../src/auth/WithAuth'

export const CustomInput = withStyles({
  root: {

    borderColor: 'white',
    color: 'white',
    '& input:valid + fieldset': {
      
      borderColor: 'white'
    },
    '& input:invalid + fieldset': {
      borderColor: ' white'
    },
    '& .MuiOutlinedInput-root.Mui-error': {
      color: COLORS.red_error,
      '& fieldset': {
        borderColor: COLORS.red_error,
        color: COLORS.red_error,
      },
      '& p': {
        color: COLORS.red_error,
      }
    },
    '& .MuiOutlinedInput-root.Mui-disabled': {
      '& fieldset': {
        
        borderColor: COLORS.GRAY_MEDIUM,
        opacity: 0.6,
        color: COLORS.red_error,
      },
      '& p': {
        color: COLORS.red_error,
      }
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      }
    },
    '& input:valid:focus + fieldset': {
      color: 'white',
    }
  },
  fieldset:{

  }
})(TextField)
export const CustomInputDos = withStyles({
  root: {
    '& input:valid + fieldset': {},
    '& input:invalid + fieldset': {
      borderColor: 'white'
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white'
      },
      '&:hover fieldset': {
        borderColor: 'white'
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white'
      }
    },
    '& input:valid:focus + fieldset': {}
  }
})(FormControl)

export interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [loginState,setloginState] = useState({
    email: '',
    password: '',
    showPassword: false
  })

  const { logUser,loading } = useContext(UserContext)
  useEffect(() => {
    console.log({ logUser })
  },[])

  const [errors,setErrors] = useState({
    email: null,
    password: null
  })
  const { email,password } = loginState

  const onChange = e => {
    setErrors({
      email: null,
      password: null
    })
    setloginState({
      ...loginState,
      [e.target.name]: e.target.value
    })
  }
  const onSubmit = async e => {
    e.preventDefault()
    if (validateFields()) {
      let dto = new ReuestSesionDTO(loginState.email,loginState.password)
      const data = await logUser(dto)
      if (data) {
        validateResponse(data)
      }
    }
  }

  const validateResponse = res => {
    const newErrors = {
      email: null,
      password: null
    }
    if (res.status === 1) {
      newErrors.email = "We cannot find an active account with this email"
    }
    if (res.status === 2) {
      newErrors.password = 'Invalid password'
    }
    if (res.status === 3) {
      message.info('Your subscription has expired');

    }
    setErrors(newErrors)
  }

  const validateFields = () => {
    let isValid = true
    const newErrors = {
      email: null,
      password: null
    }

    if (!email || email.trim() === '') {
      newErrors.email = 'Enter a value'
      isValid = false
    }
    if (!password) {
      newErrors.password = 'Enter a value'
    }
    if (!verifyEmail(email)) {
      newErrors.email = 'Enter a valid email'
      isValid = false
    }
    console.log({ newErrors })
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }

  const handleClickShowPassword = () => {
    setloginState({ ...loginState,showPassword: !loginState.showPassword })
  }

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  const classes = useStyles()

  return (
    <>
      <Head>
        <title>Multivrsity | Login</title>
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width'
        />
      </Head>
      <div
        style={ {
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundImage: `url(${Images.landingLogin})`,
          color: 'white',
          backgroundSize: 'cover'
        } }
      >
        <HeaderSimple isLogin={ true } />

        <Box className={ classes.container } bgcolor="primary.main">

          <Box
            width='100%'
            mb={ 6 }
            height='4.5rem'
            display='flex'
            justifyContent='center'
            fontWeight='fontWeightBold'
          >
            <img src={ Images.logosvg } alt='Multivrsity' />
          </Box>
          <form className={ classes.form } onSubmit={ onSubmit }>
            <Typography component='h3' style={ { textAlign: 'center' } }>
              <Box color="white" fontSize="1.25rem" m={ 1 }>
                Fill the information below to enter your profile{ ' ' }
              </Box>
            </Typography>
            <Box width="100%" mb={ 2 } >
              <CustomInput
                disabled={ loading }
                margin='normal'
                fullWidth
                onChange={ onChange }
                id='email'
                label='Email Address'
                error={ errors.email !== null }
                name='email'
                autoComplete='email'
                helperText={ errors.email }
                size='small'
                FormHelperTextProps={ {
                  style: {
                    color: '#bb2929'
                  }
                } }

                InputLabelProps={ {
                  style: {
                    color: 'white',
                    fontFamily: 'font2'
                  }
                } }
                InputProps={ {
                  style: {
                    color: 'white',
                    fontFamily: 'font2'
                  }
                } }
                variant='outlined'
              />
            </Box>
            <CustomInputDos size='small' fullWidth variant='outlined'>
              <InputLabel
                style={ { color: 'white' } }
                htmlFor='outlined-adornment-password'
              >
                Password
              </InputLabel>
              <OutlinedInput
                disabled={ loading }
                id='outlined-adornment-password'
                type={ loginState.showPassword ? 'text' : 'password' }
                value={ loginState.password }
                name='password'

                error={ errors.password !== null }
                required
                style={ {
                  color: 'white'
                } }
                onChange={ onChange }
                autoComplete='current-password'
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={ handleClickShowPassword }
                      onMouseDown={ handleMouseDownPassword }
                      edge='end'
                      style={ {
                        color: 'white'
                      } }
                    >
                      { loginState.showPassword ? (
                        <Visibility />
                      ) : (
                        <VisibilityOff />
                      ) }
                    </IconButton>
                  </InputAdornment>
                }
                labelWidth={ 70 }
              />
            </CustomInputDos>
            <Box mt={ 0.5 } ml={ 1 } fontSize="0.75rem" fontFamily="font2" fontWeight="fontWeightLight" color="#bb2929">
              { errors.password }
            </Box>
            <div
              style={ {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                flexDirection: 'column'
              } }
            >
              <Box mt={ 6 } mb={ 2 }>

                <Link
                  style={ {
                    marginTop: '1rem',
                    width: '100%',
                    textAlign: 'center',
                    color: COLORS.blue_secondary,
                    textDecoration: 'underline',
                    fontFamily: 'font2'

                  } }
                  href='login/forgot'
                >
                  Forgot your password?
                </Link>
              </Box>

              <Button
                disabled={ loading }
                size='small'
                color='secondary'
                type='submit'
                variant='contained'
                className={ classes.submit }
                disableElevation
              >
                <span
                  style={ {
                    color: 'white',
                    fontSize: '1rem',
                    textTransform: 'capitalize',
                    fontFamily: 'font2'
                  } }
                >
                  Login
                </span>
              </Button>
            </div>
          </form>
        </Box>
      </div>
    </>
  )
}

export interface HeaderLandingProps { }

const useStyles = makeStyles(theme => ({
  inner: {
    width: '40rem'
  },
  container: {
    backgroundColor: 'rgba(36, 37, 38, 0.6)',
    padding: '5rem',
    borderRadius: '8pt',
  },
  form: {
    width: '33rem',
    '@media(maxWidth: 780px)': {
      width: '20rem',
    },
    maxWidth: '100vw',
  },
  submit: {
    margin: theme.spacing(5,0,2),
    minWidth: '11rem',
    paddingTop: '0.3rem'
  },
  bodyHeader: {
    position: 'absolute',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    height: '4.1rem',
    backgroundColor: COLORS.GRAY_MEDIUM
  },
  headerRight: {
    display: 'flex'
  },
  headerItem: {
    color: 'white',
    border: 0,
    backgroundColor: 'transparent',
    minWidth: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
    textalign: 'center'
  }
}))
export default withAuth(Login)
