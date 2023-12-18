import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import FormTable from './components/FormTable'

axios.defaults.baseURL = 'http://localhost:8080'

function App() {
  const [users, setUsers] = useState([])
  const [formData, setFormData] = useState({ name: '', email: '', mobile: '' })
  const [formDataEdit, setFormDataEdit] = useState({ name: '', email: '', mobile: '' })
  const [addSection, setAddSection] = useState(false)
  const [editSection, setEditSection] = useState(false)

  const handleOnChange = (e) => {
    const { value, name } = e.target
    setFormData((prev) => {
      return { ...prev, [name]: value }
    })
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("/");
      if (response.data.success) {
        setUsers(response.data.data);
        console.log(response.data);
      } else {
        console.error("Error: Unsuccessful response", response.data);
      }
    } catch (error) {
      console.error("Error getting Users data", error);
    }
  };

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.post("/create", formData)
    console.log(response.data)
    setFormData({ name: '', email: '', mobile: '' })
    if (response.data.success) {
      setAddSection(false)
      alert(response.data.message)
      fetchData()
    }
  }

  const handleDelete = async (id) => {
    const data = await axios.delete('delete/' + id)
    fetchData()
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    const response = await axios.put(`/user/${formDataEdit.id}`, formDataEdit);
    console.log(response)
    if (response.data.success) {
      setEditSection(false)
      fetchData()
    }
  }

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target
    setFormDataEdit((prev) => {
      return {
        ...prev, [name]: value
      }
    })
  }

  const handleEdit = (el) => {
    setFormDataEdit({ ...el });
    setEditSection(true);
  };

  return (
    <>
      <div className='container'>
        <button className='btn btn-add' onClick={() => setAddSection(true)}>Add</button>

        {addSection && (
          <FormTable
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {
          editSection && (
            <FormTable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleClose={() => setEditSection(false)}
              rest={formDataEdit}
            />
          )
        }
        {
          users.length !== 0 && !addSection ? (
            <div className='tableContainer'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Mobile Number</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((el) => (
                    <tr key={el.id}>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                      <td>
                        <button className='btn btn-edit' onClick={() => handleEdit(el)}>Edit</button>
                        <button className='btn btn-delete' onClick={() => handleDelete(el.id)}>Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : <p style={{ textAlign: 'center' }}>No Users to show</p>
        }

      </div>
    </>
  );
}

export default App;
