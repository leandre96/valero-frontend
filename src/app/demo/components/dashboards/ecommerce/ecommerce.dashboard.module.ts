import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EcommerceDashboardComponent } from './ecommerce.dashboard.component';
import { EcommerceDashboardRoutigModule } from './ecommerce.dashboard-routing.module';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { InputTextModule } from 'primeng/inputtext';
import { ChartModule } from 'primeng/chart';
import { KnobModule } from 'primeng/knob';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import {TagModule} from "primeng/tag";
import { MultiSelectModule } from 'primeng/multiselect';


@NgModule({
	imports: [
		CommonModule,
		EcommerceDashboardRoutigModule,
		ButtonModule,
		RippleModule,
		DropdownModule,
		FormsModule,
		InputTextModule,
		InputTextareaModule,
		ChartModule,
		RatingModule,
		KnobModule,
		TagModule,
        ReactiveFormsModule,
        MultiSelectModule,
		CommonModule,
        ButtonModule,
        ChartModule,
        DropdownModule,
        InputTextModule,
        KnobModule,
        RatingModule,
        RippleModule,
        TableModule,
        TagModule,
        FormsModule,
        ReactiveFormsModule,
        MultiSelectModule
	],
	declarations: [EcommerceDashboardComponent]
})
export class EcommerceDashboardModule { }
