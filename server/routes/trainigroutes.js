const express = require('express');
const trainingrouter = express.Router();
const trainingcontroller = require('../controller/trainingController')


trainingrouter.post('/add',trainingcontroller.createtraining);
trainingrouter.delete('/delete/:id',trainingcontroller.deletetraining);
trainingrouter.patch('/update/:id',trainingcontroller.updatetraining);
trainingrouter.get('/training',trainingcontroller.getalltrainings);
trainingrouter.get('/:id',trainingcontroller.gettraining);
trainingrouter.patch('/assignuser',trainingcontroller.assignuser);

module.exports = trainingrouter;