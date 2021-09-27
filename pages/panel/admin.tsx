import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import { useState } from 'react'
export interface AdminProps {}
import { COLORS } from '../../src/types/index'
import TableAdmin from '../../src/components/admin/TableAdmin'
import TableFiles from '../../src/components/general/TableFiles'
import { USERS } from '../../src/types/index'
import AppBarCms from '../../src/components/general/AppBarCms'
import Head from 'next/head'
import withAuth from '../../src/auth/WithAuth'
import SideBar from '../../src/components/general/SideBar'
import Profile from '../../src/components/general/Profile'
import HeadCustom from '../../src/layouts/HeadCustom'
const PROFILE = 0
const USER = 1
const FILES = 2
const AdminModAdmin = () => {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState<number>(0)
  const [isEditingAvatar, setIsEditingAvatar] = useState(false)

  const CurretView = () => {
    switch (currentTab) {
      case PROFILE:
        return (
          <Profile
            isEditingAvatar={isEditingAvatar}
            setIsEditingAvatar={setIsEditingAvatar}
            type={USERS.ADMIN}
          />
        )
      case FILES:
        return <TableFiles />
      case USER:
        return <TableAdmin />
      default:
        break
    }
  }
  return (
    <>
      <HeadCustom>
        <title>Multivrsity | Admin</title>
      </HeadCustom>
      <div className={classes.root}>
        <div className={classes.inner}>
          <AppBarCms />
          <SideBar currentTab={currentTab} setCurrentTab={setCurrentTab} />
          <main className={classes.content}>
            <Grid
              justify='center'
              alignItems='center'
              direction='row'
              container
              style={{ height: '88%' }}
            >
              <Grid item xs={12} md={11} lg={11} style={{ height: '100%' }}>
                <CurretView />
              </Grid>
            </Grid>
          </main>
        </div>
      </div>
    </>
  )
}
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100vh',
    overflow: 'hidden'
  },
  inner: {
    display: 'flex',
    height: '100%',
    width: '100%'
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
    backgroundColor: COLORS.gray_secondary
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflowX: 'hidden',
    overflow: 'auto',
    flexDirection: 'column'
  }
}))
export default withAuth(AdminModAdmin)
