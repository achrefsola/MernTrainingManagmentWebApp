const express = require('express');

const userrouter = express.Router();
const usercontroller = require('../controller/usercontroller')

userrouter.post('/register',usercontroller.createuser);
userrouter.delete('/delete/:id',usercontroller.deleteuser);
userrouter.patch('/update/:id',usercontroller.updateUser);
userrouter.get('/users',usercontroller.getallusers);
userrouter.post('/login',usercontroller.login);
userrouter.get('/:id',usercontroller.getuser);
userrouter.post('/emails',usercontroller.getUserEmailsByIds);




module.exports = userrouter;