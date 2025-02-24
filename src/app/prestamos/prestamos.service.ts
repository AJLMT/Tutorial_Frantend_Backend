import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Pageable } from '../core/model/page/Pageable';
import { Prestamos } from './model/Prestamos';
import { PrestamosPage } from './model/PrestamosPage';
import { HttpClient } from '@angular/common/http';
import { PRESTAMOS_DATA } from './model/mock-prestamos';

@Injectable({
    providedIn: 'root',
})
export class PrestamosService {
    constructor(private http: HttpClient) {}

    private baseUrl = 'http://localhost:8080/prestamo';

    getPrestamos(pageable: Pageable, gameName?:string, clientName?: string, date?: Date): Observable<PrestamosPage> {
      let params = '';
      if (gameName != null) {
        params += 'gameName=' + gameName + '&';
      }
      if (clientName != null) {
          params += 'clientName=' + clientName + '&';
      }
      if(date != null){
        params += 'date=' + date.toISOString();
      }

      if(params === ''){
        //return of(PRESTAMOS_DATA);
        return this.http.post<PrestamosPage>(this.baseUrl, { pageable: pageable });
      }
      else{
        let url = this.baseUrl + '?' + params;
        return this.http.post<PrestamosPage>(url, { pageable: pageable });
      }
    }

    savePrestamos(prestamo: Prestamos): Observable<Prestamos> {
        const { id } = prestamo;
        let url = id ? `${this.baseUrl}/${id}` : this.baseUrl;
        url = url + '?';
        url = url + 'clientName=' + prestamo.client_name + '&';
        url = url + 'gameName=' + prestamo.game_name + '&';
        return this.http.put<Prestamos>(url, prestamo);
    }

    deletePrestamos(idPrestamos: number): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${idPrestamos}`);
    }

    getAllPrestamoss(): Observable<Prestamos[]> {
        return this.http.get<Prestamos[]>(this.baseUrl);
    }
}
