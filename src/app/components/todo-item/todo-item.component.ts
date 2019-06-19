import { Component, OnInit, Input, EventEmitter, Output, ViewChild  } from '@angular/core';


import { ApiResult } from '../../models/ApiResult';
import { TodoModel } from '../../models/TodoModel';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoModel
  @Output() editTodo: EventEmitter<TodoModel> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onEdit( itemId: number){
    const forEdit = {
      id: itemId,
      name: '',
      date: ''
    }
    this.editTodo.emit(forEdit)
  }

  deleteTodo(itemId: number){
    console.log('delete: ' + itemId)
  }
}
