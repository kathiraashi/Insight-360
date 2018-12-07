module.exports = function(app) {
   var LeadsController = require('./../../controller/Lead/Lead.controller.js');
   var LogPhoneCallController = require('./../../controller/Lead/Log_Phone_Call.controller.js');
   var CallScheduleController = require('./../../controller/Lead/Call_Schedule.controller.js');

   // Lead Routes
   app.post('/API/Leads/Phone_AsyncValidators', LeadsController.Phone_AsyncValidators);
   app.post('/API/Leads/Leads_Create', LeadsController.Leads_Create);
   app.post('/API/Leads/Leads_List', LeadsController.Leads_List);
   app.post('/API/Leads/Leads_View', LeadsController.Leads_View);
   app.post('/API/Leads/Leads_Simple_List', LeadsController.Leads_Simple_List);

   // Log Phone Call
   app.post('/API/Log_Phone_Call/Log_Phone_Call_Create', LogPhoneCallController.LogPhoneCall_Create);
   app.post('/API/Log_Phone_Call/Log_Phone_Call_List', LogPhoneCallController.LogPhoneCall_List);
   app.post('/API/Log_Phone_Call/Filtered_Log_Phone_Call_List', LogPhoneCallController.FilteredLogPhoneCall_List);

   // Call Schedule
   app.post('/API/Call_Schedule/Call_Schedule_Create', CallScheduleController.CallSchedule_Create);
   app.post('/API/Call_Schedule/Call_Schedule_List', CallScheduleController.CallSchedule_List);
   app.post('/API/Call_Schedule/Filtered_Call_Schedule_List', CallScheduleController.FilteredCallSchedule_List);


}