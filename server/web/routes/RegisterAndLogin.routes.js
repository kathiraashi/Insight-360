module.exports = function(app) {

   var Controller = require('../controller/RegisterAndLogin.controller.js');

   app.post('/API/RegisterAndLogin/User_Validate', Controller.User_Validate);
   app.post('/API/RegisterAndLogin/User_Register', Controller.User_Register);

};
