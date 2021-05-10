const DotEnv = require('dotenv');
DotEnv.config();
const Http = require('http');
const App = require('./App');
const DBConnection = require('./Config/Db');
const Server = Http.createServer(App);
const HostName = process.env.HOSTNAME || 'localhost';
const Port = process.env.PORT || 20000;

Server.listen(Port, HostName, (err) => {
    if (err) {
        console.log(`Server Could not Start. Check for Possible Error`);
    } else {
        console.log(`Server is up and running at http://${HostName}:${Port}`);
    }
});

DBConnection.authenticate().then(() => {
    console.log('Connected to Database Successfully');
}).catch(() => {
    console.log('Unable to Connect to the Database');
});