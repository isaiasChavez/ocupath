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
import { COLORS } from "../types";
export interface NavigationProps {
  isPanel: boolean | null;
}

const Navigation: React.FC<NavigationProps> = ({ isPanel }) => {
  const { profile } = useContext(UserContext);
  const useStyles = makeStyles((theme) => ({
     toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  titleSection: {
    height: '8%',
    color: 'black',
    backgroundColor: 'red',
  },
  title: {
    flexGrow: 1,
  },
  }));
  const classes = useStyles();
  return (
    <AppBar style={ {
        backgroundColor: COLORS.gray,
      }}>
        <Toolbar className={ classes.toolbar }>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={ classes.title }>
            OCUPATH
          </Typography>
        </Toolbar>
      </AppBar>
  );
};

export default Navigation;
