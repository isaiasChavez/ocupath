import {
  Link as LinkScroll,
  DirectLink,
  Element,
  Events,
  animateScroll as scroll,
  scrollSpy,
  scroller
} from 'react-scroll'

import { makeStyles, Box, Grid, TextField } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import Link from 'next/link'
import HeaderLogin from '../src/components/login/HeaderLogin'
import { Images } from '../src/types'
import { Button } from 'antd'
import { CustomInput } from './login'
/* import ScrollReveal from 'scrollreveal'
 */
export interface NavigationProps {
  isPanel: boolean | null
}

export default function Home () {
  const classes = useStyles()
  /*   ScrollReveal().reveal('.headline');
   */
  return (
    <Box height='100vh' className={classes.root}>
      <HeaderLogin />
      <Element name='landing' className='element'>
        <Box height='100vh' position='relative' className={classes.landing}>
          <Box
            position='absolute'
            top='55%'
            left='10%'
            style={{ color: 'white' }}
          >
            <Box mb={1} fontSize='2rem'>
              Make all your meetings possible no matter <br /> where your team
              is located.
            </Box>
            <Box fontWeight="fontWeightLight" fontSize='1rem'>
              Improve the experience of your online meetings. Interact agilely
              in real time, share <br /> and display content to meeting
              participants.
            </Box>
            <Box
              display='flex'
              py={1}
              alignItems='center'
              justifyContent='flex-end'
            >
              <button className={classes.buttonSingUp}>Sing up</button>
            </Box>
          </Box>
          <BottomArrow next='about' />
        </Box>
      </Element>
      <Element name='about' className='element'>
        <Box
          height='100vh'
          position='relative'
          display='flex'
          alignItems='center'
          pl={20}
          className={classes.about}
        >
          <Box className={classes.blackBox}>
            <Box fontSize='2rem' mb={2} color='white' className='headline'>
              About Us
            </Box>
            <Box mb={2} fontSize='1.4rem' color='white'>
              Lorem ipsum dolor sit amet consectetur <br /> adipisicing elit.
              Dignissimos ea accusantium <br /> doloribus omnis
            </Box>
            <Box fontSize='1rem' color='white'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Dignissimos ea accusantium doloribus omnis Lorem ipsum dolo
              consectetur adipisicing elit. Dignissimos ea accusantium doloribus
              omnis
            </Box>
          </Box>
          <BottomArrow next='plans' />
        </Box>
      </Element>
      <Element name='plans' className='element'>
        <Box
          height='100vh'
          position='relative'
          display='flex'
          alignItems='center'
          className={classes.plans}
        >
          <Box flex='1' height='100%'></Box>
          <Box flex='1' display='flex' justifyContent='center'>
            <Box
              width='50%'
              height='100%'
              className={classes.form}
              color='white'
            >
              <Box fontSize='1.5rem' mb={2}>
                Know Our Plans
              </Box>
              <Box fontSize='1.125rem' mb={2}>
                Let us contact you to learn about your business needs and
                propose a customized plan.{' '}
              </Box>
              <Box fontSize='0.975rem' mb={2} fontWeight='fontWeightLight'>
                Once you know our plans you can register with us.{' '}
              </Box>
              <Box fontSize='0.8rem' mb={2}>
                Enter your information to contact to you{' '}
              </Box>
              <FormInformation />
            </Box>
          </Box>

          <BottomArrow next='download' />
        </Box>
      </Element>
      <Element name='download' className='element'>
        <Box
          height='calc(100vh - 5.625rem)'
          className={classes.download}
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          <Box
            flex='1'
              display='flex'
            justifyContent='space-around'
            alignItems='flex-start'
            position="relative"
          >
            <Box color="white">
              <Box fontSize='2rem'>Download</Box>
              <Box fontSize='1.125rem' fontWeight="fontWeightLight" >
                Download our app from one of these stores <br /> with the following
                available devices
              </Box>
            </Box>
            <Box display='flex' justifyContent='center'>
              <Box
                className={classes.banner}
                mr={3}
                color='white'
                p={4}
                pt={6}
                height='auto'
              >
                <Box mb={4} display="flex" justifyContent="center">
                  <img src={Images.steam} alt='' />
                </Box>
                <Box component='h2' className={classes.text2} mb={2}>
                  Standalone headset
                </Box>
                <Box component='h3' className={classes.text1}>
                  Oculus Quest 1
                </Box>
                <Box component='h3' className={classes.text1}>
                  Oculus Quest 2
                </Box>
                <Box component='h3' className={classes.text1}>
                  HTC Vive
                </Box>
                <Box component='div' my={3}>
                </Box>
                <Box display="flex" justifyContent="center" mb={-1} pt={2}>
                  <a className={classes.linkGo}>Go to Oculus Store</a>
                </Box>
              </Box>

              <Box className={classes.banner} p={4} ml={3} pt={6}>
                <Box mb={5} display="flex" justifyContent="center">
                  <img src={Images.sidequest} alt='' />
                </Box>
                <Box component='h2' className={classes.text2} mb={2}>
                  Standalone headset
                </Box>
                <Box component='h3' className={classes.text1} >
                  Oculus Quest 1
                </Box>
                <Box component='h3' className={classes.text1}>
                  Oculus Quest 2
                </Box>
                <Box component='h3' className={classes.text1}>
                  HTC Vive
                </Box>
                <Box component='div' my={3}>
                </Box>
                <Box display="flex" justifyContent="center" mb={-1} pt={2}>
                  <a className={classes.linkGo}>Go to Side Quest</a>
                </Box>
              </Box>
            </Box>
            <Box mb={-7} position="absolute" bottom={0} fontSize="1rem" color="white" > If you already have an account or an access code, you can download Multivrsity by choosing one of the options above, otherwise make sure to sign up first</Box>
          </Box>
          
        </Box>
      </Element>
      <Box height="5.625rem" display="flex" className={classes.footer} pr={10}>
          <Box flex="1.5" display="flex" color="white" justifyContent="flex-end" alignItems="center">
            <Box mx={4}>
              <a href="" style={{color:'white',fontSize:"1rem", fontFamily:'font2'}}  >Privacy Policy</a>
            </Box>
            <Box mx={4}>
              <a href="" style={{color:'white',fontSize:"1rem", fontFamily:'font2'  }} >Terms of service</a>
            </Box>
          </Box>
          <Box flex="1" display="flex" justifyContent="flex-end" alignItems="center">
              <img src={Images.powered} alt="Powered by inmersys" title="Powered by inmersys" />
          </Box>
      </Box>
    </Box>
  )
}

function FormInformation () {
  const classes = useStyles()
  const SylesInputLabel = {
    style: {
      color: 'white'
    }
  }
  return (
    <form noValidate>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <CustomInput
            autoComplete='fname'
            name='firstName'
            size='small'
            variant='outlined'
            required
            fullWidth
            id='firstName'
            label='Name'
            autoFocus
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
            variant='outlined'
            size='small'
            required
            fullWidth
            id='lastName'
            label='Surname'
            name='lastName'
            autoComplete='lname'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            variant='outlined'
            required
            size='small'
            fullWidth
            id='email'
            label='Company'
            name='company'
            autoComplete='company'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            size='small'
            variant='outlined'
            required
            fullWidth
            id='email'
            label='Email Address'
            name='email'
            autoComplete='email'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            variant='outlined'
            required
            size='small'
            fullWidth
            name='phonenumber'
            label='Telephone Number'
            type='number'
            id='phonenumber'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
      </Grid>
      <Box mt={3} display='flex ' justifyContent='flex-end'>
        <button color='primary' className={classes.submit}>
          <Box fontSize='1rem'>Send</Box>
        </button>
      </Box>
    </form>
  )
}

function BottomArrow ({ next }) {
  const classes = useStyles()

  return (
    <LinkScroll
      activeClass='active'
      to={next}
      spy={true}
      smooth={true}
      duration={500}
    >
      <img
        className={classes.arrow}
        src={Images.godown}
        alt='Arrow to go down'
        title='go down'
      />
    </LinkScroll>
  )
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'black'
  },
  footer:{
    backgroundColor: '#000000',
    color:'white'
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontFamily: 'font2',
    marginBottom:'0.8rem'
  },
  text2: {
    color: 'white',
    textAlign: 'center',
    fontSize: '0.875rem'
  },
  linkGo:{
    backgroundColor: 'transparent',
    border:'2px solid rgba(24, 160, 251, 1)',
    padding: '0.2rem 1.2rem',
    borderRadius: '30pt',
    fontFamily: 'font3',
    fontSize: '1rem'
  },
  submit: {
    backgroundColor: '#18A0FB',
    borderRadius: '20pt',
    border: 'none',
    padding: '0.3rem 2rem',
    minWidth: '9rem'
  },
  banner: {
    border: '2px solid #18A0FB',
    backgroundColor: 'rgba(36, 37, 38, 0.6)',
    borderRadius: '16pt',
    minWidth:'16.5rem'
  },
  blackBox: {
    minWidth: '29rem',
    maxWidth: '29rem',
    borderRadius: '0.5rem',
    minHeight: '20rem',
    backgroundColor: 'rgba(36, 37, 38, 0.6)',
    padding: '1.5rem'
  },
  form: {
    backgroundColor: 'rgba(36, 37, 38, 0.6)',
    maxWidth: '29rem',
    minHeight: '20rem',
    padding: '1.5rem',
    borderRadius: '0.6rem'
  },
  landing: {
    backgroundImage: `url(${Images.landing2})`,
    backgroundSize: 'cover'
  },
  arrow: {
    position: 'absolute',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: '2rem',
    cursor: 'pointer'
  },
  buttonSingUp: {
    border: '0.15rem solid white',
    padding: ' 0.2rem 1.7rem',
    fontSize: '1.2rem',
    borderRadius: '40pt',
    backgroundColor: 'transparent'
  },
  about: {
    backgroundImage: `url(${Images.landing4})`,
    backgroundSize: 'cover'
  },
  plans: {
    backgroundImage: `url(${Images.landing3})`,
    backgroundSize: 'cover'
  },
  download: {
    backgroundImage: `url(${Images.landing1})`,
    backgroundSize: 'cover'
  },

  center: {
    flexGrow: 1
  },
  link: {
    color: 'white'
  },
  title: {
    flexGrow: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    paddingRight: '3rem'
  }
}))
Home.getInitialProps = async ctx => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js')
  const json = await res.json()
  return { stars: json.stargazers_count }
}
