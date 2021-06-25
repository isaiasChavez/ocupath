import React, { MouseEventHandler, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';

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

export interface AskModalProps {
 handleOpen:MouseEventHandler,
 handleClose:MouseEventHandler,
 isOpen:boolean,
 title:string,
 subtitle:string,
 okText:string,
 cancelText:string
}
 
const AskModal: React.FC<AskModalProps> = ({handleOpen,handleClose,isOpen,title,subtitle,okText,cancelText}) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render

  
  const body = (
    <div  className={classes.paper}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Grid container spacing={3}    direction="column"
>
        <Grid item xs={12} md={12}>
         <Typography variant="h6" gutterBottom>
        {subtitle}
      </Typography>
        </Grid>
     
     
        <Grid container spacing={2} justify="flex-end" alignContent="flex-end"  >
         <Grid item>
              <Button size="medium" variant="contained">{cancelText}</Button>
         </Grid>
          <Grid item>
              <Button size="medium" color="primary" variant="contained">{okText}</Button>
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
 
export default AskModal;
