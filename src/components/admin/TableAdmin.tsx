import React, { useContext, useEffect, useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Chip from '@material-ui/core/Chip'
import TablePagination from '@material-ui/core/TablePagination'
import Button from '@material-ui/core/Button'
import InviteModal from '../general/InviteModal'
import UserDetailModal from '../superadmin/UserDetailModal'
import AskModal from '../general/AskModal'
import { COMPANIES, GUEST,USERS } from '../../types'
import UserContext from '../../context/user/user.context'
import moment from 'moment'
import { User } from '../../context/user/user.reducer'
export interface TableAdminProps {}

const TableAdmin: React.FC<TableAdminProps> = () => {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState<number>(COMPANIES)
  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
  const {childrens,getUserChildrens,suspendUser,getUserChildDetail,deleteUser,selectUser,selectedUser} = useContext(UserContext)
  useEffect(() => {
    getUserChildrens()
  }, [])
  const rows = childrens.users
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = React.useState(0)
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  const [isOpenInviteModal, setIsOpenInviteModal] = useState<boolean>(false)
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(
    false
  )
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState<boolean>(
    false
  )
  const [isOpenSuspendUserModal, setIsOpenSuspendUserModal] = useState<boolean>(
    false
  )
  const handleCloseInviteModal = () => {
    setIsOpenInviteModal(false)
  }

  const handleOpenInviteModal = () => {
    setIsOpenInviteModal(true)
  }

  const handleCloseUserDetailModal = () => {
    setIsOpenUserDetailModal(false)
  }

  const handleOpenUserDetailModal = (dataUser:User) => {
    setIsOpenUserDetailModal(true)
  }
  const handleToggleDetailModal = () => {
    setIsOpenUserDetailModal(!isOpenUserDetailModal)
  }

  const toggleDeleteUserModal = () => {
    setIsOpenDeleteUserModal(!isOpenDeleteUserModal)
  }
  const toggleSuspendUserModal = () => {
    setIsOpenSuspendUserModal(!isOpenSuspendUserModal)
  }

  const onSuspend = (dataUser:User)=>{
    setIsOpenSuspendUserModal(true)
    selectUser(dataUser,USERS.GUEST)
  }
  const onDelete = (dataUser:User)=>{
    toggleDeleteUserModal()
    selectUser(dataUser,USERS.GUEST)
  }
  const onEdit = (dataUser:User)=>{
    handleToggleDetailModal()
    selectUser(dataUser,USERS.GUEST)
    getUserChildDetail()
  }
  
  
  return (
    <div className={classes.root}>
     {isOpenInviteModal&& <InviteModal
        type={1}
        isOpen={isOpenInviteModal}
        handleClose={handleCloseInviteModal}
        handleOpen={handleOpenInviteModal}
      />}
      <UserDetailModal
        isOpen={isOpenUserDetailModal}
        handleClose={handleCloseUserDetailModal}
      />
      <AskModal
        isOpen={isOpenDeleteUserModal}
        handleClose={toggleDeleteUserModal}
        handleOk={()=>{
          deleteUser()
          toggleDeleteUserModal()
        }}
        okText='Sure'
        cancelText='Cancel'
        title='Delete User'
        subtitle={`Are you sure you want to delete ${selectedUser?'to '+selectedUser.name+'?':'this user?'}`}
      />
      {/* Modal suspender */}
      <AskModal
        isOpen={isOpenSuspendUserModal}
        handleClose={toggleSuspendUserModal}
        handleOk={()=> {
          suspendUser()
          toggleSuspendUserModal()
        }}
        okText='Sure'
        cancelText='Cancel'
        title='Suspend User'
        subtitle={`Are you sure you want to ${selectedUser.isActive?'suspend':'activate'}  ${selectedUser?'to '+selectedUser.name+'?':'this user?'}`}
      />

      <div className={classes.demo1}>
        <AntTabs
          value={currentTab}
          onChange={handleChange}
          aria-label='ant example'
        >
          <AntTab label='Companies' />
          <Button
            style={{ height: '80%', margin: 'auto' }}
            onClick={handleOpenInviteModal}
            variant='contained'
            color='primary'
          >
            New guest
          </Button>
        </AntTabs>
        <TableContainer component={Paper}>
          <Table className={classes.table} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Name</StyledTableCell>
                <StyledTableCell align='center'>Email</StyledTableCell>
                <StyledTableCell align='center'>
                  Registration Date
                </StyledTableCell>
                <StyledTableCell align='center'>Edit</StyledTableCell>
                <StyledTableCell align='center'>Suspend</StyledTableCell>
                <StyledTableCell align='center'>Delete</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(user => (
                <StyledTableRow key={user.name}>
                  <StyledTableCell align='center' component='th' scope='user'>
                    {user.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                { user.email }
              </StyledTableCell>
              <StyledTableCell align='center'>
                          { moment(user.lastSuscription.finishedAt).from(moment())}
                    </StyledTableCell>
              <StyledTableCell align='right'>
                      <Chip
                        size='small'
                        label='Edit'
                        clickable
                        onClick={()=>onEdit(user)}
                        color='primary'
                      />
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {' '}
                      <Chip
                        size='small'
                        label={`${user.isActive?'suspend':'activate'}`}
                        clickable
                        onClick={()=> onSuspend(user)}
                        color='primary'
                      />
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {' '}
                      <Chip
                        size='small'
                        label='Delete'
                        onClick={()=> onDelete(user)}
                        clickable
                        color='secondary'
                      />{' '}
                    </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Table>
        </TableContainer>
      </div>
    </div>
  )
}


const AntTabs = withStyles({
  root: {
    borderBottom: '1px solid #e8e8e8',
    display: 'flex'
  },
  indicator: {
    backgroundColor: '#1890ff'
  }
})(Tabs)

const AntTab = withStyles((theme: Theme) =>
  createStyles({
    root: {
      textTransform: 'none',
      minWidth: 72,
      fontWeight: theme.typography.fontWeightRegular,
      marginRight: theme.spacing(4),
      fontFamily: [
        '-apple-system',
        
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

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}



interface StyledTabProps {
  label: string
}

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
  table: {}
}))

const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell)

const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow)

export default TableAdmin
