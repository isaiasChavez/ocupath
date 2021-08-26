import Layout from "../../src/layouts/Layout";
import Head from "next/head";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { verifyPassword } from "../../src/config/utils";
import UserContext, {
  PasswordRecovery,
} from "../../src/context/user/user.context";
import withAuth from "../../src/auth/WithAuth";
export interface RecoveryProps {}

const RecoveryIndex: React.FC<RecoveryProps> = () => {
  const { resetPass } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query;
  const [loginState, setloginState] = useState({
    password: "",
  });
  const [errors, setErrors] = useState({
    password: "",
  });
  const { password } = loginState;

  const onSubmit = (e) => {
    e.preventDefault();
    if (validateFields()) {
      let dto = new PasswordRecovery(loginState.password, "");
      resetPass(dto);
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
      password: "",
    };
    if (password.trim() === "") {
      newErrors.password = "Enter a value";
      isValid = false;
    }
    if (!verifyPassword(password)) {
      isValid = false;
      newErrors.password =
        "Su contraseña no es segura, trate de incluir al menos un caracter diferente, 8 letras un número y letras mayúsculas y minúsculas.";
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
            Ingrese su nueva contraseña
          </Typography>
          <form onSubmit={onSubmit} className={classes.form}>
            <TextField
              margin="normal"
              required
              fullWidth
              onChange={onChange}
              id="password"
              label="password"
              name="password"
              autoComplete="password"
              autoFocus
              error={errors.password.length !== 0}
              helperText={errors.password}
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
export default withAuth(RecoveryIndex);

