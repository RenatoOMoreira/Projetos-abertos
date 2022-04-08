import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Tarefa } from '../model/tarefa';

@Injectable({
  providedIn: 'root'
})
export class TarefaService {

  url ='http://localhost:3000/Tarefas';
  constructor(private httpClient: HttpClient) { }


//Headers 

httpOptions = {
  headers: new HttpHeaders({'Content-type': 'application/json'})
  }

  get():Observable<Tarefa[]>{
    return this.httpClient.get<Tarefa[]>(this.url)
    .pipe(
      retry(2),
       catchError(this.handleError))
  }
  save(Tarefa: Tarefa): Observable<Tarefa>{
    return this.httpClient.post<Tarefa>(this.url, JSON.stringify(Tarefa),
    this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError))
  }

  update(Tarefa: Tarefa): Observable<Tarefa>{
    return this.httpClient.put<Tarefa>
    (this.url + '/' + Tarefa.id, JSON.stringify(Tarefa), this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  delete(Tarefa: Tarefa){
    return this.httpClient.delete<Tarefa>
    (this.url + '/' + Tarefa.id, this.httpOptions)
    .pipe(
      retry(1),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){

    let errorMessage = '';
    if (error.error instanceof ErrorEvent){
      //ESSE ERRO OCORREU DO LADO DO CLIENTE - FRONT END
      errorMessage = `Erro do lado do cliente: ${error.error.message}`;
    }
    else{
      //ERRO QUE OCORREU DO LADO DO SERVIDOR 
      errorMessage = `Código do erro: ${error.status}, mensagem: ${error.message}`; 
    }
    return throwError(errorMessage);
  }
}