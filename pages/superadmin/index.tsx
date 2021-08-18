import { ListItemText,ListItemIcon,ListItem,Drawer,Grid,Divider,Typography,List,Toolbar,AppBar,makeStyles,Link } from '@material-ui/core';
import { useContext, useState } from 'react';
export interface AdminProps { }
import { USERS,COLORS } from '../../src/types/index';
import EditUser from '../../src/components/general/EditUser';
import TableSuperAdmin from '../../src/components/superadmin/TableSuperAdmin';
import theme from '../../src/theme';
import withAuth from '../../src/auth/WithAuth';
import SesionContext from '../../src/context/sesion/sesion.context';
const drawerWidth = 240;


const PROFILE = 0
const USER = 1

const Admin: React.FC<AdminProps> = () => {
  const classes = useStyles();
  const [currentTab,setCurrentTab] = useState<number>(0)

  const {logout} = useContext(SesionContext)

  const [isEditingAvatar, setIsEditingAvatar] = useState(false)
  return (
    <div className={ classes.root }>
      <div className={ classes.inner }>
        {/* Barra superior */ }
        <AppBar style={ {
          backgroundColor: COLORS.gray,
        } }>
          <Toolbar className={ classes.toolbar }>
            <Typography component="h1" variant="h6" color="inherit" noWrap className={ classes.title }>
              OCUPATH
            </Typography>
          </Toolbar>
        </AppBar>
        {/*end -- Barra superior */ }
        {/* Barra lateral */ }
        <Drawer
          variant="permanent"
          classes={ {
            paper: classes.drawerPaper,
          } }
        >

          <List >

            <ListItem button selected={ currentTab === PROFILE } onClick={ () => {
              setCurrentTab(PROFILE)
            } }>

              <ListItemText className={ classes.link } primary="Profile" />
            </ListItem>

            <ListItem button selected={ currentTab === USER } onClick={ () => {
              setCurrentTab(USER)
            } }>
              <ListItemText className={ classes.link } primary="User" />
            </ListItem>

          </List>
          <List>
            <ListItem button >
              <button onClick={ ()=> logout()}>
                <ListItemText primary="Logout" />
              </button>
            </ListItem>
          </List>
        </Drawer>
        {/* Barra lateral */ }
        <main className={ classes.content }>
          <Grid justify="center" alignItems="center" direction="row" container style={ { height: '85%' } } >
            <Grid item xs={ 12 } md={ 11 } lg={ 11 } justify="center" style={ {
              marginTop: theme.spacing(3),
              height: '8%',
            } }>
              {currentTab === PROFILE && <Typography style={ {
                fontWeight: 'bold',
                color: 'white'
              } } component="h1" variant="h4"   >
                Profile
              </Typography>}
              {currentTab === USER && <Typography style={ {
                fontWeight: 'bold',
                color: 'white'
              } } component="h1" variant="h4"   >
                Users
              </Typography>}
              
            </Grid>
            <Grid item xs={ 12 } md={ 11 } lg={ 11 } style={ { height: '100%' } } >
              { currentTab === PROFILE && <EditUser isEditingAvatar={isEditingAvatar} setIsEditingAvatar={setIsEditingAvatar} type={ USERS.SUPER } /> }
              { currentTab === USER && <TableSuperAdmin /> }
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
  );
}


const useStyles = makeStyles((theme) => ({
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


}));

export default withAuth(Admin);

