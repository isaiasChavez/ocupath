
import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { Box, makeStyles } from '@material-ui/core';
import UserDetailModal from '../superadmin/UserDetailModal';
import InviteModal from './InviteModal';
import { COLORS, USERS } from '../../types/index'


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    borderLeft: '1px solid',
    borderLeftColor: COLORS.GRAY_MEDIUM,
    paddingLeft: '2rem',
    flexDirection: 'column'
  },

}));
interface FormEditProps {
  type: number
}
const FormEdit: React.FC<FormEditProps> = ({ type }) => {

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    setIsOpen(false)
  }

  const handleOpen = () => {
    setIsOpen(true)
  }

  const Header = () => {
    let headerText: string = 'Invitacioń'
    if (type === USERS.ADMIN) {
      headerText = 'Administrador'
    }
    if (type === USERS.SUPER) {
      headerText = 'Super administrador'
    }
    if (type === USERS.GUEST) {
      headerText = 'Invitado'
    }
    return (<Typography variant="h5"   gutterBottom style={{ position:'relative',left:'-10px',textTransform:'uppercase'}}>
      <Box fontWeight="fontWeightBold" m={1}>
      { headerText }
      </Box>
    </Typography>)
  }

  return (
    <div className={ classes.root }>
      {/* <AskModal  isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen} okText="Sure" cancelText="Cancel" title="Save Avatar" subtitle="Are you sure you want to save these changes?"/> */ }
      {/* <UserDetailModal isOpen={isOpen} handleClose={handleClose} handleOpen={handleOpen} /> */ }
      <Header />
      <Grid container spacing={ 3 } direction="column"
      >
        <Grid item xs={ 12 } md={ 12 }>
          <TextField defaultValue="Nombre completo" required id="cardName" disabled label="Name" fullWidth autoComplete="cc-name" />
        </Grid>

        <Grid item xs={ 12 } md={ 12 }>
          <TextField defaultValue="email@example.com" disabled required label="Email" fullWidth />
        </Grid>
        <Grid item xs={ 12 } md={ 12 }>
          <TextField
            required
            disabled
            fullWidth
            type="password"

            defaultValue="passwoddrd"
          />
        </Grid>

      </Grid>
    </div>
  );
}
export default FormEdit