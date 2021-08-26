import { Box, Chip, Switch, Table, TableBody, TableHead, TablePagination, TableRow } from '@material-ui/core';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react'
import { getStatus } from '../../config/utils';
import UserContext from '../../context/user/user.context';
import { getDataStatus, StyledTableCell, StyledTableRow } from '../superadmin/TableCompanies';
import {USERS,USERS_TYPES} from '../../types/'
import { User } from '../../context/user/user.reducer';
import UserDetailModal from '../superadmin/UserDetailModal';
import AskModal from './AskModal';


export interface TableGuestProps {
 
}

const TableGuest: React.FC<TableGuestProps> = () => {
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(
    false
    )
    const [isOpenSuspendUserModal, setIsOpenSuspendUserModal] = useState<boolean>(
      false
    )
    const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState<boolean>(
      false
    )
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = React.useState(0)
    
    const {childrens,selectUser,getUserChildDetail,selectedUser,deleteUser,suspendUser,loading} = useContext(UserContext)
    const rows = childrens.users

    useEffect(() => {
        console.log("Me estoy renderizando")
    }, [])

    useEffect(() => {
        console.log({isOpenUserDetailModal})
      
    }, [isOpenUserDetailModal])

 
 const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
 }
 const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const toggleDeleteUserModal = () => {
    setIsOpenDeleteUserModal(!isOpenDeleteUserModal)
  }
  const toggleSuspendUserModal = () => {
    setIsOpenSuspendUserModal(!isOpenSuspendUserModal)
  }
  const handleToggleDetailModal = () => {
    console.log("Togleando",{isOpenUserDetailModal})
    setIsOpenUserDetailModal(!isOpenUserDetailModal)
  }

  const onSuspend = (dataUser:User)=>{
    
    setIsOpenSuspendUserModal(true)
    selectUser(dataUser,USERS.ADMIN)

  }
  const onDelete = (dataUser:User)=>{
    toggleDeleteUserModal()
    selectUser(dataUser,USERS.ADMIN)
  }
  const onEdit =async (dataUser:User)=>{
    selectUser(dataUser,USERS.GUEST)
    handleToggleDetailModal()
    await getUserChildDetail()
  }

 return (
   <>
   <UserDetailModal
        isOpen={ isOpenUserDetailModal }
        handleClose={ handleToggleDetailModal }
        type={USERS_TYPES.GUEST}
      />
      <AskModal
        isOpen={ isOpenDeleteUserModal }
        handleClose={ toggleDeleteUserModal }
        handleOk={()=>deleteUser()}
        okText='Sure'
        cancelText='Cancel'
        title='Delete User'
        subtitle={`Are you sure you want to delete ${selectedUser?selectedUser.name:'this user'} `}
      />
      <AskModal
        isOpen={ isOpenSuspendUserModal }
        handleOk={()=>{
          setIsOpenSuspendUserModal(false)
          suspendUser()
        }}
        handleClose={ toggleSuspendUserModal }
        okText='Sure'
        cancelText='Cancel'
        title='Suspend User'
        subtitle={`Are you sure you want to  ${selectedUser.isActive?'suspend':'activate'} ${selectedUser?'to '+selectedUser.name+'?':'this user?'}`}
      />
  <Table  aria-label='customized table'>
              <TableHead>
                <TableRow>
                  <StyledTableCell align='center'>Name</StyledTableCell>
                  <StyledTableCell align='center'>Email</StyledTableCell>
                  <StyledTableCell align='center'>Total Cost</StyledTableCell>
                  <StyledTableCell align='center'>Period</StyledTableCell>
                  <StyledTableCell align='center'>
                    Time Remaining
                  </StyledTableCell>
                  <StyledTableCell align='center'>Status</StyledTableCell>
                  <StyledTableCell align='center'>
                    Registration Date
                  </StyledTableCell>
                  <StyledTableCell align='center'>Suspend</StyledTableCell>
                  <StyledTableCell align='center'>Edit</StyledTableCell>
                  <StyledTableCell align='center'>Delete</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(row => (
                  <StyledTableRow key={row.name}>
                    <StyledTableCell align='center' component='th' scope='row'>
                      {row.name}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.email}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                      {row.lastSuscription.cost}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                { `${moment(row.lastSuscription.startedAt).format('L')} to ${moment(row.lastSuscription.finishedAt).format('L')}` }
              </StyledTableCell>
                    <StyledTableCell align='center'>
                          { moment(row.lastSuscription.finishedAt).from(moment())}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                    <Box fontWeight="fontWeightBold" style={ {
                  color: getDataStatus(row.status).color
                } }>
                  { getDataStatus(row.status).name }
                </Box>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                { moment(row.lastSuscription.createdAt).format('L') }
              </StyledTableCell>
              <StyledTableCell align='right'>
                { ' ' }
                <Switch
                  checked={ row.isActive }
                  disabled={loading}
                  onChange={ () => {
                    onSuspend(row) 
                  }}
                  name="checkedA"
                  color="secondary"
                  inputProps={ { 'aria-label': 'secondary checkbox' } }
                />
              </StyledTableCell>
                    <StyledTableCell align='right'>
                { ' ' }
                <Chip
                  size='small'
                  label='Edit'
                  onClick={()=>onEdit(row)}
                  clickable
                  color='primary'
                  />{ ' ' }
              </StyledTableCell>
              <StyledTableCell align='right'>
                { ' ' }
                <Chip
                  size='small'
                  label='Delete'
                  onClick={ ()=> onDelete(row) }
                  clickable
                  color='secondary'
                  />{ ' ' }
              </StyledTableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
              {rows.length>8&&<TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                />}
            </Table>
                </>

 );
}
 
export default TableGuest;