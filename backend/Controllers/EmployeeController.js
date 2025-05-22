const EmployeeModel = require("../Models/EmployeeModel");

const createEmployee = async(req,res) => {
    try {
        const body = req.body
        body.profileImage = req.file ? req.file.path : null;
        console.log(body)
        const emp = new EmployeeModel(body);
        await emp.save()
        res.status(201).json({
            message: "Employee Created!",
            sucess: true,
        })        
        
    } catch (err) {
        res.status(500).json({
            message: "Internel server error",
            sucess: false,
            error: err
        })        
    }
}

const getAllEmployees = async(req,res) => {
    try {

        let {page, limit, search} = req.query;

        page = parseInt(page) || 1;
        limit = parseInt(limit) || 5;

        const skip = (page - 1) * limit;
        // page = 1 => (1-1) * 5 = 0;
        // page = 2 => (2-1) * 5 = 5; formula for skip

        let searchCriteria = {};
        if(search){
            searchCriteria = {
                name : {
                    $regex: search,
                    $options: 'i'  // case insensitive
                }
            }
        }

        const totalEmployees = await EmployeeModel.countDocuments(searchCriteria)
        const emps = await EmployeeModel.find(searchCriteria)
            .skip(skip)
            .limit(limit)
            .sort({updatedAt : - 1});

        const totalPages = Math.ceil(totalEmployees / limit)
        res.status(200).json({
            message: "All Employees",
            sucess: true,
            data: {
                employees : emps,
                pagination : {
                    totalEmployees,
                    currentPage : page,
                    totalPages,
                    pageSize : limit 
                }
            }
        })        
        
    } catch (err) {

        res.status(500).json({
            message: "Internel server error",
            sucess: false,
            error: err
        })        
    }
}

const getEmployeesById = async(req,res) => {
    try {
        const id = req.params.id
        const emp = await EmployeeModel.findOne({_id: id});
        res.status(200).json({
            message: "Get Employee Details",
            sucess: true,
            data: emp
        })        
        
    } catch (err) {
        res.status(500).json({
            message: "Internel server error",
            sucess: false,
            error: err
        })        
    }
}
const deleteEmployeeById = async(req,res) => {
    try {
        const id = req.params.id
        const emp = await EmployeeModel.findByIdAndDelete({_id: id});
        res.status(200).json({
            message: "Employee Deleted",
            sucess: true,
        })        
        
    } catch (err) {
        res.status(500).json({
            message: "Internel server error",
            sucess: false,
            error: err
        })        
    }
}
const updateEmployeeById = async(req,res) => {
    try {
        const {name, email, phone, department, salary} = req.body
        const {id} = req.params
        
        let updateData = {
            name, email, phone, department, salary, updatedAt: new Date()
        }
        if(req.file){
            updateData.profileImage = req.file.path;
        }

        const updateEmployee = await EmployeeModel.findByIdAndUpdate(
            id,
            updateData,
            {new: true}
        )
        if(!updateData){
            return res.status(404).json({message: "Employee not found!"});
        }
        res.status(200).json({
            message: "Employee Updated!",
            sucess: true,
            data: updateEmployee
        })        
        
    } catch (err) {
        res.status(500).json({
            message: "Internel server error",
            sucess: false,
            error: err
        })        
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeesById,
    deleteEmployeeById,
    updateEmployeeById
}