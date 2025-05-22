const {createEmployee, 
    getAllEmployees,
    getEmployeesById,
    deleteEmployeeById,
    updateEmployeeById,
    
} = require('../Controllers/EmployeeController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUpload');

const routes = require('express').Router()

// routes.get('/',(req,res)=>{
//     res.send('Get All Employees')
// });

routes.get('/', getAllEmployees);

routes.get('/:id', getEmployeesById);

routes.post('/', cloudinaryFileUploader.single('profileImage') ,createEmployee)

routes.put('/:id', cloudinaryFileUploader.single('profileImage') ,updateEmployeeById)

routes.delete('/:id', deleteEmployeeById)

module.exports = routes