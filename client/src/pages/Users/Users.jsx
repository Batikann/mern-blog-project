import { Button, Popconfirm, Space, Table, message } from 'antd'
import { useState, useEffect } from 'react'
import {
  StopOutlined,
  CheckCircleOutlined,
  CiCircleOutlined,
} from '@ant-design/icons'
import UserRoleModal from '../../components/modals/Users/UserRoleModal'
const { Column, ColumnGroup } = Table

const Users = () => {
  const [users, setUsers] = useState([])
  const [data, setData] = useState()
  const getAllUsers = async () => {
    const res = await fetch('/api/user/all', {
      method: 'GET',
    })
    const data = await res.json()
    const filteredData = data.filter((user) => user.role !== 'admin')
    setUsers(filteredData)
  }

  const confirmBanUser = async (user) => {
    const res = await fetch(
      `http://localhost:3000/api/user/changeUserStatus/${user._id}`,
      {
        method: 'POST',
        body: JSON.stringify({ status: !user.status }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )
    const data = await res.json()
    if (data.status) {
      message.success(`unbanned ${data.username}`)
    } else {
      message.success(`Banned ${data.username}`)
    }
    await setData(data)
  }
  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }

  useEffect(() => {
    getAllUsers()
  }, [data])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const showModal = () => {
    setIsModalOpen(true)
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }
  const handleCancel = () => {
    setIsModalOpen(false)
  }
  return (
    <>
      <Table dataSource={users} rowKey={'_id'}>
        <Column
          title="Avatar"
          dataIndex="profilePicture"
          key="profilePicture"
          render={(_, record) => {
            return (
              <img
                className="w-12 h-12"
                src={record.profilePicture}
                alt={record.username}
              />
            )
          }}
        />
        <Column title="Username" dataIndex="username" key="username" />
        <Column title="Email" dataIndex="email" key="email" />
        <Column title="Role" dataIndex="role" key="role" />
        <Column
          title="CreatedAt"
          dataIndex="createdAt"
          key="createdAt"
          render={(_, record) => {
            return <p>{record.createdAt.substring(0, 10)}</p>
          }}
        />
        <Column
          title="Action"
          name="action"
          render={(_, record) => {
            return (
              <div className="flex justify-between">
                <Button
                  onClick={showModal}
                  className="!bg-indigo-700 hover:!bg-indigo-500 !border-none !outline-none !text-white font-bold cursor-pointer transition-all h-10 rounded-lg"
                >
                  Change Role
                </Button>

                <Popconfirm
                  title="Ban The User"
                  placement="topRight"
                  description="Are you sure to banned this user?"
                  onConfirm={() => confirmBanUser(record)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  {record.status ? (
                    <StopOutlined className="text-xl hover:text-red-600 cursor-pointer transition-all duration-300" />
                  ) : (
                    <CheckCircleOutlined className="text-xl hover:text-green-600 cursor-pointer transition-all duration-300" />
                  )}
                </Popconfirm>
              </div>
            )
          }}
        />
      </Table>
      <UserRoleModal
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        handleOk={handleOk}
      />
    </>
  )
}
export default Users
