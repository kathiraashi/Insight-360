module.exports = function(app) {

    var Controller = require('../../controller/settings/Company_Settings.controller.js');

 // Registration Type -----------------------------------------------
    app.post('/API/Company_Settings/RegistrationType_AsyncValidate', Controller.RegistrationType_AsyncValidate);
    app.post('/API/Company_Settings/Registration_Type_Create', Controller.Registration_Type_Create);
    app.post('/API/Company_Settings/Registration_Type_List', Controller.Registration_Type_List);
    app.post('/API/Company_Settings/Registration_Type_SimpleList', Controller.Registration_Type_SimpleList);
    app.post('/API/Company_Settings/Registration_Type_Update', Controller.Registration_Type_Update);
    app.post('/API/Company_Settings/Registration_Type_Delete', Controller.Registration_Type_Delete);

   // Registration Info -----------------------------------------------
   // app.post('/API/Company_Settings/RegistrationType_AsyncValidate', Controller.RegistrationType_AsyncValidate);
    app.post('/API/Company_Settings/Registration_Info_Create', Controller.Registration_Info_Create);
    app.post('/API/Company_Settings/Registration_Info_List', Controller.Registration_Info_List);
    app.post('/API/Company_Settings/Registration_Info_Update', Controller.Registration_Info_Update);
    app.post('/API/Company_Settings/Registration_Info_Delete', Controller.Registration_Info_Delete);

   // Departments -----------------------------------------------
      app.post('/API/Company_Settings/Departments_AsyncValidate', Controller.Departments_AsyncValidate);
      app.post('/API/Company_Settings/Departments_Create', Controller.Departments_Create);
      app.post('/API/Company_Settings/Departments_List', Controller.Departments_List);
      app.post('/API/Company_Settings/Departments_Simple_List', Controller.Departments_Simple_List);
      app.post('/API/Company_Settings/Departments_Update', Controller.Departments_Update);
      app.post('/API/Company_Settings/Departments_Delete', Controller.Departments_Delete);

   // Pf Info -----------------------------------------------
      app.post('/API/Company_Settings/PfInfo_AsyncValidate', Controller.PfInfo_AsyncValidate);
      app.post('/API/Company_Settings/PfInfo_Create', Controller.PfInfo_Create);
      app.post('/API/Company_Settings/PfInfo_List', Controller.PfInfo_List);
      app.post('/API/Company_Settings/PfInfo_Simple_List', Controller.PfInfo_Simple_List);
      app.post('/API/Company_Settings/pfInfo_Update', Controller.pfInfo_Update);
      app.post('/API/Company_Settings/PfInfo_Delete', Controller.PfInfo_Delete);

   // Esi Info -----------------------------------------------
      app.post('/API/Company_Settings/EsiInfo_AsyncValidate', Controller.EsiInfo_AsyncValidate);
      app.post('/API/Company_Settings/EsiInfo_Create', Controller.EsiInfo_Create);
      app.post('/API/Company_Settings/EsiInfo_List', Controller.EsiInfo_List);
      app.post('/API/Company_Settings/EsiInfo_Simple_List', Controller.EsiInfo_Simple_List);
      app.post('/API/Company_Settings/EsiInfo_Update', Controller.EsiInfo_Update);
      app.post('/API/Company_Settings/EsiInfo_Delete', Controller.EsiInfo_Delete);

    // Pt Info -----------------------------------------------
      app.post('/API/Company_Settings/PtInfo_AsyncValidate', Controller.PtInfo_AsyncValidate);
      app.post('/API/Company_Settings/PtInfo_Create', Controller.PtInfo_Create);
      app.post('/API/Company_Settings/PtInfo_List', Controller.PtInfo_List);
      app.post('/API/Company_Settings/PtInfo_Simple_List', Controller.PtInfo_Simple_List);
      app.post('/API/Company_Settings/PtInfo_Update', Controller.PtInfo_Update);
      app.post('/API/Company_Settings/PtInfo_Delete', Controller.PtInfo_Delete);

    // It Info -----------------------------------------------
      app.post('/API/Company_Settings/ItInfo_AsyncValidate', Controller.ItInfo_AsyncValidate);
      app.post('/API/Company_Settings/ItInfo_Create', Controller.ItInfo_Create);
      app.post('/API/Company_Settings/ItInfo_List', Controller.ItInfo_List);
      app.post('/API/Company_Settings/ItInfo_Simple_List', Controller.ItInfo_Simple_List);
      app.post('/API/Company_Settings/ItInfo_Update', Controller.ItInfo_Update);
      app.post('/API/Company_Settings/ItInfo_Delete', Controller.ItInfo_Delete);

   // Branch Info -----------------------------------------------
      app.post('/API/Company_Settings/Branch_Create', Controller.Branch_Create);
      app.post('/API/Company_Settings/Branch_List', Controller.Branch_List);
      app.post('/API/Company_Settings/Branch_Simple_List', Controller.Branch_Simple_List);
      app.post('/API/Company_Settings/Branch_Update', Controller.Branch_Update);
      app.post('/API/Company_Settings/Branch_Delete', Controller.Branch_Delete);

   // Contact Info -----------------------------------------------
      app.post('/API/Company_Settings/Contact_Info_Create', Controller.Contact_Info_Create);
      app.post('/API/Company_Settings/Contact_Info_List', Controller.Contact_Info_List);
      app.post('/API/Company_Settings/Contact_Info_Update', Controller.Contact_Info_Update);
      app.post('/API/Company_Settings/Contact_Info_Delete', Controller.Contact_Info_Delete);
}