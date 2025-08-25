import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {UserAdminComponent} from "./user-admin/user-admin.component";
import {EnterpriseAdminComponent} from "./enterprise-admin/enterprise-admin.component";

@NgModule({
    imports: [RouterModule.forChild([
        { path: 'aboutus', data: { breadcrumb: 'About' }, loadChildren: () => import('./aboutus/aboutus.module').then(m => m.AboutUsModule) },
        { path: 'contact', data: { breadcrumb: 'Contact' }, loadChildren: () => import('./contact/contact.module').then(m => m.ContactModule) },
        { path: 'crud', data: { breadcrumb: 'Crud' }, loadChildren: () => import('./crud/crud.module').then(m => m.CrudModule) },
        { path: 'home', data: { breadcrumb: 'Home' }, loadChildren: () => import('./empty/emptydemo.module').then(m => m.EmptyDemoModule) },
        { path: 'faq', data: { breadcrumb: 'FAQ' }, loadChildren: () => import('./faq/faq.module').then(m => m.FaqModule) },
        { path: 'help', data: { breadcrumb: 'Help' }, loadChildren: () => import('./help/help.module').then(m => m.HelpModule) },
        { path: 'invoice', data: { breadcrumb: 'Invoice' }, loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule) },
        { path: 'timeline', data: { breadcrumb: 'Timeline' }, loadChildren: () => import('./timeline/timelinedemo.module').then(m => m.TimelineDemoModule) },
        { path: 'tramitesactivos', data: { breadcrumb: 'Trámites Activos' }, loadChildren: () => import('./activeprocedures/activeprocedures.module').then(m => m.ActiveproceduresModule) },
        { path: 'users', data: {breadcrumb: 'Gestión Usuarios'}, component: UserAdminComponent },
        { path: 'enterprises', data: {breadcrumb: 'Gestión Empresas'}, component: EnterpriseAdminComponent },
        { path: '**', redirectTo: '/notfound' }
    ])],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
