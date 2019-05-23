import { Component, OnInit, Input, EventEmitter, Output  } from '@angular/core';

import { ApiResult } from '../../models/ApiResult';
import { TodoModel } from '../../models/TodoModel';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo: TodoModel
  constructor() { }

  ngOnInit() {
  }

}
