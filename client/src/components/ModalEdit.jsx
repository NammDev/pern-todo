import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import axios from '../utils/axiosCustom'

function ModalEdit({ show, setShow, todo, setTodos, todos }) {
  const [description, setDescription] = useState('')

  useEffect(() => {
    const isEmpty = Object.keys(todo).length === 0
    if (!isEmpty) {
      setDescription(todo.description)
    }
  }, [todo])

  const updateTodo = async () => {
    setShow(false)
    const body = { description }
    const response = await axios.put(`/todos/${todo.todo_id}`, JSON.stringify(body))
    console.log(response)
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.todo_id == response.todo_id) {
          return { ...todo, description: response.description }
        }
        return todo
      })
    )
  }

  return (
    <Modal show={show} onHide={() => setShow(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Todo {todo.todo_id}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={() => setShow(false)}>
          Close
        </Button>
        <Button variant='primary' onClick={updateTodo}>
          Edit
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalEdit
