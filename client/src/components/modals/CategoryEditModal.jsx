import { Button, Modal, Form, Input, message } from 'antd'

const CategoryEditModal = (
  isModalOpenEdit,
  handleCancelEdit,
  setIsModalOpenEdit,
  setCategoryName
) => {
  const [form] = Form.useForm()
  const onFinish = async (values) => {
    const res = await fetch(`/api/category/update-category/${values._id}`, {
      method: 'PUT',
      body: JSON.stringify({ categoryName }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    const data = await res.json()
    console.log(res)
    console.log(data)
    if (res.status === 200) {
      message.success('Category Updated Successfully')
      setIsModalOpenEdit(false)
      setCategoryName(data.categoryName)
    } else {
      message.error('Something went wrong')
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
export default CategoryEditModal
