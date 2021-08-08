import Head from "next/head";
import {Link,Box,Typography,TextField,Button} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useEffect, useState } from "react";
import { verifyEmail } from "../../src/config/utils";
import { useRouter } from "next/router";

import UserContext, {
  ReuestSesionDTO,
} from "../../src/context/user/user.context";
import { COLORS } from "../../src/types/index";
import HeaderCustom from "../../src/components/general/HeaderCustom";



export interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [loginState, setloginState] = useState({
    email: "",
    password: "",
  });
  const { logUser } = useContext(UserContext);
  useEffect(() => {
    console.log({ logUser });
  }, []);
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  const { email, password } = loginState;

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
    if (res.status ===2) {
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
    
    if (!email|| email.trim() === "") {
      newErrors.email = "Ingrese un valor";
      isValid = false;
    }
    if (!password) {
      newErrors.password = "Ingrese un valor";
    }
    if (!verifyEmail(email)) {
      newErrors.email = "Ingrese un correo válido";
      isValid = false;
    }
    console.log({newErrors})
    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };



  const classes = useStyles();

  return (
    <div style={ {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center'
    } }>
      <HeaderCustom/>
      <Head>
        <title>Ocupath - Login </title>
      </Head>
            
        <div className={classes.inner}>
        <Typography component="h3" variant="h3" style={{textAlign: 'center'}} >
          <Box fontWeight="fontWeightBold" m={1}>
            LOGIN
      </Box>
          </Typography>
          <form onSubmit={ onSubmit } >
            <Typography component="h3"  style={ { textAlign: 'center' } } >
            <Box fontWeight="fontWeightLight" m={ 1 } >
              
Fill the information below to enter your profile          </Box>
        </Typography>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={ onChange }
              id="email"
              label="Email Address"
              error={errors.email!==null}
              name="email"
              autoComplete="email"
              helperText={ errors.email }
              
             variant="outlined"
              />
             <TextField
             variant="outlined"
              margin="normal"
              required
              fullWidth
              error={errors.password!==null}
              onChange={ onChange }
              label="Password"
              name="password"
              autoComplete="current-password"
              helperText={ errors.password }
          />
          <div style={ {
            display:'flex',
            justifyContent: 'flex-end',
            alignItems:'flex-end',
            flexDirection:'column'
          }}>

            <Button
              type="submit"
              variant="contained"
              color="default"
              className={ classes.submit }
              disableElevation
              >
              <Link href="/superadmin">
                <span className={ classes.button }>Login</span>
              </Link>
            </Button>
            <Link
              style={ {
                marginTop:'1rem',
                width: '100%',
                textAlign:'center'
                }}
              href="login/forgot">Forgot password?</Link>
                </div>

          </form>
              </div>

    </div>
  );
};

export interface HeaderLandingProps {
  
}



  const useStyles = makeStyles((theme) => ({
    button: {
      color: "white",
    },
    inner: {
      width: '40rem',
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      minWidth: '9rem',
      borderRadius:'3px',
      backgroundColor:'black'
    },
    bodyHeader: {
      position: 'absolute',
      color:'white',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      top: 0,
      left: 0,
      right: 0,
      height: '4.1rem',
      backgroundColor:COLORS.GRAY_MEDIUM
    },
     headerRight: {
      display: 'flex',
      
    },
    headerItem: {
      color:'white',
      border: 0,
      backgroundColor: 'transparent',
      minWidth: '10rem',
      justifyContent: 'center',
      alignItems: 'center',
      textalign: 'center'
    }
  }));
export default Login;
