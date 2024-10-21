const express = require('express');
const trainerrouter = express.Router();
const trainercontroller = require('../controller/trainercontroller')
const usercontroller = require('../controller/usercontroller')

trainerrouter.post('/register',trainercontroller.createtrainer);
trainerrouter.delete('/delete/:id',trainercontroller.deletetrainer);
trainerrouter.patch('/update/:id',trainercontroller.updatetrainer);
trainerrouter.get('/users',trainercontroller.getalltrainers);
trainerrouter.post('/login',usercontroller.login);
trainerrouter.get('/:id',trainercontroller.gettrainer);
    
module.exports = trainerrouter;