import { OnInit } from '@angular/core';
import { Component } from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    user: any;

    ngOnInit() {
        this.user = JSON.parse(<string>localStorage.getItem('UserValero'));
        this.model = [
            {
                label: 'Panel de control',
                icon: 'pi pi-home',
                items: [

                ]
            },

        ];

        if (!this.user.isAdmin) {
            this.model[0].items.push(
                {
                    label: 'Home',
                    icon: 'pi pi-fw pi-th-large',
                    routerLink: ['/pages/home']
                },
                {
                    label: 'Trámites Activos',
                    icon: 'pi pi-fw pi-home',
                    routerLink: ['/pages/tramitesactivos']
                },
                {
                    label: 'Trámites Pendientes',
                    icon: 'pi pi-fw pi-image',
                    routerLink: ['/dashboards']
                },
                {
                    label: 'Indicadores',
                    icon: 'pi pi-fw pi-database',
                    routerLink: ['/dashboards/indicadores']
                }
            );
        } else {
            this.model[0].items.push({
                label: 'Administrar Usuarios',
                icon: 'pi pi-fw pi-database',
                routerLink: ['/pages/users']
            },
            {
                label: 'Administrar Empresas',
                icon: 'pi pi-fw pi-database',
                routerLink: ['/pages/enterprises']
            });
    }
    }
}
