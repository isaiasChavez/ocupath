import { ListItemText,ListItemIcon,ListItem,Drawer,Grid,Divider,Typography,List,Toolbar,AppBar,makeStyles,Link,Box } from '@material-ui/core';
import LayersIcon from '@material-ui/icons/Layers';

import { useContext,useState } from 'react';
export interface AdminProps { }
import { USERS,COLORS,Images } from '../../src/types/index';
import EditUser from '../../src/components/general/EditUser';
import TableSuperAdmin from '../../src/components/superadmin/TableSuperAdmin';
import theme from '../../src/theme';
import withAuth from '../../src/auth/WithAuth';
import SesionContext from '../../src/context/sesion/sesion.context';
import AppBarCms from '../../src/components/general/AppBarCms';
import SideBar from '../../src/components/general/SideBar';
const drawerWidth = 240;


const PROFILE = 0
const USER = 1

const Admin: React.FC<AdminProps> = () => {
  const classes = useStyles();
  const [currentTab,setCurrentTab] = useState<number>(0)

  const { logout } = useContext(SesionContext)

  const [isEditingAvatar,setIsEditingAvatar] = useState(false)
  return (
    <div className={ classes.root }>
      <div className={ classes.inner }>
        {/* Barra superior */ }
        <AppBarCms/>
        {/*end -- Barra superior */ }
        {/* Barra lateral */ }
        <SideBar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Barra lateral */ }
        <main className={ classes.content }>
          <Grid justify="center" alignItems="center" direction="row" container style={ { height: '88%' } } >
            <Grid item xs={ 12 } md={ 11 } lg={ 11 } style={ { height: '100%' } } >
              { currentTab === PROFILE && <EditUser isEditingAvatar={ isEditingAvatar } setIsEditingAvatar={ setIsEditingAvatar } type={ USERS.SUPER } /> }
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
    height: '100%',
    width: '100%',
  },
  link: {
    color: 'white',
    fontWeight: 'bold',
    fontFamily: 'fontRoboto'
  },
  drawerPaper: {
    position: 'relative',
    width: drawerWidth,
    height: '100%',
    justifyContent: 'space-between',
    backgroundColor: COLORS.blue_primary,
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
    backgroundColor: COLORS.gray_admin,
  },
  headerNav: {
    height: '5rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  }


}));

export default withAuth(Admin);

