import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service'
import { Product } from '../entities/product.entities';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
   public products:Product[];
  constructor(private productservice:ProductService) { }

  ngOnInit() {
    this.products=this.productservice.findAll();
    console.log(this.products);
  }
  
  buynow(event):void{
    console.log("In Product Component");
  }
}
