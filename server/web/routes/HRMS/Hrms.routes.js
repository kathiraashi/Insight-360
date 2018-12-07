module.exports = function(app) {
   var HrmsLeavesController = require('./../../controller/HRMS/Leaves.controller.js');
   var HrmsOnDutyController = require('./../../controller/HRMS/OnDuty.controller.js');
   var HrmsPermissionController = require('./../../controller/HRMS/Permission.controller.js');
   var HrmsAdvanceController = require('./../../controller/HRMS/Advance.controller');

   // Hrms Leave Customer
   app.post('/API/Hrms/Leaves_Create', HrmsLeavesController.HrmsLeaves_Create);
   app.post('/API/Hrms/Leaves_List', HrmsLeavesController.HrmsLeaves_List);
   app.post('/API/Hrms/Leaves_Edit', HrmsLeavesController.HrmsLeaves_Edit);
   app.post('/API/Hrms/Leaves_View', HrmsLeavesController.HrmsLeaves_View);
   app.post('/API/Hrms/Leaves_Requesting', HrmsLeavesController.HrmsLeaves_Requesting);
   app.post('/API/Hrms/Leaves_Approve', HrmsLeavesController.HrmsLeaves_Approve);
   app.post('/API/Hrms/Leaves_Reject', HrmsLeavesController.HrmsLeaves_Reject);
   app.post('/API/Hrms/Leaves_Modify', HrmsLeavesController.HrmsLeaves_Modify);
   // Hrms OnDuty Customer
   app.post('/API/Hrms/OnDuty_Create', HrmsOnDutyController.HrmsOnDuty_Create);
   app.post('/API/Hrms/OnDuty_List', HrmsOnDutyController.HrmsOnDuty_List);
   app.post('/API/Hrms/OnDuty_Edit', HrmsOnDutyController.HrmsOnDuty_Edit);
   app.post('/API/Hrms/OnDuty_View', HrmsOnDutyController.HrmsOnDuty_View);
   app.post('/API/Hrms/OnDuty_Requesting', HrmsOnDutyController.HrmsOnDuty_Requesting);
   app.post('/API/Hrms/OnDuty_Approve', HrmsOnDutyController.HrmsOnDuty_Approve);
   app.post('/API/Hrms/OnDuty_Reject', HrmsOnDutyController.HrmsOnDuty_Reject);
   app.post('/API/Hrms/OnDuty_Modify', HrmsOnDutyController.HrmsOnDuty_Modify);
   // Hrms Permission Customer
   app.post('/API/Hrms/Permission_Create', HrmsPermissionController.HrmsPermission_Create);
   app.post('/API/Hrms/Permission_List', HrmsPermissionController.HrmsPermission_List);
   app.post('/API/Hrms/Permission_Edit', HrmsPermissionController.HrmsPermission_Edit);
   app.post('/API/Hrms/Permission_View', HrmsPermissionController.HrmsPermission_View);
   app.post('/API/Hrms/Permission_Requesting', HrmsPermissionController.HrmsPermission_Requesting);
   app.post('/API/Hrms/Permission_Approve', HrmsPermissionController.HrmsPermission_Approve);
   app.post('/API/Hrms/Permission_Reject', HrmsPermissionController.HrmsPermission_Reject);
   app.post('/API/Hrms/Permission_Modify', HrmsPermissionController.HrmsPermission_Modify);
   // Hrms Advance Customer
   app.post('/API/Hrms/Advance_Create', HrmsAdvanceController.HrmsAdvance_Create);
   app.post('/API/Hrms/Advance_List', HrmsAdvanceController.HrmsAdvance_List);
   app.post('/API/Hrms/Advance_Edit', HrmsAdvanceController.HrmsAdvance_Edit);
   app.post('/API/Hrms/Advance_View', HrmsAdvanceController.HrmsAdvance_View);
   app.post('/API/Hrms/Advance_Requesting', HrmsAdvanceController.HrmsAdvance_Requesting);
   app.post('/API/Hrms/Advance_Approve', HrmsAdvanceController.HrmsAdvance_Approve);
   app.post('/API/Hrms/Advance_Reject', HrmsAdvanceController.HrmsAdvance_Reject);
   app.post('/API/Hrms/Advance_Modify', HrmsAdvanceController.HrmsAdvance_Modify);
}