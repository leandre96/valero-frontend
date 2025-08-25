import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveproceduresComponent } from './activeprocedures.component';
import {ActiveproceduresRoutingModule} from "./activeprocedures-routing.module";
import {ButtonModule} from "primeng/button";
import {ChartModule} from "primeng/chart";
import {DropdownModule} from "primeng/dropdown";
import {InputTextModule} from "primeng/inputtext";
import {KnobModule} from "primeng/knob";
import {RatingModule} from "primeng/rating";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "primeng/api";
import {TableModule} from "primeng/table";
import {DialogModule} from "primeng/dialog";
import {TagModule} from "primeng/tag";
import { MultiSelectModule } from 'primeng/multiselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ActiveproceduresComponent
  ],
    imports: [
        CommonModule,
        ActiveproceduresRoutingModule,
        ButtonModule,
        ChartModule,
        DropdownModule,
        InputTextModule,
        KnobModule,
        RatingModule,
        RippleModule,
        SharedModule,
        TableModule,
        DialogModule,
        TagModule,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectModule
    ]
})
export class ActiveproceduresModule { }
