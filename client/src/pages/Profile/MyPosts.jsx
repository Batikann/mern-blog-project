import React, { useState } from 'react'
import {
  Form,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Typography,
} from 'antd'
import { Link } from 'react-router-dom'
const originData = []
for (let i = 0; i < 100; i++) {
  originData.push({
    key: i.toString(),
    image: 'https://picsum.photos/200/300',
    title: 'Test Title',
    description: `lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  })
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

const MyPosts = () => {
  const [form] = Form.useForm()
  const [data, setData] = useState(originData)
  const [editingKey, setEditingKey] = useState('')
  const isEditing = (record) => record.key === editingKey
  const edit = (record) => {
    form.setFieldsValue({
      image: '',
      title: '',
      description: '',
      ...record,
    })
    setEditingKey(record.key)
  }
  const cancel = () => {
    setEditingKey('')
  }

  const columns = [
    {
      title: 'image',
      dataIndex: 'image',
      key: 'image',
      width: '25%',

      render: (text, record) => {
        return (
          <div className="flex justify-center items-center">
            <img className="object-contain " src={record.image} />
          </div>
        )
      },
    },
    {
      title: 'title',
      dataIndex: 'title',
      key: 'title',
      width: '20%',
      render: (text, record) => {
        return <h2 className="text-xl font-semibold">{record.title}</h2>
      },
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
      width: '40%',
      return: (text, record) => {
        return <p className="text-lg">{record.description}</p>
      },
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return (
          <div className="flex gap-4 justify-center items-center">
            <a>View</a>
            <a>Update</a>
            <a>Delete</a>
          </div>
        )
      },
    },
  ]
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
  return (
    <>
      <div className="mb-4 justify-end flex">
        <Link
          className="bg-indigo-800 hover:bg-indigo-600 text-white font-bold p-2 rounded-md"
          to="/profile/posts/create-post"
        >
          Create Post
        </Link>
      </div>
      <Form
        form={form}
        component={false}
        className="max-h-[100vh_-_90px] overflow-y-auto "
      >
        <Table
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          bordered
          dataSource={data}
          columns={mergedColumns}
          rowClassName="editable-row"
          pagination={{
            onChange: cancel,
          }}
        />
      </Form>
    </>
  )
}
export default MyPosts
