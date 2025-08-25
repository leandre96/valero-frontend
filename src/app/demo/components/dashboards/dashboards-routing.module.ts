import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', data: {breadcrumb: 'Trámites Pendientes'}, loadChildren: () => import('./ecommerce/ecommerce.dashboard.module').then(m => m.EcommerceDashboardModule) },
        { path: 'indicadores', data: {breadcrumb: 'Indicadores'}, loadChildren: () => import('./banking/banking.dashboard.module').then(m => m.BankingDashboardModule) }
    ])],
    exports: [RouterModule]
})
export class DashboardsRoutingModule { }
