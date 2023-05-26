import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { IProduct } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent {
  product!:IProduct
  productForm = this.formBuilder.group({
    name:[''],
    price:[0]
  })
  constructor(private productService:ProductService, private formBuilder:FormBuilder, private route:ActivatedRoute){
    this.route.paramMap.subscribe(param=>{
      const id = param.get('id')
      this.productService.getProduct(id).subscribe((product)=>{
        this.product = product
        this.productForm.patchValue({
          name:product.name,
          price:product.price
        })
      })
    })
  }
  onHandleEdit(){
    const product:IProduct = {
      id:this.product.id,
      name:this.productForm.value.name || "",
      price:this.productForm.value.price || 0
    }
    this.productService.updateProduct(product).subscribe(data=>{
      console.log(data)
    })
  }
}
