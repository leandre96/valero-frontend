import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    //private apiUrl = 'https://walrus-app-imivq.ondigitalocean.app'; // Reemplaza esto con la URL de tu backend
    private apiUrl = 'http://localhost:3000';
    constructor(private http: HttpClient) {}

    private getRequestOptions(headers?: HttpHeaders): object {
        return { headers: headers || new HttpHeaders() };
    }

    public get<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
        return this.http.get<T>(`${this.apiUrl}/${endpoint}`, this.getRequestOptions(headers));
    }

    public post<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.post<T>(`${this.apiUrl}/${endpoint}`, body, this.getRequestOptions(headers));
    }

    public put<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.put<T>(`${this.apiUrl}/${endpoint}`, body, this.getRequestOptions(headers));
    }

    public patch<T>(endpoint: string, body: any, headers?: HttpHeaders): Observable<T> {
        return this.http.patch<T>(`${this.apiUrl}/${endpoint}`, body, this.getRequestOptions(headers));
    }

    public delete<T>(endpoint: string, headers?: HttpHeaders): Observable<T> {
        return this.http.delete<T>(`${this.apiUrl}/${endpoint}`, this.getRequestOptions(headers));
    }
}
