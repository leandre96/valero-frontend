import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import {MessageService} from "primeng/api";

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        AuthRoutingModule
    ],
    providers: [MessageService]
})
export class AuthModule { }
