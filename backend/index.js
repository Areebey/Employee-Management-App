const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 8080;
const EmployeeRouter = require('./Routes/EmployeeRoutes')

require('dotenv').config();
require('./Models/db');

app.use(cors());
app.use(bodyParser.json())

app.get('/',(req,res)=>{
    res.send('Server is running!')
})

app.use('/api/employees', EmployeeRouter)

app.listen(PORT, ()=>{
    console.log(`Server is Running on ${PORT}`)
})