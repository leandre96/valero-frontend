import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/demo/api/product';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { ProductService } from 'src/app/demo/service/product.service';
import { Table } from 'primeng/table';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";

@Component({
    templateUrl: './ecommerce.dashboard.component.html',
    styleUrls: ['./ecommerce.dashboard.component.css']
})
export class EcommerceDashboardComponent implements OnInit, OnDestroy {

    knobValue: number = 80;

    selectedWeek: any;

    weeks: any[] = [];

    barData: any;

    barOptions: any;

    pieData: any;

    user: any;

    pieDataArray: any[] = [];

    pieOptions: any;

    procedurePerMonth: any[] = [];

    cardsData = {
        arrivalPending: 0,
        approvalDav: 0,
        forPaying: 0,
        authorized_out: 0
    };

    subscription: Subscription;

    cols: any[] = [];
    enterprise: any;

    proceduresList: any[] = [];
    selectedCategory: string = '';

    clear(table: any) {
        table.clear();
      }

    constructor(private productService: ProductService, private layoutService: LayoutService, private apiService: ApiService, private router: Router) {

        this.subscription = this.layoutService.configUpdate$.subscribe(config => {
            this.initCharts();
        });
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

    getDataProceduresBar(){
        this.apiService.get('procedure/countByYear?year=2025' + '&external_id=' + this.enterprise.ruc).subscribe((resp: any) => {
            console.log(resp.data.proceduresByYear);
            let dataCount = [];
            for (let x of resp.data.proceduresByYear) {
                dataCount.push(parseInt(x.count));
            }
            this.procedurePerMonth = dataCount;
            this.initCharts();
        });
    }

    showTramitesActivos: boolean = false;

    toggleTramitesActivos() {
    this.showTramitesActivos = !this.showTramitesActivos;
    }

    getCardsData() {
        this.apiService.get('procedure/getStatsCard?external_id=' + this.enterprise.ruc).subscribe((resp: any) => {
            console.log(resp.data);
            this.cardsData = resp.data;
        });
    }

    getProceduresByCategory(category: string) {
        
        this.apiService.get(`procedure/getByCategory?external_id=${this.enterprise.ruc}&category=${category}`)
          .subscribe((resp: any) => {
            this.selectedCategory = category;
            this.proceduresList = resp.data;
            console.log(resp.data);
          });
        
      }

    getPieBarData(){
        this.apiService.get('procedure/getStatsRefrendum?external_id=' + this.enterprise.ruc).subscribe((resp: any) => {
            console.log(resp.data);
            this.pieDataArray.push(resp.data.zeroToOne);
            this.pieDataArray.push(resp.data.oneToThree);
            this.pieDataArray.push(resp.data.moreThanThree);
            this.initCharts();
        });
    }

    ngOnInit(): void {
        this.user = JSON.parse(<string>localStorage.getItem('UserValero'));
        this.enterprise = JSON.parse(<string>localStorage.getItem('enterpriseValero'));
        if (this.enterprise === undefined || this.enterprise === null) {
            this.router.navigate(['auth/login']);
        }
        this.getDataProceduresBar();
        this.getCardsData();
        this.getPieBarData();
        this.weeks = [{
            label: 'Last Week',
            value: 0,
            data: [[65, 59, 80, 81, 56, 55, 40], [28, 48, 40, 19, 86, 27, 90]]
        },
        {
            label: 'This Week',
            value: 1,
            data: [[35, 19, 40, 61, 16, 55, 30], [48, 78, 10, 29, 76, 77, 10]]
        }];

        this.selectedWeek = this.weeks[0];


        this.cols = [
            {header: 'Name', field: 'name'},
            {header: 'Category', field: 'category'},
            {header: 'Price', field: 'price'},
            {header: 'Status', field: 'inventoryStatus'}
        ]
    }

    initCharts() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.barData = {
            labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'],
            datasets: [

                {
                    label: 'Trámites',
                    backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                    barThickness: 12,
                    borderRadius: 12,
                    data: this.procedurePerMonth
                }
            ]
        };

        this.pieData = {
            labels: ['0-1 Día', '2-3 Días', '>3 Días'],
            datasets: [
                {
                    data: this.pieDataArray,
                    backgroundColor: [
                        '#a4d6b4',
                        '#fdde52',
                        '#ed5c5c'
                    ],
                    hoverBackgroundColor: [
                        '#a4d6b4',
                        '#fdde52',
                        '#ed5c5c'
                    ]
                }
            ]
        };

        this.barOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: 700,
                        },
                        padding: 28
                    },
                    position: 'bottom'
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };

        this.pieOptions = {
            animation: {
                duration: 0
            },
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                        usePointStyle: true,
                        font: {
                            weight: 500,
                        },
                        padding: 28
                    },
                    position: 'bottom'
                }
            }
        };
    }

    onWeekChange() {
        let newBarData = {...this.barData};
        newBarData.datasets[0].data = this.selectedWeek.data[0];
        newBarData.datasets[1].data = this.selectedWeek.data[1];
        this.barData = newBarData;
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    ngOnDestroy(): void {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
