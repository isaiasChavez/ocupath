import Head from "next/head";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useContext, useState } from "react";
import { verifyEmail } from "../../src/config/utils";
import UserContext, {
  ResetPassword,
} from "../../src/context/user/user.context";
import { Box, LinearProgress } from "@material-ui/core";
import { COLORS } from "../../src/types";
import { CustomInput } from ".";
import HeaderSimple from "../../src/components/general/HeaderSimple";
import withAuth from "../../src/auth/WithAuth";
import HeadCustom from "../../src/layouts/HeadCustom";
export interface ForgotProps {}

const Forgot: React.FC<ForgotProps> = () => {
  const { passRecover ,loading} = useContext(UserContext);
  const [loginState, setloginState] = useState({
    email: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });
  const { email } = loginState;

  const onSubmit = async(e) => {
    e.preventDefault();
    if (validateFields()) {
      let dto = new ResetPassword(loginState.email);
      const status =await passRecover(dto);
      console.log({status})
      if (status===0) {
        setloginState({
          email:""
        })
      }
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
      newErrors.email = "Enter a value";
      isValid = false;
    }
    if (!verifyEmail(email)) {
      isValid = false;
      newErrors.email = "Enter a valid email";
    }
    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };
  const useStyles = makeStyles((theme) => ({
   
     inner: {
      width: '34rem',
      marginTop: '-3rem',
      color:'white'
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
    <>
      <HeadCustom>
        <title>Multivrsity | Recover</title>
      </HeadCustom>
    
     <HeaderSimple isLogin={false}/>
    <div style={ {
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:COLORS.blue_primary,
      color:'white'
    } }>


      <div className={classes.inner}>
        <Typography component="h3" variant="h3" style={{textAlign: 'center'}} >
          <Box color="white" fontWeight="fontWeightBold" m={4} >
            Recover Password
      </Box>
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
          <Typography component="h3"   style={ { fontSize:'16px', textAlign: 'center' } } >
            <Box color="white" fontWeight="fontWeightLight" m={ 1 } >
              
            Enter the email in which you want to receive instructions to reset your password 
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
            value={loginState.email}
            FormHelperTextProps={ {
              style: {
                color: '#bb2929'
              }
            } }
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
            disabled={loading}
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

             { loading&&<LinearProgress style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
              }} color="secondary"/>}
    </div>
              </>

  );
};

export default withAuth(Forgot) ;
