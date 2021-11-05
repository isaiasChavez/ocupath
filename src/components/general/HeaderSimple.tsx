import {  makeStyles, Toolbar } from '@material-ui/core'
import { Images } from '../../types'
import Link from 'next/link'

interface HeaderSimpleProps {
  isLogin: boolean
}

const HeaderSimple: React.FC<HeaderSimpleProps> = ({ isLogin }) => {
  const classes = useStyles()

  return (
    <>
      <Toolbar className={isLogin ? classes.appbar : classes.appBarDark}>
        <Link scroll={true} href='/'>
          <img src={Images.logichiquito} alt='Home' />
        </Link>
      </Toolbar>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  appbar: {
    position: 'fixed',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    height: '4.1rem',
    background: 'rgba(0, 13, 52, 0.2)'
  },
  appBarDark: {
    position: 'fixed',
    color: 'white',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    height: '4.1rem',
    background: 'rgba(118, 123, 138, 1)'
  },
  headerRight: {
    display: 'flex'
  },
  headerItem: {
    color: 'white',
    border: 0,
    backgroundColor: 'transparent',
    minWidth: '10rem',
    justifyContent: 'center',
    alignItems: 'center',
    textalign: 'center'
  }
}))
export default HeaderSimple
