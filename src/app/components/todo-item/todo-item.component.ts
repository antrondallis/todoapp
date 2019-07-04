import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { TodoModel } from '../../models/TodoModel';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoModel
  @Output() editTodo: EventEmitter<TodoModel> = new EventEmitter();
  @Output() deleteTodo: EventEmitter<TodoModel> = new EventEmitter();
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

  onDelete(itemId: number){
    const forDelete = {
      id: itemId,
      name: '',
      date: ''
    }
    this.deleteTodo.emit(forDelete);
  }
}
