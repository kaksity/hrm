const Express = require('express');

//Employees Controllers
const PostLoginController = require('../controllers/Authentication/PostLoginController');
const DeleteEmployeesController = require('../controllers/Employees/DeleteEmployeesController');
const PostEmployeeController = require('../controllers/Employees/PostEmployeesController');
const PutEmployeesController = require('../controllers/Employees/PutEmployeesController');
const GetEmployeesController = require('../controllers/Employees/GetEmployeesController');

//Position Controllers;
const DeletePositionsController = require('../controllers/Position/DeletePositionsController');
const GetPositionController = require('../controllers/Position/GetPositionsController.js');
const PostPositionController = require('../controllers/Position/PostPositionsController');
const PutPositionController = require('../controllers/Position/PutPositionsController');

const Router = Express.Router();

Router.post('/login', PostLoginController);

//Position Routes
Router.get('/general/positions', GetPositionController);
Router.put('/general/positions/:id', PutPositionController);
Router.delete('/general/positions/:id', DeletePositionsController);
Router.post('/general/positions', PostPositionController);

//Employee Routes
Router.post('/employees', PostEmployeeController);
Router.put('/employees/:id', PutEmployeesController);
Router.delete('/employees/:id', DeleteEmployeesController);
Router.get('/employees/:id', GetEmployeesController.SingleRecord);
Router.get('/employees', GetEmployeesController.GetAll);

module.exports = Router;