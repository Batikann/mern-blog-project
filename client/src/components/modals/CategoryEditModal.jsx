import { Button, Modal, Form, Input, message } from 'antd'

const CategoryEditModal = ({
  isModalOpenEdit,
  handleCancelEdit,
  setIsModalOpenEdit,
  category,
  setCategoryName,
}) => {
  const [form] = Form.useForm()

  const onFinish = async (values) => {
    try {
      const res = await fetch(`/api/category/update-category/${category._id}`, {
        method: 'PUT',
        body: JSON.stringify(values),
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (res.status === 200) {
        message.success('Category Updated Successfully')
        setIsModalOpenEdit(false)
        setCategoryName(data.categoryName)
        form.resetFields()
      } else {
        message.error('Something went wrong')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <>
      <Modal
        title="Category Edit Modal"
        open={isModalOpenEdit}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form className="mt-8" onFinish={onFinish} form={form}>
          <Form.Item
            label="Category"
            name="categoryName"
            rules={[{ required: true }]}
          >
            <Input placeholder="enter category name" />
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
export default CategoryEditModal
