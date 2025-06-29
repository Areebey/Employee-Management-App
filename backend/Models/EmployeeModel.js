const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    phone:{
        type:Number,
        required: true
    },
    department:{
        type:String,
        required: true
    },
    profileImage:{
        type:String,
    },
    salary:{
        type:String,
        required: true
    },
    createdAt:{
        type: Date,
        default: new Date()
    },
    updatedAt:{
        type: Date,
        default: new Date()
    },
})

const EmployeeModel = mongoose.model('employees', EmployeeSchema);
module.exports = EmployeeModel;
