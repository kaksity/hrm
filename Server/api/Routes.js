const Express = require('express');

//Middlewares
const VerifyJWTToken = require('../Middlewares/VerifyJWTToken');
const VerifyAdminStatus = require('../Middlewares/VerifyAdminStatus');

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
const PutLeaveApplicationsController = require('../controllers/LeaveApplications/PutLeaveApplicationsController');

// Notice Boards
const GetNoticeBoardsController = require('../controllers/NoticeBoards/GetNoticeBoardsController');

//User Types
const GetUserTypesController = require('../controllers/UserTypes/GetUserTypesController');
const DeleteNoticeBoardsController = require('../controllers/NoticeBoards/DeleteNoticeBoardsController');
const PutNoticeBoardsController = require('../controllers/NoticeBoards/PutNoticeBoardsController');
const PostNoticeBoardsController = require('../controllers/NoticeBoards/PostNoticeBoardsController');
const Router = Express.Router();

Router.post('/login', PostLoginController);

//Position Routes
Router.get('/general/positions', [VerifyJWTToken], GetPositionController);
Router.put('/general/positions/:id', [VerifyJWTToken, VerifyAdminStatus], PutPositionController);
Router.delete('/general/positions/:id', [VerifyJWTToken, VerifyAdminStatus], DeletePositionsController);
Router.post('/general/positions', [VerifyJWTToken, VerifyAdminStatus], PostPositionController);

//User Types
Router.get('/general/user-types', [VerifyJWTToken], GetUserTypesController);

//Employee Routes
Router.post('/employees', [VerifyJWTToken, VerifyAdminStatus], PostEmployeeController);
Router.put('/employees/:id', [VerifyJWTToken, VerifyAdminStatus], PutEmployeesController);
Router.delete('/employees/:id', [VerifyJWTToken, VerifyAdminStatus], DeleteEmployeesController);
Router.get('/employees/:id', [VerifyJWTToken], GetEmployeesController.SingleRecord);
Router.get('/employees', [VerifyJWTToken], GetEmployeesController.GetAll);

//Reason For Leaves
Router.get('/reason-for-leaves', [VerifyJWTToken], GetReasonForLeavesController);
Router.post('/reason-for-leaves', [VerifyJWTToken, VerifyAdminStatus], PostReasonForLeavesController);
Router.delete('/reason-for-leaves/:id', [VerifyJWTToken, VerifyAdminStatus], DeleteReasonForLeavesController);

// Notice Board
Router.post('/notice-boards', [VerifyJWTToken, VerifyAdminStatus], PostNoticeBoardsController)
Router.get('/notice-boards', [VerifyJWTToken], GetNoticeBoardsController.AllRecord);
Router.get('/notice-boards/:id', [VerifyJWTToken], GetNoticeBoardsController.Single);
Router.put('/notice-boards/:id', [VerifyJWTToken, VerifyAdminStatus], PutNoticeBoardsController);
Router.delete('/notice-boards/:id', [VerifyJWTToken, VerifyAdminStatus], DeleteNoticeBoardsController);

// Leave Application
Router.post('/leave-applications', [VerifyJWTToken], PostLeaveApplicationsController);
Router.delete('/leave-applications/:id', [VerifyJWTToken], DeleteLeaveApplicationsController);
Router.get('/leave-applications', [VerifyJWTToken], GetLeaveApplicationsController.AllRecord);
Router.get('/leave-applications/admin/', [VerifyJWTToken, VerifyAdminStatus], GetLeaveApplicationsController.AdminAllRecord);
Router.get('/leave-applications/admin/details/:id', [VerifyJWTToken, VerifyAdminStatus], GetLeaveApplicationsController.AdminSingle);
Router.put('/leave-applications/admin/details/:id', [VerifyJWTToken, VerifyAdminStatus], PutLeaveApplicationsController);
Router.get('/leave-applications/:id', [VerifyJWTToken], GetLeaveApplicationsController.Single);

module.exports = Router;