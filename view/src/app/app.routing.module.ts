import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

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
import { MainLeadsComponent } from './Components/Leads/main-leads/main-leads.component';
import { MainHrmsComponentsComponent } from './Components/HRMS/main-hrms-components/main-hrms-components.component';
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
import { VendorViewComponent } from './Components/Purchase/Vendor/vendor-view/vendor-view.component';




const appRoutes: Routes = [
  {
      path: '',
      component: MainCrmSettingsComponent,
      data: { animation: { value: 'CRM_Settings'}  }
  },
  {
      path: 'CRM_Settings',
      component: MainCrmSettingsComponent,
      data: {   animation: { value: 'CRM_Settings'}   }
  },
  {
    path: 'lead_settings',
    component: MainLeadsSettingsComponent,
    data: {   animation: { value: 'lead_settings'}   }
},
{
    path: 'company_settings',
    component: MainCompanySettingsComponent,
    data: {   animation: { value: 'company_settings'}   }
},
{
    path: 'purchase_settings',
    component: MainPurchaseSettingsComponent,
    data: {   animation: { value: 'purchase_settings'}   }
},
{
    path: 'Hrms_Settings',
    component: MainHrmsSettingsComponent,
    data: {   animation: { value: 'Hrms_Settings'}   }
},
{
    path: 'Hr_Settings',
    component: MainHrSettingsComponent,
    data: {   animation: { value: 'Hr_Settings'}   }
},
{
    path: 'Account_Settings',
    component: MainAccountSettingsComponent,
    data: {   animation: { value: 'Account_Settings'}   }
},
{
    path: 'Inventory_Settings',
    component: MainInventorySettingsComponent,
    data: {   animation: { value: 'Inventory_Settings'}   }
},
{
    path: 'Product_Settings',
    component: MainProductSettingsComponent,
    data: {   animation: { value: 'Product_Settings'}   }
},
{
    path: 'Crm_Customers_List',
    component: CrmCustomersListComponent,
    data: {   animation: { value: 'Crm_Customers_List'}   }
},
{
    path: 'main_crm_customers_view',
    component: MainCrmCustomersViewComponent,
    data: {   animation: { value: 'main_crm_customers_view'}   }
},
{
    path: 'crm_customers_create',
    component: CrmCustomersCreateComponent,
    data: {   animation: { value: 'crm_customers_create'}   }
},
{
    path: 'crm_invoice_list',
    component: CrmInvoiceListComponent,
    data: {   animation: { value: 'crm_invoice_list'}   }
},
{
    path: 'crm_invoice_create',
    component: CrmInvoiceCreateComponent,
    data: {   animation: { value: 'crm_invoice_create'}   }
},
{
    path: 'crm_quotations_list',
    component: CrmQuatationsListComponent,
    data: {   animation: { value: 'crm_quotations_list'}   }
},
{
    path: 'crm_quotations_create',
    component: CrmQuatationsCreateComponent,
    data: {   animation: { value: 'crm_quotations_create'}   }
},
{
    path: 'crm_saleorder_list',
    component: CrmSaleorderListComponent,
    data: {   animation: { value: 'crm_saleorder_list'}   }
},
{
    path: 'crm_saleorder_create',
    component: CrmSaleorderCreateComponent,
    data: {   animation: { value: 'crm_saleorder_create'}   }
},
{
    path: 'main_leads',
    component: MainLeadsComponent,
    data: {   animation: { value: 'main_leads'}   }
},
{
    path: 'main_hrms',
    component: MainHrmsComponentsComponent,
    data: {   animation: { value: 'main_hrms'}   }
},
{
    path: 'purchase_request_list',
    component: PurchaseRequestListComponent,
    data: {   animation: { value: 'purchase_request_list'}   }
},
{
    path: 'purchase_request_create',
    component: PurchaseRequestCreateComponent,
    data: {   animation: { value: 'purchase_request_create'}   }
},
{
    path: 'Purchase_Quotations_List',
    component: PurchaseQuotationsListComponent,
    data: {   animation: { value: 'Purchase_Quotations_List'}   }
},
{
    path: 'Purchase_Orders_List',
    component: PurchaseOrdersListComponent,
    data: {   animation: { value: 'Purchase_Orders_List'}   }
},
{
    path: 'Vendor_Bills_List',
    component: VendorBillsListComponent,
    data: {   animation: { value: 'Vendor_Bills_List'}   }
},
{
    path: 'Vendor_List',
    component: VendorListComponent,
    data: {   animation: { value: 'Vendor_List'}   }
},
{
    path: 'Purchase_Quotation_Create',
    component: PurchaseQuotationsCreateComponent,
    data: {   animation: { value: 'Purchase_Quotation_Create'}   }
},
{
    path: 'Purchase_Request_View',
    component: PurchaseRequestViewComponent,
    data: {   animation: { value: 'Purchase_Request_View'}   }
},
{
    path: 'Purchase_Quotation_View',
    component: PurchaseQuotationsViewComponent,
    data: {   animation: { value: 'Purchase_Quotation_View'}   }
},
{
    path: 'Purchase_Order_Create',
    component: PurchaseOrdersCreateComponent,
    data: {   animation: { value: 'Purchase_Order_Create'}   }
},
{
    path: 'Purchase_Order_View',
    component: PurchaseOrdersViewComponent,
    data: {   animation: { value: 'Purchase_Order_View'}   }
},
{
    path: 'Vendor_Bills_Create',
    component: VendorBillsCreateComponent,
    data: {   animation: { value: 'Vendor_Bills_Create'}   }
},
{
    path: 'Vendor_Bills_View',
    component: VendorBillsViewComponent,
    data: {   animation: { value: 'Vendor_Bills_View'}   }
},
{
    path: 'Vendor_Create',
    component: VendorCreateComponent,
    data: {   animation: { value: 'Vendor_Create'}   }
},
{
    path: 'Vendor_View',
    component: VendorViewComponent,
    data: {   animation: { value: 'Vendor_View'}   }
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
