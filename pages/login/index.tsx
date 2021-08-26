import Head from "next/head";
import { Link,Box,Typography,TextField,Button,colors, Container, FormControl, Input, InputLabel, InputAdornment, IconButton, OutlinedInput } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext,useEffect,useState } from "react";
import { verifyEmail } from "../../src/config/utils";
import { useRouter } from "next/router";

import UserContext,{
  ReuestSesionDTO,
} from "../../src/context/user/user.context";
import { COLORS,Images } from "../../src/types/index";
import HeaderCustom from "../../src/components/general/HeaderCustom";
import { withStyles } from "@material-ui/styles";
import { Visibility, VisibilityOff } from "@material-ui/icons";

export const CustomInput = withStyles({
  root: {
    '& input:valid + fieldset': {
    },
    '& input:invalid + fieldset': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& input:valid:focus + fieldset': {
    },
  },
})(TextField);
export const CustomInputDos = withStyles({
  root: {
    '& input:valid + fieldset': {
    },
    '& input:invalid + fieldset': {
      borderColor: 'white',
    },
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: 'white',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: 'white',
      },
    },
    '& input:valid:focus + fieldset': {
    },
  },
})(FormControl);



export interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [loginState,setloginState] = useState({
    email: "",
    password: "",
    showPassword: false,

  });
  const { logUser,loading } = useContext(UserContext);
  useEffect(() => {
    console.log({ logUser });
  },[]);

  const [errors,setErrors] = useState({
    email: null,
    password: null,
  });
  const { email,password } = loginState;

  const onChange = (e) => {
    setErrors({
      email: null,
      password: null,
    })
    setloginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      let dto = new ReuestSesionDTO(
        loginState.email,
        loginState.password,
      );
      const data = await logUser(dto);
      if (data) {
        validateResponse(data)
      }
    }
  };


  const validateResponse = (res) => {
    const newErrors = {
      email: null,
      password: null,
    }
    if (res.status === 1) {
      newErrors.email = "Email does't exist";
    }
    if (res.status === 2) {
      newErrors.password = "Invalid password";
    }
    setErrors(newErrors);
  };

  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      email: null,
      password: null,
    };

    if (!email || email.trim() === "") {
      newErrors.email = "Enter a value";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Enter a value";
    }
    if (!verifyEmail(email)) {
      newErrors.email = "Enter a valid email";
      isValid = false;
    }
    console.log({ newErrors })
    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };

  const handleClickShowPassword = () => {
    setloginState({ ...loginState, showPassword: !loginState.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const classes = useStyles();

  return (
    <div style={ {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.blue_primary,
      color: 'white'
    } }>
      <HeaderCustom />
      <Head>
        <title>Ocupath - Login </title>
      </Head>

      <Container maxWidth="sm" >
        <Box width="100%" mb={6} height="4.5rem"  display="flex" justifyContent="center"  fontWeight="fontWeightBold" >
          <img src={ Images.logo2x }  alt="Multivrsity" />
        </Box>
        <form onSubmit={ onSubmit } >
          <Typography component="h3" style={ { textAlign: 'center' } } >
            <Box fontWeight="fontWeightSemiBold" letterSpacing={1.5} m={ 1 } >
              Fill the information below to enter your profile          </Box>
          </Typography>
          <Box mb={2}>

          <CustomInput
            disabled={loading}
            margin="normal"
            fullWidth
            onChange={ onChange }
            id="email"
            label="Email Address"
            error={ errors.email !== null }
            name="email"
            autoComplete="email"
            helperText={ errors.email }
            size="small"
            InputLabelProps={{
              style:{
                color:'white',
              }
            }}
            InputProps={{
              style:{
                color:'white',
              }
            }}
            variant="outlined"
            />
            </Box>
<CustomInputDos size="small"

            fullWidth  variant="outlined">
          <InputLabel     style={
              {color:'white'}
            } htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
                      disabled={loading}

            id="outlined-adornment-password"
            type={loginState.showPassword ? 'text' : 'password'}
            value={loginState.password}
            name="password"
            error={ errors.password !== null }
            required
            
            style={{
              color:'white'
            }}
            onChange={onChange}
            autoComplete="current-password"
            endAdornment={
              <InputAdornment position="end" >
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                  style={{
                    color:'white'
                  }}
                >
                  {loginState.showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
            labelWidth={70}
          />
        </CustomInputDos>



          <div style={ {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column'
          } }>
            <Link
              style={ {
                marginTop: '1rem',
                width: '100%',
                textAlign: 'center',
                color: COLORS.blue_secondary,
                textDecoration: 'underline'
              } }
              href="login/forgot">Forgot your password?</Link>

            <Button
            disabled={loading}
            size="small"
            color="secondary"
              type="submit"
              variant="contained"
              className={ classes.submit }
              disableElevation
            >
                <span className="ITCAvantGardeStdBkSemiBold" style={{
                  color:'white',
                  textTransform: 'capitalize',
                  
                }}>Login</span>
            </Button>
          </div>

        </form>
      </Container>

    </div>
  );
};

export interface HeaderLandingProps {

}



const useStyles = makeStyles((theme) => ({

  inner: {
    width: '40rem',
  },
  submit: {
    margin: theme.spacing(5,0,2),
    minWidth: '11rem',
    paddingTop:'0.45rem'
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
    display: 'flex',

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
}));
export default Login;
