import React, { useContext, useEffect, useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import {Paper,Button,TablePagination,Chip,Tabs,Tab,TableHead,TableRow,TableContainer,Table,TableBody,TableCell, CircularProgress, Box} from '@material-ui/core'
import InviteModal from '../general/InviteModal'
import { COLORS, COMPANIES, GUEST } from '../../types'
import TableCompanies from './TableCompanies'
import TableGuest from '../general/TableGuest'
import UserContext from '../../context/user/user.context'


interface StyledTabProps {
  label: string
}

export interface TableSuperAdminProps {}

const TableSuperAdmin: React.FC<TableSuperAdminProps> = () => {
  const [currentTab, setCurrentTab] = useState<number>(COMPANIES)
  const {getUserChildrens,loading} = useContext(UserContext)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  useEffect(() => {
    getUserChildrens()
  }, [])


  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false)
  const handleCloseInviteModal = () => {
    setIsOpenInviteModal(false)
  }
  const handleOpenInviteModal = () => {
    setIsOpenInviteModal(true)
  }
  const classes = useStyles()
  
  const currentButton = () => {
    if (currentTab === COMPANIES) {
      return (
        <Button
          disabled={loading}
          className={classes.buttonNew}
          onClick={handleOpenInviteModal}
          variant='contained'
          color='secondary'
        >
          New company
        </Button>
      )
    }
    if (currentTab === GUEST) {
      return (
        <Button
        disabled={loading}
        className={classes.buttonNew}
          onClick={handleOpenInviteModal}
          variant='contained'
          color='secondary'
        >
          New guest
        </Button>
      )
    }
  }

  return (
    <Box display="flex" height="100%">
      {isOpenInviteModal && <InviteModal
        type={currentTab}
        isOpen={isOpenInviteModal}
        handleClose={handleCloseInviteModal}
        handleOpen={handleOpenInviteModal}
      />}
      <Paper className={classes.demo1}>
        <AntTabs
          value={currentTab}
          onChange={handleChange}
          aria-label='ant example'
        >
          <AntTab label='Companies' />
          <AntTab label='Guest' />
          <Box width='100%' display="flex" alignItems="center" justifyContent='flex-end'>
          {currentButton()}
          </Box>
        </AntTabs>
        <TableContainer component={Paper} style={{
          height:'92.4%'
        }}>
          {currentTab === COMPANIES && (
            <TableCompanies/>
          )}
          {currentTab === GUEST && (
            <TableGuest/>
          )} 
        </TableContainer> 
      </Paper>
    </Box>
  )
}

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      width: 200,
      minHeight: '4rem',
      fontSize: '1.125rem',
      color: '#A6ABAF',
      marginRight: theme.spacing(4),
      '&:hover': {
        color: '#242526',
        opacity: 1
      },
      '&$selected': {
        color: '#242526'
      },
      '&:focus': {
        color: '#242526'
      }
    },
    selected: { }
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)


const useStyles = makeStyles((theme: Theme) => ({
  demo1: {
    maxWidth: '100%',
    minWidth: '100%',
  },
  buttonNew:{
    height: '55%', marginRight:'1rem',
    minWidth: '10rem',
    textTransform: 'capitalize',
    color:'white'
  }
}))

const AntTabs = withStyles({
  indicator: {
    backgroundColor: COLORS.blue_secondary,
    paddingBottom:'4px'
  }
})(Tabs)




export default TableSuperAdmin
