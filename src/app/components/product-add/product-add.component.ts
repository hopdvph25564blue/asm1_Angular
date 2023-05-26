import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent {
  constructor(private productService:ProductService, private formBuilder:FormBuilder){}
  productForm = this.formBuilder.group({
    name:[''],
    price:[0]
  })
  onHandleSubmit(){
    const product:IProduct = {
      name:this.productForm.value.name || "",
      price:this.productForm.value.price || 0
    }
    this.productService.addProduct(product).subscribe(data=>{
      console.log(data)
    })
  }
}
