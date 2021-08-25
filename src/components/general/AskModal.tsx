import React, { MouseEventHandler, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Box } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      margin: '0 auto 0 auto',
      minHeight:'200px',
      minWidth:'392px',
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

export interface AskModalProps {
 handleClose:MouseEventHandler,
 handleOk:MouseEventHandler,
 isOpen:boolean,
 title:string,
 subtitle:string,
 okText:string,
 cancelText:string
}
 
const AskModal: React.FC<AskModalProps> = ({handleClose,handleOk,isOpen,title,subtitle,okText,cancelText}) => {
  const classes = useStyles();

  // getModalStyle is not a pure function, we roll the style only on the first render


  
  const body = (
    <Box display="flex" flexDirection="column" borderRadius={8} justifyContent="space-around" className={classes.paper}>
      <Box className="ITCAvantGardeStdBkBold" fontWeight='fontWeightBold'  fontSize={32} textAlign="center" my={2}>
        {title}
      </Box>
        <Box fontSize={20}  width="80%" mx="auto" mb={4} textAlign="center">
        {subtitle}
        </Box>
        <Box display='flex' justifyContent='space-around'>
          <Box mr={2} width='100%'>
              <Button size="medium"
              style={{textTransform:'capitalize'}}
                            color='secondary'
              variant='outlined'
               fullWidth={true} onClick={handleClose} >{cancelText}</Button>
         </Box>
          <Box ml={2} width='100%'>
              <Button size="medium" 
              style={{textTransform:'capitalize',color:'white'}}
               color='secondary'
              fullWidth={true}  onClick={handleOk} variant="contained">{okText}</Button>
         </Box>
        </Box>
    </Box>
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
        className="animate-fadein"
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </>
  );
}
 
export default AskModal;
