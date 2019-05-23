import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { ApiResult } from '../models/ApiResult';
import { Observable } from 'rxjs';

const httpOptions = {}
  headers: new HttpHeaders({
  'Content-Type': 'application/json'
})

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  API_URl:string = 'http://192.168.1.135/developers/todolist/api/Todo'
  constructor(private http:HttpClient) { }

  getTodos():Observable<ApiResult>{
    return this.http.get<ApiResult>(`${this.API_URl}`, httpOptions)
  }
}
