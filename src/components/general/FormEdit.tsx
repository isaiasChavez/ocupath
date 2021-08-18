import React,{ useContext, useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Box,Button,makeStyles } from '@material-ui/core';
import { COLORS,USERS } from '../../types/index'
import UserContext from '../../context/user/user.context';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    borderLeft: '1px solid',
    borderLeftColor: COLORS.GRAY_MEDIUM,
    paddingLeft: '2rem',
    flexDirection: 'column'
  },
  information: {
    marginTop: '-0.4rem',
    marginBottom: '1.3rem'
  }

}));
interface FormEditProps {
  type: number
}
const FormEdit: React.FC<FormEditProps> = ({ type }) => {
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
      headerText = 'ADMINISTRATOR'
    }
    if (type === USERS.SUPER) {
      headerText = 'SUPER ADMINISTRATOR'
    }
    if (type === USERS.GUEST) {
      headerText = 'Guest'
    }
    return (<Typography variant="h5" gutterBottom style={ { position: 'relative',left: '-10px',textTransform: 'uppercase' } }>
      <Box fontWeight="fontWeightBold" m={ 1 }>
        { headerText }
      </Box>
    </Typography>)
  }
  return (
    <div className={ classes.root }>
      <Header />
      <h3 className={ classes.information }>Information <Button onClick={ handleUnlock } variant="contained" color="primary">
        {isBlocked?'Editar':'Cancelar' }
      </Button> </h3>
      <Grid container spacing={ 3 } direction="column"
      >
        <Grid item xs={ 12 } md={ 12 }>
          <TextField error={hasError} helperText={error}   datatype="text" onChange={onChange} placeholder={profile.name}  value={name} required id="cardName" disabled={ isBlocked } label="Name" fullWidth  />
        </Grid>
        <Grid item xs={ 12 } md={ 12 }>
          <TextField value={profile.email} disabled={ true } required label="Email" fullWidth />
        </Grid>
        { !isBlocked && <Grid item xs={ 12 } md={ 12 }>
          <Button  onClick={onSubmit}  variant="contained" color="primary">
            salvar
          </Button>
        </Grid> }

      </Grid>
    </div>
  );
}
export default FormEdit