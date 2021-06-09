/* eslint-disable camelcase */
/* eslint-disable max-len  */
import request from './utils';

const authUrls = {
    login: '/login',
    logout: '/logout',
    readMe: '/users/me',
};

const urlPrefix = '/api/common';
const urls = {
    // users
    readUser: '/users/<id>',
    readUsers: '/users',
    createUsers: '/users',
    updateUsers: '/users/<id>',
    deleteUsers: '/users/<id>',

    // tables
    readTablesList: '/tables/list',
};

Object.keys(urls).map((url) => {
    urls[url] = urlPrefix + urls[url];
    return url;
});

export default new function API() {
    // auth
    this.login = params => request.post('/login', params);
    this.logout = () => request.post(authUrls.logout);
    this.readMe = params => request.get(authUrls.readMe, params);
    this.GetReasonForLeave = () => request.get('/reason-for-leaves');

    this.PostLeaveApplication = params => request.post('/leave-applications', params);
    this.GetLeaveApplications = () => request.get('/leave-applications');
    this.DeleteLeaveApplications = id => request.delete(`/leave-applications/${id}`);

    this.GetPositions = () => request.get('/general/positions');
    this.PostPosition = params => request.post('/general/positions', params);
    this.DeletePosition = id => request.delete(`/general/positions/${id}`);
    this.GetUserTypes = () => request.get('/general/user-types');

    this.PostEmployees = params => request.post('/employees', params);
    this.GetAllEmployees = () => request.get('/employees');
    this.GetSingleEmployee = id => request.get(`/employees/${id}`);
    this.DeleteEmployee = id => request.delete(`/employees/${id}`);
    this.UpdateEmployee = (id, Form) => request.put(`/employees/${id}`, Form);
    // users
    this.readUser = id => request.get(urls.readUser.replace('<id>', id));
    this.readUsers = () => request.get(urls.readUsers, {});
    this.createUsers = params => request.post(urls.createUsers, params);
    this.updateUsers = (id, params) => request.put(urls.updateUsers.replace('<id>', id), params);
    this.deleteUsers = id => request.delete(urls.deleteUsers.replace('<id>', id));

    // table
    this.readTablesList = () => request.get(urls.readTablesList, {});
}();