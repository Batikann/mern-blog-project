import { Button, Space, Table } from 'antd'
import { useState, useEffect } from 'react'
const { Column, ColumnGroup } = Table

const Users = () => {
  const [users, setUsers] = useState([])
  const getAllUsers = async () => {
    const res = await fetch('/api/user/all', {
      method: 'GET',
    })
    const data = await res.json()
    const filteredData = data.filter((user) => user.role !== 'admin')
    setUsers(filteredData)
  }
  useEffect(() => {
    getAllUsers()
  }, [])
  return (
    <Table dataSource={users}>
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
            <Space size="middle">
              <Button className="!bg-orange-600 !text-white font-bold !outline-none !border-none hover:!bg-orange-400 cursor-pointer h-10 transition-all  rounded-lg">
                Change Status
              </Button>
              <Button className="!bg-indigo-700 hover:!bg-indigo-500 !border-none !outline-none !text-white font-bold cursor-pointer transition-all h-10 rounded-lg">
                Change Role
              </Button>
            </Space>
          )
        }}
      />
    </Table>
  )
}
export default Users
