import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";


@Component({
	templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [MessageService]
})
export class LoginComponent {

	rememberMe: boolean = false;
    loginForm: FormGroup = this.fb.group({});
    formErrors!: { [key: string]: any; };
    user : any;

	constructor(private layoutService: LayoutService, private fb: FormBuilder,
    private route: Router, private apiService: ApiService, private messageService: MessageService) {
        this.loginForm = this.fb.group({
            userName: ['', [Validators.required]],
            password: ['', [Validators.required]]
        });
    }

	get dark(): boolean {
		return this.layoutService.config.colorScheme !== 'light';
	}

    async ngOnInit() {
        this.user = JSON.parse(<string>localStorage.getItem('UserValero'));
    }

    login(){
        const data = this.loginForm.controls;
        const user = {
            email: data["userName"].value.trim(),
            password: data["password"].value
        };
        this.apiService.post("user/login", user).subscribe({
            next: (resp: any) => {
                console.log(resp);
                localStorage.setItem("UserValero", JSON.stringify(resp.data));
                this.messageService.add({ key: 'tst', severity: 'info', summary: 'Info Message', detail: 'Inicio correcto automaticamente' });
                if(resp.data.isAdmin)
                    this.route.navigate(['pages/users']);
                else
                    this.route.navigate(['pages/home']);


            },
            error: (error)=> {
                console.log("aqui hay error");
                this.messageService.add({ key: 'tst', severity: 'warn', summary: 'Warn Message', detail: 'Usuario y Contraseña Incorrectos' });
                console.log("Usuario no Existe " + error.data);
            }
        });
    }

}
