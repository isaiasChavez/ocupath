import React, { MouseEventHandler, useContext, useEffect, useState } from 'react'
import { Button,  TextField,  Box } from '@material-ui/core'
import MomentUtils from '@date-io/moment'
import { COMPANIES, GUEST } from '../../types'
import moment from 'moment'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker
} from '@material-ui/pickers'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import { NewUserDTO, NewUserErrors } from '../../types/types'
import { verifyEmail } from '../../config/utils'
import UserContext from '../../context/user/user.context'
import NotificationsContext from '../../context/notifications/notifications.context'

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

  const [startedAt, setStartDate] = useState(new Date())
  const [finishedAt, setFinishDate] = useState(new Date())
  const [dataNewUser, setDataNewUser] = useState<NewUserDTO>(initialState(type))
  const [errors, setErrors] = useState<NewUserErrors>(initialErrors())
  const { inviteUser,selectedUser,loading } = useContext(UserContext)
  const {sendAlert} = useContext(NotificationsContext)
  const handleDateStartChange = e => {
    setErrors(initialErrors())
    if (moment(e.format()).isAfter(finishedAt)) {
      setErrors({
        ...errors,
        startedAt: `The date must be before the final.`
      })
    } else {
      setStartDate(e.format())
    }
  }
  useEffect(() => {
    console.log({dataNewUser})
  }, [dataNewUser])


  const handleDateEndChange = e => {
    setErrors(initialErrors())
    console.log({ e }, e.format())
    if (moment(e.format()).isBefore(startedAt)) {
      setErrors({
        ...errors,
        finishedAt: `The date must be after the start.`
      })
    } else {
      setFinishDate(e.format())
    }
  }

  const onChangeInput = e => {
    setErrors(initialErrors())
    setDataNewUser({
      ...dataNewUser,
      [e.target.name]: e.target.value
    })
  }

  const isCommondFieldsValid = (): boolean => {
    let isValid = true
    console.log('Validando comunes')
    let newErrors: NewUserErrors = { ...errors }
    if (!verifyEmail(dataNewUser.email)) {
      newErrors.email = 'Please enter a valid value'
      isValid = false
    }


  

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
    if (dataNewUser.cost <= 0) {
      newErrors.cost = `You cannot put this value`
      isValid = false
    }
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }

  const validateCompany = (): boolean => {
    let isValid = true
    const newErrors: NewUserErrors = {
      ...errors
    }
    if (dataNewUser.company.trim().length === 0) {
      newErrors.company = 'Please enter a valid value'
      isValid = false
    }
    if (dataNewUser.invitations <= MIN_INVITATIONS) {
      newErrors.invitations = `Enter a minimum of ${MIN_INVITATIONS} ${
        MIN_INVITATIONS === 1 ? 'invitation.' : 'invitations.'
      }`
      isValid = false
    }
    if (dataNewUser.invitations > MAX_INVITATIONS) {
      newErrors.invitations = `You can only choose up to ${MAX_INVITATIONS} invitations.`
      isValid = false
    }
    console.log('validateCompany:', { newErrors })
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }

  const validateGuest = (): boolean => {
    let isValid = true
    if (dataNewUser.name.trim().length === 0) {
      setErrors({ ...errors, name: 'Please enter a valid value' })
      isValid = false
    }
    console.log('validateGuest:', { isValid })

    return isValid
  }

  const handleSend = async () => {
    
    const userToValid = type === COMPANIES ? validateCompany : validateGuest

    if (isCommondFieldsValid() && userToValid()) {
      console.log("Se ha validado correctamente")
      setErrors(initialErrors())
      const inviteDTO = {
        ...dataNewUser,
        startedAt,
        finishedAt
      }      
      await inviteUser(inviteDTO)
      setDataNewUser({...initialState(type)})
    } else {
      sendAlert({
        type:'error',
        msg:'Error validating fields'
      })

    }
  }
  const classes = useStyles()

  const Header = () => {
    let headerText: string = 'Invitation'
    if (type === COMPANIES) {
      headerText = 'Invite new company'
    }
    if (type === GUEST) {
      headerText = 'Invite new guest'
    }
    return (
      <Box height='12%' className='ITCAvantGardeStdBkBold' my={1}  display="flex" alignItems="center" justifyContent="center" fontWeight='fontWeightBold' fontSize={28}  >
          {headerText}
      </Box>
    )
  }

  const body = (
    <Box borderRadius={8} className={classes.paper}>
      <Header />

      <Box
        display='flex'
        minHeight="28%"
        flexDirection='column'
        justifyContent='space-around'
        
      >
        <Box mt={2} fontSize={14} className="ITCAvantGardeStdBkBold" fontWeight='fontWeightBold'>
          Personal Information
        </Box>
        {type === COMPANIES && (
          <Box mb={2} mt={1}>
            <TextField
            size="small"
              helperText={errors.company}
              error={errors.company !== null}
              variant='outlined'
              onChange={onChangeInput}
              required
              type='string'
              name='company'
              id='company'
              label='Company'
              disabled={loading}
              fullWidth
              value={dataNewUser.company}
            />
          </Box>
        )}
        {type === GUEST && (
          <Box my={2}>
            <TextField
            size="small"

              variant='outlined'
              helperText={errors.name}
              error={errors.name !== null}
              onChange={onChangeInput}
              required
              type='string'
              name='name'
              id='name'
              label='Name'
              value={dataNewUser.name}
              fullWidth
              autoComplete='name'
              disabled={loading}
            />
          </Box>
        )}

        <Box>
          <TextField
          size="small"
            required
            helperText={errors.email}
            error={errors.email !== null}
            variant='outlined'
            onChange={onChangeInput}
            type='email'
            name='email'
            label='Email'
            fullWidth
            value={dataNewUser.email}
            disabled={loading}
          />
        </Box>
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
      >
        {type === COMPANIES && (
          <>
        <Box mt={2}  mb={1} fontSize={14} className="ITCAvantGardeStdBkBold" fontWeight='fontWeightBold'>
          Plan
        </Box>
          <Box mb={2}>
            <TextField
            size="small"
            name='invitations'
            variant='outlined'
            disabled={loading}
            helperText={errors.invitations}
            onChange={onChangeInput}
            error={errors.invitations !== null}
            type='number'
            required
            placeholder='Number of invitations*'
            value={dataNewUser.invitations?dataNewUser.invitations:null}
            fullWidth

            
            />
          </Box>
            </>
        )}
       
      </Box>
      <Box
        display='flex'
        flexDirection='column'
        justifyContent='space-around'
        
      >
        <Box mt={type === COMPANIES?0:2} mb={2} fontSize={14} className="ITCAvantGardeStdBkBold" fontWeight='fontWeightBold'>
          Period
        </Box>
        <Box  mb={2} >
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Box display='flex'>
              <Box width='100%' mr={2}>
                <KeyboardDatePicker
                  initialFocusedDate={new Date()}
                  size="small"
                  fullWidth={true}
                  autoOk
                  variant='inline'
                  inputVariant='outlined'
                  label='Start'
                  helperText={errors.startedAt}
                  format='DD/MM/YYYY'
                  value={startedAt}
                  disablePast
                  disabled={loading}
                maxDate={new Date('2025-01-01')}
                disableToolbar
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={handleDateStartChange}
                />
              </Box>
              <Box width='100%' ml={2}>
                <KeyboardDatePicker
                disablePast
                disabled={loading}

                  fullWidth={true}
                  disableToolbar
                  maxDate={new Date('2025-01-01')}
                  autoOk
                  variant='inline'
                  size="small"
                  inputVariant='outlined'
                  label='Finish'
                  helperText={errors.finishedAt}
                  format='DD/MM/YYYY'
                  value={finishedAt}
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={handleDateEndChange}
                />
              </Box>
            </Box>
          </MuiPickersUtilsProvider>
        </Box>
        <Box mb={1} fontSize={14} className="ITCAvantGardeStdBkBold" fontWeight='fontWeightBold'>
          Total cost
        </Box>
        <Box mb={4} width="46%">
          <TextField
          size="small"
            required
            onChange={onChangeInput}
            variant='outlined'
            value={dataNewUser.cost}
            error={errors.cost !== null}
            name='cost'
            helperText={errors.cost}
            placeholder='Total cost'
            fullWidth
            disabled={loading}
          />
        </Box>

        <Box display='flex' justifyContent='space-around'>
          <Box mr={2} width='100%'>
            <Button
              fullWidth={true}
              size='large'
              onClick={()=>{
                if (!loading) {
                  handleClose()
                }
              }}
              className={classes.buttons}
              color='secondary'
              variant='outlined'
              disabled={loading}
            >
              Cancel
            </Button>
          </Box>
          <Box ml={2} width='100%'>
            <Button
              onClick={handleSend}
              fullWidth={true}
              size='large'
              color='secondary'
              variant='contained'
              disabled={loading}
            >
              Sure
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  )

  return (
    <>
      <Modal
        open={isOpen}
        onClose={()=>{
          if (!loading) {
            handleClose()  
          }
          }}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
        }}
        className="animate-fadein"
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}

      </Modal>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 auto 0 auto',
      overflowY:'auto',  
      minWidth: "468px",
      width:'468px',
      maxHeight: '100vh',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3)
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
