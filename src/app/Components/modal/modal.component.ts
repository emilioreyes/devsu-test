import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ProductResponse } from '../../models/product-model';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
@Input() item!:ProductResponse
@Output() confirm:EventEmitter<boolean>= new EventEmitter()
  onCancel(){
    this.confirm.emit(false)
  }
  onConfirm(){
  this.confirm.emit(true)
  }
}
