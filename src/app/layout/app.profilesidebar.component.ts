import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';
import {Router} from "@angular/router";

@Component({
    selector: 'app-profilemenu',
    templateUrl: './app.profilesidebar.component.html'
})
export class AppProfileSidebarComponent {
    user: any;

    constructor(public layoutService: LayoutService, private router: Router) { }

    ngOnInit(){
        this.user = JSON.parse(<string>localStorage.getItem('UserValero'));
    }

    get visible(): boolean {
        return this.layoutService.state.profileSidebarVisible;
    }

    set visible(_val: boolean) {
        this.layoutService.state.profileSidebarVisible = _val;
    }

    signOut(){
        localStorage.clear();
        this.router.navigate(['/auth/login']);
    }
}
