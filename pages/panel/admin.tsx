import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { useState } from 'react'
export interface AdminProps { }
import {
  secondaryListItems
} from '../../src/components/superadmin/listItems'
import { COLORS } from '../../src/types/index'
import EditUser from '../../src/components/general/EditUser'
import TableAdmin from '../../src/components/admin/TableAdmin'

import TableFiles from '../../src/components/general/TableFiles'
import { USERS } from '../../src/types/index'
import theme from '../../src/theme'
import AppBarCms from '../../src/components/general/AppBarCms'
const drawerWidth = 240

const PROFILE = 0
const USER = 1
const FILES = 2

const AdminModAdmin = () => {
  const classes = useStyles()
  const [currentTab,setCurrentTab] = useState<number>(0)

  return (
    <div className={ classes.root }>
      <div className={ classes.inner }>
      <AppBarCms/>

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
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflowX: 'hidden',
    overflow: 'auto',
    flexDirection: 'column'
  },
}))

export default AdminModAdmin
