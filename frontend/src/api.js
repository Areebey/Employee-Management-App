
// const BASE_URL = 'http://localhost:8080'
const BASE_URL = import.meta.env.VITE_REACT_APP_BACKEND_BASEURL

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method:'GET',
            'Content-Type': 'application/json'
        }
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error   
    }
}

export const CreateEmployee = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    try {
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key, empObj[key])
        }
        const options = {
            method:'POST',
            'Content-Type': 'application/json',
            body: formData
        }
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error   
    }
}

export const UpdateEmployeeById = async (empObj, id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {
        const formData = new FormData();
        for(const key in empObj){
            formData.append(key, empObj[key])
        }
        const options = {
            method:'PUT',
            'Content-Type': 'application/json',
            body: formData
        }
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error   
    }
}

export const DeleteEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {        
        const options = {
            method:'DELETE',
            'Content-Type': 'application/json',
        }
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error   
    }
}

export const GetEmployeeById = async (id) => {
    const url = `${BASE_URL}/api/employees/${id}`;
    try {        
        const options = {
            method:'GET',
            'Content-Type': 'application/json',
        }
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error   
    }
}