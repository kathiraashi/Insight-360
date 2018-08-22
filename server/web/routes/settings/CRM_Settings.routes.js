module.exports = function(app) {

      var Controller = require('../../controller/settings/CRM_Settings.controller.js');

   // Industry Type -----------------------------------------------
      app.post('/API/CRM_Settings/IndustryType_AsyncValidate', Controller.IndustryType_AsyncValidate);
      app.post('/API/CRM_Settings/Industry_Type_Create', Controller.Industry_Type_Create);
      app.post('/API/CRM_Settings/Industry_Type_List', Controller.Industry_Type_List);
      app.post('/API/CRM_Settings/Industry_Type_SimpleList', Controller.Industry_Type_SimpleList);
      app.post('/API/CRM_Settings/Industry_Type_Update', Controller.Industry_Type_Update);
      app.post('/API/CRM_Settings/Industry_Type_Delete', Controller.Industry_Type_Delete);

      
   // Ownership Type -----------------------------------------------
      app.post('/API/CRM_Settings/OwnershipType_AsyncValidate', Controller.OwnershipType_AsyncValidate);
      app.post('/API/CRM_Settings/Ownership_Type_Create', Controller.Ownership_Type_Create);
      app.post('/API/CRM_Settings/Ownership_Type_List', Controller.Ownership_Type_List);
      app.post('/API/CRM_Settings/Ownership_Type_SimpleList', Controller.Ownership_Type_SimpleList);
      app.post('/API/CRM_Settings/Ownership_Type_Update', Controller.Ownership_Type_Update);
      app.post('/API/CRM_Settings/Ownership_Type_Delete', Controller.Ownership_Type_Delete);

   // Activity Type --------------------------------------------------
      app.post('/API/CRM_Settings/ActivityType_AsyncValidate', Controller.ActivityType_AsyncValidate);
      app.post('/API/CRM_Settings/Activity_Type_Create', Controller.Activity_Type_Create); 
      app.post('/API/CRM_Settings/Activity_Type_List', Controller.Activity_Type_List); 
      app.post('/API/CRM_Settings/Activity_Type_SimpleList', Controller.Activity_Type_SimpleList); 
      app.post('/API/CRM_Settings/Activity_Type_Update', Controller.Activity_Type_Update); 
      app.post('/API/CRM_Settings/Activity_Type_Delete', Controller.Activity_Type_Delete);      
      
   // Activity Status --------------------------------------------------
      app.post('/API/CRM_Settings/ActivityStatus_AsyncValidate', Controller.ActivityStatus_AsyncValidate);
      app.post('/API/CRM_Settings/Activity_Status_Create', Controller.Activity_Status_Create); 
      app.post('/API/CRM_Settings/Activity_Status_List', Controller.Activity_Status_List); 
      app.post('/API/CRM_Settings/Activity_Status_SimpleList', Controller.Activity_Status_SimpleList); 
      app.post('/API/CRM_Settings/Activity_Status_Update', Controller.Activity_Status_Update); 
      app.post('/API/CRM_Settings/Activity_Status_Delete', Controller.Activity_Status_Delete); 

   // Activity Priority --------------------------------------------------
      app.post('/API/CRM_Settings/ActivityPriority_AsyncValidate', Controller.ActivityPriority_AsyncValidate);
      app.post('/API/CRM_Settings/Activity_Priority_Create', Controller.Activity_Priority_Create); 
      app.post('/API/CRM_Settings/Activity_Priority_List', Controller.Activity_Priority_List); 
      app.post('/API/CRM_Settings/Activity_Priority_SimpleList', Controller.Activity_Priority_SimpleList); 
      app.post('/API/CRM_Settings/Activity_Priority_Update', Controller.Activity_Priority_Update); 
      app.post('/API/CRM_Settings/Activity_Priority_Delete', Controller.Activity_Priority_Delete); 

   // Contact role --------------------------------------------------
      app.post('/API/CRM_Settings/ContactRole_AsyncValidate', Controller.ContactRole_AsyncValidate);
      app.post('/API/CRM_Settings/Contact_Role_Create', Controller.Contact_Role_Create); 
      app.post('/API/CRM_Settings/Contact_Role_List', Controller.Contact_Role_List); 
      app.post('/API/CRM_Settings/Contact_Role_SimpleList', Controller.Contact_Role_SimpleList); 
      app.post('/API/CRM_Settings/Contact_Role_Update', Controller.Contact_Role_Update); 
      app.post('/API/CRM_Settings/Contact_Role_Delete', Controller.Contact_Role_Delete); 

      
   // pipelinestatus role --------------------------------------------------
      app.post('/API/CRM_Settings/PipelineStatus_AsyncValidate', Controller.PipelineStatus_AsyncValidate);
      app.post('/API/CRM_Settings/Pipeline_Status_Create', Controller.Pipeline_Status_Create); 
      app.post('/API/CRM_Settings/Pipeline_Status_List', Controller.Pipeline_Status_List); 
      app.post('/API/CRM_Settings/Pipeline_Status_SimpleList', Controller.Pipeline_Status_SimpleList); 
      app.post('/API/CRM_Settings/Pipeline_Status_Update', Controller.Pipeline_Status_Update); 
      app.post('/API/CRM_Settings/Pipeline_Status_Delete', Controller.Pipeline_Status_Delete); 
};