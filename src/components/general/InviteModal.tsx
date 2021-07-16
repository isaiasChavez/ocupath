import React, { MouseEventHandler, useContext, useState } from 'react';
import { Button, Typography, TextField, Grid } from '@material-ui/core';
import MomentUtils from '@date-io/moment';
import { COMPANIES, GUEST } from '../../types';
import moment from 'moment'
import {
  DatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { NewUserDTO, NewUserErrors } from '../../types/types';
import { verifyEmail } from '../../config/utils';
import UserContext from '../../context/user/user.context';

export interface InviteModalProps {
  handleOpen: MouseEventHandler,
  handleClose: MouseEventHandler,
  isOpen: boolean,
  type: number
}
const InviteModal: React.FC<InviteModalProps> = ({ handleOpen, handleClose, isOpen, type }) => {
  const MIN_INVITATIONS = 1
  const MAX_INVITATIONS = 4

  const [startedAt, setStartDate] = useState(new Date());
  const [finishedAt, setFinishDate] = useState(new Date());
  const [dataNewUser, setDataNewUser] = useState<NewUserDTO>(initialState(type))
  const [errors, setErrors] = useState<NewUserErrors>(initialErrors())
  const { inviteUser } = useContext(UserContext)

  

  const handleDateStartChange = (e) => {
    setErrors(initialErrors())
    if (moment(e.format()).isAfter(finishedAt)) {
      setErrors({ ...errors, startedAt: `La fecha debe ser anterior a la final.` });
    } else {
      setStartDate(e.format())
    }
  }
  const handleDateEndChange = (e) => {
    setErrors(initialErrors())
    console.log({ e }, e.format())
    if (moment(e.format()).isBefore(startedAt)) {
      setErrors({ ...errors, finishedAt: `La fecha debe ser después al inicio.` });
    } else {
      setFinishDate(e.format())
    }
  }

  const onChangeInput = (e) => {
    setErrors(initialErrors())
    setDataNewUser({
      ...dataNewUser,
      [e.target.name]: e.target.value
    })
  }


  const isCommondFieldsValid = (): boolean => {
    let isValid = true
    console.log("Validando comunes")
    let newErrors: NewUserErrors = { ...errors }
    if (!verifyEmail(dataNewUser.email)) {
      console.log("No es válido")
      newErrors.email = "Ingrese un valor válido";
      console.log("Validando email")
      isValid = false
    }
    if (!moment(startedAt).isValid() || moment(startedAt).isAfter(finishedAt)) {
      newErrors.startedAt = `Debes seleccionar una fecha`
      isValid = false
    }
    if (!moment(finishedAt).isValid() || moment(finishedAt).isBefore(startedAt)) {
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
    console.log("Validando compañyu")
    const newErrors: NewUserErrors = {
      ...errors
    }
    if (dataNewUser.company.trim().length === 0) {
      newErrors.company = "Ingrese un valor válido"
      isValid = false
    }
    if (dataNewUser.invitations <= MIN_INVITATIONS) {
      newErrors.invitations = `Ingrese un mínimo de ${MIN_INVITATIONS} ${MIN_INVITATIONS === 1 ? 'invitación.' : 'invitaciones.'}`
      isValid = false
    }
    if (dataNewUser.invitations > MAX_INVITATIONS) {
      newErrors.invitations = `Solo puedes escoger hasta ${MAX_INVITATIONS} invitaciones.`
      isValid = false
    }
    console.log("validateCompany:", { newErrors })
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }

  const validateGuest = (): boolean => {
    let isValid = true
    if (dataNewUser.name.trim().length === 0) {
      setErrors({ ...errors, name: "Ingrese un valor válido" });
      isValid = false
    }
    console.log("validateGuest:",{isValid})

    return isValid
  }

  const handleSend =async () => {
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
  const classes = useStyles();

  const Header = () => {
    let headerText: string = 'Invitación'
    if (type === COMPANIES) {
      headerText = 'INVITE NEW COMPANY'
    }
    if (type === GUEST) {
      
      headerText = 'INVITE NEW GUEST'
    }
    return (<Typography variant="h6" gutterBottom>
      { headerText }
    </Typography>)
  }


  const body = (
    <div className={ classes.paper }>
      <Header />

      <Grid container spacing={ 3 } direction="column">
        { type === COMPANIES && <Grid item xs={ 12 } md={ 6 }>
          <TextField helperText={ errors.company } error={ errors.company !== null } onChange={ onChangeInput } required type="string" name="company" id="company" label="Company" fullWidth value={dataNewUser.company} />
        </Grid> }
        { type === GUEST && <Grid item xs={ 12 } md={ 6 }>
          <TextField helperText={ errors.name } error={ errors.name !== null } onChange={ onChangeInput } required type="string" name="name" id="name" label="Name" value={dataNewUser.name} fullWidth autoComplete="name" />
        </Grid> }

        <Grid item xs={ 12 } md={ 6 }>
          <TextField required helperText={ errors.email } error={ errors.email !== null } onChange={ onChangeInput } type="email" name="email" label="Email" fullWidth  value={dataNewUser.email}/>
        </Grid>

        { type === COMPANIES && <Grid item xs={ 12 } md={ 6 }>
          <TextField name="invitations" helperText={ errors.invitations } onChange={ onChangeInput } error={ errors.invitations !== null } type="number" required label="No. of invitations" value={dataNewUser.invitations} fullWidth />
        </Grid> }

        <Grid item xs={ 12 } md={ 12 }>
          <MuiPickersUtilsProvider utils={ MomentUtils }>
            <DatePicker name="startedAt" helperText={ errors.startedAt } value={ startedAt } onChange={ handleDateStartChange } />
            <DatePicker name="finishedAt" value={ finishedAt } helperText={ errors.finishedAt } onChange={ handleDateEndChange } />
          </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={ 12 } md={ 6 }>
          <TextField required onChange={ onChangeInput } value={dataNewUser.cost} error={ errors.cost !== null } name="cost" helperText={ errors.cost } label="Total cost" fullWidth />
        </Grid>
        <Grid container spacing={ 2 } justify="flex-end" alignContent="flex-end"  >
          <Grid item>
            <Button size="medium" onClick={ handleClose } variant="contained">Cancel</Button>
          </Grid>
          <Grid item>
            <Button onClick={ handleSend } size="medium" color="primary" variant="contained">Send invite</Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );


  return (
    <>

      <Modal
        open={ isOpen }
        onClose={ handleClose }
        style={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        } }
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        { body }
      </Modal>
    </>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 auto 0 auto',
      maxWidth: 1280,
      width: '40%',
      height: '50%',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const initialState = (type: number): NewUserDTO => {

  let typeToInvite: number
  if (type === COMPANIES) {
    
    typeToInvite = 2
  }
  if (type === GUEST) {
    typeToInvite = 3
  }

  return {
    company: "",
    name: "",
    cost: 0,
    email: "",
    finishedAt: "",
    startedAt: "",
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
    invitations: null,
  }
}


export default InviteModal;
