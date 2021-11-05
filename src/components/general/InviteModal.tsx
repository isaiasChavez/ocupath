import React,{
  MouseEventHandler,
  useContext,
  useState
} from 'react'
import { Button,Box, IconButton } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { COMPANIES,GUEST,USERS_TYPES,TypesNotification } from '../../types'
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { makeStyles,Theme,createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { NewUserDTO,NewUserErrors } from '../../types/types'
import { verifyEmail } from '../../config/utils'
import UserContext,{ InviteUserDTO } from '../../context/user/user.context'
import NotificationsContext from '../../context/notifications/notifications.context'
import { validateOrReject } from 'class-validator'
import { CustomInputWithValidations, propsCustomInputErrors } from '../../../pages/login'
import { Close } from '@material-ui/icons'

export interface InviteModalProps {
  handleOpen: MouseEventHandler
  handleClose: Function
  isOpen: boolean
  type: number
}

const InviteModal: React.FC<InviteModalProps> = ({
  handleOpen,
  handleClose,
  isOpen,
  type
}) => {

  const MIN_INVITATIONS = 1
  const MAX_INVITATIONS = 1000
  const today = new Date()
  const [startedAt,setStartDate] = useState<string>(moment(today).toISOString())
  const [finishedAt,setFinishDate] = useState<string>(moment(today).toISOString())
  const [dataNewUser,setDataNewUser] = useState<NewUserDTO>(initialState(type))
  const [errors,setErrors] = useState<NewUserErrors>(initialErrors())
  const { inviteUser,selectedUser,loading,profile,tokenError } = useContext(UserContext)
  const { type: typeUserLogged } = profile
  const { sendAlert } = useContext(NotificationsContext)
  const isInviteCompany = type === COMPANIES
  const isInviteGuest = type === GUEST


  const handleDateStartChange = e => {
    setErrors(initialErrors())
    if (moment(e.format()).isAfter(finishedAt)) {
      setErrors({
        ...errors,
        startedAt: `The date must be before the final.`
      })
    } else {
      const newDate = new Date(e.format()).toISOString()
      setStartDate(newDate)
    }
  }

  const handleDateEndChange = e => {
    setErrors(initialErrors())
    if (moment(e.format()).isBefore(startedAt)) {
      setErrors({
        ...errors,
        finishedAt: `The date must be after the start.`
      })
    } else {
      const newDate = new Date(e.format()).toISOString()
      setFinishDate(newDate)
    }
  }

  const onChangeInput = e => {
    setErrors(initialErrors())
    setDataNewUser({
      ...dataNewUser,
      [e.target.name]: e.target.value
    })
  }

  const isCommondFieldsValid = (): { isOk: boolean,commondErrors: NewUserErrors } => {
    let isValid = true
    let newErrors: NewUserErrors = { ...errors }
    if (!dataNewUser.email || dataNewUser.email.trim().length === 0) {
      newErrors.email = 'Please enter a valid value'
      isValid = false
    }

    if (!verifyEmail(dataNewUser.email)) {
      newErrors.email = 'Please enter a valid value'
      isValid = false
    }
    if (typeUserLogged === USERS_TYPES.SUPER_ADMIN) {
      if (!moment(startedAt).isValid() || moment(startedAt).isAfter(finishedAt)) {
        newErrors.startedAt = `You must select a date`
        isValid = false
      }

      if (
        !moment(finishedAt).isValid() ||
        moment(finishedAt).isBefore(startedAt)
      ) {
        newErrors.finishedAt = `You must select a date`
        isValid = false
      }

      if (moment(finishedAt).isSame(startedAt)) {
        newErrors.finishedAt = `The dates must be different`
        newErrors.startedAt = `The dates must be different`
        isValid = false
      }

      if (!dataNewUser.cost || dataNewUser.cost <= 0) {
        newErrors.cost = `You cannot put this value`
        isValid = false
      }
    }
    return {
      commondErrors: newErrors,
      isOk: isValid
    }
  }

  const validateCompany = (commondErrors: NewUserErrors): { isOk: boolean,errors: NewUserErrors } => {
    let isValid = true
    const newErrors: NewUserErrors = {
      ...commondErrors
    }
    if (dataNewUser.company.trim().length === 0) {
      newErrors.company = 'Please enter a valid value'
      isValid = false
    }
    if (dataNewUser.invitations <= MIN_INVITATIONS) {
      newErrors.invitations = `Enter a minimum of ${MIN_INVITATIONS} ${MIN_INVITATIONS === 1 ? 'invitation.' : 'invitations.'
        }`
      isValid = false
    }
    if (dataNewUser.invitations > MAX_INVITATIONS) {
      newErrors.invitations = `You can only choose up to ${MAX_INVITATIONS} invitations.`
      isValid = false
    }

    return {
      isOk: isValid,
      errors: newErrors
    }
  }

  const validateGuest = (commondErrors: NewUserErrors): { isOk: boolean,errors: NewUserErrors } => {
    let isValid = true
    const newErrors: NewUserErrors = {
      ...commondErrors
    }
    if (dataNewUser.name.trim().length === 0) {
      newErrors.name = 'Please enter a valid value'
      isValid = false
    }

    return {
      isOk: isValid,
      errors: newErrors
    }
  }

  const handleSend = async () => {

    let commondsFieldsAreValid: boolean
    let particularFieldsAreValid: boolean
    if (isInviteCompany) {
      const { isOk,commondErrors } = isCommondFieldsValid()
      commondsFieldsAreValid = isOk
      const { isOk: isOkCompany,errors } = validateCompany(commondErrors)
      particularFieldsAreValid = isOkCompany
      setErrors(errors)
    }
    if (isInviteGuest) {
      const { isOk,commondErrors } = isCommondFieldsValid()
      commondsFieldsAreValid = isOk
      const { isOk: isOkGuest,errors } = validateGuest(commondErrors)
      particularFieldsAreValid = isOkGuest
      setErrors(errors)
    }


    if (particularFieldsAreValid && commondsFieldsAreValid) {
      setErrors(initialErrors())
      try {
        const inviteDTO: NewUserDTO = {
          ...dataNewUser,
          startedAt,
          finishedAt
        }

        if (isInviteGuest) {
          inviteDTO.invitations = 0
        }
        if (typeUserLogged === USERS_TYPES.ADMIN) {
          inviteDTO.invitations = 0
          inviteDTO.startedAt = new Date().toISOString()
          inviteDTO.finishedAt = new Date().toISOString()
          inviteDTO.cost = 1
        }

        const newInvite = new InviteUserDTO(inviteDTO)
        await validateOrReject(newInvite)
        inviteDTO.email = inviteDTO.email.toLowerCase()

        const response = await inviteUser(newInvite)
        if (response === 0 || response === 8) {
          setDataNewUser({ ...initialState(type) })
          // handleClose()
        }
      } catch (error) {
        sendAlert({
          type: TypesNotification.error,
          msg: 'Error validating fields'
        })
      }
    }
  }
  const classes = useStyles()

  const Header = () => {
    let headerText: string = 'Invitation'
    if (type === COMPANIES) {
      headerText = 'Invite new company'
    }
    if (type === GUEST) {
      headerText = 'Invite new user'
    }
    return (
      <Box
        height='12%'
        className='ITCAvantGardeStdBkBold'
        my={ 1 }
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontWeight='fontWeightBold'
        fontSize={ 28 }
      >
        { headerText }
      </Box>
    )
  }



  const body = (
    <Box borderRadius={ 8 } position="relative" className={ classes.paper }>
      <Box
    m={0.5}
    style={{
      position: 'absolute',
      top: 0,
      right: 0,
      opacity: 0.5,
    }}
  >
    <IconButton
                disabled={loading}
                
                 color="primary" aria-label="upload picture" component="span">

    <Close
      style={{
        cursor: 'pointer',
      }}
      onClick={() => {
        if (!loading) {
          handleClose()
        }
      }}
      />
      </IconButton>
  </Box>
      <Header />

      <Box
        display='flex'
        minHeight='28%'
        flexDirection='column'
        justifyContent='space-around'
      >
        <Box
          mt={ 2 }
          fontSize={ 14 }
          className='ITCAvantGardeStdBkBold'
          fontWeight='fontWeightBold'
        >
          Personal Information
        </Box>
        { type === COMPANIES && (
          <Box mb={ 2 } mt={ 1 }>
              <CustomInputWithValidations
                  { ...propsCustomInputErrors }
              size='small'
              helperText={ errors.company }
              error={ errors.company !== null }
              variant='outlined'
              onChange={ onChangeInput }
              required
              type='string'
              name='company'
              id='company'
              label='Company'
              disabled={ loading }
              fullWidth
              value={ dataNewUser.company }
            />
          </Box>
        ) }
        { type === GUEST && (
          <Box my={ 2 }>
            <CustomInputWithValidations
                  { ...propsCustomInputErrors }
              size='small'
              variant='outlined'
              helperText={ errors.name }
              error={ errors.name !== null }
              onChange={ onChangeInput }
              required
              type='string'
              name='name'
              id='name'
              label='First Name'
              value={ dataNewUser.name }
              fullWidth
              autoComplete='name'
              disabled={ loading }
            />
          </Box>
        ) }

        <Box>
        <CustomInputWithValidations
                  { ...propsCustomInputErrors }
            size='small'
            required
            helperText={ errors.email }
            error={ errors.email !== null }
            variant='outlined'
            onChange={ onChangeInput }
            inputProps={ { style: { textTransform: "lowercase" } } }

            type='email'
            name='email'
            label='Email'
            fullWidth
            value={ dataNewUser.email }
            disabled={ loading }
          />
        </Box>
      </Box>
      <Box display='flex' flexDirection='column' justifyContent='space-around'>
        { type === COMPANIES && (
          <>
            <Box
              mt={ 2 }
              mb={ 1 }
              fontSize={ 14 }
              className='ITCAvantGardeStdBkBold'
              fontWeight='fontWeightBold'
            >
              Plan
            </Box>
            <Box mb={ 2 }>
            <CustomInputWithValidations
                  { ...propsCustomInputErrors }
                size='small'
                name='invitations'
                variant='outlined'
                disabled={ loading }
                helperText={ errors.invitations }
                onChange={ onChangeInput }
                error={ errors.invitations !== null }
                type='number'
                required
                placeholder='Number of invitations*'
                value={ dataNewUser.invitations ? dataNewUser.invitations : null }
                fullWidth
              />
            </Box>
          </>
        ) }
      </Box>
      <Box display='flex' flexDirection='column' justifyContent='space-around'>
        { typeUserLogged === USERS_TYPES.SUPER_ADMIN && <>
          <Box
            mt={ type === COMPANIES ? 0 : 2 }
            mb={ 2 }
            fontSize={ 14 }
            className='ITCAvantGardeStdBkBold'
            fontWeight='fontWeightBold'
          >
            Period
          </Box>
          <Box mb={ 2 }>
            <MuiPickersUtilsProvider utils={ MomentUtils }>
              <Box display='flex'>
                <Box width='100%' mr={ 2 }>
                  <KeyboardDatePicker
                    initialFocusedDate={ today }
                    size='small'
                    fullWidth={ true }
                    autoOk
                    variant='inline'
                    inputVariant='outlined'
                    label='Start'
                    helperText={ errors.startedAt }
                    format='MM/DD/YYYY'
                    value={ startedAt }
                    disablePast
                    disabled={ loading }
                    maxDate={ new Date('2025-01-01') }
                    disableToolbar
                    InputAdornmentProps={ { position: 'start' } }
                    onChange={ handleDateStartChange }
                  />
                </Box>
                <Box width='100%' ml={ 2 }>
                  <KeyboardDatePicker
                    disablePast
                    disabled={ loading }
                    fullWidth={ true }
                    disableToolbar
                    maxDate={ new Date('2025-01-01') }
                    autoOk
                    variant='inline'
                    size='small'
                    inputVariant='outlined'
                    label='Finish'
                    helperText={ errors.finishedAt }
                    format='MM/DD/YYYY'
                    value={ finishedAt }
                    InputAdornmentProps={ { position: 'start' } }
                    onChange={ handleDateEndChange }
                  />
                </Box>
              </Box>
            </MuiPickersUtilsProvider>
          </Box>
          <Box
            mb={ 1 }
            fontSize={ 14 }
            className='ITCAvantGardeStdBkBold'
            fontWeight='fontWeightBold'
          >
            Total cost
          </Box>
          <Box mb={ 4 } width='46%'>
          <CustomInputWithValidations
                  { ...propsCustomInputErrors }
              size='small'
              required
              onChange={ onChangeInput }
              variant='outlined'
              value={ dataNewUser.cost }
              error={ errors.cost !== null }
              name='cost'
              helperText={ errors.cost }
              placeholder='Total cost'
              fullWidth
              disabled={ loading }
            />

          </Box>
        </> }

        <Box display='flex' justifyContent='space-around' mt={ typeUserLogged === USERS_TYPES.SUPER_ADMIN ? 0 : 2 }>
          <Box mr={ 2 } width='100%'>
            <Button
              fullWidth={ true }
              size='large'
              onClick={ () => {
                if (!loading) {
                  handleClose()
                }
              } }
              className={ classes.buttons }
              color='secondary'
              variant='outlined'
              disabled={ loading }
              style={ {
                textTransform: 'capitalize'
              } }
            >
              Cancel
            </Button>
          </Box>
          <Box ml={ 2 } width='100%'>
            <Button
              onClick={ handleSend }
              fullWidth={ true }
              size='large'
              color='secondary'
              variant='contained'
              style={ {
                textTransform: 'capitalize',
                color: 'white'
              } }
              disabled={ loading }
            >
              send
            </Button>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" my={2}>
          <a target="_blank" href={`https://ocupath-xi.vercel.app/register/${tokenError}`}> Invitation url</a>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <Modal
        open={ isOpen }
        onClose={ () => {
          if (!loading) {
            handleClose()
          }
        } }
        style={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        } }
        className='animate-fadein'
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        { body }
      </Modal>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 auto 0 auto',
      overflowY: 'auto',
      minWidth: '468px',
      width: '468px',
      maxHeight: '100vh',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2,4,3)
    },
    buttons: {
      borderColor: '#45A0C5'
    }
  })
)

const initialState = (type: number): NewUserDTO => {
  let typeToInvite: number
  if (type === COMPANIES) {
    typeToInvite = 2
  }
  if (type === GUEST) {
    typeToInvite = 3
  }

  return {
    company: '',
    name: '',
    cost: null,
    email: '',
    finishedAt: '',
    startedAt: '',
    invitations: null,
    typeToInvite
  }
}

const initialErrors = (): NewUserErrors => {
  return {
    company: null,
    name: null,
    cost: null,
    email: null,
    finishedAt: null,
    startedAt: null,
    invitations: null
  }
}

export default InviteModal
