import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private url = 'http://localhost:8888/clientes.php';

  constructor(
    private http: HttpClient,
  ) { }

  get(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.url)
            .pipe(catchError(this.handleError));
  }

  handleError(err: Response) {
    return of([]);
  }
}