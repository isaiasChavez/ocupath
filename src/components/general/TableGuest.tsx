import { Box, IconButton, Switch } from '@material-ui/core'
import { Table } from 'antd'
import moment from 'moment'
import React, { useContext, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import UserContext from '../../context/user/user.context'
import { costFormated, getDataStatus } from '../superadmin/TableCompanies'
import { USERS, USERS_TYPES } from '../../types/'
import { User } from '../../context/user/user.reducer'
import UserDetailModal from '../superadmin/UserDetailModal'
import AskModal from './AskModal'
export interface TableGuestProps {}
const TableGuest: React.FC<TableGuestProps> = () => {
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(
    false,
  )
  const [isOpenSuspendUserModal, setIsOpenSuspendUserModal] = useState<boolean>(
    false,
  )
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState<boolean>(
    false,
  )
  const {
    childrens,
    selectUser,
    getUserChildDetail,
    selectedUser,
    deleteUser,
    suspendUser,
    loading,
  } = useContext(UserContext)
  const rows = childrens.users
  const toggleDeleteUserModal = () => {
    setIsOpenDeleteUserModal(!isOpenDeleteUserModal)
  }
  const toggleSuspendUserModal = () => {
    setIsOpenSuspendUserModal(!isOpenSuspendUserModal)
  }
  const handleToggleDetailModal = () => {
    setIsOpenUserDetailModal(!isOpenUserDetailModal)
  }

  const onSuspend = (dataUser: User) => {
    setIsOpenSuspendUserModal(true)
    selectUser(dataUser, USERS.GUEST)
  }
  const onDelete = (dataUser: User) => {
    toggleDeleteUserModal()
    selectUser(dataUser, USERS.GUEST)
  }
  const onEdit = async (dataUser: User) => {
    selectUser(dataUser, USERS.GUEST)
    handleToggleDetailModal()
    await getUserChildDetail(dataUser)
  }

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Box textAlign="center" fontFamily="font2">{text}</Box>,
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
      render: (text) => <Box  fontFamily="font2">{text}</Box>,
    },
    {
      title: 'Total cost',
      dataIndex: 'lastSuscription',
      key: 'invitations',
      render: (text) => <Box textAlign="center" fontFamily="font2">{costFormated(text.cost)}</Box>,
    },
    {
      title: 'Period',
      dataIndex: 'lastSuscription',
      key: 'invitations',
      render: (lastSuscription) => (
        <Box textAlign="center" fontFamily="font2">
          {`${moment(lastSuscription.startedAt).format('L')} to ${moment(
            lastSuscription.finishedAt,
          ).format('L')}`}
        </Box>
      ),
    },
    {
      title: 'Time remaining',
      dataIndex: 'lastSuscription',
      key: 'remaining',
      render: (text) => (
        <Box textAlign="center" fontFamily="font2">{moment(text.finishedAt).from(moment())}</Box>
      ),
    },
    {
      title: 'Estatus',
      dataIndex: 'status',
      key: 'invitations',
      render: (text) => (
        <Box
          fontWeight="fontWeightBold"
          style={{
            color: getDataStatus(text).color,
          }}
        >
          {getDataStatus(text).name}
        </Box>
      ),
    },
    {
      title: 'Registration date',
      dataIndex: 'lastSuscription',
      key: 'Registration',
      render: (text) => (
        <Box textAlign="center" fontFamily="font2">{moment(text.createdAt).format('L')}</Box>
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
      title: 'Edit',
      dataIndex: 'isActive',
      key: 'invitations',
      render: (isActive, user) => (
        <IconButton
          onClick={() => {
            if (isActive) {
              onEdit(user)
            }
          }}
        >

        <EditOutlinedIcon
          style={{
            color: '#A6ABAF',
            opacity: isActive ? 1 : 0.5,
            cursor: isActive ? 'pointer' : 'default',
          }}
          />
          </IconButton>
      ),
    },
    {
      title: 'Delete',
      dataIndex: 'lastSuscription',
      key: 'invitations',
      render: (_, user) => (
        <IconButton
          onClick={() => onDelete(user)}
        >
        <DeleteOutlineOutlinedIcon
          style={{
            color: '#A6ABAF',
            cursor: 'pointer',
          }}
          />
          </IconButton>
      ),
    },
  ]

  return (
    <>
      <UserDetailModal
        isOpen={isOpenUserDetailModal}
        handleClose={handleToggleDetailModal}
        type={USERS_TYPES.GUEST}
      />
      <AskModal
        isOpen={isOpenDeleteUserModal}
        handleClose={toggleDeleteUserModal}
        handleOk={() => {
          toggleDeleteUserModal()
          deleteUser()
        }}
        okText="Sure"
        cancelText="Cancel"
        title="Delete User"
        subtitle={`Are you sure you want to delete ${
          selectedUser ? selectedUser.name : 'this user'
        } `}
      />
      <AskModal
        isOpen={isOpenSuspendUserModal}
        handleOk={() => {
          setIsOpenSuspendUserModal(false)
          suspendUser()
        }}
        handleClose={toggleSuspendUserModal}
        okText="Sure"
        cancelText="Cancel"
        title="Suspend User"
        subtitle={`Are you sure you want to  ${
          selectedUser.isActive ? 'suspend' : 'activate'
        } ${selectedUser ? ' ' + selectedUser.name + '?' : 'this user?'}`}
      />
      <Table loading={loading} columns={columns} dataSource={childrens.users} />
    </>
  )
}

export default TableGuest
