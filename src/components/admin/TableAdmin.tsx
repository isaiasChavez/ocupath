import React,{ useContext,useEffect,useState } from 'react'
import {
  withStyles,
  Theme,
  createStyles,
  makeStyles
} from '@material-ui/core/styles'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Button from '@material-ui/core/Button'
import InviteModal from '../general/InviteModal'
import UserDetailModal from '../superadmin/UserDetailModal'
import AskModal from '../general/AskModal'
import { COMPANIES,USERS,USERS_TYPES } from '../../types'
import UserContext from '../../context/user/user.context'
import moment from 'moment'
import { User } from '../../context/user/user.reducer'
import { Box,Switch,Tooltip } from '@material-ui/core'
import { Table } from 'antd'
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

  const handleCloseInviteModal = () => {
    setIsOpenInviteModal(false)
  }

  const handleOpenInviteModal = () => {
    setIsOpenInviteModal(true)
  }

  const handleCloseUserDetailModal = () => {
    setIsOpenUserDetailModal(false)
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

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Box fontFamily="font2">{text}</Box>,
    },
        {
      title: 'Last Name',
      dataIndex: 'lastname',
      key: 'name',
      render: (text) => <Box fontFamily="font2">{text}</Box>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <Box fontFamily="font2">{text}</Box>,
    },
 
    {
      title: 'Registration date',
      dataIndex: 'lastSuscription',
      key: 'Registration',
      render: (text) => (
        <Box fontFamily="font2">{moment(text.createdAt).format('L')}</Box>
      ),
    },
    {
      title: 'Suspend',
      dataIndex: 'isActive',
      key: 'invitations',
      render: (isActive, user) => {
        return (
          <Switch
            disabled={loading}
            checked={isActive}
            onChange={() => onSuspend(user)}
            name="checkedA"
            color="secondary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
          />
        )
      },
    },
  
    {
      title: 'Delete',
      dataIndex: 'lastSuscription.invitations',
      key: 'invitations',
      render: (_, user) => (
        <DeleteOutlineOutlinedIcon
          style={{
            color: '#A6ABAF',
            cursor: 'pointer',
          }}
          onClick={() => onDelete(user)}
        />
      ),
    },
  ]

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
        subtitle={ `Are you sure you want to delete ${selectedUser ? ' ' + selectedUser.name + '?' : 'this user?'
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
          }  ${selectedUser ? ' ' + selectedUser.name + '?' : 'this user?'}` }
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
            <Tooltip title= {canAddMoreChilds?'':'Delete a user before inviting more'}  placement="bottom">
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
        <Table
        loading={loading}
        columns={columns}
        dataSource={childrens.users}
      />
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

export default TableAdmin
