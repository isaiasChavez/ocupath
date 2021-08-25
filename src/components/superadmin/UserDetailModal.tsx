import React,{ useContext,useEffect,useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment'
import { MIN_INVITATIONS,MAX_INVITATIONS } from '../../config'
import Skeleton from 'react-loading-skeleton';

import { COLORS,USERS_TYPES } from '../../types/'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import { makeStyles,Theme,createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import UserContext,{ AddNewSuscriptionSuscriptionDTO } from '../../context/user/user.context'
import { Avatar,Box,Button,CircularProgress } from '@material-ui/core'
import moment from 'moment'

export interface UserDetailModalProps {
  handleClose: Function,
  isOpen: boolean,
  type: USERS_TYPES
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  handleClose,
  isOpen,
  type
}) => {
  const { loading,selectedUser } = useContext(UserContext)

  const [hasNewPeriod,setHasNewPeriod] = useState(false)


  const onClickNewPeriod = () => {
    setHasNewPeriod(!hasNewPeriod)
  }

  return (
    <>
      <Modal
        open={ isOpen }
        onClose={ (e) => {
          handleClose(e)
          setHasNewPeriod(false)
        }
        }
        style={ {
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        } }
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        <Box className="animate-fadein" width="50%" borderRadius={ 8 } minWidth="48rem" maxWidth="70rem"   >

          <Paper
            style={ {
              maxHeight: "100vh",
              minHeight: "30rem",
              overflowY: 'auto',
              borderRadius: '10px',
            } }
          >
            <Box width="100%" height="100%" p={ 3 }>
              { loading ? <Box width="100%" height="100%" display="flex" justifyContent="center" alignItems="center">
                <CircularProgress color="secondary" />
              </Box> :
                  <>

                <DataAdmin hasNewPeriod={ hasNewPeriod } onClickNewPeriod={ onClickNewPeriod }>
                  <DataNewPeriod onClickNewPeriod={ onClickNewPeriod } typeToUpdate={ type } setHasNewPeriod={ setHasNewPeriod } handleClose={ handleClose } />
                </DataAdmin>
            <Box width="100%" display="flex" p={ 3 } justifyContent="flex-end" alignItems="center">
                  <Box   width="50%" display="flex" >
                    <Box width="50%">

                    <Box className="ITCAvantGardeStdBkSemiBold" fontWeight="fontWeightBold" pt={ 2 } pb={ 2 }>
                      Grand total:
                    </Box>
                    </Box>
                  <Box width="50%" display="flex" justifyContent="flex-end">
                    <Box className="ITCAvantGardeStdBkSemiBold" fontWeight="fontWeightBold" pt={ 2 } pb={ 2 }>
                      $ {selectedUser.totalCost}
                    </Box>
                  </Box>
                  </Box>
            </Box>
                  </>
              }
            </Box>
            
          </Paper>
        </Box>
      </Modal>
    </>
  )
}


export interface DataAdminProps {
  hasNewPeriod: boolean,
  onClickNewPeriod: Function
}

const DataAdmin: React.FC<DataAdminProps> = ({ hasNewPeriod,children,onClickNewPeriod }) => {
  const { selectedUser } = useContext(UserContext)
  useEffect(() => {
    console.log({ selectedUser })
  },[selectedUser])
  const classes = useStyles()

  return (
    <>
      <Box width="100%" position="relative">
        <Box fontSize={ 24 } mb={ 2 } className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold">
          Company detail
        </Box>
        <Box display="flex" width="100%">

          <Box width="50%"  style={ { borderRightColor: COLORS.gray_primary } } borderRight={ 2 } pb={ 4 }  pr={ 2 }>
            <Box display="flex" flexDirection="column" alignItems="center" width="100%">

              <Box alignSelf="flex-start" mb={ 2 } className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold">Avatar</Box>
              <Avatar
                src={ selectedUser.thumbnail }
                alt='Remy Sharp'
                className={ classes.avatar }>

              </Avatar>

            </Box>
            <Box pb={ 2 } className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" >
              Personal Information
            </Box>
            <Grid container spacing={ 2 } justify="center" alignItems="center">
              <Grid item xs={ 6 } md={ 6 } lg={ 6 } >

                <TextField
                  variant="outlined"
                  size="small"
                  disabled
                  defaultValue={ selectedUser.name }
                  id='firstName'
                  name='firstName'
                  label='First name'
                  fullWidth
                  autoComplete='given-name'
                />
              </Grid>
              <Grid item xs={ 6 } md={ 6 } lg={ 6 }>

                <TextField
                  variant="outlined"
                  size="small"
                  defaultValue={ selectedUser.lastname }
                  disabled
                  id='lastName'
                  name='lastName'
                  label='Last name'
                  fullWidth
                  autoComplete='family-name'
                />
              </Grid>
            </Grid>
            <Box width="100%" py={ 2 } >
              <TextField
                variant="outlined"
                size="small"
                fullWidth
                defaultValue={ selectedUser.name }
                disabled
                required id='company' name='company' label='Company' />
            </Box>
            <Box width="100%" pb={ 2 } >
              <TextField
                fullWidth
                disabled
                variant="outlined"
                size="small"
                defaultValue={ selectedUser.email }
                id='email' name='email' label='Email' />
            </Box>

          </Box>
          <Box width="50%" pl={ 2 }>
            <Box>
              <Box pb={ 2 } className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" >
                Plan
              </Box>
              <Box width="100%" pb={ 2 } >
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  defaultValue={ selectedUser.lastSuscription.invitations }
                  required
                  disabled
                  id='invitations'
                  name='invitations'
                  label='No. of invitations:'
                />
              </Box>

            </Box>
            <Box className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" pb={ 2 }>
              Period
            </Box>
            <Grid container spacing={ 2 } justify="center" alignItems="center">
              <MuiPickersUtilsProvider utils={ MomentUtils }>


                <Grid item xs={ 6 } md={ 6 } lg={ 6 } >
                  <KeyboardDatePicker
                    size="small"
                    fullWidth={ true }
                    autoOk
                    contentEditable={ false }
                    disabled
                    variant='inline'
                    inputVariant='outlined'
                    label='Start'
                    format='DD/MM/YYYY'
                    value={ selectedUser.lastSuscription.startedAt }
                    InputAdornmentProps={ { position: 'start' } }
                    onChange={ () => { } }
                  />

                </Grid>
                <Grid item xs={ 6 } md={ 6 } lg={ 6 }>
                  <KeyboardDatePicker
                    disabled
                    fullWidth={ true }
                    autoOk
                    variant='inline'
                    size="small"
                    inputVariant='outlined'
                    label='Finish'
                    format='DD/MM/YYYY'
                    value={ selectedUser.lastSuscription.finishedAt }
                    InputAdornmentProps={ { position: 'start' } }
                    onChange={ () => { } }
                  />
                </Grid>
              </MuiPickersUtilsProvider>
            </Grid>
            <Box className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" pt={ 2 } pb={ 2 }>
              Total cost
            </Box>
            <Box display="flex" mb={ 2 }>
              <Box width="50%">
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  disabled
                  defaultValue={ selectedUser.lastSuscription.cost }
                  id='totalCost'
                  name='totalCost'
                  label='Total Cost'
                />
              </Box>

              { !hasNewPeriod && !selectedUser.suscriptionWaiting && <Box width="50%" display="flex" justifyContent="center" alignItems="center">
                <Box className={ classes.total }>
                  <Button className="animate-fadein" onClick={ () => onClickNewPeriod() } color="secondary">Add Period + </Button>
                </Box>
              </Box> }
            </Box>
            { hasNewPeriod && children }
            { selectedUser.suscriptionWaiting && <Grid container spacing={ 2 }>
              <Grid item xs={ 12 } sm={ 12 }>
                <Box mb={ 2 }>

                  <Typography variant='h6' gutterBottom className={ classes.title }>
                    Siguiente periodo
                  </Typography>
                </Box>
                <Grid container spacing={ 3 }>

                  <Grid item xs={ 6 } direction='row'>
                    <MuiPickersUtilsProvider utils={ MomentUtils }>
                      < KeyboardDatePicker

                        size="small"
                        fullWidth
                        autoOk
                        contentEditable={ false }
                        disabled
                        variant='inline'
                        inputVariant='outlined'
                        label='Start'
                        format='DD/MM/YYYY'
                        value={ selectedUser.suscriptionWaiting.startedAt }
                        InputAdornmentProps={ { position: 'start' } }
                        onChange={ () => { } }
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={ 6 }  >
                    <MuiPickersUtilsProvider utils={ MomentUtils }>
                      < KeyboardDatePicker
                        size="small"
                        fullWidth
                        autoOk
                        contentEditable={ false }
                        disabled
                        variant='inline'
                        inputVariant='outlined'
                        label='Finish'
                        format='DD/MM/YYYY'
                        value={ selectedUser.suscriptionWaiting.finishedAt }
                        InputAdornmentProps={ { position: 'start' } }
                        onChange={ () => { } }
                      />
                    </MuiPickersUtilsProvider>
                  </Grid>
                  <Grid item xs={ 6 }>
                    <TextField
                      fullWidth
                      size="small"
                      variant='outlined'
                      disabled
                      defaultValue={ selectedUser.suscriptionWaiting.cost }
                      id='totalCost'
                      name='totalCost'
                      label='Total Cost'
                    />
                  </Grid>
                  <Grid item xs={ 12 }>

                  </Grid>
                </Grid>
              </Grid>
            </Grid> }
          </Box>
        </Box>
      </Box>




    </>

  );
}





const DataNewPeriod = ({ typeToUpdate,setHasNewPeriod,handleClose,onClickNewPeriod }) => {
  const { selectedUser,addNewPeriod } = useContext(UserContext)
  const [dataNewUser,setDataNewUser] = useState({
    invitations: 0,
    finishedAt: "",
    startedAt: "",
    cost: 0,
  })

  const onChangeInput = (e) => {
    setErrors(initialErrors())
    setDataNewUser({
      ...dataNewUser,
      [e.target.name]: e.target.value
    })
  }


  const [errors,setErrors] = useState(initialErrors())
  const [startedAt,setStartDate] = useState(new Date());
  const [finishedAt,setFinishDate] = useState(new Date());

  const handleDateStartChange = (e) => {
    setErrors(initialErrors())
    if (moment(e.format()).isAfter(finishedAt)) {
      setErrors({ ...errors,startedAt: `La fecha debe ser anterior a la final.` });
    } else {
      setStartDate(e.format())
    }
  }
  const handleDateEndChange = (e) => {
    setErrors(initialErrors())
    console.log({ e },e.format())
    if (moment(e.format()).isBefore(startedAt)) {
      setErrors({ ...errors,finishedAt: `La fecha debe ser después al inicio.` });
    } else {
      setFinishDate(e.format())
    }
  }


  const validateCompany = (): boolean => {
    let isValid = true
    console.log("Validando compañyu")
    const newErrors = {
      ...errors
    }
    if (dataNewUser.invitations <= MIN_INVITATIONS) {
      newErrors.invitations = `Ingrese un mínimo de ${MIN_INVITATIONS} ${MIN_INVITATIONS === 1 ? 'invitación.' : 'invitaciones.'}`
      isValid = false
    }
    if (dataNewUser.invitations > MAX_INVITATIONS) {
      newErrors.invitations = `Solo puedes escoger hasta ${MAX_INVITATIONS} invitaciones.`
      isValid = false
    }
    if (!isValid) {
      setErrors(newErrors)
    }
    return isValid
  }
  const isCommondFieldsValid = (): boolean => {
    let isValid = true
    let newErrors = { ...errors }

    if (!moment(startedAt).isValid() || moment(startedAt).isAfter(finishedAt)) {
      newErrors.startedAt = `Debes seleccionar una fecha`
      isValid = false
    }
    if (moment(startedAt).isBetween(selectedUser.lastSuscription.startedAt,selectedUser.lastSuscription.finishedAt)) {
      newErrors.startedAt = `Las fechas no se pueden sobrelapar`
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
  const handleSend = async () => {

    setErrors(initialErrors())

    if (typeToUpdate === USERS_TYPES.ADMIN && !validateCompany() || !isCommondFieldsValid()) {
      console.log(errors)
      alert('Invalid!')
      return
    }
    if (typeToUpdate === USERS_TYPES.GUEST && !isCommondFieldsValid()) {
      alert('Invalid!')
      console.log(errors)
      return
    }

    const newPeriodDTO: AddNewSuscriptionSuscriptionDTO = {
      ...dataNewUser,
      startedAt,
      finishedAt,
      typeToUpdate,
      adminUuidToUpdate: typeToUpdate === USERS_TYPES.ADMIN ? selectedUser.uuid : null,
      guestUuidToUpdate: typeToUpdate === USERS_TYPES.GUEST ? selectedUser.uuid : null,
    }

    await addNewPeriod(newPeriodDTO)
    setHasNewPeriod(false)
    handleClose()
  }
  return (
    <>
      <Box className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" pb={ 2 }>
        Plan
      </Box>
      { typeToUpdate === USERS_TYPES.ADMIN && <Box >
        <TextField
          fullWidth
          variant="outlined"
          size="small"
          defaultValue={ selectedUser.lastSuscription.invitations }
          onChange={ onChangeInput }
          helperText={ errors.invitations }
          error={ errors.invitations !== null }
          required
          id='invitations'
          name='invitations'
          type="number"
          label='Number of invitations:'
          value={ dataNewUser.invitations === 0 ? null : dataNewUser.invitations }
        />
      </Box> }
      <Box className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" py={ 2 }>
        Period
      </Box>
      <Grid container spacing={ 2 } className="animate-fadein">
        <Grid item xs={ 12 } sm={ 12 }>
          <Grid container spacing={ 3 }>
            <Grid item sm={ 6 } direction='row' >
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <KeyboardDatePicker
                  disablePast
                  minDate={ new Date(selectedUser.lastSuscription.finishedAt) }
                  maxDate={ new Date('2025-01-01') }
                  disableToolbar
                  fullWidth
                  autoOk
                  variant='inline'
                  size="small"
                  inputVariant='outlined'
                  label='Start'
                  format='DD/MM/YYYY'
                  name="startedAt"
                  value={ startedAt }
                  InputAdornmentProps={ { position: 'start' } }
                  onChange={ handleDateStartChange }
                  helperText={ errors.startedAt }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item sm={ 6 }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <KeyboardDatePicker
                  disablePast
                  minDate={ new Date(selectedUser.lastSuscription.finishedAt) }

                  maxDate={ new Date('2025-01-01') }
                  disableToolbar
                  contentEditable={ false }
                  helperText={ errors.finishedAt }
                  name="finishedAt"
                  fullWidth={ true }
                  autoOk
                  variant='inline'
                  size="small"
                  inputVariant='outlined'
                  label='Finish'
                  value={ finishedAt }
                  format='DD/MM/YYYY'
                  InputAdornmentProps={ { position: 'start' } }
                  onChange={ handleDateEndChange }
                />
              </MuiPickersUtilsProvider>
            </Grid>
          </Grid>
          <Box className="ITCAvantGardeStdBkBold" fontWeight="fontWeightBold" pt={ 2 } pb={ 2 }>
            Total cost
          </Box>
          <Box width="48%">
            <TextField
              fullWidth
              variant='outlined'
              size="small"
              onChange={ onChangeInput }
              name='cost'
              error={ errors.cost !== null }
              helperText={ errors.cost }
              value={ dataNewUser.cost === 0 ? null : dataNewUser.cost }
              label='Total Cost'
            />
          </Box>

        </Grid>
      </Grid>
      <Box width="100%" mt={ 2 } display="flex" justifyContent="space-around">

        <Button color="primary" style={ { color: 'white',textTransform: 'capitalize',width: '48%' } } fullWidth variant="contained" onClick={ onClickNewPeriod } >Cancel</Button>
        <Button color="secondary" style={ { color: 'white',textTransform: 'capitalize',width: '48%' } } fullWidth variant="contained" onClick={ handleSend } >Save</Button>

      </Box>
    </>

  );
}

const initialErrors = () => {
  return {
    cost: null,
    invitations: null,
    finishedAt: null,
    startedAt: null,
  }
}



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(1,0)
    },
    total: {
      fontWeight: 700
    },
    title: {
      marginTop: theme.spacing(2)
    },
    paper: {
      padding: theme.spacing(2,4,3)
    },
    avatar: {
      marginBottom: '1.8rem',
      width: theme.spacing(12),
      height: theme.spacing(12),
    },
  })
)
export default UserDetailModal
