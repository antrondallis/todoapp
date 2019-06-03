import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TodoModel } from './models/TodoModel';
import { Subject } from 'rxjs';
import { ApiResult } from './models/ApiResult';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  @Output() addToList: EventEmitter<any> = new EventEmitter();
  @Output() todoList:TodoModel[];
  newTodo: TodoModel;

  ngOnInit() {
    this.todoList = []
  }
  // title = 'Here is your Todo List!';

  addTodo(todo:TodoModel){
    this.newTodo = todo;
    console.log('emit works ' + this.newTodo.name + ' ' + this.newTodo.date);
    const newTodo = {
      id: 55,
      name: 'test name',
      date: 'test date'
    }

    this.todoList.push(newTodo);
    //this.addToList.emit(this.newTodo)    
  }
}
