import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import { COLORS } from "../../types";

export interface AppBarCmsProps {
 
}
 
const AppBarCms: React.FC<AppBarCmsProps> = () => {
 const classes = useStyles()

 return (  
  <AppBar style={ {
   backgroundColor: COLORS.gray,
 } }>
   <Toolbar className={ classes.toolbar }>
     <Typography component="h1" variant="h6" color="inherit" noWrap className={ classes.title }>
       OCUPATH
     </Typography>
   </Toolbar>
 </AppBar>
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