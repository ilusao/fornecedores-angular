import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Fornecedor } from './fornecedor';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  url = "http://localhost:8080/fornecedores";

  constructor(private http : HttpClient) { }

  getfornecedores(): Observable<Fornecedor[]>{

    return this.http.get<Fornecedor[]>(this.url);
  }

  save(fornecedor : Fornecedor) : Observable<Fornecedor>{

    return this.http.post<Fornecedor>(this.url, fornecedor);
  }


  delete(fornecedor : Fornecedor) : Observable<void>{

    return this.http.delete<void>(`${this.url}/${fornecedor.id}`);
  }

  update(fornecedor : Fornecedor) : Observable<Fornecedor>{

    return this.http.put<Fornecedor>(`${this.url}/${fornecedor.id}`, fornecedor);
  }
}
