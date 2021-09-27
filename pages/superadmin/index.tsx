import { Grid,makeStyles } from '@material-ui/core';
import Head from "next/head";
import { useState } from 'react';
export interface AdminProps { }
import { USERS,COLORS } from '../../src/types/index';
import TableSuperAdmin from '../../src/components/superadmin/TableSuperAdmin';
import withAuth from '../../src/auth/WithAuth';
import AppBarCms from '../../src/components/general/AppBarCms';
import SideBar from '../../src/components/general/SideBar';
import Profile from '../../src/components/general/Profile';
import HeadCustom from '../../src/layouts/HeadCustom';
const drawerWidth = 240;


const PROFILE = 0
const USER = 1

const Admin: React.FC<AdminProps> = () => {
  const classes = useStyles();
  const [currentTab,setCurrentTab] = useState<number>(0)
  const [isEditingAvatar,setIsEditingAvatar] = useState(false)
  return (
    <>
     <HeadCustom>
        <title>Multivrsity | Superadmin</title>
      </HeadCustom>
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
              { currentTab === PROFILE && <Profile isEditingAvatar={ isEditingAvatar } setIsEditingAvatar={ setIsEditingAvatar } type={ USERS.SUPER } /> }
              { currentTab === USER && <TableSuperAdmin /> }
            </Grid>
          </Grid>
        </main>
      </div>
    </div>
              </>
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

