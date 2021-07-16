import { Chip, Table, TableBody, TableHead, TablePagination, TableRow } from '@material-ui/core';
import moment from 'moment';
import React, { useContext, useState } from 'react'
import { getStatus } from '../../config/utils';
import UserContext from '../../context/user/user.context';
import { StyledTableCell, StyledTableRow } from '../superadmin/TableCompanies';



function createData (
  name: string,
  email: string,
  invitations: number,
 cost: number,
  createdAt:string,
 startedAt: string,
 finishedAt: string,
 status:number
) {

  const statusTemp = getStatus(status)
  
  var now = moment();
 var deadline = now.clone().hour(20).minute(0).second(0);
   let timeRemaining =  deadline.from(now);
   console.log({timeRemaining})


  return { name,email,invitations,cost,startedAt,finishedAt,timeRemaining,status:statusTemp,createdAt }
}

export interface TableGuestProps {
 
}

const TableGuest: React.FC<TableGuestProps> = () => {
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(
    false
    )
    const [rowsPerPage, setRowsPerPage] = useState(5)
    const [page, setPage] = React.useState(0)
    
    const {profile} = useContext(UserContext)
    const rows = profile.childrens.users


  const handleOpenUserDetailModal = () => {
    setIsOpenUserDetailModal(true)
  }
 
 const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
 }
 const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }
 
 return (
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
                        { moment().calendar(row.lastSuscription.startedAt) }|{ moment().calendar(row.lastSuscription.finishedAt) }
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                          { moment(row.lastSuscription.finishedAt).from(moment())}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                     {/* <Chip
                        size='small'
                        label={row.status.name}
                        onClick={handleOpenUserDetailModal}
                        clickable
                        color={row.status.color}
                      /> */}
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                                     { moment().calendar(row.lastSuscription.createdAt)}

                    </StyledTableCell>
                    <StyledTableCell align='center'>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
                    </StyledTableCell>
                    <StyledTableCell align='center'>
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

 );
}
 
export default TableGuest;