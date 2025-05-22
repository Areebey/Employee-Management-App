import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { GetEmployeeById } from '../api'

const EmployeeDetails = () => {

  const { id } = useParams()
  // console.log(id)
  const [empDetails, setEmpDetails] = useState({})
  const navigate = useNavigate()

  const fetchEmpById = async () => {
    try {
      const { data } = await GetEmployeeById(id)
      // console.log(data);
      setEmpDetails(data)

    } catch (error) {
      // console.log('Error', error)
      notify('Failed to fetch employee!', 'error')
    }
  }
  useEffect(() => {
    fetchEmpById()
  }, [id])

  return (
    <div className='container mt-5'>
      <div className='card'>
        <div className='card-header'>
          <h2>Employee Details</h2>
        </div>
        <div className='card-body'>
          <div className='row mb-3'>
            <div className='col md-3'>
              <img
              src={empDetails.profileImage}
              alt={empDetails.name}
              className='img-fluid rounded'
              />
            </div>
            <div className='col md-9'>
              <h3>{empDetails.name}</h3>
              <p><strong>Email : </strong>{empDetails.email}</p>
              <p><strong>Phone : </strong>{empDetails.phone}</p>
              <p><strong>Department : </strong>{empDetails.department}</p>
              <p><strong>Salary : </strong>{empDetails.salary}</p>
              {/* <p><strong>Email :</strong>{empDetails.email}</p> */}
            </div>
          </div>
          <button className='btn btn-primary' onClick={() => navigate('/employee')}>Back</button>
        </div>
      </div>
    </div>
  ) 
}

export default EmployeeDetails
