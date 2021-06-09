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
} from "../../src/context/user/user.context";
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
      let dto = new PasswordRecovery(loginState.email);
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
          <Typography component="h1" variant="h5">
            Recuperar pass
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
              autoFocus
              error={errors.email.length !== 0}
              helperText={errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              <Link href="/panel">
                <span className={classes.button}>Enviar</span>
              </Link>
            </Button>
          </form>
        </div>
      </Container>
    </Layout>
  );
};

export default Forgot;
