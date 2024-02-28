import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProductsService } from '../../Services/products.service';
import { RegexUtil } from '../../../app/utils/Regex';
import { ProductRequest, ProductResponse } from '../../models/product-model';
import { ModalInfoComponent } from '../modal-info/modal-info.component';
@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, ModalInfoComponent],
  templateUrl: './form-product.component.html',
  styleUrl: './form-product.component.scss'
})
export class FormProductComponent  implements OnInit , OnChanges{
  productResponse:ProductResponse={
    id: '',
    name: '',
    description: '',
    logo: '',
    date_release: '',
    date_revision: ''
  }
  formProduct!:FormGroup
  fb=inject(FormBuilder)
  productService=inject(ProductsService)
  message:string=''
  showModalInfo:boolean=false
  @Input() productToEdit:ProductResponse=this.productResponse
  @Output() product:EventEmitter<ProductRequest>=new EventEmitter()
  ngOnInit(): void {
      this.initForm()
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  initForm(){
   this.formProduct=this.fb.group({
      id:new FormControl({value: this.productToEdit ? this.productToEdit.id : "",disabled: this.productToEdit ? true : false},[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
      name:new FormControl('',[Validators.required,Validators.minLength(5),Validators.maxLength(100)]),
      description:new FormControl('',[Validators.required,Validators.minLength(10),Validators.maxLength(200)]),
      logo:new FormControl('',[Validators.required]),
      date_release:new FormControl('',[Validators.required,Validators.pattern(RegexUtil.getRegexDate())]),
      date_revision:new FormControl({value:"",disabled:true},[Validators.required,Validators.pattern(RegexUtil.getRegexDate())])
    })
    this.productToEdit ? this.patchForm() : null
  }
  patchForm(){
    this.formProduct?.patchValue({
      id:this.productToEdit.id,
      name:this.productToEdit.name,
      description:this.productToEdit.description,
      logo:this.productToEdit.logo,
      date_release: this.getFormatDate(this.productToEdit.date_release),
      date_revision:this.getFormatDate(this.productToEdit.date_revision)
    })
  }
  getFormatDate(date:string){
    let dateRelease=date.split("T")
    let arrRelease=dateRelease[0].split("-")
   return `${arrRelease[2]}/${arrRelease[1]}/${arrRelease[0]}`
  }
 
  validate(){
    let id=this.formProduct.controls['id'].value
    if(id.length>0 && this.formProduct.controls['id'].errors==null){
      this.productService.verification(id).subscribe((res:boolean)=>{
        this.setConfirmValidator(res)
      })
    }
  }
  setConfirmValidator(res:boolean){
    const matchingControl = this.formProduct.controls['id'];
    if(res){
      matchingControl.setErrors({confirmedValidator: true})
    }
  }
  validateRelease(){
    let inputDate=this.formProduct.controls['date_release'].value
    let arr = inputDate.split('/')
    if(inputDate.length>2 && arr.length>2){
      const date=new Date(arr[2],arr[1]-1,arr[0]).toLocaleDateString()
      
      const actualDate = new Date().toLocaleDateString()
      
      if(date >= actualDate){
        this.formProduct.controls['date_revision'].setValue(`${arr[0]}/${arr[1]}/${parseInt(arr[2])+ 1}`)
      }else{
        const matchingControl = this.formProduct.controls['date_release'];
          matchingControl.setErrors({fechaError: true})
      }
    }else{
      this.formProduct.controls['date_revision'].setValue("")
    }
  }

  onSubmit(){
    if(this.formProduct.valid){
      let productToSend:ProductRequest={
        id: this.formProduct.controls['id'].value,
        name: this.formProduct.controls['name'].value,
        description: this.formProduct.controls['description'].value,
        logo: this.formProduct.controls['logo'].value,
        date_release: this.transformToDate(this.formProduct.controls['date_release'].value),
        date_revision: this.transformToDate(this.formProduct.controls['date_revision'].value)
      }
      this.product.emit(productToSend)
    }else{
      this.message="El fomulario tiene campos obligatorios vacios, llene completamente el formulario e intente enviarlo"
      this.showModalInfo=true
      this.weitTime(3000)
    }
  }
  weitTime(time:number) {
    setTimeout(() => {
      this.showModalInfo=false
    }, time);
  }
  onReset(){
    if(this.productToEdit){
      this.formProduct.patchValue({
        name:"",
        description:"",
        logo:"",
        date_release: "",
        date_revision:""
      })
    }else{
      this.formProduct.patchValue({
        id:"",
        name:"",
        description:"",
        logo:"",
        date_release: "",
        date_revision:""
      })
    }
  }
  transformToDate(value:any){
    let arr = value.split('/');
    let day= parseInt(arr[0])<9 ? `0${parseInt(arr[0])}`: parseInt(arr[0])
    let month= parseInt(arr[1])<9 ? `0${parseInt(arr[1])}`: parseInt(arr[1])
    return `${arr[2]}-${month}-${day}`
  }
  onEmmitModalInfo(value:boolean){
    this.showModalInfo=!value
  }
 get id(){
  return this.formProduct.get('id')
 }
 get name(){
  return this.formProduct.get('name')
 }
 get description(){
  return this.formProduct.get('description')
 }
 get logo(){
  return this.formProduct.get('logo')
 }
 get date_release(){
  return this.formProduct.get('date_release')
 }
 get date_revision(){
  return this.formProduct.get('date_revision')
 }
  public errorMessage = {
    id: [
      { id:1 ,type: 'required',message:"es requerido" },
      { id:2, type: 'maxlength',message:"exedio el maximo de caracteres(10)"},
      { id:3, type: 'minlength',message:"requiere al menos 3 caracteres" },
      { id:4 ,type: 'confirmedValidator' , message:"el id ya existe, reemplacelo" }
    ],
    name: [
      { id:1 ,type: 'required',message:"es requerido" },
      { id:2, type: 'maxlength',message:"exedio el maximo de caracteres(100)"},
      { id:3, type: 'minlength',message:"requiere al menos 5 caracteres" },
    ],
    description: [
      { id:1 ,type: 'required',message:"es requerido" },
      { id:2, type: 'maxlength',message:"exedio el maximo de caracteres(200)"},
      { id:3, type: 'minlength',message:"requiere al menos 10 caracteres" },
    ],
    logo:[
      { id:1 ,type: 'required',message:"es requerido" },
    ],
    date_release:[
      { id:1 ,type: 'required',message:"es requerido" },
      { id:2 ,type: 'pattern',message:"ingrese fecha dd/mm/yyy (01/02/2024)" },
      { id:3 ,type: 'fechaError' , message:"fecha no permitida" }
    ],
    date_revision:[
      { id:1 ,type: 'required',message:"es requerido" },
      { id:2 ,type: 'pattern',message:"ingrese fecha dd/mm/yyy (01/02/2024)" },
    ]
  }
}
