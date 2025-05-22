import React, { useEffect, useState } from 'react'
import { CreateEmployee, UpdateEmployeeById } from '../api'
import { notify } from '../utils'

const AddEmployee = ({showModal, setShowModal, fetchEmployees, updateEmpObj }) => {


    const [employee, setEmployee] = useState({
        name: '',
        email: '',
        phone: '',
        department: '',
        salary: '',
        profileImage: null
    })

    const [updateMode, setUpdateMode] = useState(false)
    useEffect(()=>{
        if(updateEmpObj){
            setUpdateMode(true);
            setEmployee(updateEmpObj)
        }
    },[updateEmpObj])
    const resetEmployeeState = () => {
        setEmployee({
             name: '',
             email: '',
             phone: '',
             department: '',
             salary: '',
             profileImage: null
        })
    }
    const handleClose = () =>{
        setShowModal(false)
    }

    const handleChange = (e) => {
        const {name, value} = e.target;
        setEmployee({...employee, [name]: value})

    }

    const handleFileChange = (e) => {
        setEmployee({...employee, profileImage: e.target.files[0]})
    }

    // Add and Update 
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(employee)
        try {
            const {sucess, message} = 
            updateMode ? 
            await UpdateEmployeeById(employee, employee._id) :
            await CreateEmployee(employee)
            console.log(sucess,message)
            if(sucess){
                notify(message, 'sucess')
            }else{
                notify(message, 'error')
            }
            setShowModal(false);
            resetEmployeeState();
            fetchEmployees();
            setUpdateMode(false)
        } catch (error) {
            console.log('Error', error)
            notify('Failed to create employee!', 'error')
        }
        // setShowModal(false);
        // resetEmployeeState();
        // fetchEmployees();
    }
    
  return (
    <div className={`modal ${showModal ? 'd-block' : ''}`}
         tabIndex={-1} role='dialog' style={{display: showModal ? 'block' : 'none'}}
    >
        <div className='modal-dialog' role='document'>
            <div className='modal-content'>
                <div className='modal-header'>
                    <h4>
                        {updateMode ? 'Update Employee' : 'Add Employee'}
                    </h4>
                    <button type='button' className='btn-close' onClick={() => handleClose() } ></button>
                </div>
                <div className='modal-body'>
                    <form onSubmit={(e)=> handleSubmit(e)}>
                        <div className='mb-3'>
                            <label className='form-label'>Name</label>
                            <input 
                            type='text'
                            className='form-control'
                            name='name'
                            value={employee.name}
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Email</label>
                            <input 
                            type='email'
                            className='form-control'
                            name='email'
                            value={employee.email}
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Phone</label>
                            <input 
                            type='text'
                            className='form-control'
                            name='phone'
                            value={employee.phone}
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Department</label>
                            <input 
                            type='text'
                            className='form-control'
                            name='department'
                            value={employee.department}
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Salary</label>
                            <input 
                            type='text'
                            className='form-control'
                            name='salary'
                            value={employee.salary}
                            onChange={handleChange} 
                            required
                            />
                        </div>
                        <div className='mb-3'>
                            <label className='form-label'>Profile Image</label>
                            <input 
                            type='file'
                            className='form-control'
                            name='profileImage'
                            onChange={handleFileChange} 
                            
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            {updateMode ? 'Update' : 'Save'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default AddEmployee