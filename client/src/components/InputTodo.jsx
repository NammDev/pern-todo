import { useState } from 'react'
import axios from '../utils/axiosCustom'

function InputTodo({ setTodos }) {
  const [description, setDescription] = useState(' ')

  const onSubmit = async (e) => {
    e.preventDefault()
    try {
      const body = { description }
      const response = await axios.post('/todos', JSON.stringify(body))
      setTodos((state) => [...state, response])
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='container'>
      <h1 className='text-center my-5'>Pern Todo List</h1>
      <form className='d-flex' onSubmit={onSubmit}>
        <input
          type='text'
          className='form-control'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className='btn btn-success'>Add</button>
      </form>
    </div>
  )
}

export default InputTodo
