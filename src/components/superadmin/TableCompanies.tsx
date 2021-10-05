import {
  Box,
  IconButton,
  Switch,
} from '@material-ui/core'
import React, { useContext, useState } from 'react'
import EditOutlinedIcon from '@material-ui/icons/EditOutlined'
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined'
import { Table } from 'antd'
import UserDetailModal from './UserDetailModal'
import UserContext from '../../context/user/user.context'
import { User } from '../../context/user/user.reducer'
import AskModal from '../general/AskModal'
import moment from 'moment'
import { USERS, USERS_TYPES } from '../../types'
export interface TableCompaniesProps {}
export const getDataStatus = (status): { color: any; name: string } => {
  if (status === 1) {
    return {
      color: '#8DC811',
      name: 'Active',
    }
  }
  if (status === 2) {
    return {
      color: '#9A9A9A',
      name: 'Inactive',
    }
  }
  if (status === 3) {
    return {
      color: '#E29583',
      name: 'Expired',
    }
  }
  if (status === 4) {
    return {
      color: '#E2CA64',
      name: 'Paused',
    }
  }
  return {
    color: 'default',
    name: 'Error',
  }
}

export const costFormated = (cost: string): string => {
  let costNumber = parseInt(cost)
  if (costNumber % 1 === 0) {
    return `${cost}.00`
  }

  return cost
}

const TableCompanies: React.FC<TableCompaniesProps> = () => {
  const {
    childrens,
    selectUser,
    selectedUser,
    suspendUserAdm,
    deleteUserAdm,
    getAdminChildDetail,
    loading,
  } = useContext(UserContext)
  const [isOpenUserDetailModal, setIsOpenUserDetailModal] = useState<boolean>(
    false,
  )
  const [isOpenDeleteUserModal, setIsOpenDeleteUserModal] = useState<boolean>(
    false,
  )
  const [isOpenSuspendUserModal, setIsOpenSuspendUserModal] = useState<boolean>(
    false,
  )
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
    selectUser(dataUser, USERS.ADMIN)
  }
  const onDelete = (dataUser: User) => {
    toggleDeleteUserModal()
    selectUser(dataUser, USERS.ADMIN)
  }
  const onEdit = async (dataUser: User) => {
    selectUser(dataUser, USERS.ADMIN)
    getAdminChildDetail(dataUser.uuid)
    handleToggleDetailModal()
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <Box textAlign="center" fontFamily="font2">{text}</Box>,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      render: (text) => <Box  fontFamily="font2">{text}</Box>,
    },
    {
      title: 'No. of invitations',
      dataIndex: 'lastSuscription',
      key: 'invitations',
      render: (text) => <Box textAlign="center" fontFamily="font2">{text.invitations}</Box>,
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
      dataIndex: 'lastSuscription.invitations',
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
        type={USERS_TYPES.ADMIN}
      />
      <AskModal
        isOpen={isOpenDeleteUserModal}
        handleClose={toggleDeleteUserModal}
        handleOk={() => {
          toggleDeleteUserModal()
          deleteUserAdm()
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
          suspendUserAdm()
          toggleSuspendUserModal()
        }}
        handleClose={toggleSuspendUserModal}
        okText="Sure"
        cancelText="Cancel"
        title={selectedUser.isActive ? 'Suspend User' : 'Activate user'}
        subtitle={`Are you sure you want to  ${
          selectedUser.isActive ? 'suspend' : 'activate'
        } ${selectedUser ? 'to ' + selectedUser.name + '?' : 'this user?'}`}
      />

      <Table
        
        loading={loading}
        columns={columns}
        dataSource={childrens.admins}
      />
    </>
  )
}

export default TableCompanies
