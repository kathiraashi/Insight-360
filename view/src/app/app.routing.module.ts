import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuard } from './Authentication/auth.guard';

import { LoginComponent } from './Components/Common-Components/login/login.component';
import { MainCrmSettingsComponent } from './Components/Settings/CRM-Settings/main-crm-settings/main-crm-settings.component';
import { MainLeadsSettingsComponent } from './Components/Settings/Lead-Settings/main-leads-settings/main-leads-settings.component';
import { MainCompanySettingsComponent } from './Components/Settings/Company-Settings/main-company-settings/main-company-settings.component';
import { MainPurchaseSettingsComponent } from './Components/Settings/Purchase-Settings/main-purchase-settings/main-purchase-settings.component';
import { MainHrmsSettingsComponent } from './Components/Settings/HRMS-Settings/main-hrms-settings/main-hrms-settings.component';
import { MainHrSettingsComponent } from './Components/Settings/HR-Settings/main-hr-settings/main-hr-settings.component';
import { MainAccountSettingsComponent } from './Components/Settings/Account-Settings/main-account-settings/main-account-settings.component';
import { MainInventorySettingsComponent } from './Components/Settings/Inventory-Settings/main-inventory-settings/main-inventory-settings.component';
import { MainProductSettingsComponent } from './Components/Settings/Product-Settings/main-product-settings/main-product-settings.component';
import { CrmCustomersListComponent } from './Components/CRM/Customers/crm-customers-list/crm-customers-list.component';
import { MainCrmCustomersViewComponent } from './Components/CRM/Customers/Crm-Customers-View/main-crm-customers-view/main-crm-customers-view.component';
import { CrmCustomersCreateComponent } from './Components/CRM/Customers/crm-customers-create/crm-customers-create.component';
import { CrmInvoiceListComponent } from './Components/CRM/Invoice/crm-invoice-list/crm-invoice-list.component';
import { CrmInvoiceCreateComponent } from './Components/CRM/Invoice/crm-invoice-create/crm-invoice-create.component';
import { CrmQuatationsListComponent } from './Components/CRM/Quotations/crm-quatations-list/crm-quatations-list.component';
import { CrmQuatationsCreateComponent } from './Components/CRM/Quotations/crm-quatations-create/crm-quatations-create.component';
import { CrmSaleorderListComponent } from './Components/CRM/SaleOrder/crm-saleorder-list/crm-saleorder-list.component';
import { CrmSaleorderCreateComponent } from './Components/CRM/SaleOrder/crm-saleorder-create/crm-saleorder-create.component';
import { PurchaseRequestListComponent } from './Components/Purchase/PurchaseRequest/purchase-request-list/purchase-request-list.component';
import {PurchaseRequestCreateComponent  } from './Components/Purchase/PurchaseRequest/purchase-request-create/purchase-request-create.component';
import { PurchaseQuotationsListComponent } from './Components/Purchase/PurchaseQuotation/purchase-quotations-list/purchase-quotations-list.component';
import { PurchaseOrdersListComponent } from './Components/Purchase/PurchaseOrders/purchase-orders-list/purchase-orders-list.component';
import { VendorBillsListComponent } from './Components/Purchase/VendorBills/vendor-bills-list/vendor-bills-list.component';
import { VendorListComponent } from './Components/Purchase/Vendor/vendor-list/vendor-list.component';
import { PurchaseQuotationsCreateComponent } from './Components/Purchase/PurchaseQuotation/purchase-quotations-create/purchase-quotations-create.component';
import { PurchaseRequestViewComponent } from './Components/Purchase/PurchaseRequest/purchase-request-view/purchase-request-view.component';
import { PurchaseQuotationsViewComponent } from './Components/Purchase/PurchaseQuotation/purchase-quotations-view/purchase-quotations-view.component';
import { PurchaseOrdersCreateComponent } from './Components/Purchase/PurchaseOrders/purchase-orders-create/purchase-orders-create.component';
import { PurchaseOrdersViewComponent } from './Components/Purchase/PurchaseOrders/purchase-orders-view/purchase-orders-view.component';
import { VendorBillsCreateComponent } from './Components/Purchase/VendorBills/vendor-bills-create/vendor-bills-create.component';
import { VendorBillsViewComponent } from './Components/Purchase/VendorBills/vendor-bills-view/vendor-bills-view.component';
import { VendorCreateComponent } from './Components/Purchase/Vendor/vendor-create/vendor-create.component';
import { CrmQuatationsViewComponent } from './Components/CRM/Quotations/crm-quatations-view/crm-quatations-view.component';
import { CrmSaleorderViewComponent } from './Components/CRM/SaleOrder/crm-saleorder-view/crm-saleorder-view.component';
import { CrmInvoiceViewComponent } from './Components/CRM/Invoice/crm-invoice-view/crm-invoice-view.component';
import { MainVendorViewComponent } from './Components/Purchase/Vendor/vendor-view/main-vendor-view/main-vendor-view.component';
import { AccountsCustomerListComponent } from './Components/Accounts/Customer/accounts-customer-list/accounts-customer-list.component';
import { AccountsCustomerInvoiceListComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-list/accounts-customer-invoice-list.component';
import { AccountsCustomerPaymentsListComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-list/accounts-customer-payments-list.component';
import { AccountsCustomerInvoiceViewComponent } from './Components/Accounts/customer-invoice/accounts-customer-invoice-view/accounts-customer-invoice-view.component';
import { AccountsVendorListComponent } from './Components/Accounts/Vendor/accounts-vendor-list/accounts-vendor-list.component';
import { AccountsVendorbillsListComponent } from './Components/Accounts/Vendor-Bills/accounts-vendorbills-list/accounts-vendorbills-list.component';
import { InventoryDeliveryordersListComponent } from './Components/Inventory/Delivery-Orders/inventory-deliveryorders-list/inventory-deliveryorders-list.component';
import { CustomerPaymentsCreateComponent } from './Components/Accounts/customer-payments/customer-payments-create/customer-payments-create.component';
import { VendorPaymentsListComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-list/vendor-payments-list.component';
import { VendorPaymentsCreateComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-create/vendor-payments-create.component';
import { AccountsCustomerPaymentsViewComponent } from './Components/Accounts/customer-payments/accounts-customer-payments-view/accounts-customer-payments-view.component';
import { VendorPaymentsViewComponent } from './Components/Accounts/Vendor-Payments/vendor-payments-view/vendor-payments-view.component';
import { UserManagementListComponent } from './Components/Settings/UserManagement/user-management-list/user-management-list.component';
import { UserPermissionsComponent } from './Components/Settings/UserPermissions/user-permissions/user-permissions.component';
import { UserPermissionsGroupCreateComponent } from './Components/Settings/UserPermissions/user-permissions-group-create/user-permissions-group-create.component';


import { InternalTransferListComponent } from './Components/Inventory/Internal-Transfer/internal-transfer-list/internal-transfer-list.component';
import { ToReceiveListComponent } from './Components/Inventory/To-Receive/to-receive-list/to-receive-list.component';
import { InventoryDeliveryordersCreateComponent } from './Components/Inventory/Delivery-Orders/inventory-deliveryorders-create/inventory-deliveryorders-create.component';
import { InventoryDirectpurchaseCreateComponent } from './Components/Inventory/Direct-Purchase/inventory-directpurchase-create/inventory-directpurchase-create.component';
import { InternalTransferCreateComponent } from './Components/Inventory/Internal-Transfer/internal-transfer-create/internal-transfer-create.component';
import { ToReceiveCreateComponent } from './Components/Inventory/To-Receive/to-receive-create/to-receive-create.component';
import { LeadCreateComponent } from './Components/Leads/Leads/lead-create/lead-create.component';
import { LeadListComponent } from './Components/Leads/Leads/lead-list/lead-list.component';
import { LeadViewComponent } from './Components/Leads/Leads/lead-view/lead-view.component';
import { ListLogPhoneCallComponent } from './Components/Leads/Log-Phone-Call/list-log-phone-call/list-log-phone-call.component';
import { CreateLogPhoneCallComponent } from './Components/Leads/Log-Phone-Call/create-log-phone-call/create-log-phone-call.component';
import { ViewLogPhoneCallComponent } from './Components/Leads/Log-Phone-Call/view-log-phone-call/view-log-phone-call.component';
import { ListCallScheduleComponent } from './Components/Leads/Call-Schedule/list-call-schedule/list-call-schedule.component';
import { CreateCallScheduleComponent } from './Components/Leads/Call-Schedule/create-call-schedule/create-call-schedule.component';
import { ViewCallScheduleComponent } from './Components/Leads/Call-Schedule/view-call-schedule/view-call-schedule.component';
import { CrmConfigComponent } from './Components/CRM/crm-config/crm-config.component';
import { ConfigurationComponent } from './Components/Purchase/configuration/configuration.component';
import { AccountsConfigComponent } from './Components/Accounts/accounts-config/accounts-config.component';
import { InventoryConfigComponent } from './Components/Inventory/inventory-config/inventory-config.component';
import { EmployeesListComponent } from './Components/HR/Employees/employees-list/employees-list.component';
import { EmployeesCreateComponent } from './Components/HR/Employees/employees-create/employees-create.component';
import {EmployeesViewComponent } from './Components/HR/Employees/employees-view/employees-view.component';
import { ListAttendanceLogComponent } from './Components/HR/Attendance-Log/list-attendance-log/list-attendance-log.component';
import { CreateAttendanceLogComponent } from './Components/HR/Attendance-Log/create-attendance-log/create-attendance-log.component';
import { ViewAttendanceLogComponent } from './Components/HR/Attendance-Log/view-attendance-log/view-attendance-log.component';
import { ListAttendanceReportComponent } from './Components/HR/Attendance-Report/list-attendance-report/list-attendance-report.component';
import { CreateAttendanceReportComponent } from './Components/HR/Attendance-Report/create-attendance-report/create-attendance-report.component';
import { ViewAttendanceReportComponent } from './Components/HR/Attendance-Report/view-attendance-report/view-attendance-report.component';
import { PayrollListComponent } from './Components/HR/Payroll/payroll-list/payroll-list.component';
import { PayrollViewComponent } from './Components/HR/Payroll/payroll-view/payroll-view.component';
import { ListPayrollMasterComponent } from './Components/HR/Payroll-Master/list-payroll-master/list-payroll-master.component';
import { CreatePayrollMasterComponent } from './Components/HR/Payroll-Master/create-payroll-master/create-payroll-master.component';
import { DashBoardComponent } from './Components/HRMS/DashBoard/dash-board/dash-board.component';
import { ListLeavesComponent } from './Components/HRMS/Leaves/list-leaves/list-leaves.component';
import { CreateLeavesComponent } from './Components/HRMS/Leaves/create-leaves/create-leaves.component';
import { ViewLeavesComponent } from './Components/HRMS/Leaves/view-leaves/view-leaves.component';
import { ListOnDutyComponent } from './Components/HRMS/On-Duty/list-on-duty/list-on-duty.component';
import { CreateOnDutyComponent } from './Components/HRMS/On-Duty/create-on-duty/create-on-duty.component';
import { ViewOnDutyComponent } from './Components/HRMS/On-Duty/view-on-duty/view-on-duty.component';
import { ListPermissionsComponent } from './Components/HRMS/Permissions/list-permissions/list-permissions.component';
import { CreatePermissionsComponent } from './Components/HRMS/Permissions/create-permissions/create-permissions.component';
import { ViewPermissionsComponent } from './Components/HRMS/Permissions/view-permissions/view-permissions.component';
import { ListAdvanceComponent } from './Components/HRMS/Advance/list-advance/list-advance.component';
import { CreateAdvanceComponent } from './Components/HRMS/Advance/create-advance/create-advance.component';
import { ViewAdvanceComponent } from './Components/HRMS/Advance/view-advance/view-advance.component';
import { ListProductComponent } from './Components/Product/list-product/list-product.component';
import { CreateProductComponent } from './Components/Product/create-product/create-product.component';
import { ViewProductComponent } from './Components/Product/view-product/view-product.component';

const appRoutes: Routes = [
   {
      path: '',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'Login',
      component: LoginComponent,
      data: { animation: { value: 'Login'}  }
   },
   {
      path: 'CRM_Settings',
      component: MainCrmSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'CRM_Settings'}   }
   },
   {
      path: 'lead_settings',
      component: MainLeadsSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'lead_settings'}   }
   },
   {
      path: 'company_settings',
      component: MainCompanySettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'company_settings'}   }
   },
   {
      path: 'purchase_settings',
      component: MainPurchaseSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'purchase_settings'}   }
   },
   {
      path: 'Hrms_Settings',
      component: MainHrmsSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Hrms_Settings'}   }
   },
   {
      path: 'Hr_Settings',
      component: MainHrSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Hr_Settings'}   }
   },
   {
      path: 'Account_Settings',
      component: MainAccountSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Account_Settings'}   }
   },
   {
      path: 'Inventory_Settings',
      component: MainInventorySettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Inventory_Settings'}   }
   },
   {
      path: 'Product_Settings',
      component: MainProductSettingsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Product_Settings'}   }
   },
   {
      path: 'Crm_Customers_List',
      component: CrmCustomersListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Crm_Customers_List'}   }
   },
   {
      path: 'main_crm_customers_view',
      component: MainCrmCustomersViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'main_crm_customers_view'}   }
   },
   {
      path: 'crm_customers_create',
      component: CrmCustomersCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_customers_create'}   }
   },
   {
      path: 'crm_invoice_list',
      component: CrmInvoiceListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_invoice_list'}   }
   },
   {
      path: 'crm_invoice_create',
      component: CrmInvoiceCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_invoice_create'}   }
   },
   {
      path: 'crm_quotations_list',
      component: CrmQuatationsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_quotations_list'}   }
   },
   {
      path: 'crm_quotations_create',
      component: CrmQuatationsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_quotations_create'}   }
   },
   {
      path: 'crm_saleorder_list',
      component: CrmSaleorderListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_saleorder_list'}   }
   },
   {
      path: 'crm_saleorder_create',
      component: CrmSaleorderCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_saleorder_create'}   }
   },
   {
    path: 'crm_config',
    component: CrmConfigComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'crm_config'}   }
 },
   {
        path: 'Create_leads',
        component: LeadCreateComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_leads'}   }
    },
    {
        path: 'List_leads',
        component: LeadListComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_leads'}   }
    },
    {
        path: 'View_leads',
        component: LeadViewComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_leads'}   }
    },
    {
        path: 'List_Log_Phone_call',
        component: ListLogPhoneCallComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_Log_Phone_call'}   }
    },
    {
        path: 'Create_Log_Phone_call',
        component: CreateLogPhoneCallComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_Log_Phone_call'}   }
    },
    {
        path: 'View_Log_Phone_call',
        component: ViewLogPhoneCallComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_Log_Phone_call'}   }
    },
    {
        path: 'List_Call_Schedule',
        component: ListCallScheduleComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_Call_Schedule'}   }
    },
    {
        path: 'Create_Call_Schedule',
        component: CreateCallScheduleComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_Call_Schedule'}   }
    },
    {
        path: 'View_Call_Schedule',
        component: ViewCallScheduleComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_Call_Schedule'}   }
    },
    {
        path: 'HRMS_DashBoard',
        component: DashBoardComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'HRMS_DashBoard'}   }
    },
    {
        path: 'List_Leaves',
        component: ListLeavesComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_Leaves'}   }
    },
    {
        path: 'Create_Leaves',
        component: CreateLeavesComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_Leaves'}   }
    },
    {
        path: 'View_Leaves',
        component: ViewLeavesComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_Leaves'}   }
    },
    {
        path: 'List_Onduty',
        component: ListOnDutyComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_Onduty'}   }
    },
    {
        path: 'Create_Onduty',
        component: CreateOnDutyComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_Onduty'}   }
    },
    {
        path: 'View_Onduty',
        component: ViewOnDutyComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_Onduty'}   }
    },
    {
        path: 'List_Permissions',
        component: ListPermissionsComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_Permissions'}   }
    },
    {
        path: 'Create_Permissions',
        component: CreatePermissionsComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_Permissions'}   }
    },
    {
        path: 'View_Permissions',
        component: ViewPermissionsComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_Permissions'}   }
    },
    {
        path: 'List_Advance',
        component: ListAdvanceComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'List_Advance'}   }
    },
    {
        path: 'Create_Advance',
        component: CreateAdvanceComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'Create_Permissions'}   }
    },
    {
        path: 'View_Advance',
        component: ViewAdvanceComponent,
        canActivate: [AuthGuard],
        data: {   animation: { value: 'View_Advance'}   }
    },
   {
      path: 'purchase_request_list',
      component: PurchaseRequestListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'purchase_request_list'}   }
   },
   {
      path: 'purchase_request_create',
      component: PurchaseRequestCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'purchase_request_create'}   }
   },
   {
      path: 'Purchase_Quotations_List',
      component: PurchaseQuotationsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Quotations_List'}   }
   },
   {
      path: 'Purchase_Orders_List',
      component: PurchaseOrdersListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Orders_List'}   }
   },
   {
      path: 'Vendor_Bills_List',
      component: VendorBillsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_Bills_List'}   }
   },
   {
      path: 'Vendor_List',
      component: VendorListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_List'}   }
   },
   {
      path: 'Purchase_Quotation_Create',
      component: PurchaseQuotationsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Quotation_Create'}   }
   },
   {
      path: 'Purchase_Request_View',
      component: PurchaseRequestViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Request_View'}   }
   },
   {
      path: 'Purchase_Quotation_View',
      component: PurchaseQuotationsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Quotation_View'}   }
   },
   {
      path: 'Purchase_Order_Create',
      component: PurchaseOrdersCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Order_Create'}   }
   },
   {
      path: 'Purchase_Order_View',
      component: PurchaseOrdersViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Purchase_Order_View'}   }
   },
   {
      path: 'Vendor_Bills_Create',
      component: VendorBillsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_Bills_Create'}   }
   },
   {
      path: 'Vendor_Bills_View',
      component: VendorBillsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_Bills_View'}   }
   },
   {
      path: 'Vendor_Create',
      component: VendorCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Vendor_Create'}   }
   },
   {
    path: 'purchase_configuration',
    component: ConfigurationComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'purchase_configuration'}   }
 },
   {
      path: 'crm_quotations_view',
      component: CrmQuatationsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_quotations_view'}   }
   },
   {
      path: 'crm_saleorder_view',
      component: CrmSaleorderViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_saleorder_view'}   }
   },
   {
      path: 'crm_invoice_view',
      component: CrmInvoiceViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'crm_invoice_view'}   }
   },
   {
      path: 'main_vendor_view',
      component: MainVendorViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'main_vendor_view'}   }
   },
   {
      path: 'account_customer_list',
      component: AccountsCustomerListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_list'}   }
   },
   {
      path: 'account_customer_invoice_list',
      component: AccountsCustomerInvoiceListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_invoice_list'}   }
   },
   {
      path: 'account_customer_payments_list',
      component: AccountsCustomerPaymentsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_payments_list'}   }
   },
   {
      path: 'account_customer_invoice_view',
      component: AccountsCustomerInvoiceViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_customer_invoice_view'}   }
   },
   {
      path: 'account_vendor_list',
      component: AccountsVendorListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_vendor_list'}   }
   },
   {
      path: 'account_vendor_bills_list',
      component: AccountsVendorbillsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'account_vendor_bills_list'}   }
   },
   {
    path: 'Accounts_configuration',
    component: AccountsConfigComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Accounts_configuration'}   }
 },
   {
      path: 'Inventory_deliveryorder_list',
      component: InventoryDeliveryordersListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'Inventory_deliveryorder_list'}   }
   },
   {
    path: 'Inventory_configuration',
    component: InventoryConfigComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Inventory_configuration'}   }
 },
   {
      path: 'customer_payment_create',
      component: CustomerPaymentsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'customer_payment_create'}   }
   },
   {
      path: 'vendor_payment_list',
      component: VendorPaymentsListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'vendor_payment_list'}   }
   },
   {
      path: 'vendor_payment_create',
      component: VendorPaymentsCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'vendor_payment_create'}   }
   },
   {
      path: 'customer_payment_view',
      component: AccountsCustomerPaymentsViewComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'customer_payment_view'}   }
   },
   {
    path: 'vendor_payment_view',
    component: VendorPaymentsViewComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'vendor_payment_view'}   }
},
{
    path: 'internal_transfer_list',
    component: InternalTransferListComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'internal_transfer_list'}   }
},
{
    path: 'to_receive_list',
    component: ToReceiveListComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'to_receive_list'}   }
},
{
    path: 'inventory_deliveryorder_create',
    component: InventoryDeliveryordersCreateComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'inventory_deliveryorder_create'}   }
},
{
    path: 'inventory_directpurchase_create',
    component: InventoryDirectpurchaseCreateComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'inventory_directpurchase_create'}   }
},
{
    path: 'internal_transfer_create',
    component: InternalTransferCreateComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'internal_transfer_create'}   }
},
{
    path: 'to_receive_create',
    component: ToReceiveCreateComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'to_receive_create'}   }
},
   {
      path: 'User_Management',
      component: UserManagementListComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'User_Management'}   }
   },
   {
      path: 'User_Permissions',
      component: UserPermissionsComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'User_Permissions'}   }
   },
   {
      path: 'User_Permissions_Group_Create',
      component: UserPermissionsGroupCreateComponent,
      canActivate: [AuthGuard],
      data: {   animation: { value: 'User_Permissions_Group_Create'}   }
   },
   {
    path: 'List_Employees',
    component: EmployeesListComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Employees'}   }
},
{
    path: 'Create_Employees',
    component: EmployeesCreateComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Employees'}   }
},
{
    path: 'View_Employees',
    component: EmployeesViewComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Employees'}   }
},
{
    path: 'List_Attendance_Log',
    component: ListAttendanceLogComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Attendance_Log'}   }
},
{
    path: 'Create_Attendance_Log',
    component: CreateAttendanceLogComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Attendance_Log'}   }
},
{
    path: 'View_Attendance_Log',
    component: ViewAttendanceLogComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Attendance_Log'}   }
},
{
    path: 'List_Attendance_Report',
    component: ListAttendanceReportComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Attendance_Report'}   }
},
{
    path: 'Create_Attendance_Report',
    component: CreateAttendanceReportComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Attendance_Report'}   }
},
{
    path: 'View_Attendance_Report',
    component: ViewAttendanceReportComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Attendance_Report'}   }
},
{
    path: 'List_Payroll',
    component: PayrollListComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Payroll'}   }
},
{
    path: 'View_Payroll',
    component: PayrollViewComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Payroll'}   }
},
{
    path: 'List_Payroll_Master',
    component: ListPayrollMasterComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Payroll_Master'}   }
},
{
    path: 'Create_Payroll_Master',
    component: CreatePayrollMasterComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Payroll_Master'}   }
},
{
    path: 'List_Product',
    component: ListProductComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'List_Product'}   }
},
{
    path: 'Create_Product',
    component: CreateProductComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'Create_Product'}   }
},
{
    path: 'View_Product',
    component: ViewProductComponent,
    canActivate: [AuthGuard],
    data: {   animation: { value: 'View_Product'}   }
},





];


@NgModule({
    declarations: [ ],
    imports: [ RouterModule.forRoot(appRoutes,
        { enableTracing: true }
      )],
    providers: [],
    bootstrap: []
  })
  export class AppRoutingModule { }
