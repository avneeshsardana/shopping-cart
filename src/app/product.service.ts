import { Injectable } from '@angular/core';

import {Product} from './entities/product.entities';

@Injectable()
export class ProductService {
    private products : Product[];
    constructor() {
        this.products = [
            {id: 'p01', name:'name 1', price:20 , photo: 'thumb1.jpg'},
            {id: 'p02', name:'name 2', price:30 , photo: 'thumb2.jpg'},
            {id: 'p03', name:'name 3', price:40 , photo: 'thumb3.jpg'}
            
        ]
    }

    findAll():Product[]{
        return this.products;
    }
     find(id:string): Product {
         return this.products[this.getSelectedIndex(id)];
     }
     getSelectedIndex(x:string):number{
        console.log("Value of x"+ x);
        for (var i=0; i<this.products.length;i++)
        {
            console.log("Printing"+this.products[i].id);
           if(this.products[i].id==x){
               console.log("Value of i"+ i);
               return i;
           }
           //return -1;
        }
    }
    
}