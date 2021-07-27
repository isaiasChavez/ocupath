import clsx from 'clsx'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Drawer from '@material-ui/core/Drawer'
import Box from '@material-ui/core/Box'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import Badge from '@material-ui/core/Badge'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import PeopleIcon from '@material-ui/icons/People'
import { useState } from 'react'
export interface AdminProps { }
import {
  secondaryListItems
} from '../../src/components/superadmin/listItems'
import { COLORS } from '../../src/types'
import EditUser from '../../src/components/general/EditUser'
import TableAdmin from '../../src/components/admin/TableAdmin'

import TableFiles from '../../src/components/general/TableFiles'
import { USERS } from '../../src/types/index'
import theme from '../../src/theme'
const drawerWidth = 240

const PROFILE = 0
const USER = 1
const FILES = 2

const AdminModAdmin = () => {
  const classes = useStyles()
  const [open,setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const fixedHeightPaper = clsx(classes.paper,classes.fixedHeight)

  const [currentTab,setCurrentTab] = useState<number>(0)

  return (
    <div className={ classes.root }>
      <div className={ classes.inner }>
        <AppBar style={ {
          backgroundColor: COLORS.gray,
        } }>
          <Toolbar className={ classes.toolbar }>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={ classes.title }>
              OCUPATH
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Barra lateral */ }
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

              <ListItem
                button
                className={ classes.link }
                selected={ currentTab === USER }
                onClick={ () => {
                  setCurrentTab(USER)
                } }
              >
                <ListItemText primary='User' />
              </ListItem>
            </div>
          </List>
          <Divider />
          <List>{ secondaryListItems }</List>
        </Drawer>
        {/* Barra lateral */ }
        <main className={ classes.content }>
          <Grid justify="center" alignItems="center" direction="row" container style={ { height: '85%' } } >
            <Grid item xs={ 12 } md={ 11 } lg={ 11 } justify="center" style={ {
              marginTop: theme.spacing(3),
              height: '8%',
            } }>
              <Typography style={ {
                fontWeight: 'bold',
                color: 'white'
              } } component="h1" variant="h4"   >
                Profile
              </Typography>

            </Grid>
            <Grid item xs={ 12 } md={ 11 } lg={ 11 } style={ { height: '100%' } } >
              { currentTab === PROFILE && <EditUser type={ USERS.ADMIN } /> }
              { currentTab === FILES && <TableFiles /> }
              { currentTab === USER && <TableAdmin /> }
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
    paddingTop: '4.1rem',
    height: '100%',
    width: '100%',
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width','margin'],{
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width','margin'],{
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  menuButtonHidden: {
    display: 'none'
  },
  title: {
    flexGrow: 1
  },
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
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width',{
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0)
    },
    [theme.breakpoints.up('lg')]: {
      width: theme.spacing(9)
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'auto',
    overflowX: 'hidden',
    width: '100%',
    backgroundColor: COLORS.gray,
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflowX: 'hidden',
    overflow: 'auto',
    flexDirection: 'column'
  },
  fixedHeight: {
    height: '100%'
  },
  innerCard: {
    height: '100vh'
  }
}))

export default AdminModAdmin
