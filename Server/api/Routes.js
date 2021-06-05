const Express = require('express');

//Middlewares
const VerifyJWTToken = require('../Middlewares/VerifyJWTToken');

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

//Reason For Leave
const GetReasonForLeavesController = require('../controllers/ReasonForLeaves/GetReasonForLeavesController');
const PostReasonForLeavesController = require('../controllers/ReasonForLeaves/PostReasonForLeavesController');
const DeleteReasonForLeavesController = require('../controllers/ReasonForLeaves/DeleteReasonForLeavesController');

//Leave Application
const PostLeaveApplicationsController = require('../controllers/LeaveApplications/PostLeaveApplicationsController');
const DeleteLeaveApplicationsController = require('../controllers/LeaveApplications/DeleteLeaveApplicationsController');
const GetLeaveApplicationsController = require('../controllers/LeaveApplications/GetLeaveApplicationsController');
const Router = Express.Router();

Router.post('/login', PostLoginController);

//Position Routes
Router.get('/general/positions', [VerifyJWTToken], GetPositionController);
Router.put('/general/positions/:id', [VerifyJWTToken], PutPositionController);
Router.delete('/general/positions/:id', [VerifyJWTToken], DeletePositionsController);
Router.post('/general/positions', [VerifyJWTToken], PostPositionController);

//Employee Routes
Router.post('/employees', [VerifyJWTToken], PostEmployeeController);
Router.put('/employees/:id', [VerifyJWTToken], PutEmployeesController);
Router.delete('/employees/:id', [VerifyJWTToken], DeleteEmployeesController);
Router.get('/employees/:id', [VerifyJWTToken], GetEmployeesController.SingleRecord);
Router.get('/employees', [VerifyJWTToken], GetEmployeesController.GetAll);

//Reason For Leaves
Router.get('/reason-for-leaves', [VerifyJWTToken], GetReasonForLeavesController);
Router.post('/reason-for-leaves', [VerifyJWTToken], PostReasonForLeavesController);
Router.delete('/reason-for-leaves/:id', [VerifyJWTToken], DeleteReasonForLeavesController);

// Leave Application
Router.post('/leave-applications', [VerifyJWTToken], PostLeaveApplicationsController);
Router.delete('/leave-applications/:id', [VerifyJWTToken], DeleteLeaveApplicationsController);
Router.get('/leave-applications/:id', [VerifyJWTToken], GetLeaveApplicationsController.Single);
Router.get('/leave-applications', [VerifyJWTToken], GetLeaveApplicationsController.AllRecord);
module.exports = Router;