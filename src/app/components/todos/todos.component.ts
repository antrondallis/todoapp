import { Component, OnInit, Input, Output, SimpleChange } from '@angular/core';
import { TodoService } from '../../services/todo.service'
import { TodoModel } from '../../models/TodoModel';
import { Observable, Subject } from 'rxjs';
import { NgOnChangesFeature } from '@angular/core/src/render3';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.scss']
})
export class TodosComponent implements OnInit {
  @Input() newTodo: TodoModel;

  @Input()todos:TodoModel[];
  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe(result => {
      this.todos = result.data
    })
  }

  ngOnChange(changes: {[propKey: string]: SimpleChange}){
     console.log('this.newTodo.name')
     let test: string[] = [];
     for (let propName in changes){
       console.log(`test`)
     }
    //console.log(changes)
  }

  addTodo(todo:TodoModel){
    //this.events.subscribe(event => {this.addTodoToList(event)})
    console.log('still working ' + todo.name)
    
  }

}
