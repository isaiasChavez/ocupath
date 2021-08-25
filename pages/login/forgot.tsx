import Layout from "../../src/layouts/Layout";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useContext, useState } from "react";
import { verifyEmail } from "../../src/config/utils";
import UserContext, {
  PasswordRecovery,
  ResetPassword,
} from "../../src/context/user/user.context";
import HeaderCustom from "../../src/components/general/HeaderCustom";
import { Box } from "@material-ui/core";
import { COLORS } from "../../src/types";
import { CustomInput } from ".";
export interface ForgotProps {}

const Forgot: React.FC<ForgotProps> = () => {
  const { passRecover } = useContext(UserContext);
  const [loginState, setloginState] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const { email } = loginState;

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      let dto = new ResetPassword(loginState.email);
      passRecover(dto);
    }
  };
  const onChange = (e) => {
    setloginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      email: "",
    };
    if (email.trim() === "") {
      newErrors.email = "Ingrese un valor";
      isValid = false;
    }
    if (!verifyEmail(email)) {
      isValid = false;
      newErrors.email = "Ingrese un correo válido";
    }
    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };
  const useStyles = makeStyles((theme) => ({
   
     inner: {
      width: '34rem',
      marginTop: '-3rem'
    },
    button: {
      color: "white",
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(5),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      minWidth: '10rem',
      color:'white',
      textTransform:'capitalize',
      fontSize: '0.9rem'
    },
  }));
  const classes = useStyles();

  return (
    <div style={ {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:COLORS.blue_primary,
      color:'white'
    } }>
      <Head>
        <title>Ocupath - Login </title>
      </Head>
            <HeaderCustom/>

      <div className={classes.inner}>
        <Typography component="h3" variant="h3" style={{textAlign: 'center'}} >
          <Box fontWeight="fontWeightBold" m={4} >
            Recover Password
      </Box>
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
          <Typography component="h3"   style={ { fontSize:'16px', textAlign: 'center' } } >
            <Box fontWeight="fontWeightLight" m={ 1 } >
              
            Enter the email in which you want to receive your password 
          </Box>
        </Typography>
            <CustomInput
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
            size="small"
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="email"
              label="Email Address"
            name="email"
            variant="outlined"
              autoComplete="email"
              autoFocus
              error={errors.email.length !== 0}
              helperText={errors.email}
            />
            <div style={ {
            display:'flex',
            justifyContent: 'flex-end',
            alignItems:'center',
            flexDirection:'column'
          }}>

            <Button
              type="submit"
              size="small"
              variant="contained"
              color="secondary"
              className={ classes.submit }
              disableElevation
              title=""
              >
                Send
            </Button>
            
                </div>
          </form>
              </div>
    </div>
  );
};

export default Forgot;
