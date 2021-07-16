//Módulo de administración súper usuario

import React, { useContext, useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Layout from "../../src/layouts/Layout";
import { useRouter } from "next/router";
import clienteAxios from "../../src/config/axios";
import { URLS } from "../../src/types";
import { AxiosResponse } from "axios";
import UserContext from "../../src/context/user/user.context";

export interface RegisterProps {}

const Register: React.FC<RegisterProps> = () => {
  const router = useRouter();

  const [isViewBlocked, setIsViewBlocked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const { id } = router.query;

  const {addUserAdm,addUser} = useContext(UserContext)

  const classes = useStyles();
  useEffect(() => {
    if (id) {
      console.log({id})
      getDataRegister();
    }
    return () => {};
  }, [id]);

  const [dataUsuario, setDataUsuario] = useState(initialState())

  const [errors, setErrors] = useState(initialErrors())


  const onChangeInput = (e) => {
    setErrors(initialErrors())
    setDataUsuario({
      ...dataUsuario,
      [e.target.name]: e.target.value
    })
  }



  const validateFields = (): boolean => {
    let isValid = true
    console.log("Validando comunes")
    let newErrors = { ...errors }
    if (dataUsuario.name.trim().length === 0) {
      setErrors({ ...errors, name: "Ingrese un valor válido" });
      isValid = false
    }
    if (dataUsuario.lastname.trim().length === 0) {
      setErrors({ ...errors, name: "Ingrese un valor válido" });
      isValid = false
    }
    if (dataUsuario.password.trim().length === 0) {
      setErrors({ ...errors, name: "Ingrese un valor válido" });
      isValid = false
    }
    if (dataUsuario.confirmPassword!==dataUsuario.password ) {
      setErrors({
        ...errors,
        password: "Las contraseñas no coinciden",
        confirmPassword: "Las contraseñas no coinciden"
      });
      isValid = false
    }
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }

  const onSubmit = async(e) => {
    e.preventDefault()
    if (validateFields()) {
        if (dataUsuario.type === 2) {
          const response = await addUserAdm(dataUsuario)
        }
        if (dataUsuario.type === 3) {
          await addUser(dataUsuario)
        }
        setDataUsuario(initialState())
      } else {
        alert("Errores ")
        
      }

  }


  const getDataRegister = async () => {
    try {
      const response: AxiosResponse = await clienteAxios.get(
        `${URLS.decifre}${id}`
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
          type:data.data.type,
        })
      }
    } catch (error) {
      setIsLoading(false)
      console.log({ error });
    }
  };

  if (isViewBlocked&&!isLoading) {
      return <div>¡No puedes estár aquí!</div>
  }
  if (isLoading) {
      return <div>Cargando</div>
  }

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            WELCOME TO OCUPATH VR
          </Typography>
          <form className={classes.form} onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <TextField
                  value={dataUsuario.name}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                   onChange={ onChangeInput }
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastname"
                  label="Last Name"
                  name="lastname"
                  autoComplete="lname"
                  value={dataUsuario.lastname}
                   onChange={ onChangeInput }
                />
              </Grid>
              {dataUsuario.type ===2 && <Grid item xs={12} sm={12}>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  id="business"
                  label="Company"
                  value={dataUsuario.company}
                  name="business"
                />
              </Grid>}
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  disabled
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={dataUsuario.email}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
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
               <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={dataUsuario.confirmPassword}
                   onChange={ onChangeInput }
                />
              </Grid>
            
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Send Confirmatiom
            </Button>
          
          </form>
        </div>
      
      </Container>
    </Layout>
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
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const initialState = () => {
  return {
    name: '',
    lastname: '',
    company: '',
    email: '',
    password: '',
    confirmPassword: '',
    type:null
  }
}



const initialErrors = () => {
  return {
    name: null,
    password: null,
    confirmPassword: null,
    email: null,
  }
}

export default Register;
