import { Component, Input, OnInit, inject } from '@angular/core';
import { ProductsService } from '../../Services/products.service';
import { HttpHeaders } from '@angular/common/http';
import { FormProductComponent } from '../../Components/form-product/form-product.component';
import { ProductRequest, ProductResponse } from '../../models/product-model';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-financial-products',
  standalone: true,
  imports: [FormProductComponent,CommonModule],
  templateUrl: './financial-products.component.html',
  styleUrl: './financial-products.component.scss'
})
export class FinancialProductsComponent implements OnInit{
  productsServices=inject(ProductsService)
  route=inject(ActivatedRoute)
  data:ProductResponse
  constructor(private router:Router){
    this.data=this.router.getCurrentNavigation()?.extras.state?.['response']
  }
  ngOnInit(): void {
  }

  productEmmited(product:ProductRequest){
    if(this.data){
      this.productsServices.update(product).subscribe((res:ProductResponse)=>{})
      this.router.navigate(['../../'],{relativeTo:this.route})
    }else{
      this.productsServices.save(product).subscribe((res:ProductResponse)=>{
        this.router.navigate(['../mantainer'],{relativeTo:this.route})
      })
    }
  }

}
