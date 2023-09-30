import { Button, Modal, Form, Input, message } from 'antd'

const CategoryModal = ({
  isModalOpen,
  handleCancel,
  setIsModalOpen,
  setCategoryName,
}) => {
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    try {
      const res = await fetch('/api/category/create-category', {
        method: 'POST',
        body: JSON.stringify(values),
        headers: { 'Content-type': 'application/json; charset=UTF-8' },
      })
      const data = await res.json()
      if (res.status === 200) {
        message.success('Category Added Successfully')
        form.resetFields()
        setIsModalOpen(false)
        setCategoryName(data.categoryName)
      } else {
        message.error('Category Not Added Try Again...')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <Modal
        title="Category Add Modal"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          name="basic"
          autoComplete="off"
          className="mt-8"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="Category" name="categoryName">
            <Input />
          </Form.Item>

          <Form.Item>
            <Button
              className="!bg-indigo-800 !text-white font-bold hover:!bg-indigo-600 w-full mt-6"
              htmlType="submit"
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default CategoryModal
