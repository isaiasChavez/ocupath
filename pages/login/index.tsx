import Layout from "../../src/layouts/Layout";
import Head from "next/head";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useContext, useEffect, useState } from "react";
import { verifyEmail } from "../../src/config/utils";
import { useRouter } from "next/router";

import UserContext, {
  ReuestSesionDTO,
} from "../../src/context/user/user.context";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export interface LoginProps {}

const Login: React.FC<LoginProps> = () => {
  const [loginState, setloginState] = useState({
    email: "",
    password: "",
    type: 2,
  });
  const { logUser } = useContext(UserContext);
  useEffect(() => {
    console.log({ logUser });
  }, []);
  const router = useRouter();

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const { email, password } = loginState;

  const onChange = (e) => {
    setloginState({
      ...loginState,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();

    if (validateFields()) {
      let dto = new ReuestSesionDTO(
        loginState.email,
        loginState.password,
        loginState.type
      );
      logUser(dto);
    }
  };

  const validateFields = () => {
    let isValid = true;
    console.log({ password, email });
    const newErrors = {
      email: "",
      password: "",
    };
    if (email.trim() === "") {
      newErrors.email = "Ingrese un valor";
      isValid = false;
      console.log("Error");
    }
    if (password.trim() === "") {
      newErrors.password = "Ingrese un valor";
    }
    if (!verifyEmail(email)) {
      isValid = false;
      newErrors.email = "Ingrese un correo válido";
    }
    console.log({ isValid });
    if (!isValid) {
      console.log("Cambiando", { isValid });
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
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

  const classes = useStyles();

  return (
    <Layout>
      <Head>
        <title>Ocupath - Login </title>
      </Head>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h3" variant="h5">
            LOGIN
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocussecondaryListItems
              id="password"
              autoComplete="current-password"
              helperText={errors.password}
            />
            <Grid container>
              <Grid item xs>
                <Link href="login/forgot">Forgot password?</Link>
              </Grid>
            </Grid>
          </form>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Link href="/superadmin">
                <span className={classes.button}>Super ADMIN</span>
              </Link>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Link href="/panel/admin">
                <span className={classes.button}>Admin</span>
              </Link>
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Link href="/panel/user">
                <span className={classes.button}>User</span>
              </Link>
            </Button>
        </div>
        <Box mt={8}>
          <Copyright />
        </Box>
      </Container>
    </Layout>
  );
};

export default Login;
