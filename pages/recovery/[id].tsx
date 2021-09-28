import Head from "next/head";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { verifyPassword } from "../../src/config/utils";
import UserContext, {
  PasswordRecovery,
} from "../../src/context/user/user.context";
import {CustomInput} from '../login/index'
import HeaderSimple from "../../src/components/general/HeaderSimple";
import {COLORS,Images} from '../../src/types/index'
import { Box, CircularProgress } from "@material-ui/core";
import { Result, Spin } from "antd";
import HeadCustom from "../../src/layouts/HeadCustom";
export interface RecoveryProps {}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6eyJlbWFpbCI6ImFkbWluQGlubWVyc3lzLmNvbSIsInR5cGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJhZG1pbiI6eyJpZCI6OCwibmFtZSI6ImFzZGZzZGYiLCJsYXN0bmFtZSI6IkNow6F2ZXoiLCJhdmF0YXIiOiJodHRwczovL2QxYTM3MG5lbWl6YmpxLmNsb3VkZnJvbnQubmV0LzI0YzJmMzk4LTIyY2MtNDY5Mi05ZGI0LTIxYjkyMDc1ZDRmYy5nbGIiLCJ0aHVtYm5haWwiOiJodHRwczovL3JlbmRlcmFwaS5zMy5hbWF6b25hd3MuY29tL0xPWnNia0oyNi5wbmciLCJlbWFpbCI6ImFkbWluQGlubWVyc3lzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJFNoRVQ2NURpMXJZdnlyNm5mcTBaOS5FM3VpLlJMSkQxNlpESm84d1MwR2VaLzRJL09tdUpTIiwiYnVzaW5lc3MiOm51bGwsInV1aWQiOiI2MTY3Yjk5ZS1kZTkxLTRiNzAtODgxYy04YTVhOTBiZjE1YzEiLCJpc0RlbGV0ZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMS0wNi0wM1QwMzowOToyNy4zMDVaIiwidXBkYXRlZEF0IjoiMjAyMS0wOC0wNVQyMToxMTo1Ny43NThaIiwidHlwZSI6eyJpZCI6MiwibmFtZSI6IkFETUlOIn19LCJzdXBlckFkbWluIjpudWxsLCJ1c2VyIjpudWxsLCJpZCI6IjkyNDkxNWJiLWE2ZWUtNGRlOS1iODg5LTAzZmVmNDRhMzNlOCJ9LCJpYXQiOjE2MjgyMTcyNjQsImV4cCI6MTYzNTQxNzI2NH0.13mM21HB2w46B52OwfLBK8sxF7LeI7_tQwHnX1PfWoI

const Recovery: React.FC<RecoveryProps> = () => {
  const { resetPass ,validateToken,loading} = useContext(UserContext);
  const router = useRouter();
  const [canViewThis, setCanViewThis] = useState(false)
  const token:string = router.query.id as string
  const [loginState, setloginState] = useState({
    password: "",
    confirm:""
  });
  const [errors, setErrors] = useState({
    password: "",
    confirm:""
  });
  const { password,confirm } = loginState;

  useEffect(() => {
    const validate=async()=>{
      if (token) {
        const status = await validateToken(token)
        if (status!==0) {
          setCanViewThis(false)
        }else{
          setCanViewThis(true)
        }
        console.log({status})
      }
      console.log({status})
    }
    validate()
  }, [token])

  const onSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      let dto = new PasswordRecovery(loginState.password, token);      
       resetPass(dto);
    }
  };

  const onChange = (e) => {
    setErrors({
      password: "",
      confirm:""
    })
    setloginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const validateFields = () => {
    let isValid = true;
    const newErrors = {
      password: "",
      confirm:""
    };
    if (password.trim() === "") {
      newErrors.password = "Enter a value";
      isValid = false;
    }
    if (confirm.trim() === "") {
      newErrors.confirm = "Enter a value";
      isValid = false;
    }
    if (!verifyPassword(password)) {
      isValid = false;
      newErrors.password =
        "Your password is not secure, try to include at least one different character, 8 letters a number, and upper and lower case letters.";
    }
    if (password!==confirm) {
      isValid = false;
      newErrors.confirm =
        "Passwords do not match";
    }
    

    if (!isValid) {
      setErrors(newErrors);
    }
    return isValid;
  };
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    button: {
      color: "white",
    },
    form: {
      minWidth: '28.75rem',
      maxWidth: '28.75rem',

      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      minWidth: theme.spacing(10),
      textTransform: 'capitalize',
      fontSize: '1rem',
      paddingTop: '0.55rem'
    },
  }));
  const classes = useStyles();

  if (loading) {
    return(<Box style={{
      backgroundColor:COLORS.blue_primary
    }} height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
      <Spin size="large" />

    </Box>)
  }

  if (!loading&&!canViewThis) {
      return (<Box  display="flex" height="100vh" width="100vw" justifyContent="center" alignItems="center">

      <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      />
      </Box>)
      
  }

  return (
    <>

      <HeadCustom>
        <title>Multivrsity - Recovery </title>
      </HeadCustom>
      <HeaderSimple isLogin={false} />
      <div className="animate-fadein" style={ {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.blue_primary,
        color: 'white'
      } }>

        <div className={classes.paper}>
        <Box
          width='100%'
          mb={6}
          height='4.5rem'
          display='flex'
          justifyContent='center'
          fontWeight='fontWeightBold'
          >
          <img src={Images.logosvg} alt='Multivrsity' />
        </Box>
          <Box component="h1" color="#fff" fontSize="1rem" fontFamily="font3" >
            Reset your password
          </Box>
          <form onSubmit={onSubmit} className={classes.form}>
            <CustomInput
            disabled={loading}
            margin="normal"
            required
            fullWidth
            onChange={onChange}
            id="password"
            size="small"
            label="Password"
            variant='outlined'
            name="password"
            autoComplete="password"
            error={errors.password.length !== 0}
            helperText={errors.password}
            InputLabelProps={{
              style: {
                color: 'white',
                fontFamily: 'font2'
              }
            }}
            FormHelperTextProps={ {
              style: {
                color: '#bb2929'
              }
            } }
            InputProps={{
              style: {
                color: 'white',
                fontFamily: 'font2'
              }
            }}
            />
            <CustomInput
            disabled={loading}
            margin="normal"
            required
            fullWidth
            onChange={onChange}
            id="confirm"
            size="small"
            label="Confirm password"
            variant='outlined'
            name="confirm"
            autoComplete="password"
            error={errors.confirm.length !== 0}
            helperText={errors.confirm}
            FormHelperTextProps={ {
              style: {
                color: '#bb2929'
              }
            } }
            InputLabelProps={{
              style: {
                color: 'white',
                fontFamily: 'font2'
              }
            }}
            InputProps={{
              style: {
                color: 'white',
                fontFamily: 'font2'
              }
            }}
            />
            <Box justifyContent="center" pt={4} display="flex" width="100%"  >

            <Button
            disabled={loading}
            type="submit"
            variant="contained"
            size="small"
            color="secondary"
            className={classes.submit}
            >
                <span className={classes.button}>Update password</span>
            </Button>
              </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default Recovery;

