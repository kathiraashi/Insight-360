var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Notification
var NotificationSchema = mongoose.Schema({
   Reference_Model: { type: String },
   Reference_Id: { type: Schema.Types.ObjectId, refPath: 'Reference_Model'},
   Reference_Key: { type: String, required: true },
   Notification_Key: { type: String, required: true },
   Message: { type: String },
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   User_Id: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   },
   { timestamps: true }
);
var VarNotificationSchema = mongoose.model('Notification', NotificationSchema, 'Notification_List');

var NotifySchema = mongoose.Schema({
   Notification_Id: { type: Schema.Types.ObjectId, ref: 'Notification'},
   Company_Id: { type : Schema.Types.ObjectId,ref: 'Company_Management' , required: true },
   User_Id: { type : Schema.Types.ObjectId, ref: 'User_Management' , required : true },
   If_Read: { type: Boolean, required: true },
   If_Notify: { type: Boolean, required: true },
   Read_Date: { type: Date},
   Notify_Date: { type: Date}
   },
   { timestamps: true }
);
var VarNotifySchema = mongoose.model('Notify', NotifySchema, 'Notify_List');

module.exports = {
   NotificationSchema : VarNotificationSchema,
   NotifySchema: VarNotifySchema
}