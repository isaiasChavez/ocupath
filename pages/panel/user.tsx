import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useState } from 'react'
export interface AdminProps { }
import { COLORS } from '../../src/types/index'
import EditUser from '../../src/components/general/EditUser'
import TableFiles from '../../src/components/general/TableFiles'
import { USERS } from '../../src/types/index'
import theme from '../../src/theme'
import AppBarCms from '../../src/components/general/AppBarCms'
import withAuth from '../../src/auth/WithAuth'
import SideBar from '../../src/components/general/SideBar'
const drawerWidth = 240
const PROFILE = 0
const FILES = 2
const UserMod = () => {
  const classes = useStyles()
  const [currentTab,setCurrentTab] = useState<number>(0)
  const [isEditingAvatar,setIsEditingAvatar] = useState(false)

  const titleHeader = ()=>{
    if (currentTab === PROFILE) {
      return "Profile" 
    }
    if (currentTab === FILES) {
      
      return "Files" 
    }
  }
  

  return (
    <div className={ classes.root }>
      <div className={ classes.inner }>
        <AppBarCms/>
        {/* Barra lateral */ }
        <SideBar setCurrentTab={setCurrentTab} currentTab={currentTab} />
        {/* Barra lateral */ }
        <main className={ classes.content }>
          <Grid justify="center" alignItems="center" direction="row" container style={ { height: '88%' } } >
            <Grid item xs={ 12 } md={ 11 } lg={ 11 } style={ { height: '100%' } } >
            {currentTab === PROFILE && <EditUser  isEditingAvatar={isEditingAvatar} setIsEditingAvatar={setIsEditingAvatar}type={USERS.GUEST} />}
              { currentTab === FILES && <TableFiles />}
            </Grid>
          </Grid>
        </main>
      </div>

    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden',
  },
  inner: {
    display: 'flex',
    height: '100%',
    width: '100%',
  }, 
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    paddingBottom: '2rem',
    overflow: 'auto',
    overflowX: 'hidden',
    width: '100%',
    backgroundColor: COLORS.gray_secondary,
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflowX: 'hidden',
    overflow: 'auto',
    flexDirection: 'column'
  },
}))
export default withAuth(UserMod);

