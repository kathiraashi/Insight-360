// Default Modules
   import { NgModule } from '@angular/core';
   import { CommonModule} from '@angular/common';
   import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
   import { BrowserModule } from '@angular/platform-browser';
   import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
   import { FormsModule, ReactiveFormsModule } from '@angular/forms';
   import { HttpModule } from '@angular/http';
   import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
   import { RouterModule, Routes } from '@angular/router';

// Default Components
   import { AppComponent } from './app.component';

// Future Modules
   import { ModalModule, AccordionModule} from 'ngx-bootstrap';
   import {CalendarModule} from 'primeng/calendar';
   import {MatButtonModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, MatMenuModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
   import {MatRadioModule} from '@angular/material/radio';
   import {NgSelectModule } from '@ng-select/ng-select';


// Custom Modules
   import { AppRoutingModule } from './app.routing.module';
   import { AuthGuard } from './Authentication/auth.guard';

// Custom Components
   // Component Folder
      // Common-Components ---------------------------------------------------
         import { DeleteConfirmationComponent } from './Components/Common-Components/delete-confirmation/delete-confirmation.component';
         import { HeaderComponent } from './Components/Common-Components/header/header.component';
         import { LoginComponent } from './Components/Common-Components/login/login.component';
      // Settings Folder ----------------------------------------------------
         // CRM Settings Folder
            import { MainCrmSettingsComponent } from './Components/Settings/CRM-Settings/main-crm-settings/main-crm-settings.component';
            // Sub Components Folder
               import { AccountTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/account-type-crm-settings/account-type-crm-settings.component';
               import { IndustryTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/industry-type-crm-settings/industry-type-crm-settings.component';
               import { OwnerShipTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/owner-ship-type-crm-settings/owner-ship-type-crm-settings.component';
               import { ActivityTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-type-crm-settings/activity-type-crm-settings.component';
               import { ActivityStatusTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-status-type-crm-settings/activity-status-type-crm-settings.component';
               import { ActivityPriorityTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/activity-priority-type-crm-settings/activity-priority-type-crm-settings.component';
               import { PipeLineStatusTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/pipe-line-status-type-crm-settings/pipe-line-status-type-crm-settings.component';
               import { ContactRoleTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/contact-role-type-crm-settings/contact-role-type-crm-settings.component';
               import { QuoteTermsTypeCrmSettingsComponent } from './Components/Settings/CRM-Settings/Sub-Components/quote-terms-type-crm-settings/quote-terms-type-crm-settings.component';
         // Lead Settings Folder
            import { MainLeadsSettingsComponent } from './Components/Settings/Lead-Settings/main-leads-settings/main-leads-settings.component';
            // Sub Components Folder
               import { LeadSourceTypeLeadSettingsComponent } from './Components/Settings/Lead-Settings/Sub-Components/lead-source-type-lead-settings/lead-source-type-lead-settings.component';
         // Company Settings Folder
            import { MainCompanySettingsComponent } from './Components/Settings/Company-Settings/main-company-settings/main-company-settings.component';
            // Sub Components Folder
               import { CompanyInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/company-info-company-settings/company-info-company-settings.component';
               import { ContactInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/contact-info-company-settings/contact-info-company-settings.component';
               import { DepartmentsCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/departments-company-settings/departments-company-settings.component';
               import { BranchCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/branch-company-settings/branch-company-settings.component';
               import { RegistrationInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/registration-info-company-settings/registration-info-company-settings.component';
               import { ESIInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/esiinfo-company-settings/esiinfo-company-settings.component';
               import { PFInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/pfinfo-company-settings/pfinfo-company-settings.component';
               import { ItInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/it-info-company-settings/it-info-company-settings.component';
               import { PTInfoCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/ptinfo-company-settings/ptinfo-company-settings.component';
               import { RegistrationTypeCompanySettingsComponent } from './Components/Settings/Company-Settings/SubComponents/registration-type-company-settings/registration-type-company-settings.component';
         // purchase settings folder
            import { MainPurchaseSettingsComponent } from './Components/Settings/Purchase-Settings/main-purchase-settings/main-purchase-settings.component';
            // Sub Components
               import { VendorQuoteTermsPurchaseSettingsComponent } from './Components/Settings/Purchase-Settings/SubComponents/vendor-quote-terms-purchase-settings/vendor-quote-terms-purchase-settings.component';
         // Hrms Settings Folder
            import { MainHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/main-hrms-settings/main-hrms-settings.component';
            // Sub Components
               import { LeaveTypeHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/SubComponents/leave-type-hrms-settings/leave-type-hrms-settings.component';
               import { ExpensesTypeHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/SubComponents/expenses-type-hrms-settings/expenses-type-hrms-settings.component';
         // Hr Settings Folder
            import { MainHrSettingsComponent } from './Components/Settings/HR-Settings/main-hr-settings/main-hr-settings.component';
            // Sub Components
               import { EmployeeCategoryHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/employee-category-hr-settings/employee-category-hr-settings.component';
               import { DepartmentHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/department-hr-settings/department-hr-settings.component';
               import { DesignationHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/designation-hr-settings/designation-hr-settings.component';
         // Account Settings Folder
            import { MainAccountSettingsComponent } from './Components/Settings/Account-Settings/main-account-settings/main-account-settings.component';
             // Sub Components
               import { TaxesAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/taxes-account-settings/taxes-account-settings.component';
               import { BankAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/bank-account-settings/bank-account-settings.component';
               import { IncomeTypeAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/income-type-account-settings/income-type-account-settings.component';
               import { AssetTypeAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/asset-type-account-settings/asset-type-account-settings.component';
               import { PaymentTermsAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/payment-terms-account-settings/payment-terms-account-settings.component';
         // Inventory settings Folder
            import { MainInventorySettingsComponent } from './Components/Settings/Inventory-Settings/main-inventory-settings/main-inventory-settings.component';
            // Sub Components
               import { WareHouseInventorySettingsComponent } from './Components/Settings/Inventory-Settings/SubComponents/ware-house-inventory-settings/ware-house-inventory-settings.component';
         // Product Settings Folder
            import { MainProductSettingsComponent } from './Components/Settings/Product-Settings/main-product-settings/main-product-settings.component';
            // Sub Components
               import { ConfigurationProductSettingsComponent } from './Components/Settings/Product-Settings/SubComponents/configuration-product-settings/configuration-product-settings.component';
   // models -----------------------------------------------------------
      // settings
         // company settings
            import { ModelCompanyinfoCompanysettingsComponent } from './models/settings/company_settings/model-companyinfo-companysettings/model-companyinfo-companysettings.component';
            import { ModelContactinfoCompanysettingsComponent } from './models/settings/company_settings/model-contactinfo-companysettings/model-contactinfo-companysettings.component';
            import { ModelDepartmentsCompanysettingsComponent } from './models/settings/company_settings/model-departments-companysettings/model-departments-companysettings.component';
            import { ModelBranchCompanysettingsComponent } from './models/settings/company_settings/model-branch-companysettings/model-branch-companysettings.component';
            import { ModelRegistrationinfoCompanysettingsComponent } from './models/settings/company_settings/model-registrationinfo-companysettings/model-registrationinfo-companysettings.component';
            import { ModelPfinfoCompanysettingsComponent } from './models/settings/company_settings/model-pfinfo-companysettings/model-pfinfo-companysettings.component';
            import { ModelEsiinfoCompanysettingsComponent } from './models/settings/company_settings/model-esiinfo-companysettings/model-esiinfo-companysettings.component';
            import { ModelPtinfoCompanysettingsComponent } from './models/settings/company_settings/model-ptinfo-companysettings/model-ptinfo-companysettings.component';
            import { ModelItinfoCompanysettingsComponent } from './models/settings/company_settings/model-itinfo-companysettings/model-itinfo-companysettings.component';
            import { ModelRegistrationtypeCompanysettingsComponent } from './models/settings/company_settings/model-registrationtype-companysettings/model-registrationtype-companysettings.component';
         // CRM Settings
            import { ModelIndustrytypeCrmsettingsComponent } from './models/settings/crm_settings/model-industrytype-crmsettings/model-industrytype-crmsettings.component';
            import { ModelOwnershipytypeCrmsettingsComponent } from './models/settings/crm_settings/model-ownershipytype-crmsettings/model-ownershipytype-crmsettings.component';
            import { ModelActivitytypeCrmsettingsComponent } from './models/settings/crm_settings/model-activitytype-crmsettings/model-activitytype-crmsettings.component';
            import { ModelActivitystatusCrmsettingsComponent } from './models/settings/crm_settings/model-activitystatus-crmsettings/model-activitystatus-crmsettings.component';
            import { ModelActivitypriorityCrmsettingsComponent } from './models/settings/crm_settings/model-activitypriority-crmsettings/model-activitypriority-crmsettings.component';
            import { ModelPipelinestatusCrmsettingsComponent } from './models/settings/crm_settings/model-pipelinestatus-crmsettings/model-pipelinestatus-crmsettings.component';
            import { ModelContactroleCrmsettingsComponent } from './models/settings/crm_settings/model-contactrole-crmsettings/model-contactrole-crmsettings.component';
            import { ModelQuotetermsCrmsettingsComponent } from './models/settings/crm_settings/model-quoteterms-crmsettings/model-quoteterms-crmsettings.component';
         // Lead Settings
            import { ModelLeadsourceLeadsettingsComponent } from './models/settings/lead_settings/model-leadsource-leadsettings/model-leadsource-leadsettings.component';
         // Purchase Settings
            import { ModelVendorquotetermsPurchasesettingsComponent } from './models/settings/purchase_settings/model-vendorquoteterms-purchasesettings/model-vendorquoteterms-purchasesettings.component';
         // HRMS settings
            import { ModelLeavetypeHrmssettingsComponent } from './models/settings/hrms_settings/model-leavetype-hrmssettings/model-leavetype-hrmssettings.component';
            import { ModelExpensestypeHrmssettingsComponent } from './models/settings/hrms_settings/model-expensestype-hrmssettings/model-expensestype-hrmssettings.component';
         // HR settings
            import { ModelEmployeecategoryHrsettingsComponent } from './models/settings/hr_settings/model-employeecategory-hrsettings/model-employeecategory-hrsettings.component';
            import { ModelDepartmentHrsettingsComponent } from './models/settings/hr_settings/model-department-hrsettings/model-department-hrsettings.component';
            import { ModelDesignationHrsettingsComponent } from './models/settings/hr_settings/model-designation-hrsettings/model-designation-hrsettings.component';
         // Inventory settings
            import { ModelWarehouseInventorysettingsComponent } from './models/settings/inventory_settings/model-warehouse-inventorysettings/model-warehouse-inventorysettings.component';
         // Account Settings
            import { ModelTaxesAccountsettingsComponent } from './models/settings/account_settings/model-taxes-accountsettings/model-taxes-accountsettings.component';
            import { ModelBankAccountsettingsComponent } from './models/settings/account_settings/model-bank-accountsettings/model-bank-accountsettings.component';
            import { ModelIncometypeAccountsettingsComponent } from './models/settings/account_settings/model-incometype-accountsettings/model-incometype-accountsettings.component';
            import { ModelAssettypeAccountsettingsComponent } from './models/settings/account_settings/model-assettype-accountsettings/model-assettype-accountsettings.component';
            import { ModelPaymenttermsAccountsettingsComponent } from './models/settings/account_settings/model-paymentterms-accountsettings/model-paymentterms-accountsettings.component';
            import { CurrencyAccountSettingsComponent } from './Components/Settings/Account-Settings/SubComponents/currency-account-settings/currency-account-settings.component';
            import { ModelCurrencyAccountSettingsComponent } from './models/settings/account_settings/model-currency-account-settings/model-currency-account-settings.component';
         // Permissions
            import { UserPermissionsComponent } from './Components/Settings/UserPermissions/user-permissions/user-permissions.component';
            import { ModelUserCreateUserManagementComponent } from './models/settings/user_management/model-user-create-user-management/model-user-create-user-management.component';
            import { UserPermissionsGroupCreateComponent } from './Components/Settings/UserPermissions/user-permissions-group-create/user-permissions-group-create.component';
            import { UserManagementListComponent } from './Components/Settings/UserManagement/user-management-list/user-management-list.component';
      // CRM Folder --------------------------------------------------------------
         // Customers ----------------
            // CRM Customers List
               import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
            // CRM Customers View
               // Main CRM Customers View
                  import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
                  // Sub Components
                     import { AboutCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/about-crm-customers-view/about-crm-customers-view.component';
                     import { ContactCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/contact-crm-customers-view/contact-crm-customers-view.component';
                     import { ActivityCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/activity-crm-customers-view/activity-crm-customers-view.component';
                     import { QuoteCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/quote-crm-customers-view/quote-crm-customers-view.component';
                     import { SaleorderCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/saleorder-crm-customers-view/saleorder-crm-customers-view.component';
                     import { InvoiceCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/invoice-crm-customers-view/invoice-crm-customers-view.component';
                     import { PaymentCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/payment-crm-customers-view/payment-crm-customers-view.component';
                     import { RemainderCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/remainder-crm-customers-view/remainder-crm-customers-view.component';
                     import { OthersCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/SubComponents/others-crm-customers-view/others-crm-customers-view.component';
            // CRM-customers-create
                import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
         // Quotation -------------------
            import { CrmQuatationsCreateComponent } from './Components/CRM/Quotations/crm-quatations-create/crm-quatations-create.component';
            import { CrmQuatationsListComponent } from './Components/CRM/Quotations/crm-quatations-list/crm-quatations-list.component';
            import { CrmQuatationsViewComponent } from './Components/CRM/Quotations/crm-quatations-view/crm-quatations-view.component';
         // Sale Order ------------------
            import { CrmSaleorderCreateComponent } from './Components/CRM/SaleOrder/crm-saleorder-create/crm-saleorder-create.component';
            import { CrmSaleorderListComponent } from './Components/CRM/SaleOrder/crm-saleorder-list/crm-saleorder-list.component';
            import { CrmSaleorderViewComponent } from './Components/CRM/SaleOrder/crm-saleorder-view/crm-saleorder-view.component';
         // Invoice ---------------------
            import { CrmInvoiceCreateComponent } from './Components/CRM/Invoice/crm-invoice-create/crm-invoice-create.component';
            import { CrmInvoiceListComponent } from './Components/CRM/Invoice/crm-invoice-list/crm-invoice-list.component';
            import { CrmInvoiceViewComponent } from './Components/CRM/Invoice/crm-invoice-view/crm-invoice-view.component';
         // Config
            import { CrmConfigComponent } from './Components/CRM/crm-config/crm-config.component';
   // models
      // CRM
         // Customer
            import { ModelContactCustomersViewComponent } from './models/CRM/Customers/model-contact-customers-view/model-contact-customers-view.component';
            import { ModelActivitiesCustomersViewComponent } from './models/CRM/Customers/model-activities-customers-view/model-activities-customers-view.component';
            import { ModelPaymentsCustomersViewComponent } from './models/CRM/Customers/model-payments-customers-view/model-payments-customers-view.component';
            import { ModelOthersCustomerViewComponent } from './models/CRM/Customers/model-others-customer-view/model-others-customer-view.component';
         // Quotation
            import { ModelConfirmOrderComponent } from './models/CRM/Quotations/model-confirm-order/model-confirm-order.component';
      // Leads Folder ----------------------------------------------------
         // Leads
            import { LeadCreateComponent } from './Components/Leads/Leads/lead-create/lead-create.component';
            import { LeadListComponent } from './Components/Leads/Leads/lead-list/lead-list.component';
            import { LeadViewComponent } from './Components/Leads/Leads/lead-view/lead-view.component';
         // Log Phone Call
            import { ListLogPhoneCallComponent } from './Components/Leads/Log-Phone-Call/list-log-phone-call/list-log-phone-call.component';
            import { CreateLogPhoneCallComponent } from './Components/Leads/Log-Phone-Call/create-log-phone-call/create-log-phone-call.component';
            import { ViewLogPhoneCallComponent } from './Components/Leads/Log-Phone-Call/view-log-phone-call/view-log-phone-call.component';
         // Call Schedule
            import { CreateCallScheduleComponent } from './Components/Leads/Call-Schedule/create-call-schedule/create-call-schedule.component';
            import { ListCallScheduleComponent } from './Components/Leads/Call-Schedule/list-call-schedule/list-call-schedule.component';
            import { ViewCallScheduleComponent } from './Components/Leads/Call-Schedule/view-call-schedule/view-call-schedule.component';
   // models
      // Leads
         import { CallScheduleLeadComponent } from './models/Leads/call-schedule-lead/call-schedule-lead.component';
         import { LogPhoneCallLeadComponent } from './models/Leads/log-phone-call-lead/log-phone-call-lead.component';
// models
      // HRMS
        import { ModelLeavesHrmsComponent } from './models/HRMS/model-leaves-hrms/model-leaves-hrms.component';
        import { ModelOndutyHrmsComponent } from './models/HRMS/model-onduty-hrms/model-onduty-hrms.component';
        import { ModelPermissionsHrmsComponent } from './models/HRMS/model-permissions-hrms/model-permissions-hrms.component';
        import { ModelAdvanceHrmsComponent } from './models/HRMS/model-advance-hrms/model-advance-hrms.component';
      // Purchase folder ---------------------------------------------------
         // Purchase_Request
            import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
            import { PurchaseRequestCreateComponent } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
            import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';
         // purchase Quotation
            import { PurchaseQuotationsCreateComponent } from './Components/Purchase/PurchaseQuotation/purchase-quotations-create/purchase-quotations-create.component';
            import { PurchaseQuotationsListComponent } from './Components/Purchase/PurchaseQuotation/purchase-quotations-list/purchase-quotations-list.component';
            import { PurchaseQuotationsViewComponent } from './Components/Purchase/PurchaseQuotation/purchase-quotations-view/purchase-quotations-view.component';
         // Purchase Orders
            import { PurchaseOrdersListComponent } from './Components/Purchase/PurchaseOrders/purchase-orders-list/purchase-orders-list.component';
            import { PurchaseOrdersCreateComponent } from './Components/Purchase/PurchaseOrders/purchase-orders-create/purchase-orders-create.component';
            import { PurchaseOrdersViewComponent } from './Components/Purchase/PurchaseOrders/purchase-orders-view/purchase-orders-view.component';
         // Vendor Bills
            import { VendorBillsListComponent } from './Components/Purchase/VendorBills/vendor-bills-list/vendor-bills-list.component';
            import { VendorBillsCreateComponent } from './Components/Purchase/VendorBills/vendor-bills-create/vendor-bills-create.component';
            import { VendorBillsViewComponent } from './Components/Purchase/VendorBills/vendor-bills-view/vendor-bills-view.component';
         // vendor
            import { VendorListComponent } from './Components/Purchase/Vendor/vendor-list/vendor-list.component';
            import { VendorCreateComponent } from './Components/Purchase/Vendor/vendor-create/vendor-create.component';
               // main vendor view
                  import { MainVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/main-vendor-view/main-vendor-view.component';
                  // Sub Components
                     import { AboutVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/about-vendor-view/about-vendor-view.component';
                     import { ContactsVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/contacts-vendor-view/contacts-vendor-view.component';
                     import { PurchaseQuotationsVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/purchase-quotations-vendor-view/purchase-quotations-vendor-view.component';
                     import { PurchaseOrdersVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/purchase-orders-vendor-view/purchase-orders-vendor-view.component';
                     import { VendorBillVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/vendor-bill-vendor-view/vendor-bill-vendor-view.component';
                     import { PaymentsVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/payments-vendor-view/payments-vendor-view.component';
                     import { OthersVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/SubComponents/others-vendor-view/others-vendor-view.component';
         // Config
            import { ConfigurationComponent } from './Components/Purchase/configuration/configuration.component';
      // Accounts Folder
         // Customer
            import { AccountsCustomerListComponent } from './Components/Accounts/Customer/accounts-customer-list/accounts-customer-list.component';
            import { AccountsCustomerInvoiceListComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-list/accounts-customer-invoice-list.component';
            import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
            import { AccountsCustomerInvoiceViewComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-view/accounts-customer-invoice-view.component';
         // vendor
            import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
            import { AccountsVendorListComponent } from './Components/Accounts/Vendor/accounts-vendor-list/accounts-vendor-list.component';
            import { AccountsVendorbillsListComponent } from './Components/Accounts/Vendor-Bills/accounts-vendorbills-list/accounts-vendorbills-list.component';
            import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
            import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
            import { VendorPaymentsCreateComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-create/vendor-payments-create.component';
            import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';
            import { AccountsConfigComponent } from './Components/Accounts/accounts-config/accounts-config.component';
            import { AccountsPayrollListComponent } from './Components/Accounts/Payroll/accounts-payroll-list/accounts-payroll-list.component';
            import { ModelIncomeComponent } from './models/Accounts/model-income/model-income.component';
            import { AccountsInvestmentComponent } from './Components/Accounts/Income/Investment/accounts-investment/accounts-investment.component';
            import { AccountsLoanComponent } from './Components/Accounts/Income/Loan/accounts-loan/accounts-loan.component';
      // Inventory Folder ---------------------------------------------------
         // Delivery Order
            import { InventoryDeliveryordersListComponent } from './Components/Inventory/Delivery-Orders/inventory-deliveryorders-list/inventory-deliveryorders-list.component';
            import { InventoryDeliveryOrdersViewComponent } from './Components/Inventory/Delivery-Orders/inventory-delivery-orders-view/inventory-delivery-orders-view.component';
         // Internal Transfer
            import { InternalTransferListComponent } from './Components/Inventory/Internal-Transfer/internal-transfer-list/internal-transfer-list.component';
            import { InternalTransferCreateComponent } from './Components/Inventory/Internal-Transfer/internal-transfer-create/internal-transfer-create.component';
            import { InternalTransferViewComponent } from './Components/Inventory/Internal-Transfer/internal-transfer-view/internal-transfer-view.component';
         // To Receive
            import { ToReceiveListComponent } from './Components/Inventory/To-Receive/to-receive-list/to-receive-list.component';
            import { ToReceiveViewComponent } from './Components/Inventory/To-Receive/to-receive-view/to-receive-view.component';
         // Stock Details
            import { ListStockValuesComponent } from './Components/Inventory/Stock-Values/list-stock-values/list-stock-values.component';
            import { ViewStockValuesComponent } from './Components/Inventory/Stock-Values/view-stock-values/view-stock-values.component';
         // Config
            import { InventoryConfigComponent } from './Components/Inventory/inventory-config/inventory-config.component';
         import { LocationsInventorySettingsComponent } from './Components/Settings/Inventory-Settings/SubComponents/locations-inventory-settings/locations-inventory-settings.component';
         import { ModelLocationsInventorySettingsComponent } from './models/settings/inventory_settings/model-locations-inventory-settings/model-locations-inventory-settings.component';

      // Product Folder
         import { ListProductComponent } from './Components/Product/list-product/list-product.component';
         import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
         import { ViewProductComponent } from './Components/Product/view-product/view-product.component';
      // HR Folder
         import { EmployeesCreateComponent } from './Components/HR/Employees/employees-create/employees-create.component';
         import { EmployeesListComponent } from './Components/HR/Employees/employees-list/employees-list.component';
         import { EmployeesViewComponent } from './Components/HR/Employees/employees-view/employees-view.component';
         import { CreateAttendanceLogComponent } from './Components/HR/Attendance-Log/create-attendance-log/create-attendance-log.component';
         import { ListAttendanceLogComponent } from './Components/HR/Attendance-Log/list-attendance-log/list-attendance-log.component';
         import { ViewAttendanceLogComponent } from './Components/HR/Attendance-Log/view-attendance-log/view-attendance-log.component';
         import { ListAttendanceReportComponent } from './Components/HR/Attendance-Report/list-attendance-report/list-attendance-report.component';
         import { ViewAttendanceReportComponent } from './Components/HR/Attendance-Report/view-attendance-report/view-attendance-report.component';
         import { PayrollListComponent } from './Components/HR/Payroll/payroll-list/payroll-list.component';
         import { PayrollViewComponent } from './Components/HR/Payroll/payroll-view/payroll-view.component';
         import { CreatePayrollMasterComponent } from './Components/HR/Payroll-Master/create-payroll-master/create-payroll-master.component';
         import { ListPayrollMasterComponent } from './Components/HR/Payroll-Master/list-payroll-master/list-payroll-master.component';
      // HRMS
         import { DashBoardComponent } from './Components/HRMS/DashBoard/dash-board/dash-board.component';
         import { ListLeavesComponent } from './Components/HRMS/Leaves/list-leaves/list-leaves.component';
         import { CreateLeavesComponent } from './Components/HRMS/Leaves/create-leaves/create-leaves.component';
         import { ViewLeavesComponent } from './Components/HRMS/Leaves/view-leaves/view-leaves.component';
         import { ListOnDutyComponent } from './Components/HRMS/On-Duty/list-on-duty/list-on-duty.component';
         import { CreateOnDutyComponent } from './Components/HRMS/On-Duty/create-on-duty/create-on-duty.component';
         import { ViewOnDutyComponent } from './Components/HRMS/On-Duty/view-on-duty/view-on-duty.component';
         import { CreatePermissionsComponent } from './Components/HRMS/Permissions/create-permissions/create-permissions.component';
         import { ListPermissionsComponent } from './Components/HRMS/Permissions/list-permissions/list-permissions.component';
         import { ViewPermissionsComponent } from './Components/HRMS/Permissions/view-permissions/view-permissions.component';
         import { CreateAdvanceComponent } from './Components/HRMS/Advance/create-advance/create-advance.component';
         import { ListAdvanceComponent } from './Components/HRMS/Advance/list-advance/list-advance.component';
         import { ViewAdvanceComponent } from './Components/HRMS/Advance/view-advance/view-advance.component';


import { ModelEmployeesCreateComponent } from './models/HR/model-employees-create/model-employees-create.component';
import { ModelAttendanceLogCreateComponent } from './models/HR/model-attendance-log-create/model-attendance-log-create.component';
import { ModelAttendanceReportCreateComponent } from './models/HR/model-attendance-report-create/model-attendance-report-create.component';
import { ModelPayrollMasterViewComponent } from './models/HR/model-payroll-master-view/model-payroll-master-view.component';
import { EarningsHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/earnings-hr-settings/earnings-hr-settings.component';
import { DetectionsHrSettingsComponent } from './Components/Settings/HR-Settings/SubComponents/detections-hr-settings/detections-hr-settings.component';
import { ModelEarningsHrsettingsComponent } from './models/settings/hr_settings/model-earnings-hrsettings/model-earnings-hrsettings.component';
import { ModelDetectionsHrsettingsComponent } from './models/settings/hr_settings/model-detections-hrsettings/model-detections-hrsettings.component';

// Services
// import { LoginService } from './services/LoginService/login.service';










import { ModelAccouttypeCrmSettingsComponent } from './models/settings/crm_settings/model-accouttype-crm-settings/model-accouttype-crm-settings.component';

import { HrConfigComponent } from './Components/HR/HR-Config/hr-config/hr-config.component';
import { DashboardComponent } from './Components/DashBoard/dashboard/dashboard.component';



@NgModule({
   declarations: [
         // Default Components
            AppComponent,
         // Custom Components
            // Component Folder
               // Common-Components Folder
               HeaderComponent,
               LoginComponent,
               // Settings Folder
                  // CRM Settings Folder
                     MainCrmSettingsComponent,
                     // Sub Components Folder
                        AccountTypeCrmSettingsComponent,
                        IndustryTypeCrmSettingsComponent,
                        OwnerShipTypeCrmSettingsComponent,
                        ActivityTypeCrmSettingsComponent,
                        ActivityStatusTypeCrmSettingsComponent,
                        ActivityPriorityTypeCrmSettingsComponent,
                        PipeLineStatusTypeCrmSettingsComponent,
                        ContactRoleTypeCrmSettingsComponent,
                        QuoteTermsTypeCrmSettingsComponent,
                  // Lead Settings Folder
                  MainLeadsSettingsComponent,
                     // Sub Components Folder
                        LeadSourceTypeLeadSettingsComponent,
                  // Company Settings Folder
                  MainCompanySettingsComponent,
                     // Sub Components Folder
                        CompanyInfoCompanySettingsComponent,
                        ContactInfoCompanySettingsComponent,
                        DepartmentsCompanySettingsComponent,
                        BranchCompanySettingsComponent,
                        RegistrationInfoCompanySettingsComponent,
                        ESIInfoCompanySettingsComponent,
                        PFInfoCompanySettingsComponent,
                        ItInfoCompanySettingsComponent,
                        PTInfoCompanySettingsComponent,
                        RegistrationTypeCompanySettingsComponent,
                  // purchase settings folder
                  MainPurchaseSettingsComponent,
                  // Sub Components
                     VendorQuoteTermsPurchaseSettingsComponent,
                  // Hrms Settings Folder
                  MainHrmsSettingsComponent,
                  // Sub Components
                     LeaveTypeHrmsSettingsComponent,
                     ExpensesTypeHrmsSettingsComponent,
                  // Hr Settings Folder
                  MainHrSettingsComponent,
                  // Sub Components
                     EmployeeCategoryHrSettingsComponent,
                     DepartmentHrSettingsComponent,
                     DesignationHrSettingsComponent,
                  // Account Settings Folder
                  MainAccountSettingsComponent,
                  // Sub Components
                     TaxesAccountSettingsComponent,
                     BankAccountSettingsComponent,
                     IncomeTypeAccountSettingsComponent,
                     AssetTypeAccountSettingsComponent,
                     PaymentTermsAccountSettingsComponent,
                  // Inventory settings Folder
                  MainInventorySettingsComponent,
                  // Sub Components
                     WareHouseInventorySettingsComponent,
                  // Product Settings Folder
                  MainProductSettingsComponent,
                  // Sub Components
                     ConfigurationProductSettingsComponent,
      // models
      // settings
         // company settings
            ModelCompanyinfoCompanysettingsComponent,
            ModelContactinfoCompanysettingsComponent,
            ModelDepartmentsCompanysettingsComponent,
            ModelBranchCompanysettingsComponent,
            ModelRegistrationinfoCompanysettingsComponent,
            ModelPfinfoCompanysettingsComponent,
            ModelEsiinfoCompanysettingsComponent,
            ModelPtinfoCompanysettingsComponent,
            ModelItinfoCompanysettingsComponent,
            ModelRegistrationtypeCompanysettingsComponent,
         // CRM Settings
            ModelIndustrytypeCrmsettingsComponent,
            ModelOwnershipytypeCrmsettingsComponent,
            ModelActivitytypeCrmsettingsComponent,
            ModelActivitystatusCrmsettingsComponent,
            ModelActivitypriorityCrmsettingsComponent,
            ModelPipelinestatusCrmsettingsComponent,
            ModelContactroleCrmsettingsComponent,
            ModelQuotetermsCrmsettingsComponent,
         // Lead Settings
            ModelLeadsourceLeadsettingsComponent,
         // Purchase Settings
            ModelVendorquotetermsPurchasesettingsComponent,
         // HRMS settings
            ModelLeavetypeHrmssettingsComponent,
            ModelExpensestypeHrmssettingsComponent,
         // HR settings
            ModelEmployeecategoryHrsettingsComponent,
            ModelDepartmentHrsettingsComponent,
            ModelDesignationHrsettingsComponent,
            EarningsHrSettingsComponent,
            DetectionsHrSettingsComponent,
         // Inventory settings
            ModelWarehouseInventorysettingsComponent,
         // Account Settings
            ModelTaxesAccountsettingsComponent,
            ModelBankAccountsettingsComponent,
            ModelIncometypeAccountsettingsComponent,
            ModelAssettypeAccountsettingsComponent,
            ModelPaymenttermsAccountsettingsComponent,
         // Permissions
            UserManagementListComponent,
            UserPermissionsComponent,
            ModelUserCreateUserManagementComponent,
            UserPermissionsGroupCreateComponent,
      // Components
      // Common-Components
         // delete-confirmation
                  DeleteConfirmationComponent,
      // CRM Folder
         // Customers
            // crm-customers-list
               CrmCustomersListComponent,
               // main crm customers view
                  MainCrmCustomersViewComponent,
                  // SubComponents
                  AboutCrmCustomersViewComponent,
                  ContactCrmCustomersViewComponent,
                  ActivityCrmCustomersViewComponent,
                  QuoteCrmCustomersViewComponent,
                  SaleorderCrmCustomersViewComponent,
                  InvoiceCrmCustomersViewComponent,
                  PaymentCrmCustomersViewComponent,
                  RemainderCrmCustomersViewComponent,
                  OthersCrmCustomersViewComponent,
                  CrmCustomersCreateComponent,
         // Quotations
            CrmQuatationsCreateComponent,
            CrmQuatationsListComponent,
            CrmQuatationsViewComponent,
         // Sale Order
            CrmSaleorderCreateComponent,
            CrmSaleorderListComponent,
            CrmSaleorderViewComponent,
         // Invoice
            CrmInvoiceCreateComponent,
            CrmInvoiceListComponent,
            CrmInvoiceViewComponent,
         // Config
            CrmConfigComponent,
   // models
      // HRMS
         ModelLeavesHrmsComponent,
         ModelOndutyHrmsComponent,
         ModelPermissionsHrmsComponent,
         ModelAdvanceHrmsComponent,
      // Leads Folder
            CallScheduleLeadComponent,
            LogPhoneCallLeadComponent,
            LeadCreateComponent,
            LeadListComponent,
            LeadViewComponent,
            ListLogPhoneCallComponent,
            CreateLogPhoneCallComponent,
            ViewLogPhoneCallComponent,
            CreateCallScheduleComponent,
            ListCallScheduleComponent,
            ViewCallScheduleComponent,
      // Purchase Folder
         // Purchase Request
            PurchaseRequestListComponent,
            PurchaseRequestCreateComponent,
            PurchaseRequestViewComponent,
         // purchase Quotation
            PurchaseQuotationsCreateComponent,
            PurchaseQuotationsListComponent,
            PurchaseQuotationsViewComponent,
         // Purchase Orders
            PurchaseOrdersListComponent,
            PurchaseOrdersCreateComponent,
            PurchaseOrdersViewComponent,
         // Vendor Bills
            VendorBillsListComponent,
            VendorBillsCreateComponent,
            VendorBillsViewComponent,
         // vendor
            VendorListComponent,
            VendorCreateComponent,
            // main vendor view
               MainVendorViewComponent,
                  // Sub components
                     AboutVendorViewComponent,
                     ContactsVendorViewComponent,
                     PurchaseQuotationsVendorViewComponent,
                     PurchaseOrdersVendorViewComponent,
                     VendorBillVendorViewComponent,
                     PaymentsVendorViewComponent,
                     OthersVendorViewComponent,
         // Config
            ConfigurationComponent,
      // Accounts Folder
         // Customer
            AccountsCustomerListComponent,
            AccountsCustomerInvoiceListComponent,
            AccountsCustomerPaymentsListComponent,
            AccountsCustomerInvoiceViewComponent,
         // vendor
            AccountsCustomerPaymentsViewComponent,
            AccountsVendorListComponent,
            AccountsVendorbillsListComponent,
            CustomerPaymentsCreateComponent,
            VendorPaymentsListComponent,
            VendorPaymentsCreateComponent,
            VendorPaymentsViewComponent,
            AccountsConfigComponent,
            AccountsPayrollListComponent,
            AccountsInvestmentComponent,
            AccountsLoanComponent,
      // Inventory Folder
            InventoryDeliveryordersListComponent,
            InternalTransferListComponent,
            ToReceiveListComponent,
            InternalTransferCreateComponent,
            InventoryConfigComponent,
            LocationsInventorySettingsComponent,
            ModelLocationsInventorySettingsComponent,
            InventoryDeliveryOrdersViewComponent,
            ListStockValuesComponent,
            ViewStockValuesComponent,
            ToReceiveViewComponent,
            InternalTransferViewComponent,
      // HR Folder
            EmployeesCreateComponent,
            EmployeesListComponent,
            EmployeesViewComponent,
            CreateAttendanceLogComponent,
            ListAttendanceLogComponent,
            ViewAttendanceLogComponent,
            ListAttendanceReportComponent,
            ViewAttendanceReportComponent,
            PayrollListComponent,
            PayrollViewComponent,
            CreatePayrollMasterComponent,
            ListPayrollMasterComponent,
            HrConfigComponent,
      // HRMS Folder
            ListLeavesComponent,
            CreateLeavesComponent,
            ViewLeavesComponent,
            ListOnDutyComponent,
            CreateOnDutyComponent,
            ViewOnDutyComponent,
            CreatePermissionsComponent,
            ListPermissionsComponent,
            ViewPermissionsComponent,
            CreateAdvanceComponent,
            ListAdvanceComponent,
            ViewAdvanceComponent,
      // Product Folder
            ListProductComponent,
            CreateProductComponent,
            ViewProductComponent,
               ModelContactCustomersViewComponent,
               ModelActivitiesCustomersViewComponent,
               ModelPaymentsCustomersViewComponent,
               ModelEmployeesCreateComponent,
               ModelAttendanceLogCreateComponent,
               ModelAttendanceReportCreateComponent,
               ModelPayrollMasterViewComponent,
               ModelEarningsHrsettingsComponent,
               ModelDetectionsHrsettingsComponent,
               CurrencyAccountSettingsComponent,
               ModelCurrencyAccountSettingsComponent,
               DashBoardComponent,
               ModelAccouttypeCrmSettingsComponent,
               ModelOthersCustomerViewComponent,
               ModelIncomeComponent,
               ModelConfirmOrderComponent,
               DashboardComponent


   ],
   imports: [
      // Default Modules
         BrowserModule,
         BrowserAnimationsModule,
         RouterModule,
         HttpModule,
         HttpClientModule,
         FormsModule,
         ReactiveFormsModule,
      // future modules
         ModalModule.forRoot(),
         AccordionModule.forRoot(),
         CalendarModule,
         NgSelectModule,
         MatButtonModule,
         MatFormFieldModule,
         MatSelectModule,
         MatCheckboxModule,
         MatMenuModule,
         MatRadioModule,
         MatDatepickerModule,
         MatNativeDateModule,
      // Custom Modules
         AppRoutingModule,
   ],
   providers: [AuthGuard],
   entryComponents: [ModelCompanyinfoCompanysettingsComponent,
      ModelContactinfoCompanysettingsComponent,
      ModelDepartmentsCompanysettingsComponent,
      ModelBranchCompanysettingsComponent,
      ModelRegistrationinfoCompanysettingsComponent,
      ModelPfinfoCompanysettingsComponent,
      ModelEsiinfoCompanysettingsComponent,
      ModelPtinfoCompanysettingsComponent,
      ModelItinfoCompanysettingsComponent,
      ModelRegistrationtypeCompanysettingsComponent,
      ModelIndustrytypeCrmsettingsComponent,
      ModelOwnershipytypeCrmsettingsComponent,
      ModelActivitytypeCrmsettingsComponent,
      ModelActivitystatusCrmsettingsComponent,
      ModelActivitypriorityCrmsettingsComponent,
      ModelPipelinestatusCrmsettingsComponent,
      ModelContactroleCrmsettingsComponent,
      ModelQuotetermsCrmsettingsComponent,
      ModelLeadsourceLeadsettingsComponent,
      ModelVendorquotetermsPurchasesettingsComponent,
      ModelLeavetypeHrmssettingsComponent,
      ModelExpensestypeHrmssettingsComponent,
      ModelEmployeecategoryHrsettingsComponent,
      ModelDepartmentHrsettingsComponent,
      ModelDesignationHrsettingsComponent,
      ModelWarehouseInventorysettingsComponent,
      ModelTaxesAccountsettingsComponent,
      ModelBankAccountsettingsComponent,
      ModelIncometypeAccountsettingsComponent,
      ModelAssettypeAccountsettingsComponent,
      ModelPaymenttermsAccountsettingsComponent,
      DeleteConfirmationComponent,
      ModelLeavesHrmsComponent,
      ModelOndutyHrmsComponent,
      ModelPermissionsHrmsComponent,
      ModelAdvanceHrmsComponent,
      ModelUserCreateUserManagementComponent,
      ModelContactCustomersViewComponent,
      ModelActivitiesCustomersViewComponent,
      ModelPaymentsCustomersViewComponent,
      ModelEmployeesCreateComponent,
      ModelAttendanceLogCreateComponent,
      ModelAttendanceReportCreateComponent,
      ModelPayrollMasterViewComponent,
      ModelEarningsHrsettingsComponent,
      ModelDetectionsHrsettingsComponent,
      LogPhoneCallLeadComponent,
      CallScheduleLeadComponent,
      ModelLocationsInventorySettingsComponent,
      ModelCurrencyAccountSettingsComponent,
      ModelAccouttypeCrmSettingsComponent,
      ModelOthersCustomerViewComponent,
      ModelIncomeComponent,
      ModelConfirmOrderComponent
    ],
   bootstrap: [AppComponent]
})
export class AppModule { }

