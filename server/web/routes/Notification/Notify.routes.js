module.exports = function(app) {
   var NotifyController = require('./../../controller/Notification/Notify.controller.js');
   // Notify
   app.post('/API/Notification/Notify_List', NotifyController.Notify_List);
   app.post('/API/Notification/Notify_Update', NotifyController.Notify_Update);
}