import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Curriculo } from '../models/curriculo.model';
import { Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class CurriculosService {
  private apiUrl: string = 'http://localhost:3005/curriculos';

  constructor(private http: HttpClient){ }

  getCurriculos(): Observable<Curriculo[]> {
    return this.http.get<Curriculo[]>(this.apiUrl);
  }

  getCurriculoPorId(id: number): Observable<Curriculo> {
    return this.http.get<Curriculo>(`${this.apiUrl}/${id}`);
  }

  postCurriculo(curriculo: Curriculo): Observable<Curriculo> {
  return this.http.post<Curriculo>(this.apiUrl, curriculo);
}

  putCurriculo(id: any, curriculo: Curriculo): Observable<Curriculo[]> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Curriculo[]>(url, curriculo);
  }

  deleteCurriculo(id: any): Observable<Curriculo[]> {
    const url = this.apiUrl + "/" + id;
    return this.http.delete<Curriculo[]>(url);
  }
}

  // diferença put e path
  // put -> atualiza mais do que um Valor
  // path -> permite atualizar apenas uma informação

