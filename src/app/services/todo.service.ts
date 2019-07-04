import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DatePipe } from '@angular/common'

import { ApiResult } from '../models/ApiResult';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import { TodoModel } from '../models/TodoModel';

var headers_object = new HttpHeaders();
headers_object.append('Content-Type', 'application/json');
//headers_object.append('Access-Control-Allow-Allow-Origin', '*')
headers_object.append('access-control-allow-credentials', 'true')
headers_object.append('access-control-allow-methods', 'GET,POST,PUT,DELETE')



const httpOptions = {
  headers: headers_object
}
//   headers: new HttpHeaders({
//   'Content-Type': 'application/json'
// })

@Injectable({
  providedIn: 'root'
})


export class TodoService {
  private _data: BehaviorSubject<any> = new BehaviorSubject<TodoModel>(null);
  latestList: any;
  API_URl:string = 'http://192.168.1.135/developers/todolist/api/Todo'
  //API_URl:string = 'https://localhost:44369/api/Todo'
  constructor(private datepipe: DatePipe, private http:HttpClient) { } 

  //GET
  getTodos():Observable<ApiResult>{
    return this.http.get<ApiResult>(this.API_URl, httpOptions)
  }

  //GET{id}
  getTodo(id: number):Observable<ApiResult>{
    return this.http.get<ApiResult>(`${this.API_URl}/${id}`, httpOptions)
  }

  //POST
  addTodo(todoParam: TodoModel):Observable<ApiResult>{
    const postTodo = {
      name: todoParam.name,
      date: this.datepipe.transform(todoParam.date, 'yyyyMMdd h:mm a')
    }
    return this.http.post<ApiResult>(this.API_URl, postTodo, {headers: headers_object});
  }

  //PUT
  editTodo(todoParam: TodoModel):Observable<ApiResult>{
    return this.http.put<ApiResult>(this.API_URl, todoParam, {headers: headers_object});
  }

  //DELETE
  deleteTodo(todoId: number):Observable<ApiResult>{
    const url = `${this.API_URl}/${todoId}`
    console.log(url)
    return this.http.delete<ApiResult>(url, {headers: headers_object});
  }

  public setNewTodo(data: TodoModel){
    this._data.next(data);
  }

  public getData(): Observable<TodoModel>{
    return this._data.asObservable();
  }

  public formatDate(date: any){
    //console.log(`format date in service ${date}`)
  }

}
