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
import { useContext, useEffect, useState } from "react";
import { verifyPassword } from "../../src/config/utils";
import UserContext, {
  PasswordRecovery,
} from "../../src/context/user/user.context";
import { CircularProgress } from "@material-ui/core";
import { COLORS } from "../../src/types";
export interface RecoveryProps {}

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbiI6eyJlbWFpbCI6ImFkbWluQGlubWVyc3lzLmNvbSIsInR5cGUiOnsiaWQiOjIsIm5hbWUiOiJBRE1JTiJ9LCJhZG1pbiI6eyJpZCI6OCwibmFtZSI6ImFzZGZzZGYiLCJsYXN0bmFtZSI6IkNow6F2ZXoiLCJhdmF0YXIiOiJodHRwczovL2QxYTM3MG5lbWl6YmpxLmNsb3VkZnJvbnQubmV0LzI0YzJmMzk4LTIyY2MtNDY5Mi05ZGI0LTIxYjkyMDc1ZDRmYy5nbGIiLCJ0aHVtYm5haWwiOiJodHRwczovL3JlbmRlcmFwaS5zMy5hbWF6b25hd3MuY29tL0xPWnNia0oyNi5wbmciLCJlbWFpbCI6ImFkbWluQGlubWVyc3lzLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEyJFNoRVQ2NURpMXJZdnlyNm5mcTBaOS5FM3VpLlJMSkQxNlpESm84d1MwR2VaLzRJL09tdUpTIiwiYnVzaW5lc3MiOm51bGwsInV1aWQiOiI2MTY3Yjk5ZS1kZTkxLTRiNzAtODgxYy04YTVhOTBiZjE1YzEiLCJpc0RlbGV0ZWQiOmZhbHNlLCJpc0FjdGl2ZSI6dHJ1ZSwiY3JlYXRlZEF0IjoiMjAyMS0wNi0wM1QwMzowOToyNy4zMDVaIiwidXBkYXRlZEF0IjoiMjAyMS0wOC0wNVQyMToxMTo1Ny43NThaIiwidHlwZSI6eyJpZCI6MiwibmFtZSI6IkFETUlOIn19LCJzdXBlckFkbWluIjpudWxsLCJ1c2VyIjpudWxsLCJpZCI6IjkyNDkxNWJiLWE2ZWUtNGRlOS1iODg5LTAzZmVmNDRhMzNlOCJ9LCJpYXQiOjE2MjgyMTcyNjQsImV4cCI6MTYzNTQxNzI2NH0.13mM21HB2w46B52OwfLBK8sxF7LeI7_tQwHnX1PfWoI

const Recovery: React.FC<RecoveryProps> = () => {
  const { resetPass ,validateToken,loading} = useContext(UserContext);
  const router = useRouter();
  const [canViewThis, setCanViewThis] = useState(false)
  const token:string = router.query.id as string
  const [loginState, setloginState] = useState({
    password: "",
  });
  const [errors, setErrors] = useState({
    password: "",
  });
  const { password } = loginState;

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
      newErrors.password = "Ingrese un valor";
      isValid = false;
    }
    // if (!verifyPassword(password)) {
    //   isValid = false;
    //   newErrors.password =
    //     "Su contraseña no es segura, trate de incluir al menos un caracter diferente, 8 letras un número y letras mayúsculas y minúsculas.";
    // }

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
  if (!loading&&!canViewThis) {
      return <div>No puedes ver esto</div>
  }

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
            disabled={loading}
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
            disabled={loading}
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

export default Recovery;

