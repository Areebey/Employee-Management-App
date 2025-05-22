import React, {useEffect, useState} from 'react'
import EmployeeTable from './EmployeeTable'
import { GetAllEmployees, DeleteEmployeeById } from '../api'
import AddEmployee from './AddEmployee'
import { ToastContainer } from 'react-toastify'
import { notify } from '../utils'


const EmployeeManagementApp = () => {

    const [showModal, setShowModal] = useState(false)
    const [updateEmpObj, setUpdateEmpObj] = useState(null)
    const [employeeData, setEmployeeData] = useState({
        "employees":[],
        "pagination":{
            "totalEmployees":0,
            "currentPage":1,
            "totalPages":1,
            "pageSize":5
        }
    })    
    const fetchEmployees = async (search = '', page = 1, limit = 5) =>{
        try {
            const {data} = await GetAllEmployees(search, page, limit);
            console.log(data)
            setEmployeeData(data)
        } catch (error) {
            console.log('Error',error)
        }
    }

    useEffect(() => {
        fetchEmployees();
    },[])

    const handleAddEmployee = () => {
        setShowModal(true)
    }

    const handleUpdateEmployee = (empObj) => {
        console.log('Update Obj', empObj);
        setUpdateEmpObj(empObj);
        setShowModal(true)
    }

    const handleDeleteEmployee = async (emp) => {
        try {
            const {sucess, message} = await DeleteEmployeeById(emp._id);
            // console.log(data)
         if(sucess){
            notify(message, 'sucess')
        }else{
            notify(message, 'error')
        }
        fetchEmployees()
        } catch (error) {
            console.log('Error', error)
            notify(error, 'error')
        }
    }

    const handleSearch = (e) => {
        const term = e.target.value;
        fetchEmployees(term);
    }

  return (
    <div className='w-100 p-3 d-flex flex-column justify-content-center align-items-center'>
        <h1>Employee Management App</h1>
        <div className='w-100 d-flex justify-content-center'>
            <div className='w-80 border bg-light p-3' style={{width:'80%'}}>
                <div className='d-flex justify-content-between mb-3'>
                    <button 
                    className='btn btn-primary'
                    onClick={()=> handleAddEmployee()}>
                        Add
                    </button>
                    <input type='text' placeholder='Search Employees' onChange={handleSearch} className='form-control w-50 ' />
                </div>
                <EmployeeTable
                 handleDeleteEmployee = {handleDeleteEmployee} 
                 handleUpdateEmployee = {handleUpdateEmployee}
                 employees={employeeData.employees}
                 pagination={employeeData.pagination}
                 fetchEmployees={fetchEmployees}
                  />

                 <AddEmployee
                 updateEmpObj={updateEmpObj}
                 fetchEmployees={fetchEmployees}
                 showModal={showModal}
                 setShowModal={setShowModal} 
                 /> 
            </div>
        </div>
                <ToastContainer
                 position='top-right' 
                 autoClose={300}
                 hideProgressBar={false}
                 />
    </div>
  )
}

export default EmployeeManagementApp