import React, { MouseEventHandler, useContext, useState } from 'react'
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

export interface InviteModalProps {
  handleOpen: MouseEventHandler
  handleClose: MouseEventHandler
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
  const MAX_INVITATIONS = 4

  const [startedAt, setStartDate] = useState(new Date())
  const [finishedAt, setFinishDate] = useState(new Date())
  const [dataNewUser, setDataNewUser] = useState<NewUserDTO>(initialState(type))
  const [errors, setErrors] = useState<NewUserErrors>(initialErrors())
  const { inviteUser,selectedUser } = useContext(UserContext)

  const handleDateStartChange = e => {
    setErrors(initialErrors())
    if (moment(e.format()).isAfter(finishedAt)) {
      setErrors({
        ...errors,
        startedAt: `La fecha debe ser anterior a la final.`
      })
    } else {
      setStartDate(e.format())
    }
  }
  const handleDateEndChange = e => {
    setErrors(initialErrors())
    console.log({ e }, e.format())
    if (moment(e.format()).isBefore(startedAt)) {
      setErrors({
        ...errors,
        finishedAt: `La fecha debe ser después al inicio.`
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
      console.log('No es válido')
      newErrors.email = 'Ingrese un valor válido'
      console.log('Validando email')
      isValid = false
    }


  

    if (!moment(startedAt).isValid() || moment(startedAt).isAfter(finishedAt)) {
      newErrors.startedAt = `Debes seleccionar una fecha`
      isValid = false
    }

    if (
      !moment(finishedAt).isValid() ||
      moment(finishedAt).isBefore(startedAt)
    ) {
      newErrors.finishedAt = `Debes seleccionar una fecha`
      isValid = false
    }
    if (moment(finishedAt).isSame(startedAt)) {
      newErrors.finishedAt = `Las fechas deben ser distintas`
      newErrors.startedAt = `Las fechas deben ser distintas`
      isValid = false
    }
    if (dataNewUser.cost <= 0) {
      newErrors.cost = `No puedes colocar este valor`
      isValid = false
    }
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }

  const validateCompany = (): boolean => {
    let isValid = true
    console.log('Validando compañyu')
    const newErrors: NewUserErrors = {
      ...errors
    }
    if (dataNewUser.company.trim().length === 0) {
      newErrors.company = 'Ingrese un valor válido'
      isValid = false
    }
    if (dataNewUser.invitations <= MIN_INVITATIONS) {
      newErrors.invitations = `Ingrese un mínimo de ${MIN_INVITATIONS} ${
        MIN_INVITATIONS === 1 ? 'invitación.' : 'invitaciones.'
      }`
      isValid = false
    }
    if (dataNewUser.invitations > MAX_INVITATIONS) {
      newErrors.invitations = `Solo puedes escoger hasta ${MAX_INVITATIONS} invitaciones.`
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
      setErrors({ ...errors, name: 'Ingrese un valor válido' })
      isValid = false
    }
    console.log('validateGuest:', { isValid })

    return isValid
  }

  const handleSend = async () => {
    
    const userToValid = type === COMPANIES ? validateCompany : validateGuest
    if (isCommondFieldsValid() && userToValid()) {
      setErrors(initialErrors())
      const inviteDTO = {
        ...dataNewUser,
        startedAt,
        finishedAt
      }
      await inviteUser(inviteDTO)
      setDataNewUser(initialState(type))
    } else {
      alert('Invalid!')
    }
  }
  const classes = useStyles()

  const Header = () => {
    let headerText: string = 'Invitación'
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
            helperText={errors.invitations}
            onChange={onChangeInput}
            error={errors.invitations !== null}
            type='number'
            required
            placeholder='Number of invitations*'
            value={dataNewUser.invitations===0?null:dataNewUser.invitations}
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
                maxDate={new Date('2025-01-01')}
                disableToolbar
                  InputAdornmentProps={{ position: 'start' }}
                  onChange={handleDateStartChange}
                />
              </Box>
              <Box width='100%' ml={2}>
                <KeyboardDatePicker
                disablePast
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
            value={dataNewUser.cost===0?null:dataNewUser.cost}
            error={errors.cost !== null}
            name='cost'
            helperText={errors.cost}
            placeholder='Total cost'
            fullWidth
          />
        </Box>

        <Box display='flex' justifyContent='space-around'>
          <Box mr={2} width='100%'>
            <Button
              fullWidth={true}
              size='large'
              onClick={handleClose}
              className={classes.buttons}
              color='secondary'
              variant='outlined'
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
        onClose={handleClose}
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
    cost: 0,
    email: '',
    finishedAt: '',
    startedAt: '',
    invitations: 0,
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
