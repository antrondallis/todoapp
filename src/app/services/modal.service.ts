import { Injectable } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modals: any[] = []; 
  //constructor(private activeModal:MDBModalRef) { }

  add(modal: any) {
    this.modals.push(modal);
}
}
