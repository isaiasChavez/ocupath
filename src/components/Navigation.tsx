import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { preventDefault } from "../config/utils";
import Link from "next/link";
import { useContext } from "react";
import moduleName from "module";
import UserContext from "../context/user/user.context";
export interface NavigationProps {
  isPanel: boolean | null;
}

const Navigation: React.FC<NavigationProps> = ({ isPanel }) => {
  const { profile } = useContext(UserContext);
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    link: {
      color: "white",
    },
    title: {
      flexGrow: 1,
    },
  }));
  const classes = useStyles();
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          <Button color="primary">
            <Link href="/">
              <span className={classes.link}>Ocupathaaaa</span>
            </Link>
          </Button>
        </Typography>
        <Typography variant="h6" className={classes.title}>
          <Button color="primary">
            <Link href="/">
              <span className={classes.link}>{profile.name}</span>
            </Link>
          </Button>
        </Typography>
        {!isPanel && (
          <Button color="primary">
            <Link href="/login">UserStateType</Link>
          </Button>
        )}
        {isPanel && (
          <Button color="primary">
            <Link href="/panel/archives">
              <span className={classes.link}>Archivos</span>
            </Link>
          </Button>
        )}
        {isPanel && (
          <Button color="primary">
            <Link href="/">
              <span className={classes.link}>Perfil</span>
            </Link>
          </Button>
        )}
        {isPanel && (
          <Button color="primary">
            {/* <Link href="/" onClick={preventDefault}> */}
            <Link href="/">
              <span className={classes.link}>Cerrar sesión</span>
            </Link>
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
