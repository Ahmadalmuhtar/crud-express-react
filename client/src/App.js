import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { MdClose } from "react-icons/md";

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' })
  const [addSection, setAddSection] = useState(false)

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("/create", formData)
    console.log(response.data)
    setFormData({ name: '', email: '', mobile: '' })
    if (response.data.success) {
      setAddSection(false)
      alert(response.data.message)
    }
  }

  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={() => setAddSection(true)}>Add</button>

        {addSection && (
          <div className='addContainer'>
            <form onSubmit={handleSubmit}>
              <div className='close-btn' onClick={() => setAddSection(false)}><MdClose /></div>
              <label htmlFor='name' >Name : </label>
              <input type='text' id='name' name='name' value={formData.name} onChange={handleOnChange} />
              <label htmlFor='email' >Email : </label>
              <input type='text' id='email' name='email' value={formData.email} onChange={handleOnChange} />
              <label htmlFor='mobile' >Mobile : </label>
              <input type='number' id='mobile' name='mobile' value={formData.mobile} onChange={handleOnChange} />
              <button type='submit'> Submit </button>
            </form>
          </div>
        )}

      </div>
    </>
  );
}

export default App;
