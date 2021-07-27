
import React,{ useContext, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Box,Button,makeStyles } from '@material-ui/core';
import UserDetailModal from '../superadmin/UserDetailModal';
import InviteModal from './InviteModal';
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
  const {profile} = useContext(UserContext)
  const classes = useStyles();
  const [isBlocked,setIsBlocked] = useState(true)
 
  const handleUnlock = () => {
    setIsBlocked(!isBlocked)
  }
  const [dataUser, setDataUser] = useState({
    name:'',
    lastName:'',
    password:'',
  })
  const [errors, setErrors] = useState({
    email: null,
    password: null,
  });
  
  const onChange = (e) => {
    setDataUser({
      ...dataUser,
      [e.target.name]: e.target.value,
    })
  };

  const validateResponse = (res) => {
    const newErrors = {
      email: null,
      password: null,
    }
    if (res.status === 1) {
      newErrors.email = "Email does't exist";
    }
    if (res.status ===2) {
      newErrors.password = "Invalid password";
    }
    setErrors(newErrors);
  };


  const Header = () => {
    let headerText: string = 'Invitación'
    if (type === USERS.ADMIN) {
      headerText = 'Administrador'
    }
    if (type === USERS.SUPER) {
      headerText = 'Super administrador'
    }
    if (type === USERS.GUEST) {
      headerText = 'Invitado'
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
        editar
      </Button> </h3>
      <Grid container spacing={ 3 } direction="column"
      >
        <Grid item xs={ 12 } md={ 12 }>
          <TextField defaultValue={profile.name} required id="cardName" disabled={ isBlocked } label="Name" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={ 12 } md={ 12 }>
          <TextField defaultValue={profile.email} disabled={ isBlocked } required label="Email" fullWidth />
        </Grid>
        <Grid item xs={ 12 } md={ 12 }>
          <TextField
            required
            disabled={ isBlocked }
            fullWidth
            type="password"

            defaultValue="passwoddrd"
          />
        </Grid>
        { !isBlocked && <Grid item xs={ 12 } md={ 12 }>
          <Button variant="contained" color="primary">
            salvar
          </Button>
        </Grid> }

      </Grid>
    </div>
  );
}
export default FormEdit