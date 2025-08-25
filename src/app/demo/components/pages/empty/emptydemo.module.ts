import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDemoRoutingModule } from './emptydemo-routing.module';
import { EmptyDemoComponent } from './emptydemo.component';
import {ButtonModule} from "primeng/button";
import {TooltipModule} from "primeng/tooltip";

@NgModule({
    imports: [
        CommonModule,
        EmptyDemoRoutingModule,
        ButtonModule,
        TooltipModule
    ],
	declarations: [EmptyDemoComponent]
})
export class EmptyDemoModule { }
