import { Component, OnInit, EventEmitter, Output } from '@angular/core';

declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-title',
  templateUrl: './title.component.html',
  styleUrls: ['./title.component.scss']
})
export class TitleComponent implements OnInit {
  @Output() addTodo: EventEmitter<any> = new EventEmitter();
  name:string;
  date:string;

  details:string = `This application is a test for Angular applications calling .NET Core Apis with
  Bootstrap sprinkled in. Click the button below to add a new Todo Item to the list.`
  
  constructor() { }

  ngOnInit() {
  }

  onSubmit(){
    const todo = {
      name: this.name,
      date: this.date
    }
    this.addTodo.emit(todo);
    
  }

}
