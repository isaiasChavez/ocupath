import { Divider, Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import SesionContext from "../../context/sesion/sesion.context";
import { COLORS, Images,USERS_TYPES } from "../../types";
import LayersIcon from '@material-ui/icons/Layers';
import UserContext from "../../context/user/user.context";

export interface SideBarProps {
 setCurrentTab:Function,
 currentTab:number,
}
const drawerWidth = 240
const PROFILE = 0
const USER = 1
const FILES = 2

const SideBar: React.FC<SideBarProps> = ({setCurrentTab,currentTab}) => {
 const classes = useStyles()
 const {logout,loadingSesion} = useContext(SesionContext)
 const {profile} = useContext(UserContext)
  console.log({profile})
  const isAdmin =profile.type=== USERS_TYPES.ADMIN
  const isSuperAdmin = profile.type=== USERS_TYPES.SUPER_ADMIN
  const isGuest =profile.type=== USERS_TYPES.GUEST

  currentTab === USER
  const styleSelected =  {
    backgroundColor:COLORS.selected,
    borderRight:'solid',
 borderRightColor:'#76D3F8',
 borderRightWidth:'4px'
    
  }

 return (  
  <Drawer
  variant="permanent"
  classes={ {
    paper: classes.drawerPaper,
  } }
>
  <List >
    <ListItem className={ classes.headerNav }>
      <img src={ Images.logo } alt="" />
    </ListItem>

    <ListItem style={currentTab === PROFILE?styleSelected:{} } button selected={ currentTab === PROFILE } onClick={ () => {
      setCurrentTab(PROFILE)
    } }>
      <ListItemIcon>
        <LayersIcon color="primary" />
      </ListItemIcon>
      <ListItemText className={ classes.link } primary="Profile" />
    </ListItem>
   {(isAdmin||isSuperAdmin)&& <ListItem style={currentTab === USER?styleSelected:{}} button selected={ currentTab === USER } onClick={ () => {
      setCurrentTab(USER)
    } }>
      <ListItemIcon>
        <LayersIcon color="primary" />
      </ListItemIcon>
      <ListItemText className={ classes.link } primary="User" />
    </ListItem>}
    {(isAdmin||isGuest)&& <ListItem style={currentTab === FILES?styleSelected:{} } button selected={ currentTab === FILES } onClick={ () => {
      setCurrentTab(FILES)
    } }>
      <ListItemIcon>
        <LayersIcon color="primary" />
      </ListItemIcon>
      <ListItemText className={ classes.link } primary="Files" />
    </ListItem>}

  </List>
  <List>
    <ListItem button  disabled={loadingSesion}>
      <ListItemIcon>
        <LayersIcon color="primary" />
      </ListItemIcon>
      <a onClick={ () => logout() }>

        <ListItemText primary="Log Out" className={ classes.link } />
      </a>
    </ListItem>
  </List>
    </Drawer>
 );
}

const useStyles = makeStyles(theme => ({
 link: {
   color: 'white',
   fontWeight: 'bold',
   
 },
 drawerPaper: {
  position: 'relative',
  width: drawerWidth,
  height: '100%',
  justifyContent: 'space-between',
  backgroundColor: COLORS.blue_primary,
},

 headerNav: {
  height: '5rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
},

}))
 
export default SideBar;