import { Component } from '@angular/core';
import {Table} from "primeng/table";
import {ApiService} from "../../../service/api.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-enterprise-admin',
  templateUrl: './enterprise-admin.component.html',
  styleUrls: ['./enterprise-admin.component.scss']
})
export class EnterpriseAdminComponent {
    enterprises: any[] = [];
    enterpriseDialog: boolean = false;
    enterprise: any= {

    };
    submitted: boolean = false;
    deleteEnterpriseDialog: boolean = false;
    isUpdate: boolean = false;

    constructor(private apiService: ApiService, private messageService: MessageService) {
    }

    ngOnInit(){
        this.getEnterprises();
    }


    openNew() {
        this.enterpriseDialog = true;
    }

    onGlobalFilter(dt: Table, $event: Event) {

    }

    editEnterprise(enterprise: any) {
        this.enterprise = enterprise;
        this.isUpdate = true;
        this.enterpriseDialog = true;
    }

    deleteEnterprise(enterprise: any) {
        this.enterprise = enterprise;
        this.deleteEnterpriseDialog = true;
    }

    hideDialog() {
        this.enterpriseDialog = false;
    }

    saveEnterprise() {
        if (this.isUpdate){
            this.apiService.put('enterprise/' + this.enterprise.id, this.enterprise).subscribe((resp: any) => {
                console.log(resp.data);
                console.log("Actualizado");
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empresa Actualizado Correctamente!' });
                this.enterpriseDialog = false;
                this.isUpdate = false;
                this.getEnterprises();
            });
        }
        else {
            this.apiService.post('enterprise', this.enterprise).subscribe((resp: any) => {
                console.log(resp.data);
                console.log("Creado!");
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empresa Creado Correctamente!' });
                this.enterpriseDialog = false;
                this.getEnterprises();
            });
        }

    }

    confirmDelete() {
        this.apiService.delete('enterprise/' + this.enterprise.id).subscribe((resp: any) => {
            console.log(resp.data);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empresa Eliminada Correctamente!' });
            this.deleteEnterpriseDialog = false;
            this.enterprise = {};
            this.getEnterprises();
        });
    }

    getEnterprises() {
        this.apiService.get('enterprise').subscribe((data: any)=> {
            this.enterprises = data.data;
        })
    }
}
