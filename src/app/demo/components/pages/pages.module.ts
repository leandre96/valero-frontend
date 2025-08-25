import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesRoutingModule } from './pages-routing.module';
import { UserAdminComponent } from './user-admin/user-admin.component';
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {DropdownModule} from "primeng/dropdown";
import {FileUploadModule} from "primeng/fileupload";
import {FormsModule} from "@angular/forms";
import {InputNumberModule} from "primeng/inputnumber";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {RadioButtonModule} from "primeng/radiobutton";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {CheckboxModule} from "primeng/checkbox";
import { EnterpriseAdminComponent } from './enterprise-admin/enterprise-admin.component';
import {TooltipModule} from "primeng/tooltip";

@NgModule({
    declarations: [
    UserAdminComponent,
    EnterpriseAdminComponent
  ],
    imports: [
        CommonModule,
        PagesRoutingModule,
        ButtonModule,
        DialogModule,
        DropdownModule,
        FileUploadModule,
        FormsModule,
        InputNumberModule,
        InputTextModule,
        InputTextareaModule,
        RadioButtonModule,
        RatingModule,
        RippleModule,
        SharedModule,
        TableModule,
        ToastModule,
        ToolbarModule,
        CheckboxModule,
        TooltipModule
    ]
})
export class PagesModule { }
