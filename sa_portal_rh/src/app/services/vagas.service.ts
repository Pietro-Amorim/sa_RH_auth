import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vaga } from '../models/vaga.model';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class VagasService {
  private apiUrl: string = 'http://localhost:3005/vagas'; //endereço da API

  constructor(private http: HttpClient){ }

  // GET
  getVagas(): Observable<Vaga[]> {
    return this.http.get<Vaga[]>(this.apiUrl);
  }

  // POST
  postVaga(vaga: Vaga): Observable<Vaga> {
    return this.http.post<Vaga>(this.apiUrl, vaga);
  }

  // PUT
  putVaga(id: any, vaga: Vaga): Observable<Vaga> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Vaga>(url, vaga);
  }

  // DELETE
  deleteVaga(id: any): Observable<void> {
    const url = this.apiUrl + "/" + id;
    return this.http.delete<void>(url);
  }

  // diferença put e path
  // put -> atualiza mais do que um Valor
  // path -> permite atualizar apenas uma informação
}