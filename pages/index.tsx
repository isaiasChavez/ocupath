import {
  Link as LinkScroll,
  Element,
  animateScroll as Scroll
} from 'react-scroll'
import { notification } from 'antd'
import { makeStyles, Box, Grid } from '@material-ui/core'
import HeaderLogin from '../src/components/login/HeaderLogin'
import { Images } from '../src/types'
import { CustomInput,propsCustomInputErrors } from './login'
import { useContext, useEffect, useState } from 'react'
import Head from 'next/head'
import withAuth from '../src/auth/WithAuth'
import UserContext, {
  SendEmailInfoProps
} from '../src/context/user/user.context'
import { verifyEmail } from '../src/config/utils'
import HeadCustom from '../src/layouts/HeadCustom'

export interface NavigationProps {
  isPanel: boolean | null
}

const Home= () => {
  const classes = useStyles()
  const version = 'v1.1.3'
  useEffect(() => {

    window.scrollTo(0, 0);
  }, [])
  return (
    <>
      <HeadCustom>
        <title>Multivrsity</title>

      </HeadCustom>
      <Box height='100vh' className={classes.root}>
        <HeaderLogin />
        <Element name='landing' className='element'>
          <Box height='100vh' position='relative' className={classes.landing}>
            <Box
              position='absolute'
              top='55%'
              left='10%'
              mr={2}
              style={{ color: 'white' }}
            >
              <Box mb={1} fontSize='1.5rem' fontFamily='font3'>
                Make all your meetings possible no matter <br /> where your team
                is located.
              </Box>
              <Box
                style={{ fontFamily: 'font2', lineHeight: '24px' }}
                fontSize='0.875rem'
              >
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
                <LinkScroll
                  activeClass='active'
                  to='plans'
                  spy={true}
                  smooth={true}
                  duration={500}
                >
                  <button className={classes.buttonSingUp}>Sign up</button>
                </LinkScroll>
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
              <Box
                fontFamily='font3'
                fontSize='2rem'
                mb={2}
                color='white'
                className='headline'
              >
                About Us
              </Box>
              <Box mb={2} fontFamily='font3' fontSize='1.125rem' color='white'>
              The MultiVRsity team is passionate about learning. It's what sets us apart from other VR companies.
              </Box>
              <Box
                fontFamily='font2'
                fontSize='0.875rem'
                color='white'
                lineHeight='1.8rem'
              >
                 We believe the next generation of educational technology should let students and employees dive into interactive worlds and explore complex scenarios and concepts in completely new ways
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
              <Box height='100%' className={classes.form} color='white'>
                <Box fontFamily='font3' fontSize='1.5rem' mb={2}>
                  Know Our Plans
                </Box>
                <Box fontFamily='font3' fontSize='1.125rem' mb={2}>
                  Let us contact you to learn about your business needs and offer a customized plan to you.
                </Box>
                <Box fontFamily='font2' fontSize='0.875rem' mb={3}>
                  After this you'll be able to register. 
                </Box>
                <Box fontFamily='font3' fontSize='0.8rem' mb={2}>
                  Enter your information to contact to you{' '}
                </Box>
                <FormInformation />
              </Box>
            </Box>

            <BottomArrow next='donwload' />
          </Box>
        </Element>
        <Element name='donwload' className='element'>
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
              position='relative'
            >
              <Box color='white'>
                <Box fontFamily='font3' fontSize='2rem'>
                  Download
                </Box>
                <Box fontSize='1.125rem' fontFamily='font2'>
                  Download our app from one of these stores <br /> with the
                  following available devices
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
                  <Box mb={4} display='flex' justifyContent='center'>
                    <img src={Images.steam} alt='' />
                  </Box>
                  <Box component='h2' className={classes.text2} mb={2}>
                    Standalone headset
                  </Box>
                  <Box component='h3' className={classes.text1}>
                    Vive
                  </Box>
                  <Box component='h3' className={classes.text1}>
                    Vive Pro
                  </Box>
                  <Box component='h3' className={classes.text1}>
                    HTC Vive
                  </Box>
                  <Box component='div' my={3}></Box>
                  <Box display='flex' justifyContent='center' mb={-1} pt={2}>
                    <a className={classes.linkGo}>Go to Steam</a>
                  </Box>
                </Box>

                <Box className={classes.banner} p={4} ml={3} pt={6}>
                  <Box mb={5} display='flex' justifyContent='center'>
                    <img src={Images.sidequest} alt='' />
                  </Box>
                  <Box component='h2' className={classes.text2} mb={2}>
                    Standalone headset
                  </Box>
                  <Box component='h3' className={classes.text1}>
                    Oculus Rift
                  </Box>
                  <Box component='h3' className={classes.text1}>
                    Oculus Quest 
                  </Box>
                  <Box component='h3' className={classes.text1}>
                    Oculus Quest 2
                  </Box>
                  <Box component='div' my={3}></Box>
                  <Box display='flex' justifyContent='center' mb={-1} pt={2}>
                    <a className={classes.linkGo}>Go to Side Quest</a>
                  </Box>
                </Box>
              </Box>
              <Box
                mb={-7}
                position='absolute'
                bottom={0}
                fontFamily='font2'
                fontSize='0.75rem'
                textAlign='center'
                color='white'
              >
                {' '}
                If you already have an account or an access code, you can download Multivrsity by choosing one of the options above. Otherwise make sure to sign up first.

              </Box>
            </Box>
          </Box>
        </Element>
        <Box
          height='5.625rem'
          display='flex'
          className={classes.footer}
          pr={10}
        >
          <Box
            flex='1.5'
            display='flex'
            color='white'
            justifyContent='flex-end'
            alignItems='center'
          >
            <Box mx={4}>
              <a
                href=''
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'font2'
                }}
              >
                Privacy Policy
              </a>
            </Box>
            <Box mx={4}>
              <a
                href=''
                style={{
                  color: 'white',
                  fontSize: '1rem',
                  fontFamily: 'font2'
                }}
              >
                Terms of service
              </a>
            </Box>
          </Box>
          <Box
            flex='1'
            display='flex'
            justifyContent='flex-end'
            alignItems='center'
          >
            <img
              src={Images.powered}
              alt='Powered by inmersys'
              title='Powered by inmersys'
            />
          </Box>
          <Box style={{color: 'white', opacity: 0.6, fontFamily: 'font3'}} fontSize='0.6rem' position="fixed" bottom={0} right={0}>
                {version}
          </Box>
        </Box>
      </Box>
    </>
  )
}
export default withAuth(Home)

function FormInformation () {
  const classes = useStyles()

  const { sendInformationForm } = useContext(UserContext)
  const initialValues = {
    company: null,
    name: null,
    email: null,
    phone: null,
    surname: null
  }
  const [formInformation, setFormInformation] = useState<SendEmailInfoProps>({
    ...initialValues
  })
  const [errors, setErrors] = useState<SendEmailInfoProps>({ ...initialValues })
  useContext
  const onChange = e => {
    e.preventDefault()
    setFormInformation({
      ...formInformation,
      [e.target.name]: e.target.value
    })
  }
  const validateForm = (): boolean => {
    const { name, surname, company, email, phone } = formInformation
    const newErrors: SendEmailInfoProps = { ...initialValues }
    let isValid = true
    if (!name || name.trim().length === 0) {
      newErrors.name = 'Please enter a valid value'
      isValid = false
    }

    if (!surname || surname.trim().length === 0) {
      newErrors.surname = 'Please enter a valid value'
      isValid = false
    }
    if (!company || company.trim().length === 0) {
      newErrors.company = 'Please enter a valid value'
      isValid = false
    }
    if (!phone || phone.trim().length === 0) {
      newErrors.phone = 'Please enter a valid value'
      isValid = false
    }
    if (phone && phone.trim().length < 10) {
      newErrors.phone = 'At least 10 digits'
      isValid = false
    }
    if (!email || email.trim().length === 0) {
      newErrors.email = 'Please enter a valid value'
      isValid = false
    }
    if (!verifyEmail(email)) {
      newErrors.email = 'Please valid email'
    }
    setErrors(newErrors)
    return isValid
  }

  const onSendEmail = async e => {
    e.preventDefault()
    if (validateForm()) {
      const status = await sendInformationForm(formInformation)
      if (status === 0) {
        notification.open({
          message: '¡Mail Sent Successfully!',
          description: 'We will contact you to follow up on your request'
        })
        setErrors(initialValues)
        setFormInformation(initialValues)
      }
    }
  }

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
          {...propsCustomInputErrors}
            error={errors.name !== null}
            helperText={errors.name}
            autoComplete='fname'
            name='name'
            size='small'
            variant='outlined'
            required
            fullWidth
            id='firstName'
            label='Name'
            autoFocus
            onChange={onChange}
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <CustomInput
          {...propsCustomInputErrors}
            error={errors.surname !== null}
            helperText={errors.surname}
            variant='outlined'
            size='small'
            required
            fullWidth
            onChange={onChange}
            id='lastName'
            label='Surname'
            name='surname'
            autoComplete='lname'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
            {...propsCustomInputErrors}
            error={errors.company !== null}
            onChange={onChange}
            label='Company'
            helperText={errors.company}
            variant='outlined'
            required
            size='small'
            fullWidth
            id='email'
            name='company'
            autoComplete='company'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
          {...propsCustomInputErrors}
            error={errors.email !== null}
            onChange={onChange}
            helperText={errors.email}
            name='email'
            size='small'
            variant='outlined'
            required
            fullWidth
            id='email'
            label='Email Address'
            autoComplete='email'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
        <Grid item xs={12}>
          <CustomInput
          {...propsCustomInputErrors}
            error={errors.phone !== null}
            helperText={errors.phone}
            onChange={onChange}
            variant='outlined'
            required
            size='small'
            fullWidth
            name='phone'
            label='Telephone Number'
            type='number'
            id='phonenumber'
            InputLabelProps={SylesInputLabel}
            InputProps={SylesInputLabel}
          />
        </Grid>
      </Grid>
      <Box mt={3} display='flex ' justifyContent='flex-end'>
        <button
          onClick={onSendEmail}
          color='primary'
          className={classes.submit}
        >
          <Box fontFamily='font3' fontSize='1rem'>
            Send
          </Box>
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
  footer: {
    backgroundColor: '#000000',
    color: 'white'
  },
  text1: {
    color: 'white',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontFamily: 'font2',
    marginBottom: '0.8rem'
  },
  text2: {
    color: 'white',
    textAlign: 'center',
    fontSize: '0.875rem',
    fontFamily: 'font3'
  },
  linkGo: {
    backgroundColor: 'transparent',
    border: '2px solid rgba(24, 160, 251, 1)',
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
    minWidth: '16.5rem'
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
    minWidth: '29rem',
    padding: '1.5rem',
    borderRadius: '0.6rem'
  },
  landing: {
    backgroundImage: `url(${Images.landing2})`,
    backgroundSize: 'cover',
    fontFamily: 'font3'
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
    fontSize: '1rem',
    color: 'white',
    fontFamily: 'font3',
    cursor: 'pointer',
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
