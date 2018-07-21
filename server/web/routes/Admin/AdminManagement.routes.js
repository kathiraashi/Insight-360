module.exports = function(app) {

   var Controller = require('./../../controller/Admin/AdminManagement.controller.js');

   
   app.post('/API/AdminManagement/User_Name_Validate', Controller.User_Name_Validate);
   app.post('/API/AdminManagement/User_Create', Controller.User_Create);
   app.post('/API/AdminManagement/Users_List', Controller.Users_List);
   app.post('/API/AdminManagement/UserTypeBased_SimpleUsersList', Controller.UserTypeBased_SimpleUsersList);


   app.post('/API/AdminManagement/Create_UserTypes', Controller.Create_UserTypes);
   app.post('/API/AdminManagement/UserTypes_List', Controller.UserTypes_List);
   app.post('/API/AdminManagement/Create_Project_Modules', Controller.Create_Project_Modules);
   app.post('/API/AdminManagement/Create_Project_SubModules', Controller.Create_Project_SubModules);

   app.post('/API/AdminManagement/ModulesAndSubModules_List', Controller.ModulesAndSubModules_List);
   app.post('/API/AdminManagement/Create_Permissions_Group', Controller.Create_Permissions_Group);
   app.post('/API/AdminManagement/PermissionsGroup_SimpleList', Controller.PermissionsGroup_SimpleList);
   app.post('/API/AdminManagement/UserTypeBased_PermissionsGroup_SimpleList', Controller.UserTypeBased_PermissionsGroup_SimpleList);
   app.post('/API/AdminManagement/GroupPermission_ModulesAndSubModules_List', Controller.GroupPermission_ModulesAndSubModules_List);

};