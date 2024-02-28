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
  value:ProductResponse={
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  }
@Input() item:ProductResponse=this.value
@Output() confirm:EventEmitter<boolean>= new EventEmitter()
  onCancel(){
    this.confirm.emit(false)
  }
  onConfirm(){
  this.confirm.emit(true)
  }
}
