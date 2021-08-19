import React,{ useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Avatar, Box,Button,makeStyles, withStyles } from '@material-ui/core';
import { USERS } from '../../types/index'
import EditIcon from '@material-ui/icons/Edit';
import UserContext from '../../context/user/user.context';

interface FormEditProps {
  type: number,
  toggleEditAvatar:Function
}
const FormEdit: React.FC<FormEditProps> = ({ type,toggleEditAvatar }) => {
  const {profile,updateName} = useContext(UserContext)
  const classes = useStyles();
  const [isBlocked,setIsBlocked] = useState(true)
  const [error, setError] = useState("")
  const [hasError, setHasError] = useState(false)
  const [name, setName] = useState(profile.name)

  const handleUnlock = () => {
    setIsBlocked(!isBlocked)
    setError("")
    setHasError(false)
  }
  const onChange = (e) => {
    setHasError(false)
    setError("")
    setName(e.target.value)
  };
  useEffect(() => {
      setName(profile.name)
  }, [])


  const validateName = () => {
    let isValid = true
    if (!name|| name.trim().length===0 ||name.trim().length >=100 ) {
      setHasError(true)
      setError("Ingrese un nombre válido")
      isValid= false
    }else if (name.trim().includes(" ") ) {
      setHasError(true)
      setError("No puedes incluir espacios")
      isValid= false
    }
    else if (name.trim().length<5 ) {
      setHasError(true)
      setError("Deben ser al menos 5 caracteres.")
      isValid= false
    }
    return isValid
  };

  const onSubmit=async ()=>{
    if (validateName()) {
      const res = await updateName(name.trim())
      if (res.status ===0) {
        setName(res.name)
      }else{
        setName(profile.name)
      }
      handleUnlock()
    }
  }
  const Header = () => {
    let headerText: string = 'Invitación'
    if (type === USERS.ADMIN) {
      headerText = 'Administrator'
    }
    if (type === USERS.SUPER) {
      headerText = 'Super Administrator'
    }
    if (type === USERS.GUEST) {
      headerText = 'Guest'
    }
    return (<Typography variant="h4" gutterBottom style={ { position: 'relative',left: '-10px',fontSize:'1.5rem' } }>
      <Box fontWeight="fontWeightBold" m={ 1 }>
        { headerText }
      </Box>
    </Typography>)
  }
  return (
    <div className={ classes.root }>
      <Header />
      <Box display="flex" alignItems="center">

      <h3 className={ classes.information }>Information
       </h3>


      </Box>
       <h4 className={ classes.subtitle }>Avatar
       </h4>
      <Avatar src={ profile.thumbnail } alt="Remy Sharp" className={ classes.large } />
      <Button variant="contained" onClick={ ()=>toggleEditAvatar() } className={ classes.buttonEdit } >
        Edit Avatar
      </Button>
      <Box display="flex" alignItems="center">

      <h3 className={ classes.information }>Personal information
      <EditIcon onClick={ handleUnlock } color="primary" style={{
        marginLeft:'0.5rem',
        cursor:'pointer'
      }} />
       </h3>

      </Box>
      <Grid container spacing={ 3 } direction="column"
      >
        <Grid item xs={ 12 } md={ 12 }>
          <TextField error={hasError} helperText={error}   datatype="text" onChange={onChange} placeholder={profile.name}  value={name} required id="cardName" variant="outlined" disabled={ isBlocked } label="Name" fullWidth  />
        </Grid>
        <Grid item xs={ 12 } md={ 12 }>
          <TextField value={profile.email} variant="outlined" disabled={ true } required label="Email" fullWidth />
        </Grid>
        { !isBlocked && <Grid item xs={ 12 } md={ 12 }>
          <ButtonSave  onClick={onSubmit}  variant="contained" color="primary">
            Save
          </ButtonSave>
        </Grid> }

      </Grid>
    </div>
  );
}

const ButtonSave = withStyles({
  root: {
    textTransform: 'none',
    fontSize: '0.9rem',
    minWidth:'5rem',
    width:'5rem'
  },
})(Button);

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    paddingLeft: '2rem',
    flexDirection: 'column'
  },
  information: {
    marginTop: '-0.4rem',
    display: 'flex',
    justifyContent: 'center',
  },
 subtitle:{
  fontsize: '1.25rem',
  textTransform:'capitalize',
 },
  large: {
    marginTop: '-0.2rem',
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginBottom: '0.5rem',
  },
  buttonEdit: {
    fontSize: '0.75rem',
    width: theme.spacing(12),
    textTransform: 'capitalize',
    marginBottom: '2rem',
    marginTop:'0.5rem'
  },
}));
export default FormEdit