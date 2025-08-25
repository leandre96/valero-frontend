import { Component } from '@angular/core';
import {Table} from "primeng/table";
import {ApiService} from "../../../service/api.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
  providers: [MessageService]
})
export class UserAdminComponent {
    users: any;
    userDialog: any;
    user: any = {

    };
    userSelected: any;
    isUpdate: boolean = false;
    submitted: boolean  = false;
    deleteUserDialog: any;
    showListEnterprises: boolean = false;
    empresas: any[] = [];
    selectedIdsempresa: any [] = [];

    constructor(private apiService: ApiService, private messageService: MessageService) {
    }

    ngOnInit(){
        this.getUsers();
        this.apiService.get('enterprise').subscribe((data: any)=> {
            console.log(data.data);
            this.empresas = data.data;
        })
    }

    getUsers(){
        this.apiService.get('user').subscribe((data: any)=> {
            this.users = data.data;
        })
    }

    openNew() {
        this.userDialog = true;
    }

    onGlobalFilter(dt: Table, $event: Event) {

    }

    editUser(user: any) {
        this.user = user;
        this.isUpdate = true;
        //this.user.password = '';
        console.log(this.user);
        this.userDialog = true;
    }

    deleteUser(user: any) {
        this.user = user;
        this.deleteUserDialog = true;
    }

    hideDialog() {
        this.userDialog = false;
    }

    saveUser() {
        if (this.isUpdate){
            this.apiService.put('user?id=' + this.user.id, this.user).subscribe((resp: any) => {
                console.log(resp.data);
                console.log("Actualizado");
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario Actualizado Correctamente!' });
                this.userDialog = false;
                this.getUsers();
            });
        }
        else {
            this.apiService.post('user/register', this.user).subscribe((resp: any) => {
                console.log(resp.data);
                console.log("Creado!");
                this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario Creado Correctamente!' });
                this.userDialog = false;
                this.getUsers();
            });
        }
    }

    confirmDelete() {
        this.apiService.delete('user?id=' + this.user.id).subscribe((resp: any) => {
            console.log(resp.data);
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Usuario Eliminado Correctamente!' });
            this.deleteUserDialog = false;
            this.getUsers();
        });
    }

    showEnterprises(user: any) {
        this.userSelected = user;
        this.apiService.get('userEnterprise/getEnterprisesByUser/' + user.id).subscribe((data: any) => {
            let empresasD = data.data;
            console.log(data.data);
            let ids: any[] = [];
            for (let x of empresasD){
                ids.push(x.id);
            }
            for (let x of this.empresas){
                x.selected = ids.includes(x.id);
            }
        });

        this.showListEnterprises = true;
    }

    closeDialogEmpresas() {
        this.userSelected = {};
        this.showListEnterprises = false;
    }

    selectEmpresas() {
        this.selectedIdsempresa = this.empresas.filter(s => s.selected == true).map(e => e.id);
        this.apiService.post('userEnterprise', {id_usuario: this.userSelected.id, enterprise_ids: this.selectedIdsempresa}).subscribe((data: any) => {
            this.messageService.add({ severity: 'success', summary: 'Exito', detail: 'Empresas seleccionadas Correctamente!' });
            this.showListEnterprises = false;
            this.userSelected = {};
        });
    }
}
