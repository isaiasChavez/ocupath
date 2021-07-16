import { useState } from 'react'
import clsx from 'clsx'
import {
  ListItemIcon,
  ListItemText,
  ListItem,
  makeStyles,
  Container,
  Grid,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  Badge
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import NotificationsIcon from '@material-ui/icons/Notifications'
import DashboardIcon from '@material-ui/icons/Dashboard'
export interface AdminProps {}
import { secondaryListItems } from '../../src/components/superadmin/listItems'
import TableFiles from '../../src/components/general/TableFiles'
import { COLORS, USERS} from '../../src/types'
import EditUser from '../../src/components/general/EditUser'

const drawerWidth = 240

const PROFILE = 0
const FILES = 1
export interface AdminModProps {}

const AdminMod: React.FC<AdminModProps> = () => {
  const classes = useStyles()
  const [open, setOpen] = useState(true)
  const handleDrawerOpen = () => {
    setOpen(true)
  }
  const handleDrawerClose = () => {
    setOpen(false)
  }
  const [currentTab, setCurrentTab] = useState<number>(0)

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='absolute'
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component='h1'
            variant='h6'
            color='inherit'
            noWrap
            className={classes.title}
          >
            OCUPATH
          </Typography>
          <IconButton color='inherit'>
            <Badge badgeContent={4} color='secondary'>
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>
      {/* Barra lateral */}
      <Drawer
        variant='permanent'
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose)
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <div>
            <ListItem
              button
              selected={currentTab === PROFILE}
              onClick={() => {
                setCurrentTab(PROFILE)
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Profile' />
            </ListItem>
            <ListItem
              button
              selected={currentTab === FILES}
              onClick={() => {
                setCurrentTab(FILES)
              }}
            >
              <ListItemIcon>
                <DashboardIcon />
              </ListItemIcon>
              <ListItemText primary='Files' />
            </ListItem>
          </div>
        </List>
        <Divider />
        <List>{secondaryListItems}</List>
      </Drawer>
      {/* Barra lateral */}
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth='lg' className={classes.container}>
          <Grid style={{ height: '85%' }} container>
            <Grid item xs={12} md={8} lg={12}>
              {currentTab === PROFILE && <EditUser type={USERS.GUEST} />}
              { currentTab === FILES && <TableFiles />}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
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
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
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
  drawerPaper: {
    position: 'absolute',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
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
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: COLORS.gray
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
    height: '100%'
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
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

export default AdminMod
