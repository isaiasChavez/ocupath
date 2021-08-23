import React,{ MouseEventHandler,useContext,useEffect,useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment'
import {MIN_INVITATIONS,MAX_INVITATIONS} from '../../config'
import {USERS_TYPES} from '../../types/'
import {
  DatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import { makeStyles,Theme,createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import UserContext, { AddNewSuscriptionSuscriptionDTO } from '../../context/user/user.context'
import { Box,Button, CircularProgress } from '@material-ui/core'
import moment from 'moment'

export interface UserDetailModalProps {
  handleClose:Function,
  isOpen: boolean,
  type:USERS_TYPES
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  handleClose,
  isOpen,
  type
}) => {
  const { selectedUser,loading } = useContext(UserContext)

  const classes = useStyles()
  const [hasNewPeriod, setHasNewPeriod] = useState(false)


  const onClickNewPeriod = ()=>{
    setHasNewPeriod(!hasNewPeriod)
      }

  const body = (
    <>
      <main className={ classes.layout }>
        <Paper className={ classes.paper }>
          {type === USERS_TYPES.GUEST && <DataGuest  />} 
           {type === USERS_TYPES.ADMIN&& <DataAdmin  />} 
           {hasNewPeriod&& <DataNewPeriod typeToUpdate={type} setHasNewPeriod={setHasNewPeriod} handleClose={handleClose} />} 
          {!selectedUser.suscriptionWaiting && <Box display="flex" justifyContent="flex-end" alignItems="center"  >
            <Button variant="contained" onClick={onClickNewPeriod} color="primary">Add Period</Button>
          </Box>}
        </Paper>
      </main>
    </>
  )

  return (
    <>
      <Modal
        open={ isOpen }
        onClose={ (e)=>{
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
        {loading? <CircularProgress color="secondary" /> :body }
      </Modal>
    </>
  )
}


export interface DataAdminProps {
}

const DataAdmin: React.FC<DataAdminProps> = () => {
  const { selectedUser } = useContext(UserContext)
  useEffect(() => {
      console.log({selectedUser})
  }, [selectedUser])
  const classes = useStyles()

  return (
    <>
      <Typography variant='h6' gutterBottom>
        USER DETAIL ADMIN
      </Typography>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField
            disabled
            defaultValue={ selectedUser.name }
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField
            defaultValue={ selectedUser.lastname }
            disabled
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            defaultValue={ selectedUser.name }
            disabled
            required id='company' name='company' label='Company' />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
            disabled
            defaultValue={ selectedUser.email }
            id='email' name='email' label='Email' />
        </Grid>
      </Grid>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 12 }>
          <Typography variant='h6' gutterBottom className={ classes.title }>
            Plan Information
          </Typography>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 }>
              <TextField
                defaultValue={ selectedUser.lastSuscription.invitations }
                required
                disabled
                id='invitations'
                name='invitations'
                label='No. of invitations:'
              />
            </Grid>
            <Grid item xs={ 12 } sm={ 3 } direction='row'>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.lastSuscription.startedAt }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 12 } sm={ 3 }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.lastSuscription.finishedAt }
                  contentEditable={ false }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 8 }>
              <TextField
                disabled
                defaultValue={ selectedUser.lastSuscription.cost }
                id='totalCost'
                name='totalCost'
                label='Total Cost'
              />
            </Grid>
            <Grid item xs={ 12 }>
            
          </Grid>
          </Grid>
        </Grid>
      </Grid>
     { selectedUser.suscriptionWaiting&& <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 12 }>
          <Typography variant='h6' gutterBottom className={ classes.title }>
            Siguiente periodo
          </Typography>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 }>
              <TextField
                defaultValue={ selectedUser.suscriptionWaiting.invitations }
                required
                disabled
                id='invitations'
                name='invitations'
                label='No. of invitations:'
              />
            </Grid>
            <Grid item xs={ 12 } sm={ 3 } direction='row'>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.suscriptionWaiting.startedAt }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 12 } sm={ 3 }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.suscriptionWaiting.finishedAt }
                  contentEditable={ false }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 8 }>
              <TextField
                disabled
                defaultValue={ selectedUser.suscriptionWaiting.cost }
                id='totalCost'
                name='totalCost'
                label='Total Cost'
              />
            </Grid>
            <Grid item xs={ 12 }>
            <List disablePadding>
              <ListItem className={ classes.listItem }>
                <ListItemText primary='Grand Total' />
                <Typography variant='subtitle1' className={ classes.total }>
                  ${selectedUser.totalCost}
                </Typography>
              </ListItem>
            </List>
          </Grid>
          </Grid>
        </Grid>
      </Grid>}
    </>

  );
}


const DataGuest: React.FC<DataAdminProps> = () => {
  const { selectedUser } = useContext(UserContext)
  const classes = useStyles()
  return (
    <>
      <Typography variant='h6' gutterBottom>
        USER DETAIL GUEST
      </Typography>
      <Grid container spacing={ 3 }>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField
            disabled
            defaultValue={ selectedUser.name }
            id='firstName'
            name='firstName'
            label='First name'
            fullWidth
            autoComplete='given-name'
          />
        </Grid>
        <Grid item xs={ 12 } sm={ 6 }>
          <TextField
            defaultValue={ selectedUser.lastname }
            disabled
            id='lastName'
            name='lastName'
            label='Last name'
            fullWidth
            autoComplete='family-name'
          />
        </Grid>
        <Grid item xs={ 12 }>
          <TextField
          value={selectedUser.email}
            id='email' 
            disabled
            name='email'
             label='Email' />
        </Grid>
      </Grid>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 12 }>
          <Typography variant='h6' gutterBottom className={ classes.title }>
            Plan Information
          </Typography>
          <Grid container spacing={ 3 }>
            <Grid item xs={ 12 } sm={ 3 } direction='row'>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.lastSuscription.startedAt }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 12 } sm={ 3 }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.lastSuscription.finishedAt }
                  contentEditable={ false }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 8 }>
              <TextField
                disabled
                defaultValue={ selectedUser.lastSuscription.cost }
                id='totalCost'
                name='totalCost'
                label='Total Cost'
              />
            </Grid>
          
          </Grid>
        </Grid>
      </Grid>
      { selectedUser.suscriptionWaiting&& <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 12 }>
          <Typography variant='h6' gutterBottom className={ classes.title }>
            Siguiente periodo
          </Typography>
          <Grid container spacing={ 3 }>
           
            <Grid item xs={ 12 } sm={ 3 } direction='row'>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.suscriptionWaiting.startedAt }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 12 } sm={ 3 }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={()=>{}}
                  disabled
                  value={ selectedUser.suscriptionWaiting.finishedAt }
                  contentEditable={ false }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 8 }>
              <TextField
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
      </Grid>}
    </>

  );
}


const DataNewPeriod = ({typeToUpdate,setHasNewPeriod,handleClose}) => {
  const { selectedUser,addNewPeriod,getUserChildrens} = useContext(UserContext)
  const classes = useStyles()
  const [dataNewUser, setDataNewUser] = useState({
    invitations: 0,
    finishedAt: "",
    startedAt: "",
    cost: 0,
  })
useEffect(() => {
  console.log({selectedUser})
  
  
}, [])
  const onChangeInput = (e) => {
    setErrors(initialErrors())
    setDataNewUser({
      ...dataNewUser,
      [e.target.name]: e.target.value
    })
  }


  const [errors, setErrors] = useState(initialErrors())
  const [startedAt, setStartDate] = useState(new Date());
  const [finishedAt, setFinishDate] = useState(new Date());

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
  const handleSend =async () => {

    setErrors(initialErrors())
    if (typeToUpdate ===USERS_TYPES.ADMIN && !validateCompany() || !isCommondFieldsValid()) {
      console.log(errors)
      alert('Invalid!')
      return
    }
    if (typeToUpdate ===USERS_TYPES.GUEST && !isCommondFieldsValid()) {
      alert('Invalid!')
      console.log(errors)
      return
    }
      
      const newPeriodDTO:AddNewSuscriptionSuscriptionDTO = {
        ...dataNewUser,
        startedAt,
        finishedAt,
        typeToUpdate,
        adminUuidToUpdate:typeToUpdate ===USERS_TYPES.ADMIN?selectedUser.uuid:null,
        guestUuidToUpdate:typeToUpdate ===USERS_TYPES.GUEST?selectedUser.uuid:null,
      }   
      console.log({newPeriodDTO})

      await addNewPeriod(newPeriodDTO)
      setHasNewPeriod(false)
      handleClose()
  }
  return (
    <>
      <Grid container spacing={ 2 }>
        <Grid item xs={ 12 } sm={ 12 }>
          <Grid container spacing={ 3 }>
            { typeToUpdate ===USERS_TYPES.ADMIN && <Grid item xs={ 12 }>
              <TextField
                defaultValue={ selectedUser.lastSuscription.invitations }
                onChange={ onChangeInput } 
                helperText={ errors.invitations}
                error={errors.invitations!==null}
                required
                id='invitations'
                name='invitations'
                label='No. of invitations:'
                value={dataNewUser.invitations}
              />
            </Grid>}
            <Grid item xs={ 12 } sm={ 3 } direction='row'>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={ handleDateStartChange }

                  name="startedAt"
                  value={ startedAt }
                  helperText={ errors.startedAt }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 12 } sm={ 3 }>
              <MuiPickersUtilsProvider utils={ MomentUtils }>
                <DatePicker
                onChange={ handleDateEndChange }
                  name="finishedAt"
                  value={ finishedAt }
                  helperText={ errors.finishedAt }
                  contentEditable={ false }
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={ 8 }>
              <TextField
                defaultValue={ selectedUser.lastSuscription.cost }
                onChange={ onChangeInput } 
                name='cost'
                error={ errors.cost !== null }
                helperText={ errors.cost }
                value={dataNewUser.cost}
                label='Total Cost'
              />
            </Grid>
            <Grid item xs={ 10 }>

<Button variant="contained"  onClick={handleSend} color="primary">Add</Button>

</Grid>
          </Grid>
        </Grid>
      </Grid>
    </>

  );
}

const initialErrors= ()=>{
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
      margin: '0 auto 0 auto',
      height: '50%',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2,4,3)
    },
    layout: {
      width: 'auto',
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
        width: '50%',
        marginLeft: 'auto',
        marginRight: 'auto'
      }
    }
  })
)
export default UserDetailModal
