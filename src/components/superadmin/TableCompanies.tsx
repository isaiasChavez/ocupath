import { Box,Chip,createStyles,Switch,Table,TableBody,TableCell,TableHead,TablePagination,TableRow,Theme,withStyles } from '@material-ui/core';
import React,{ useContext,useEffect,useState } from 'react'
import { getStatus } from '../../config/utils';
import AskModal from '../general/AskModal';
import UserDetailModal from './UserDetailModal';
import { USERS,USERS_TYPES } from '../../types'
import moment from 'moment'
import UserContext from '../../context/user/user.context';
import { User } from '../../context/user/user.reducer';
export interface TableCompaniesProps {

}

export const getDataStatus = (status): { color: any,name: string } => {
  console.log("==>",{ status })
  if (status === 1) {
    return {
      color: "#8DC811",
      name: "Active"
    }
  }
  if (status === 2) {
    return {
      color: "#9A9A9A",
      name: "Inactive"
    }
  }
  if (status === 3) {
    return {
      color: "#E29583",
      name: "Expired"
    }
  }
  if (status === 4) {
    return {
      color: "#E2CA64",
      name: "Paused"
    }
  }
  return {
    color: "default",
    name: "Error"
  }
}

const TableCompanies: React.FC<TableCompaniesProps> = () => {

  const { childrens,selectUser,selectedUser,suspendUserAdm,deleteUserAdm,getAdminChildDetail } = useContext(UserContext)
  const [rowsPerPage,setRowsPerPage] = useState(5)
  const [page,setPage] = React.useState(0)
  const [isOpenUserDetailModal,setIsOpenUserDetailModal] = useState<boolean>(
    false
  )
  const [isOpenDeleteUserModal,setIsOpenDeleteUserModal] = useState<boolean>(
    false
  )
  const [isOpenSuspendUserModal,setIsOpenSuspendUserModal] = useState<boolean>(
    false
  )
  const rows = childrens.admins
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
    console.log({ dataUser })
    setIsOpenSuspendUserModal(true)
    selectUser(dataUser,USERS.ADMIN)
  }
  const onDelete = (dataUser: User) => {
    toggleDeleteUserModal()
    selectUser(dataUser,USERS.ADMIN)
  }
  const onEdit = (dataUser: User) => {
    console.log({ dataUser })
    handleToggleDetailModal()
    selectUser(dataUser,USERS.ADMIN)
    getAdminChildDetail(dataUser.uuid)
  }
  const handleChangePage = (event: unknown,newPage: number) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value,10))
    setPage(0)
  }
  useEffect(() => {
    console.log("====>",childrens)
  },[childrens])

  

  return (
    <>
      <UserDetailModal
        isOpen={ isOpenUserDetailModal }
        handleClose={ handleToggleDetailModal }
        type={ USERS_TYPES.ADMIN }
      />
      <AskModal
        isOpen={ isOpenDeleteUserModal }
        handleClose={ toggleDeleteUserModal }
        handleOk={ () => {
          toggleDeleteUserModal()
          deleteUserAdm()
        } }
        okText='Sure'
        cancelText='Cancel'
        title='Delete User'
        subtitle={ `Are you sure you want to delete ${selectedUser ? selectedUser.name : 'this user'} ` }
      />
      <AskModal
        isOpen={ isOpenSuspendUserModal }
        handleOk={ () => {
          suspendUserAdm()
          toggleSuspendUserModal()
        } }
        handleClose={ toggleSuspendUserModal }
        okText='Sure'
        cancelText='Cancel'
        title='Suspend User'
        subtitle={ `Are you sure you want to  ${selectedUser.isActive ? 'suspend' : 'activate'} ${selectedUser ? 'to ' + selectedUser.name + '?' : 'this user?'}` }
      />
      <Table size="medium">
        <TableHead
        >
          <TableRow
          >
            <StyledTableCell align='center'>Name</StyledTableCell>
            <StyledTableCell align='center'>Email</StyledTableCell>
            <StyledTableCell align='center'>
              Number of Invitations
            </StyledTableCell>
            <StyledTableCell align='center'>Total Cost</StyledTableCell>
            <StyledTableCell align='center'>Period</StyledTableCell>
            <StyledTableCell align='center'>
              Time Remaining
            </StyledTableCell>
            <StyledTableCell align='center'>Estatus</StyledTableCell>
            <StyledTableCell align='center'>
              Registration Date
            </StyledTableCell>
            <StyledTableCell align='center'>Suspend</StyledTableCell>
            <StyledTableCell align='center'>Edit</StyledTableCell>
            <StyledTableCell align='center'>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody >
          { rows.map(user => (
            <StyledTableRow key={ user.email }>
              <StyledTableCell align='center' component='th' scope='user'>
                { user.name }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { user.email }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { user.lastSuscription.invitations }
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Box display='flex' justifyContent='space-between'>
                  <div>
                    $
                  </div>
                  { user.lastSuscription.cost }
                </Box>
              </StyledTableCell>
              <StyledTableCell align='center'>
                { `${moment(user.lastSuscription.startedAt).format('L')} to ${moment(user.lastSuscription.finishedAt).format('L')}` }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { moment(user.lastSuscription.finishedAt).from(moment()) }
              </StyledTableCell>
              <StyledTableCell align='center'>
                <Box fontWeight="fontWeightBold" style={ {
                  color: getDataStatus(user.status).color
                } }>
                  { getDataStatus(user.status).name }
                </Box>

                {/* color={ getDataStatus(user.status).color } */ }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { moment(user.lastSuscription.createdAt).format('L') }
              </StyledTableCell>
              <StyledTableCell align='right'>
                <Switch
                  checked={ user.isActive }
                  onChange={ () => onSuspend(user) }
                  name="checkedA"
                  color="secondary"
                  inputProps={ { 'aria-label': 'secondary checkbox' } }
                />
              </StyledTableCell>
              <StyledTableCell align='right'>

                <Chip
                  size='small'
                  label='Edit'
                  onClick={ () => onEdit(user) }
                  clickable
                  color='primary'
                />{ ' ' }
              </StyledTableCell>
              <StyledTableCell align='right'>
                { ' ' }
                <Chip
                  size='small'
                  label='Delete'
                  onClick={ () => onDelete(user) }
                  clickable
                  color='secondary'
                />{ ' ' }
              </StyledTableCell>
            </StyledTableRow>
          )) }
        </TableBody>
       {rows.length>8&& <TablePagination

          align="center"
          rowsPerPageOptions={ [5,10,25] }
          count={ rows.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />}
      </Table>

    </>
  );
}

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '1rem',
    },
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell)
export const StyledTableRow = withStyles((theme: Theme) =>
  createStyles({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover
      }
    }
  })
)(TableRow)





export default TableCompanies;