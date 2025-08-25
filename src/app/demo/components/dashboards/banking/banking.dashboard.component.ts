import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import {ApiService} from "../../../service/api.service";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import {Chart} from "chart.js";
import * as jspdf from "jspdf";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import {Router} from "@angular/router";


@Component({
	templateUrl: './banking.dashboard.component.html'
})
export class BankingDashboardComponent implements OnInit, OnDestroy {

    @ViewChild("report", {static: false}) report!: ElementRef;

	chartData: any;

    chartProceduresCount: any;

    chartCreationToDav: any;

	chartOptions: any;

    chartSentDavToAp: any;

    chartArrivesToRef: any;

    arrivesToRef: any[] = [];

    monthLabels: any[] = [];

    proceduresCount: any[] = [];

    initialToDav: any[] = [];

    sendDavToApDav: any[] = [];

    refToOut: any[] = [];

    arrivesToOut: any[] = [];

    aforoAutomatico: any[] = [];
    aforoFisico: any[] = [];
    aforoDocumental: any[] = [];

    rangeDates: any;
    showStatistics: boolean = false;
    charRefToAuthOut: any;
    chartArrivesToOut: any;
    chartByChannel: any;
    user: any;
    aforoFisicoNo: any[] = [];
    enterprise: any;

	constructor( private layoutService: LayoutService, private apiService: ApiService, private router: Router) {

    }

	ngOnInit() {
        this.user = JSON.parse(<string>localStorage.getItem('UserValero'));
        this.enterprise = JSON.parse(<string>localStorage.getItem('enterpriseValero'));
        if (this.enterprise === undefined || this.enterprise === null) {
            this.router.navigate(['auth/login']);
        }
        console.log(this.user)
		this.initChart();
        this.loadFilterOptions();
	}

	initChart() {
		const documentStyle = getComputedStyle(document.documentElement);
		const textColor = documentStyle.getPropertyValue('--text-color');
        Chart.register(ChartDataLabels);
        this.chartOptions ={
            responsive: true,
            plugins: {
                datalabels: {
                    anchor: 'center',
                    labels: {
                        title: {
                            font: {
                                weight: 'bold'
                            }
                        }
                    },
                    color: '#000000'
                }
            }
        }
        this.chartProceduresCount = {
            labels: this.monthLabels,
            datasets: [
                {
                    type: 'line',
                    label: "Cantidad de Trámites (Lineal)",
                    data: this.proceduresCount,
                    tension: 0.4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Cantidad de Trámites',
                    data: this.proceduresCount,
                    fill: true,
                    borderColor: '#00b294',
                    tension: .4,
                    backgroundColor: 'rgb(0,178,148)'
                }
            ]
        };
        this.chartCreationToDav = {
            labels: this.monthLabels,
            datasets: [
                {
                    type: 'line',
                    label: "Cantidad de Trámites (Lineal)",
                    data: this.proceduresCount,
                    tension: 0.4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Cantidad de Trámites',
                    data: this.proceduresCount,
                    fill: true,
                    borderColor: '#00b294',
                    tension: .4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Promedio tramite iniciado a envio DAV',
                    data: this.initialToDav,
                    fill: true,
                    borderColor: '#bad80a',
                    tension: .4,
                    backgroundColor: '#bad80a'
                }
            ]
        };

        this.chartSentDavToAp = {
            labels: this.monthLabels,
            datasets: [
                {
                    type: 'line',
                    label: "Cantidad de Trámites (Lineal)",
                    data: this.proceduresCount,
                    tension: 0.4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Cantidad de Trámites',
                    data: this.proceduresCount,
                    fill: true,
                    borderColor: '#00b294',
                    tension: .4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Promedio envio a DAV a Aprobacion DAV',
                    data: this.sendDavToApDav,
                    fill: true,
                    borderColor: '#bad80a',
                    tension: .4,
                    backgroundColor: '#bad80a'
                }
            ]
        };

        this.chartArrivesToRef = {
            labels: this.monthLabels,

            datasets: [
                {
                    type: 'line',
                    label: "Cantidad de Trámites (Lineal)",
                    data: this.proceduresCount,
                    tension: 0.4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Cantidad de Trámites',
                    data: this.proceduresCount,
                    fill: true,
                    borderColor: '#00b294',
                    tension: .4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Promedio fecha llegada a envío electrónico',
                    data: this.arrivesToRef,
                    fill: true,
                    borderColor: '#bad80a',
                    tension: .4,
                    backgroundColor: '#bad80a'
                }
            ]
        };

        this.charRefToAuthOut = {
            labels: this.monthLabels,
            datasets: [
                {
                    type: 'line',
                    label: "Cantidad de Trámites (Lineal)",
                    data: this.proceduresCount,
                    tension: 0.4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Cantidad de Trámites',
                    data: this.proceduresCount,
                    fill: true,
                    borderColor: '#00b294',
                    tension: .4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Promedio fecha envío electrónico a salida autorizada',
                    data: this.refToOut,
                    fill: true,
                    borderColor: '#bad80a',
                    tension: .4,
                    backgroundColor: '#bad80a'
                }
            ]
        };

        this.chartArrivesToOut = {
            labels: this.monthLabels,
            datasets: [
                {
                    type: 'line',
                    label: "Cantidad de Trámites (Lineal)",
                    data: this.proceduresCount,
                    tension: 0.4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Cantidad de Trámites',
                    data: this.proceduresCount,
                    fill: true,
                    borderColor: '#00b294',
                    tension: .4,
                    backgroundColor: 'rgb(0,178,148)'
                },
                {
                    label: 'Promedio fecha llegada a salida autorizada',
                    data: this.arrivesToOut,
                    fill: true,
                    borderColor: '#bad80a',
                    tension: .4,
                    backgroundColor: '#bad80a'
                }
            ]
        };

        this.chartByChannel = {
            labels: this.monthLabels,
            datasets: [
                {
                    label: 'Aforo Automático',
                    data: this.aforoAutomatico,
                    fill: true,
                    borderColor: '#00b395',
                    tension: .4,
                    backgroundColor: '#00b395'
                },
                {
                    label: 'Aforo Físico Intrusivo',
                    data: this.aforoFisico,
                    fill: true,
                    borderColor: '#B9D532',
                    tension: .4,
                    backgroundColor: '#B9D532'
                },
                {
                    label: 'Aforo Físico No Intrusivo',
                    data: this.aforoFisicoNo,
                    fill: true,
                    borderColor: '#FCEE1D',
                    tension: .4,
                    backgroundColor: '#FCEE1D'
                },
                {
                    label: 'Aforo Documental',
                    data: this.aforoDocumental,
                    fill: true,
                    borderColor: '#F6CBCF',
                    tension: .4,
                    backgroundColor: '#F6CBCF'
                }
            ]
        };



		this.chartData = {
            labels: this.monthLabels,
            datasets: [
                {
                    label: 'Cantidad Trámites',
                    data: this.proceduresCount,
                    fill: false,
                    tension: .4,
                    borderColor: documentStyle.getPropertyValue('--green-500')
                },
                {
                    label: 'Expenses',
                    data: [1200, 5100, 6200, 3300, 2100, 6200, 4500],
                    fill: true,
                    borderColor: '#6366f1',
                    tension: .4,
                    backgroundColor: 'rgba(99,102,220,0.2)'
                }
            ]
        };
	}

	ngOnDestroy(): void {

    }

    transportOptions: any[] = [];
    selectedTransport: any;

    customsOptions: any[] = [];
    selectedCustoms: any;

    providerOptions: any[] = [];
    selectedProvider: any;

    loadFilterOptions() {
        // Ejemplo: cargar datos desde API
        this.apiService.get('procedure/getTransportOptions').subscribe((res :any) => this.transportOptions = res.data);
        this.apiService.get('procedure/getCustomsOptions').subscribe((res :any) => this.customsOptions = res.data);
        this.apiService.get('procedure/getProviderOptions').subscribe((res :any) => this.providerOptions = res.data);
    }

    getStatistics() {
        this.clearData();
        this.showStatistics = true;
        let url = `procedure/getStatsGraphData?initial_date=${this.formatearFecha(this.rangeDates[0])}&final_date=${this.formatearFecha(this.rangeDates[1])}&external_id=${this.enterprise.ruc}`;

        if (this.selectedTransport) url += `&transport=${this.selectedTransport}`;
        if (this.selectedCustoms) url += `&customs=${this.selectedCustoms}`;
        if (this.selectedProvider) url += `&provider=${this.selectedProvider}`;
        this.apiService.get(url).subscribe((resp: any)=> {
           console.log(resp.data);
           for (let dato of resp.data){
               this.monthLabels.push(dato.month);
               this.proceduresCount.push(dato.count);
               this.initialToDav.push(dato.initial_to_DAV);
               this.sendDavToApDav.push(dato.sent_to_approval_DAV);
               this.arrivesToRef.push(dato.endorsement_to_arrives_date);
               this.refToOut.push(dato.authorized_out_to_endorsement);
               this.arrivesToOut.push(dato.authorized_out_to_arrives_date);
               this.aforoAutomatico.push(dato.aforo_automatico);
               this.aforoFisico.push(dato.aforo_fisico);
               this.aforoDocumental.push(dato.aforo_documenal);
               this.aforoFisicoNo.push(dato.aforo_fisicono);
               this.initChart();
           }
        });
        console.log(this.aforoFisicoNo);
        console.log(this.rangeDates);
    }

     formatearFecha(fecha: Date) {
        var año = fecha.getFullYear();
        var mes = ('0' + (fecha.getMonth() + 1)).slice(-2);
        var dia = ('0' + fecha.getDate()).slice(-2);
        var fechaFormateada = año + '-' + mes + '-' + dia;
        return fechaFormateada;
    }

    clearData(){
        this.monthLabels = [];
        this.proceduresCount = [];
        this.initialToDav = [];
        this.sendDavToApDav = [];
        this.arrivesToRef = [];
        this.refToOut = [];
        this.arrivesToOut = [];
        this.aforoAutomatico = [];
        this.aforoFisico = [];
        this.aforoDocumental = [];
        this.aforoFisicoNo = []  }

    setRangeDates(days: number) {
        this.rangeDates = [];
        const today = new Date();
        let oneMonthAgo: Date = new Date(today);
        oneMonthAgo.setDate(oneMonthAgo.getDate() - days);
        this.rangeDates.push(oneMonthAgo)
        this.rangeDates.push(today);
        this.getStatistics();
    }

    generatePdfReport(){
        /*let pdf = new jsPDF();
        pdf.html(this.report.nativeElement, {
            callback: (pdf) => {
                pdf.save("report.pdf");
            }
        });*/

        var data = document.getElementById('report');
        if (data) {
            html2canvas(data).then(canvas => {
// Few necessary setting options
                var imgWidth = 208;
                var pageHeight = 295;
                var imgHeight = canvas.height * imgWidth / canvas.width;
                console.log(imgHeight);
                var heightLeft = imgHeight;

                const contentDataURL = canvas.toDataURL('image/png')
                let pdf = new jsPDF('p', 'mm', [imgWidth, imgHeight+30], true); // A4 size page of PDF
                var position = 30;
                const img = new Image();
                img.src = '../assets/layout/images/valerocolor.png';
                img.onload = () => {
                    const imgWidth1 = img.width;
                    const imgHeight1 = img.height;

                    // Agregar la imagen al PDF
                    pdf.addImage(img, 'PNG', 10, 10, imgWidth1 / 10, imgHeight1 / 10); // Ajusta las coordenadas y el tamaño según sea necesario

                    pdf.text(`Indicadores: ${this.user.name}`, 25, 25 );
                    pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
                    const fecha = new Date().toISOString();
                    pdf.save(`reporte_${fecha}.pdf`); // Generated PDF
                };

                img.onerror = () => {
                    console.error('No se pudo cargar la imagen.');
                };

            });
        }
    }
}
