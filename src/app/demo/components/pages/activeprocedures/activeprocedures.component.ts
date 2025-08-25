import { Component } from '@angular/core';
import {Product} from "../../../api/product";
import {Subscription} from "rxjs";
import {ApiService} from "../../../service/api.service";
import {Table} from "primeng/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activeprocedures',
  templateUrl: './activeprocedures.component.html',
  styleUrls: ['./activeprocedures.component.scss']
})
export class ActiveproceduresComponent {
    procedures: any[] = [];
    cols: any[] = [];
    lastCommentDialogVisible: boolean = false;
    lastCommentContent: string = "";
    enterprise: any = {}

    transportOptions = [
    {label:'MARÍTIMO', value:'MARITIMO'},
    {label:'AÉREO', value:'AEREO'},
    {label:'TERRESTRE', value:'TERRESTRE'}
    ];
    customsOptions: {label:string,value:string}[] = [];
    selectedTransports: string[] = [];
    selectedCustoms: string[] = [];

    constructor(private apiService: ApiService, private router: Router) {
    }

    ngOnInit(): void {
        const user = JSON.parse(<string>localStorage.getItem('UserValero'));
        this.enterprise = JSON.parse(<string>localStorage.getItem('enterpriseValero'));
        if (this.enterprise === undefined || this.enterprise === null) {
            this.router.navigate(['auth/login']);
        }
        if (user.client_id) {
            this.apiService.get('procedure/getByIdDb?client_id=' + this.enterprise.ruc).subscribe((response: any) => {
                this.procedures = response.data.data;
                this.procedures.map((data) => {
                    data.approval_date ? data.approval_date = data.approval_date.split("T")[0] + " " + data.approval_date.split("T")[1].split(".")[0] : ""
                })
                console.log(response.data.data);
            });
        }

        //this.loadProcedures();       // carga inicial
        this.loadCustomsOptions();

    }

    applyFilters(dt: any) {
        // Si usas filtrado del backend, simplemente recarga:
        //this.loadProcedures();
      
        // Si quisieras filtrar en cliente, puedes usar:
         dt.filter(this.selectedTransports, 'transport_way', 'in');
         dt.filter(this.selectedCustoms, 'customs_office', 'in');
      }

    loadCustomsOptions(){
        this.apiService.get('procedure/customs?external_id=' + this.enterprise.ruc)
          .subscribe((resp:any)=>{
            this.customsOptions = (resp.data || []).map((c:string)=>({label:c, value:c}));
          });
      }
      

    clear(table: Table) {
        table.clear();
    }

    showDialogComment(comment: string | null) {
        this.lastCommentContent = comment ?? "";
        this.lastCommentDialogVisible = true;
    }
    getStyleStatus(status: string) {
        if (status == 'BORRADOR')
            return { 'background-color': '#bad80a', 'color': '#000'};
        else if (status == 'SALIDA AUTORIZADA')
            return { 'background-color': '#00b294', 'color': '#000'};
        else if (status == 'ACEPTACION')
            return { 'background-color': '#f4bb0f', 'color': '#000'};
        else
            return { 'background-color': '#00b294', 'color': '#000'};
    }
}
