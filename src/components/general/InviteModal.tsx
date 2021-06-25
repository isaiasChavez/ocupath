import React, { MouseEventHandler, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MomentUtils from '@date-io/moment';
import Button from '@material-ui/core/Button';
import { COMPANIES, GUEST, INVITATIONS } from '../../types';

import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';



function getModalStyle() {

  return {
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 auto 0 auto',
      maxWidth: 1280,
      width:'40%',
      height:'50%',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export interface InviteModalProps {
 handleOpen:MouseEventHandler,
 handleClose:MouseEventHandler,
 isOpen:boolean,
 type:number
}
 
const InviteModal: React.FC<InviteModalProps> = ({handleOpen,handleClose,isOpen,type}) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [startDate, setStartDate] = useState(new Date());
  const [finishDate, setFinishDate] = useState(new Date());

  const  handleDateChange = (e)=>{
    console.log({e},e.format())
    
  }

  const Header = ()=>{
    let headerText:string = 'Invitacioń'  
    if (type === COMPANIES) {
      headerText = 'INVITE NEW COMPANY'
    }
    if (type === GUEST ) {
  headerText = 'INVITE NEW GUEST'
    }
      return (<Typography variant="h6" gutterBottom>
        {headerText}
      </Typography>)
  }
  
  const body = (
    <div  className={classes.paper}>
      <Header/>
      
      <Grid container spacing={3}    direction="column">
       {type === COMPANIES && <Grid item xs={12} md={6}>
          <TextField  required id="company"  label="Company" fullWidth autoComplete="cc-name" />
        </Grid>}
     {type === GUEST && <Grid item xs={12} md={6}>
          <TextField  required id="name"  label="Name" fullWidth autoComplete="name" />
        </Grid>}
        <Grid item xs={12} md={6}>
          <TextField    required  label="Email" fullWidth  />
        </Grid>
           {type === COMPANIES && <Grid item xs={12} md={6}>
          <TextField    required  label="No. of invitations" fullWidth  />
        </Grid>}
        <Grid item xs={12} md={12}>
          <MuiPickersUtilsProvider  utils={MomentUtils}>
      <DatePicker  value={startDate} onChange={handleDateChange} />
      <DatePicker value={finishDate} onChange={handleDateChange} />
    </MuiPickersUtilsProvider>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField    required  label="Total cost" fullWidth  />
        </Grid>
        <Grid container spacing={2} justify="flex-end" alignContent="flex-end"  >
         <Grid item>
              <Button size="medium" onClick={handleClose}variant="contained">Cancel</Button>
         </Grid>
          <Grid item>
              <Button size="medium"  color="primary" variant="contained">Send invite</Button>
         </Grid>
        </Grid>

   
      </Grid>
    </div>
  );

 
  return (
    <>
    
      <Modal
        open={isOpen}
        onClose={handleClose}
        style={{
         display: 'flex',
         justifyContent:'center',
         alignItems:'center'
        }}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
 
export default InviteModal;
