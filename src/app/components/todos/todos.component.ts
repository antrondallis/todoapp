import { Component, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { TodoModel } from '../../models/TodoModel';
import { Observable, Subject, Subscription } from 'rxjs';
import { NgOnChangesFeature } from '@angular/core/src/render3';
import { ApiResult } from 'src/app/models/ApiResult';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @Input()todos:TodoModel[];
  result:ApiResult;
  retrievedTodo:TodoModel;
  subscription: Subscription;

  constructor(private todoService:TodoService, private dataService: TodoService, private datepipe: DatePipe) {
    this.dataService.getData().subscribe(data=>{
      if(data)
        this.addTodo(data);
    })
   }

  ngOnInit() {
    this.todoService.getTodos().subscribe(result => {
      this.todos = result.data
    })
  }

  addTodo(todo:TodoModel){
    //date: this.datepipe.transform(todoParam.date, 'yyyyMMdd h:mm a')
    //todo.date = this.datepipe.transform(todo.date, 'MM/dd/yyyy h:mm a')
    this.todoService.addTodo(todo).subscribe(result=>{
      this.todos.push(todo); console.log(result.message + ' ' + todo.name)
    });
   //console.log(this.result);
  }

  editTodo(todo: TodoModel){
    this.todoService.getTodo(todo.id).subscribe(result=>{
      this.retrievedTodo = result.data; console.log(`${result.data.name}`)
      this.retrievedTodo = {
        id: result.data.id,
        name: result.data.name,
        date: result.data.date
      };
    });
  }

}
