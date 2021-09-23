import React,{ useContext,useEffect,useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'

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
import { COMPANIES,GUEST,USERS,USERS_TYPES } from '../../types'
import UserContext from '../../context/user/user.context'
import moment from 'moment'
import { User } from '../../context/user/user.reducer'
import { Box,Switch,Tooltip } from '@material-ui/core'
import { Empty, Spin } from 'antd'
export interface TableAdminProps { }

const TableAdmin: React.FC<TableAdminProps> = () => {
  const classes = useStyles()
  const [currentTab,setCurrentTab] = useState<number>(COMPANIES)
  const handleChange = (event: React.ChangeEvent<{}>,newValue: number) => {
    setCurrentTab(newValue)
  }
  const {
    childrens,
    getUserChildrens,
    profile,
    suspendUser,
    loading,
    deleteUser,
    selectUser,
    selectedUser,
    canAddMoreChilds
  } = useContext(UserContext)
  useEffect(() => {
    getUserChildrens()
  },[])
  const rows = childrens.users
  const [rowsPerPage,setRowsPerPage] = useState(5)
  const [page,setPage] = React.useState(0)
  const [isOpenInviteModal,setIsOpenInviteModal] = useState<boolean>(false)
  const [isOpenUserDetailModal,setIsOpenUserDetailModal] = useState<boolean>(
    false
  )
  const [isOpenDeleteUserModal,setIsOpenDeleteUserModal] = useState<boolean>(
    false
  )
  const [isOpenSuspendUserModal,setIsOpenSuspendUserModal] = useState<boolean>(
    false
  )

  const handleChangePage = (event: unknown,newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
  }
  const handleCloseInviteModal = () => {
    setIsOpenInviteModal(false)
  }

  const handleOpenInviteModal = () => {
    setIsOpenInviteModal(true)
  }

  const handleCloseUserDetailModal = () => {
    setIsOpenUserDetailModal(false)
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

  const onSuspend = (dataUser: User) => {
    setIsOpenSuspendUserModal(true)
    selectUser(dataUser,USERS.GUEST)
  }
  const onDelete = (dataUser: User) => {
    toggleDeleteUserModal()
    selectUser(dataUser,USERS.GUEST)
  }

  const availableRows = Math.ceil(rows.length / rowsPerPage)
  const isEmptyVisible = !loading && rows.length === 0
  const isLoaderVisible = loading && rows.length === 0

  return (
    <Box display='flex' height='100%'>
      { isOpenInviteModal && (
        <InviteModal
          type={ 1 }
          isOpen={ isOpenInviteModal }
          handleClose={ handleCloseInviteModal }
          handleOpen={ handleOpenInviteModal }
        />
      ) }
      <UserDetailModal
        isOpen={ isOpenUserDetailModal }
        handleClose={ handleCloseUserDetailModal }
        type={ USERS_TYPES.GUEST }
      />
      <AskModal
        isOpen={ isOpenDeleteUserModal }
        handleClose={ toggleDeleteUserModal }
        handleOk={ () => {
          deleteUser()
          toggleDeleteUserModal()
        } }
        okText='Sure'
        cancelText='Cancel'
        title='Delete User'
        subtitle={ `Are you sure you want to delete ${selectedUser ? 'to ' + selectedUser.name + '?' : 'this user?'
          }` }
      />
      <AskModal
        isOpen={ isOpenSuspendUserModal }
        handleClose={ toggleSuspendUserModal }
        handleOk={ () => {
          suspendUser()
          toggleSuspendUserModal()
        } }
        okText='Sure'
        cancelText='Cancel'
        title='Suspend User'
        subtitle={ `Are you sure you want to ${selectedUser.isActive ? 'suspend' : 'activate'
          }  ${selectedUser ? 'to ' + selectedUser.name + '?' : 'this user?'}` }
      />
      <Paper className={ classes.demo1 }>
        <AntTabs
          value={ currentTab }
          onChange={ handleChange }
          aria-label='ant example'
        >
          <AntTab label='Guests' />
          <Box
            width='100%'
            mx={ 2 }
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
          >
            <Box
              flex={ 1 }
              textAlign='center'
              fontSize='1rem'
              fontFamily='font2'
              style={ { color: 'rgba(122, 134, 143, 1)' } }
            >
              Your plan includes { profile.lastSuscription.invitations }{ ' ' }
              invitations
            </Box>
            <Tooltip title="Delete a user before inviting more" placement="bottom">
              <div>

                <Button
                  disabled={ loading || !canAddMoreChilds }
                  className={ classes.buttonNew }
                  onClick={ handleOpenInviteModal }
                  variant='contained'
                  color='primary'
                >
                  New guest
                </Button>
              </div>
            </Tooltip>
          </Box>
        </AntTabs>
        <TableContainer
          component={ Paper }
          style={ {
            height: '92.4%',
            position: 'relative'
          } }
        >
          { rows.length > 0 ? (
            <Table aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Name</StyledTableCell>
                  <StyledTableCell align='center'>Email</StyledTableCell>
                  <StyledTableCell align='center'>
                    Registration Date
                  </StyledTableCell>
                  <StyledTableCell align='center'>Suspend</StyledTableCell>
                  <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { rows.map((user,i) => (
                  <StyledTableRow key={ user.name + i }>
                    <StyledTableCell align='center' component='th' scope='user'>
                      { user.name }
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      { user.email }
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      { moment(user.lastSuscription.finishedAt).from(moment()) }
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <Switch
                        checked={ user.isActive }
                        disabled={ loading }
                        onChange={ () => {
                          onSuspend(user)
                        } }
                        name='checkedA'
                        color='secondary'
                        inputProps={ { 'aria-label': 'secondary checkbox' } }
                      />
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      <DeleteOutlineOutlinedIcon
                        style={ {
                          color: '#A6ABAF',
                          cursor: 'pointer'
                        } }
                        onClick={ () => {
                          if (!loading) {
                            onDelete(user)
                          }
                        } }
                      />
                    </StyledTableCell>
                  </StyledTableRow>
                )) }
                {/* { isEmptyVisible && <Box position="absolute" bottom={ 0 } display='flex' width='100%' height="80%" justifyContent="center" alignItems="center">
                  <Empty description="You have not added any user yet" />
                </Box> }
                { isLoaderVisible||true && <Box position="absolute" bottom={ 0 } display='flex' width='100%' height="80%" justifyContent="center" alignItems="center">
                <Spin size="large" />
                </Box> } */}
              </TableBody>
              {/* <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={availableRows}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
              /> */}
            </Table>
          ) : (
            <Box
              className='animate-fadein'
              position='absolute'
              zIndex={ 40 }
              display='flex'
              justifyContent='center'
              alignItems='center'
              mb={ 1.3 }
              top={ 0 }
              left={ 0 }
              right={ 0 }
              bottom={ 0 }
              style={ {
                backgroundColor: 'rgba(255,255,255,0.4)'
              } }
            >
              <Box display='flex' flexDirection='column'>
                { loading ? <Spin size="large" />: (
                   <Empty description="You have not added any user yet" />
                ) }
              </Box>
            </Box>
          ) }
        </TableContainer>
      </Paper>
    </Box>
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
      width: 200,
      minHeight: '4rem',
      fontSize: '1.125rem',
      color: '#A6ABAF',
      marginRight: theme.spacing(4),
      fontFamily: ['-apple-system'].join(','),
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
    selected: {}
  })
)((props: StyledTabProps) => <Tab disableRipple { ...props } />)

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>,newValue: number) => void
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
  buttonNew: {
    height: '65%',
    fontFamily: 'font2',
    marginLeft: '1rem',
    minWidth: '10rem',
    backgroundColor: '#45A0C5',
    fontSize: '1rem',
    textTransform: 'capitalize'
  },
  demo1: {
    maxWidth: '100%',
    minWidth: '100%',
    position: 'relative'
  }
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
