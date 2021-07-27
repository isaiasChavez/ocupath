import React, { MouseEventHandler, useState } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import MomentUtils from '@date-io/moment'
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'

export interface UserDetailModalProps {
  handleClose: MouseEventHandler
  isOpen: boolean,
}

const UserDetailModal: React.FC<UserDetailModalProps> = ({
  handleClose,
  isOpen,
}) => {
  const classes = useStyles()

  // getModalStyle is not a pure function, we roll the style only on the first render
  const [startDate, setStartDate] = useState(new Date())
  const [finishDate, setFinishDate] = useState(new Date())

  const handleDateChange = e => {
    console.log({ e }, e.format())
  }

  const body = (
    <>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h6' gutterBottom>
            USER DETAIL
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='firstName'
                name='firstName'
                label='First name'
                fullWidth
                autoComplete='given-name'
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id='lastName'
                name='lastName'
                label='Last name'
                fullWidth
                autoComplete='family-name'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField required id='company' name='company' label='Company' />
            </Grid>
            <Grid item xs={12}>
              <TextField id='email' name='email' label='Email' />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Typography variant='h6' gutterBottom className={classes.title}>
                Plan Information
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <TextField
                    required
                    id='invitations'
                    name='invitations'
                    label='No. of invitations:'
                  />
                </Grid>
                <Grid item xs={12} sm={3} direction='row'>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      value={finishDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <MuiPickersUtilsProvider utils={MomentUtils}>
                    <DatePicker
                      value={finishDate}
                      onChange={handleDateChange}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>
                <Grid item xs={8}>
                  <TextField
                    id='totalCost'
                    name='totalCost'
                    label='Total Cost'
                  />
                </Grid>
                <Grid item xs={12}>
                  <List disablePadding>
                    <ListItem className={classes.listItem}>
                      <ListItemText primary='Grand Total' />
                      <Typography variant='subtitle1' className={classes.total}>
                        $34.06
                      </Typography>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </main>
    </>
  )

  return (
    <>
      <Modal
        open={isOpen}
        onClose={handleClose}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>
    </>
  )
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    listItem: {
      padding: theme.spacing(1, 0)
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
      padding: theme.spacing(2, 4, 3)
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
