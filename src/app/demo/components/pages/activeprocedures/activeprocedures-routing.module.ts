import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ActiveproceduresComponent} from "./activeprocedures.component";

@NgModule({
	imports: [RouterModule.forChild([
		{ path: '', component: ActiveproceduresComponent }
	])],
	exports: [RouterModule]
})
export class ActiveproceduresRoutingModule { }
