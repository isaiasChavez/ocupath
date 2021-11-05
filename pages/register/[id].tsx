//Módulo de administración súper usuario

import React,{ useContext,useEffect,useState } from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import clienteAxios from "../../src/config/axios";
import { COLORS,Images,URLS } from "../../src/types/index";
import { AxiosResponse } from "axios";
import UserContext from "../../src/context/user/user.context";
import { decifreToken,verifyPassword } from "../../src/config/utils";
import HeaderSimple from "../../src/components/general/HeaderSimple";
import { CustomInput } from "../login";
import { Result, Spin } from "antd";
import HeadCustom from "../../src/layouts/HeadCustom";

export interface RegisterProps { }

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();

  const [isViewBlocked,setIsViewBlocked] = useState(false)
  const [isLoading,setIsLoading] = useState(true)
  const { id } = router.query;

  const { addUserAdm,addUser ,loading} = useContext(UserContext)

  const classes = useStyles();
  useEffect(() => {
    if (id) {
      const status = decifreToken(id as string)
      if (status.status) {

        getDataRegister(status.jwtDecoded.token);
      }else{
        setIsLoading(false)
        setIsViewBlocked(true)
      }

    }
    return () => { };
  },[id]);

  const [dataUsuario,setDataUsuario] = useState(initialState())
  const [errors,setErrors] = useState(initialErrors())
  const onChangeInput = (e) => {
    setErrors(initialErrors())
    setDataUsuario({
      ...dataUsuario,
      [e.target.name]: e.target.value
    })
  }



  const validateFields = (): boolean => {
    let isValid = true
    let newErrors = { ...errors }
    if (dataUsuario.name.trim().length === 0) {
      newErrors.name= "The field is empty"
      isValid = false
    }
    if (dataUsuario.lastname.trim().length === 0) {
      newErrors.lastname= "The field is empty"
      isValid = false
    }
    if (!verifyPassword(dataUsuario.password)) {
      newErrors.password= "Your password is not secure. Password must have 8 or more characters with at least 1 Upper Case, 1 lower case, and 1 numeric character"
      isValid = false
    }
    if (dataUsuario.password.trim().length === 0) {
      newErrors.password= "The field is empty"
      isValid = false
    }
    if (dataUsuario.confirmPassword !== dataUsuario.password) {
      newErrors.confirmPassword= "Passwords do not match",
      isValid = false
    }
      setErrors(newErrors)
    return isValid
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (validateFields()) {
      if (dataUsuario.type === 2) {
        await addUserAdm(dataUsuario)
      }
      if (dataUsuario.type === 3) {
        await addUser(dataUsuario)
      }
      setDataUsuario(initialState())
    }

  }


  const getDataRegister = async (token: string) => {
    try {

      const response: AxiosResponse = await clienteAxios.get(
        `${URLS.decifre}${token}`
      );
      let { data } = response
      setIsLoading(false)
      if (data.status === 1) {
        setIsViewBlocked(true)
      }
      if (data.status === 0) {
        setIsViewBlocked(false)
        setDataUsuario({
          ...dataUsuario,
          email: data.data.email,
          company: data.data.company,
          type: data.data.type,
        })
      }
    } catch (error) {
      setIsLoading(false)
    }
  };

  if (isViewBlocked && !isLoading) {
    return (<Box  display="flex" height="100vh" width="100vw" justifyContent="center" alignItems="center">

    <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    />
    </Box>)
  }
  if (isLoading) {
    return <Box style={{
      backgroundColor:COLORS.blue_primary
    }} height="100vh" width="100vw" display="flex" justifyContent="center" alignItems="center">
     <Spin size="large" />

    </Box>
  }

  const props = {
    FormHelperTextProps: {
      style: {
        color: '#bb2929'
      }
    },
    InputLabelProps: {
      style: {
        color: 'white',
        fontFamily: 'font2'
      }
    },
    InputProps: {
      style: {
        color: 'white',
        fontFamily: 'font2'
      }
    },
  }


  return (
    <>
    
    <HeadCustom>
        <title>Multivrsity - Register </title>
      </HeadCustom>
      <HeaderSimple isLogin={ false } />
      <div
        style={ {
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.blue_primary
        } }
        className="animate-fadein"
      >
        <div className={ classes.paper }>
          <Box mb={ 3 } component="h1" textAlign="center" fontFamily="font1" fontSize="1.6rem" lineHeight="20px" color={ COLORS.white }>
            Welcome to
          </Box>
          <Box
            width='100%'
            mb={ 1 }
            height='3rem'
            display='flex'
            justifyContent='center'
            fontWeight='fontWeightBold'
          >
            <img src={ Images.logosvg } alt='Multivrsity' />
          </Box>
          <form className={ classes.form } onSubmit={ onSubmit }>
            <Box component="h1" fontFamily="font2" fontSize="0.9rem" lineHeight="20px" color={ COLORS.white }>
              To complete the process please provide us with the following information:
            </Box>
            <Box mb={ 2 } mt={ 3 } component="h1" fontFamily="font1" fontSize="0.9rem" lineHeight="20px" color={ COLORS.white }>
              Personal Information
            </Box>
            <Grid container spacing={ 2 }>
              <Grid item xs={ 12 } sm={ 12 }>
                <CustomInput
                  { ...props }
                  size='small'
                  className={ classes.input }
                  disabled={loading}
                  value={ dataUsuario.name }
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="First Name"
                  autoFocus
                  onChange={ onChangeInput }

                />
              </Grid>
              <Grid item xs={ 12 } sm={ 12 }>
                <CustomInput
                  { ...props }
                  size='small'
                  className={ classes.input }

                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                  value={ dataUsuario.lastname }
                  onChange={ onChangeInput }
                />
              </Grid>
              { dataUsuario.type === 2 && <Grid item xs={ 12 } sm={ 12 }>
                <CustomInput
                  { ...props }
                  size='small'
                  className={ classes.input }

                  variant="outlined"
                  disabled
                  fullWidth
                  id="business"
                  label="Company"
                  value={ dataUsuario.company }
                  name="business"
                />
              </Grid> }
              <Grid item xs={ 12 }>
                <CustomInput
                  { ...props }
                  size='small'
                  className={ classes.input }

                  variant="outlined"
                  disabled
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  value={ dataUsuario.email }
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={ 12 }>
                <CustomInput
                  { ...props }
                  size='small'
                  className={ classes.input }
                  error={errors.password!==null}
            helperText={errors.password}
            disabled={loading}
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  value={ dataUsuario.password }
                  autoComplete="current-password"
                  onChange={ onChangeInput }
                />
              </Grid>
              <Grid item xs={ 12 }>
                <CustomInput
                disabled={loading}
                  { ...props }
                  size='small'
                  className={ classes.input }
                  error={errors.confirmPassword!==null}
                  helperText={errors.confirmPassword}
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={ dataUsuario.confirmPassword }
                  onChange={ onChangeInput }
                />
              </Grid>

            </Grid>
            <Box display="flex" justifyContent="center" >

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              color="secondary"
              className={ classes.submit }
              >
              Send Confirmation
            </Button>
              </Box>

          </form>
        </div>

      </div>
    </>
  );
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
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
    maxWidth: '35rem',
    minWidth: '35%',

  },
  submit: {
    margin: theme.spacing(3,0,2),
    color: 'white',
    minWidth: '10rem',
  
    paddingTop: '0.55rem',
    textTransform: 'capitalize'
  },
  input: {
    marginBottom: theme.spacing(1),
  }
}));

const initialState = () => {
  return {
    name: '',
    lastname: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    type: null
  }
}



const initialErrors = () => {
  return {
    name: null,
    lastname: null,
    password: null,
    confirmPassword: null,
    email: null,
  }
}

export default Register;
