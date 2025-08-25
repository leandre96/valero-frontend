import { Component } from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './emptydemo.component.html'
})
export class EmptyDemoComponent {

    enterprises: any[] = [];
    user: any = {};

    constructor(private apiService: ApiService, private router: Router) {

    }

    ngOnInit(){

        this.user = JSON.parse(<string>localStorage.getItem('UserValero'));
        this.getEnterprises();
    }

    getEnterprises() {
        console.log(this.user);
        this.apiService.get('userEnterprise/getEnterprisesByUser/' + this.user.id).subscribe((data: any) => {
            this.enterprises = data.data;
            console.log(this.enterprises);
        });
    }

    setEnterprise(enterprise: any) {
        localStorage.setItem("enterpriseValero", JSON.stringify(enterprise));
        this.router.navigate(['pages/tramitesactivos']);
    }
}
