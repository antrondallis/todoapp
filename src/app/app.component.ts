import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TodoModel } from './models/TodoModel';
import { TodoService } from './services/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  newTodo: TodoModel;

  constructor(private todoService: TodoService, private dataService: TodoService){  }
  // title = 'Here is your Todo List!';

  addTodo(todo:TodoModel){
    this.newTodo = todo;


    this.dataService.setNewTodo(this.newTodo);
  }
}
