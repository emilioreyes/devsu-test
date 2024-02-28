import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { ProductsService } from '../../Services/products.service';
import { CommonModule } from '@angular/common';
import { ProductResponse } from '../../models/product-model';
import {MatButtonModule} from '@angular/material/button';
import { ModalComponent } from '../../Components/modal/modal.component';
import { FormsModule } from '@angular/forms';
import { ModalInfoComponent } from '../../Components/modal-info/modal-info.component';
@Component({
  selector: 'app-financial-products-mantainer',
  standalone: true,
  imports: [CommonModule,MatButtonModule, ModalComponent,ModalInfoComponent,FormsModule],
  templateUrl: './financial-products-mantainer.component.html',
  styleUrl: './financial-products-mantainer.component.scss'
})
export class FinancialProductsMantainerComponent implements OnInit{
  router=inject(Router)
  route=inject(ActivatedRoute)
  productService=inject(ProductsService)
  list:ProductResponse[]=[]
  listFilter:ProductResponse[]=[]
  itemDelete!:ProductResponse
  showModal:boolean=false
  showModalInfo:boolean=false
  text:string=''
  selectPagination:number=5
  message:string=""
  ngOnInit(): void {
      this.getProducts()
  }
  newProduct(){
    this.router.navigate(['../financial-products'],{relativeTo:this.route})
  }
  onEdit(item:ProductResponse){
 
    this.router.navigate(['../financial-products',item.id],{relativeTo:this.route,state: {
      response: item,
    }})
  }
  onDelete(item:ProductResponse){
    this.showModal=true
    this.itemDelete=item
  }
  emmitedDelete(value:boolean){
    this.showModal=false;
    if(value){
      //cuando se elimina el server responde con un error indicando que se eleimino
      this.productService.delete(this.itemDelete.id).subscribe((res:any)=>{
        this.getProducts()
      },erro=>{
        this.getProducts()
        this.message=erro.error.text
        this.showModalInfo=true
        this.weitTime(3000)
      })
    }
    
  }
  getFormatDate(date:string){
    let dateRelease=date.split("T")
    let arrRelease=dateRelease[0].split("-")
   return `${arrRelease[2]}/${arrRelease[1]}/${arrRelease[0]}`
  }
  getProducts(){
    this.productService.getProducts().subscribe((res:ProductResponse[])=>{
      this.list=res
      this.listFilter=res
    })
  }
  searchText(){
    let busqueda = this.text;
    let expresion = new RegExp(`${busqueda}.*`, "i");
    this.listFilter=this.list.filter(producto => expresion.test(producto.id));
  }

  weitTime(time:number) {
    setTimeout(() => {
      this.showModalInfo=false
    }, time);
  }
  onEmmitModalInfo(value:boolean){
    this.showModalInfo=!value
  }
}
