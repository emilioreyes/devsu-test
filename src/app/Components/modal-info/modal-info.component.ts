import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  imports: [],
  templateUrl: './modal-info.component.html',
  styleUrl: './modal-info.component.scss'
})
export class ModalInfoComponent {
  @Input() message:string=''
  @Output() confirm:EventEmitter<boolean>= new EventEmitter()
  onConfirm(){
  this.confirm.emit(true)
  }
}
