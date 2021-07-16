import { Chip, createStyles, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Theme, withStyles } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import { getStatus } from '../../config/utils';
import AskModal from '../general/AskModal';
import UserDetailModal from './UserDetailModal';

import moment from 'moment'
import UserContext from '../../context/user/user.context';

function createData(
  name: string,
  email: string,
  invitations: number,
  cost: number,
  createdAt: string,
  startedAt: string,
  finishedAt: string,
  status: number
) {

  const statusTemp = getStatus(status)

  var now = moment();
  var deadline = now.clone().hour(20).minute(0).second(0);
  let timeRemaining = deadline.from(now);
  console.log({ timeRemaining })


  return { name, email, invitations, cost, startedAt, finishedAt, timeRemaining, status: statusTemp, createdAt }
}

export const StyledTableCell = withStyles((theme: Theme) =>
  createStyles({
    root: {
      height:'1rem',
      
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

export interface TableCompaniesProps {

}

const TableCompanies: React.FC<TableCompaniesProps> = () => {
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(
    false
  )
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState<boolean>(
    false
  )
  const [isOpenSuspendUserModal, setIsOpenSuspendUserModal] = useState<boolean>(
    false
  )
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [page, setPage] = React.useState(0)

    const {profile} = useContext(UserContext)

    const rows = profile.childrens.admins
  const handleOpenUserDetailModal = () => {
    setIsOpenUserDetailModal(true)
  }

  const toggleDeleteUserModal = () => {
    setIsOpenDeleteUserModal(!isOpenDeleteUserModal)
  }
  const toggleSuspendUserModal = () => {
    setIsOpenSuspendUserModal(!isOpenSuspendUserModal)
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
  const handleCloseUserDetailModal = () => {
    setIsOpenUserDetailModal(false)
  }
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }
  return (
    <>
      <UserDetailModal
        isOpen={ isOpenUserDetailModal }
        handleClose={ handleCloseUserDetailModal }
        handleOpen={ handleOpenUserDetailModal }
      />
      <AskModal
        isOpen={ isOpenDeleteUserModal }
        handleClose={ toggleDeleteUserModal }
        handleOpen={ toggleDeleteUserModal }
        okText='Sure'
        cancelText='Cancel'
        title='Delete User'
        subtitle='Are you sure you want to delete this user?'
      />
      <AskModal
        isOpen={ isOpenSuspendUserModal }
        handleClose={ toggleSuspendUserModal }
        handleOpen={ toggleSuspendUserModal }
        okText='Sure'
        cancelText='Cancel'
        title='Suspend User'
        subtitle='Are you sure you want to suspend this user?'
      />
      <Table aria-label='customized table'>
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
            <StyledTableCell align='center'>Edit</StyledTableCell>
            <StyledTableCell align='center'>Suspend</StyledTableCell>
            <StyledTableCell align='center'>Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { rows.map(row => (
            <StyledTableRow key={ row.name }>
              <StyledTableCell align='center' component='th' scope='row'>
                { row.name }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { row.email }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { row.lastSuscription.invitations }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { row.lastSuscription.cost}
              </StyledTableCell>
              <StyledTableCell align='center'>
                { moment().calendar(row.lastSuscription.startedAt) }|{ moment().calendar(row.lastSuscription.finishedAt) }
              </StyledTableCell>
              <StyledTableCell align='center'>
                { moment(row.lastSuscription.finishedAt).from(moment())}
              </StyledTableCell>
              <StyledTableCell align='center'>
                {/* <Chip
                  size='small'
                  label={ row.status.name }
                  onClick={ handleOpenUserDetailModal }
                  clickable
                  color={ row.status.color }
                /> */}
              </StyledTableCell>
              <StyledTableCell align='center'>
                { moment().calendar(row.lastSuscription.createdAt)}
              </StyledTableCell>
              <StyledTableCell align='right'>
                { ' ' }
                <Chip
                  size='small'
                  label='Edit'
                  onClick={ handleOpenUserDetailModal }
                  clickable
                  color='primary'
                />{ ' ' }
              </StyledTableCell>
              <StyledTableCell align='right'>
                { ' ' }
                <Chip
                  size='small'
                  label='Suspend'
                  clickable
                  onClick={ toggleSuspendUserModal }
                  color='primary'
                />{ ' ' }
              </StyledTableCell>
              <StyledTableCell align='right'>
                { ' ' }
                <Chip
                  size='small'
                  label='Delete'
                  onClick={ toggleDeleteUserModal }
                  clickable
                  color='secondary'
                />{ ' ' }
              </StyledTableCell>
            </StyledTableRow>
          )) }
        </TableBody>
        <TablePagination
          rowsPerPageOptions={ [5, 10, 25] }
          count={ rows.length }
          rowsPerPage={ rowsPerPage }
          page={ page }
          onChangePage={ handleChangePage }
          onChangeRowsPerPage={ handleChangeRowsPerPage }
        />
      </Table>

    </>
  );
}





export default TableCompanies;