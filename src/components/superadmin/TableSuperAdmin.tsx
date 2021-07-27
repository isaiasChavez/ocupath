import React, { useContext, useEffect, useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import {Paper,Button,TablePagination,Chip,Tabs,Tab,TableHead,TableRow,TableContainer,Table,TableBody,TableCell} from '@material-ui/core'
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
  const {getUserChildrens} = useContext(UserContext)
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
      display: 'flex',
    height: '100%',
    },
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple {...props} />)


const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    maxWidth: '100%',
    minWidth: '100%',
    height: '100%',
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
