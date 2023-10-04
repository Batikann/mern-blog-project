import { Button, Form, Modal, Select } from 'antd'

const UserRoleModal = ({ isModalOpen, handleCancel, handleOk }) => {
  return (
    <Modal
      title="Edit User Role"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={null}
    >
      <Form layout="vertical">
        <Form.Item label="Role">
          <Select>
            <Select.Option value="admin">Demo</Select.Option>
            <Select.Option value="moderator">Moderator</Select.Option>
            <Select.Option value="user">User</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item>
          <Button>Button</Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
export default UserRoleModal
