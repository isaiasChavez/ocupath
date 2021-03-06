import {
  Button,
  LinearProgress,
  makeStyles,
  Toolbar,
} from '@material-ui/core'
import {
  Link as LinkScroll,
  animateScroll as scroll,
} from 'react-scroll'
import { Images } from '../../types'
import Link from 'next/link'
import UserContext from '../../context/user/user.context'
import { useContext } from 'react'

interface HeaderLoginProps {}

const HeaderLogin: React.FC<HeaderLoginProps> = () => {
  const classes = useStyles()
  const {loading} = useContext(UserContext)
  return (
    <>
      <Toolbar className={classes.appbar}>
       {loading&& <LinearProgress style={{
          position:'absolute',
          top:0,
          left:0,
          right:0
        }} color="primary" />}

        <div className={classes.title}>
           <LinkScroll
              activeClass='active'
              className='test1'
              to='landing'
              spy={true}
              smooth={true}
              duration={500}
            >
          <img src={Images.logichiquito} alt='' />
            </LinkScroll>
        </div>
        <div className={classes.center}>
          <Button size='large' color='primary' className={classes.buttons}>
            {/* @ts-ignore: Unreachable code error */}
            <LinkScroll
              activeClass='active'
              className='test1'
              to='about'
              spy={true}
              smooth={true}
              duration={500}
            >
              <span className={classes.link}>About Us</span>
            </LinkScroll>
          </Button>

          <Button color='primary' className={classes.buttons}>
            <LinkScroll
              activeClass='active'
              className='test1'
              to='plans'
              spy={true}
              smooth={true}
              duration={500}
            >
              <span className={classes.link}>Our Plans</span>
            </LinkScroll>
          </Button>
          <Button color='primary' className={classes.buttons}>
            <LinkScroll
              activeClass='active'
              className='test1'
              to='donwload'
              spy={true}
              smooth={true}
              duration={500}
            >
              <span className={classes.link}>Download</span>
            </LinkScroll>
          </Button>
          <Button color='primary' style={{cursor:'pointer'}} className={classes.buttons}>
            {/* <Link href="/" onClick={preventDefault}> */}
            <Link href='/login' >
              <span className={classes.linkLogin}>Login</span>
            </Link>
          </Button>
        </div>
      </Toolbar>
    </>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  center: {
    flexGrow: 1,
    marginRight:'4rem',
  },
  appbar: {
    position: 'fixed',
    height: '4rem',
    
    background: 'rgba(0, 13, 52, 0.4)',
    color: 'white',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 200
  },
  buttons: {
    minWidth: '10rem',
    cursor:'pointer'
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontFamily:'font2',
    fontSize:'1rem',
    textTransform: 'capitalize',
  },
  linkLogin: {
    fontFamily:'font2',
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
    background: 'rgba(24, 160, 251, 1)',
    fontSize:'1rem',
    borderRadius: '16pt',
    minWidth: '6rem',
    paddingBottom:'0.1rem',
    paddingTop: '0.1rem',
    textTransform: 'capitalize',
    border:'none'
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-start'
  }
}))
export default HeaderLogin
