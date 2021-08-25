import { AppBar, LinearProgress, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { useContext } from "react";
import SesionContext from "../../context/sesion/sesion.context";
import UserContext from "../../context/user/user.context";
import { COLORS } from "../../types";

export interface AppBarCmsProps {
 
}
 
const AppBarCms: React.FC<AppBarCmsProps> = () => {
 const classes = useStyles()
 const {loading} = useContext(UserContext)
 const {loadingSesion} = useContext(SesionContext)

 return (  
   <>
  <AppBar style={ {
    backgroundColor: COLORS.blue_header,
  } }>
  {(loading ||loadingSesion)&&<LinearProgress color="primary" />}
    <Toolbar  >
    </Toolbar>
  </AppBar>

    </>

 );
}
const useStyles = makeStyles(theme => ({
 toolbar: {
   paddingRight: 24 // keep right padding when drawer closed
 },

 title: {
   flexGrow: 1
 },

}))
 
export default AppBarCms;