import React, { useState } from 'react'
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

interface StyledTabsProps {
  value: number
  onChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const StyledTabs = withStyles({
  indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
      backgroundColor: '#635ee7'
    }
  }
})((props: StyledTabsProps) => (
  <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />
))

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
function createData (
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein }
}
const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9)
]
export interface TableAdminProps {}

const TableAdmin: React.FC<TableAdminProps> = () => {
  const classes = useStyles()
  const [currentTab, setCurrentTab] = useState<number>(COMPANIES)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setCurrentTab(newValue)
  }
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

  const handleOpenUserDetailModal = () => {
    setIsOpenUserDetailModal(true)
  }

  const toggleDeleteUserModal = () => {
    setIsOpenDeleteUserModal(!isOpenDeleteUserModal)
  }
  const toggleSuspendUserModal = () => {
    setIsOpenSuspendUserModal(!isOpenSuspendUserModal)
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
        handleOpen={handleOpenUserDetailModal}
        type={USERS.GUEST}
      />
      <AskModal
        isOpen={isOpenDeleteUserModal}
        handleClose={toggleDeleteUserModal}
        handleOpen={toggleDeleteUserModal}
        okText='Sure'
        cancelText='Cancel'
        title='Delete User'
        subtitle='Are you sure you want to delete this user?'
      />
      <AskModal
        isOpen={isOpenSuspendUserModal}
        handleClose={toggleSuspendUserModal}
        handleOpen={toggleSuspendUserModal}
        okText='Sure'
        cancelText='Cancel'
        title='Suspend User'
        subtitle='Are you sure you want to suspend this user?'
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
              {rows.map(row => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align='center' component='th' scope='row'>
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.protein}
                  </StyledTableCell>
                  <StyledTableCell align='center'>
                    {row.protein}
                  </StyledTableCell>
                  <StyledTableCell align='right'>
                      {' '}
                      <Chip
                        size='small'
                        label='Edit'
                        onClick={handleOpenUserDetailModal}
                        clickable
                        color='primary'
                      />{' '}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {' '}
                      <Chip
                        size='small'
                        label='Suspend'
                        clickable
                        onClick={toggleSuspendUserModal}
                        color='primary'
                      />{' '}
                    </StyledTableCell>
                    <StyledTableCell align='right'>
                      {' '}
                      <Chip
                        size='small'
                        label='Delete'
                        onClick={toggleDeleteUserModal}
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

export default TableAdmin
