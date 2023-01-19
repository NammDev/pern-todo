import { useState, useEffect } from 'react'
import axios from '../utils/axiosCustom'
import InputTodo from './InputTodo'
import ModalEdit from './ModalEdit'

function ListTodos() {
  const [show, setShow] = useState(false)
  const [todos, setTodos] = useState([])
  const [dataEdit, setDataEdit] = useState({})

  const fetchApi = async () => {
    const res = await axios.get('/todos')
    setTodos(res)
  }

  useEffect(() => {
    fetchApi()
  }, [])

  const deleteTodo = async (id) => {
    const res = await axios.delete(`/todos/${id}`)
    setTodos(todos.filter((todo) => todo.todo_id !== id))
  }

  const onClickEdit = (id) => {
    setShow(true)
    const todoUpdate = todos.filter((todo) => todo.todo_id === id)
    setDataEdit(...todoUpdate)
  }

  return (
    <>
      <InputTodo setTodos={setTodos} />
      <table className='table mt-5 text-center'>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.todo_id}</td>
              <td>{todo.description}</td>
              <td>
                <button className='btn btn-primary' onClick={() => onClickEdit(todo.todo_id)}>
                  Edit Todo
                </button>
              </td>
              <td>
                <button className='btn btn-danger' onClick={() => deleteTodo(todo.todo_id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ModalEdit show={show} setShow={setShow} todo={dataEdit} todos={todos} setTodos={setTodos} />
    </>
  )
}

export default ListTodos
