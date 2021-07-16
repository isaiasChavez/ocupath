import React, { useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import {Paper,Button,TablePagination,Chip,Tabs,Tab,TableHead,TableRow,TableContainer,Table,TableBody,TableCell} from '@material-ui/core'
import InviteModal from '../general/InviteModal'
import { COMPANIES, GUEST } from '../../types'
import TableCompanies from './TableCompanies'
import TableGuest from '../general/TableGuest'


interface StyledTabProps {
  label: string
}

export interface TableSuperAdminProps {}

const TableSuperAdmin: React.FC<TableSuperAdminProps> = () => {
  const [currentTab, setCurrentTab] = useState<number>(COMPANIES)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false)
  const handleCloseInviteModal = () => {
    setIsOpenInviteModal(false)
  }
  const handleOpenInviteModal = () => {
    setIsOpenInviteModal(true)
  }

  const currentButton = () => {
    if (currentTab === COMPANIES) {
      return (
        <Button
          style={{ height: '80%', margin: 'auto' }}
          onClick={handleOpenInviteModal}
          variant='contained'
          color='primary'
        >
          New company
        </Button>
      )
    }
    if (currentTab === GUEST) {
      return (
        <Button
          style={{ height: '80%', margin: 'auto' }}
          onClick={handleOpenInviteModal}
          variant='contained'
          color='primary'
        >
          New guest
        </Button>
      )
    }
  }

    const classes = useStyles()
  return (
    <div className={classes.root}>
      {isOpenInviteModal && <InviteModal
        type={currentTab}
        isOpen={isOpenInviteModal}
        handleClose={handleCloseInviteModal}
        handleOpen={handleOpenInviteModal}
      />}
     

      <div className={classes.demo1}>
        <AntTabs
          value={currentTab}
          onChange={handleChange}
          aria-label='ant example'
        >
          <AntTab label='Companies' />
          <AntTab label='Guest' />
          {currentButton()}
        </AntTabs>
        <TableContainer component={Paper}>
          {currentTab === COMPANIES && (
            <TableCompanies/>
          )}
          {currentTab === GUEST && (
            <TableGuest/>
          )} 
        </TableContainer>
      </div>
    </div>
  )
}

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"'
      ].join(','),
      '&:hover': {
        color: '#40a9ff',
        opacity: 1
      },
      '&$selected': {
        color: '#1890ff',
        fontWeight: theme.typography.fontWeightMedium
      },
      '&:focus': {
        color: '#40a9ff'
      }
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
    padding: '2rem'
  },
  padding: {
    padding: theme.spacing(3)
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    height: '100%',
    minHeight: '70vh',
    maxHeight: '70vh'
  },
  demo2: {
    backgroundColor: '#2e1534'
  },
}))

const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    display: 'flex'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs)




export default TableSuperAdmin
