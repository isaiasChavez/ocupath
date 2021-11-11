import {
  AppBar,
  LinearProgress,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import { useContext } from 'react'
import SesionContext from '../../context/sesion/sesion.context'
import UserContext from '../../context/user/user.context'
import { COLORS } from '../../types'

export interface AppBarCmsProps {}

const AppBarCms: React.FC<AppBarCmsProps> = () => {
  const { loading } = useContext(UserContext)
  const { loadingSesion } = useContext(SesionContext)
  const classes =  useStyles()
  const isLoading =  loading || loadingSesion
  return (
    <>
      <AppBar
        className={classes.appbar}
      >
        {isLoading && <LinearProgress color="primary" />}
        <Toolbar></Toolbar>
      </AppBar>
    </>
  )
}
const useStyles = makeStyles((theme) => ({
  appbar: {
          backgroundColor: COLORS.blue_header,
          zIndex: 0,
        },
}))

export default AppBarCms
