import { Space, Table, Tag, Button, message } from 'antd'

import { useEffect, useState } from 'react'
import CategoryModal from '../../components/modals/CategoryModal'
import CategoryEditModal from '../../components/modals/CategoryEditModal'
const { Column } = Table

const Category = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false)
  const [categories, setCategories] = useState()
  const [categoryName, setCategoryName] = useState()
  const [category, setCategory] = useState()
  const showModal = () => {
    setIsModalOpen(true)
  }

  const showModalEdit = () => {
    setIsModalOpenEdit(true)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }

  const handleCancelEdit = () => {
    setIsModalOpenEdit(false)
  }

  const getCategories = async () => {
    const res = await fetch('/api/category/get-categories', {
      method: 'GET',
    })
    const data = await res.json()
    setCategories(data)
  }

  const deleteCategory = async (id) => {
    const res = await fetch(`/api/category/delete-category/${id}`, {
      method: 'DELETE',
    })
    if (res.status === 200) {
      getCategories()
      message.success('Category Deleted Successfully')
    }
  }

  const getCategory = async (id) => {
    const res = await fetch(`/api/category/get-category/${id}`, {
      method: 'GET',
    })
    const data = await res.json()
    setCategory(data)
  }

  useEffect(() => {
    getCategories()
  }, [categoryName])

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end">
        <Button
          onClick={showModal}
          className="!text-white !bg-indigo-800 hover:!bg-indigo-600 font-bold !outline-none h-10"
        >
          Add Category
        </Button>
      </div>

      <Table dataSource={categories}>
        <Column
          title="Category Name"
          dataIndex="categoryName"
          key="categoryName"
        />
        <Column
          title="createdAt"
          dataIndex="createdAt"
          key="createdAt"
          render={(_, record) => {
            return <span>{record.createdAt.substring(0, 10)}</span>
          }}
        />
        <Column
          title="Action"
          key="action"
          render={(_, record) => {
            return (
              <Space size="middle">
                <Button
                  onClick={() => {
                    showModalEdit()
                    getCategory(record._id)
                  }}
                  className="font-bold !text-white !bg-blue-800 hover:!bg-blue-600 !outline-none !border-none"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => deleteCategory(record._id)}
                  className="font-bold !bg-red-600 hover:!bg-red-500 !text-white !outline-none !border-none"
                >
                  Delete
                </Button>
              </Space>
            )
          }}
        />
      </Table>
      <CategoryModal
        setIsModalOpen={setIsModalOpen}
        isModalOpen={isModalOpen}
        handleCancel={handleCancel}
        setCategoryName={setCategoryName}
      />
      <CategoryEditModal
        setIsModalOpenEdit={setIsModalOpenEdit}
        isModalOpenEdit={isModalOpenEdit}
        handleCancelEdit={handleCancelEdit}
        category={category}
        setCategoryName={setCategoryName}
      />
    </div>
  )
}
export default Category
