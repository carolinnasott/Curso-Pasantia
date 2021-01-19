import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient} from '@angular/common/http';
import { catchError} from 'rxjs/operators';

import { Cliente } from './cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  [x: string]: any;
  put(seleccionado: Cliente) {
    throw new Error('Method not implemented.');
  }
  post(seleccionado: Cliente) {
    throw new Error('Method not implemented.');
  }

  private url = 'http://localhost:8888/cliente.php';

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