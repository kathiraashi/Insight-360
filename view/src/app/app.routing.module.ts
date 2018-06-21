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
