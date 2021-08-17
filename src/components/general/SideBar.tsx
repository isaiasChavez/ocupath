import { Divider, Drawer, List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import { useContext } from "react";
import SesionContext from "../../context/sesion/sesion.context";
import { COLORS } from "../../types";

export interface SideBarProps {
 setCurrentTab:Function,
 currentTab:number,
}
const drawerWidth = 240
const PROFILE = 0
const FILES = 2

const SideBar: React.FC<SideBarProps> = ({setCurrentTab,currentTab}) => {
 const classes = useStyles()
 const {logout} = useContext(SesionContext)

 return (  
  <Drawer
          variant="permanent"
          classes={ {
            paper: classes.drawerPaper,
          } }
        >
          <List >
            <div>
              <ListItem
                button
                selected={ currentTab === PROFILE }
                onClick={ () => {
                  setCurrentTab(PROFILE)
                } }
              >
                <ListItemText className={ classes.link } primary='Profile' />
              </ListItem>
              <ListItem
                button
                selected={ currentTab === FILES }
                onClick={ () => {
                  setCurrentTab(FILES)
                } }
              >
                <ListItemText className={ classes.link } primary='Files' />
              </ListItem>
            </div>
          </List>
          <Divider />
          <List>
          <ListItem button >
          <ListItemText onClick={()=>logout()} primary="Logout" />
    </ListItem>

          </List>
        </Drawer>
 );
}

const useStyles = makeStyles(theme => ({
 link: {
   color: 'white',
   fontWeight: 'bold'
 },
 drawerPaper: {
   position: 'static',
   width: drawerWidth,
   height: '100%',
   justifyContent: 'space-between'
   ,backgroundColor: COLORS.gray,
 },
 content: {
   height: '100%',
   display: 'flex',
   flexDirection: 'column',
   overflow: 'auto',
   overflowX: 'hidden',
   width: '100%',
   backgroundColor: COLORS.gray,
 },

}))
 
export default SideBar;