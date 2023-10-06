import { useEffect, useState } from 'react'
import { Form, Spin } from 'antd'
import { useParams } from 'react-router-dom'
import PostEdit from './PostEdit'

const PostView = () => {
  const [categories, setCategories] = useState([])
  const [post, setPost] = useState()
  const [loading, setLoading] = useState(false)
  const [form] = Form.useForm()
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [singleCategoryResponse, singleBlogResponse] = await Promise.all([
          fetch('/api/category/get-categories'),
          fetch(`/api/post/getPost/${id}`),
        ])

        const [singleCategoryResponseData, singleBlogResponseData] =
          await Promise.all([
            singleCategoryResponse.json(),
            singleBlogResponse.json(),
          ])

        setCategories(singleCategoryResponseData)
        setPost(singleBlogResponseData[0])

        if (singleBlogResponseData) {
          form.setFieldsValue({
            header: singleBlogResponseData[0].header,
            description: singleBlogResponseData[0].description,
            category: singleBlogResponseData[0].category,
            categories: singleBlogResponseData[0].categories,
            content: singleBlogResponseData[0].content,
          })
          setLoading(true)
        }
      } catch (error) {
        console.log('Veri hatası:', error)
        setLoading(false)
      }
    }
    fetchData()
  }, [id, form])

  return loading ? (
    <PostEdit categories={categories} form={form} post={post} id={id} />
  ) : (
    <div className="flex justify-center items-center h-full">
      <Spin />
    </div>
  )
}
export default PostView
