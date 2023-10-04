import { Button, Form, Modal, Popconfirm, Select, message } from 'antd'
import { useState } from 'react'

const UserRoleModal = ({
  isModalOpen,
  handleCancel,
  handleOk,
  role,
  setRole,
  userID,
  setIsModalOpen,
}) => {
  const [val, setVal] = useState()
  const onFinish = (values) => {
    setVal(values)
  }

  const confirm = async () => {
    const res = await fetch(`/api/user/changeUserRole/${userID}`, {
      method: 'PUT',
      body: JSON.stringify(val),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    setRole(data)
    message.success('User Role Changed')
    setIsModalOpen(false)
  }
  const cancel = (e) => {
    console.log(e)
    message.error('Click on No')
  }
  return (
    <Modal
      title="Edit User Role"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item label="Role" name="role" initialValue={role}>
          <Select>
            <Select.Option
              onClick={(e) => console.log(e.target.value)}
              value="admin"
            >
              Admin
            </Select.Option>
            <Select.Option value="moderator">Moderator</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item className="flex justify-end">
          <Popconfirm
            title="Change User Role"
            description="Are you sure to change role user?"
            onConfirm={confirm}
            onCancel={cancel}
            placement="bottom"
            okText="Yes"
            cancelText="No"
          >
            <Button
              htmlType="submit"
              className="btn !bg-indigo-800 hover:!bg-indigo-600"
            >
              Submit
            </Button>
          </Popconfirm>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default UserRoleModal
