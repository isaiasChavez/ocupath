import {  Drawer, List, ListItem, ListItemIcon, ListItemText, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import SesionContext from "../../context/sesion/sesion.context";
import { COLORS, Images,USERS_TYPES } from "../../types";
import UserContext from "../../context/user/user.context";
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import FolderOpenOutlinedIcon from '@material-ui/icons/FolderOpenOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
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
        <PersonOutlineOutlinedIcon style={{
          color:'white'
        }} />
      </ListItemIcon>
      <ListItemText className={ classes.link } primary="Profile" />
    </ListItem>
   {(isAdmin||isSuperAdmin)&& <ListItem style={currentTab === USER?styleSelected:{}} button selected={ currentTab === USER } onClick={ () => {
      setCurrentTab(USER)
    } }>
      <ListItemIcon>
        <PeopleAltOutlinedIcon style={{
          color:'white'
        }} />
      </ListItemIcon>
      <ListItemText className={ classes.link } primary="Users" />
    </ListItem>}
    {(isAdmin||isGuest)&& <ListItem style={currentTab === FILES?styleSelected:{} } button selected={ currentTab === FILES } onClick={ () => {
      setCurrentTab(FILES)
    } }>
      <ListItemIcon>
        <FolderOpenOutlinedIcon style={{
          color:'white'
        }} />
      </ListItemIcon>
      <ListItemText className={ classes.link } primary="Files" />
    </ListItem>}

  </List>
  <List>
    <ListItem button  disabled={loadingSesion}>
      <ListItemIcon>
        <ExitToAppOutlinedIcon style={{
          color:'white'
        }} />
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
  zIndex: 0 ,
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