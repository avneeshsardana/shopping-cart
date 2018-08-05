import { Component, OnInit } from '@angular/core';
import {ProductService} from '../product.service'
import { Product } from '../entities/product.entities';
import { Item } from '../entities/item.entities';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(private productservice:ProductService,private activatedRoute: ActivatedRoute) { }
  public items :Item[];
  public total:number=0;
  public cart=[];
  ngOnInit() {
    //this.activatedRoute.params.subscribe(params=> {
      //var id = params['id'];
      var id = this.activatedRoute.snapshot.params['id'];
      console.log("Product ID "+id);
      if(id){
        var x= this.productservice.find(id);
        console.log("id is "+ x.id+ x.name);
        var item:Item = {
          product: this.productservice.find(id),
          quantity:1        
        };
        console.log("Item Product Name"+ item.product.name);
        console.log("Cart Length"+this.cart.length);
        //this.cart.push(JSON.stringify(item));
        if(sessionStorage.getItem('cart')==null)
        {
          let cart: any=[];
          cart.push(JSON.stringify(item));
          sessionStorage.setItem('cart', JSON.stringify(cart));
          console.log("First Time" +cart )
        }
        else{
          let cart:any = JSON.parse(sessionStorage.getItem('cart'));
          console.log("Cart in nginit"+ cart);
         // cart.push(JSON.stringify(item));
          //sessionStorage.setItem('cart', JSON.stringify(cart));
          //console.log("Cart JSON.parse(sessionStorage.getItem('cart')))
          let index:number=-1;
          for (var i=0;i<cart.length;i++){
            let item:Item = JSON.parse(cart[i]);
            console.log("Item.Product"+item);
            if(item.product.id==id){
              index=i;
              //item.quantity+=1;
              break;
            }
          }
          if(index==-1)
          {
            cart.push(JSON.stringify(item));
            sessionStorage.setItem('cart',JSON.stringify(cart));
            console.log("index-1");
          } else{
            let item: Item = JSON.parse(cart[index]);
            item.quantity+=1;
            //sessionStorage.setItem('cart',null);
            for (var i=0;i<cart.length;i++){
              let item1= JSON.parse(cart[i]);
              if(item1.product.id==id){
                cart.splice(i,1);
                break;
              }
            }
            cart[index] = JSON.stringify(item);
           sessionStorage.setItem("cart", JSON.stringify(cart));
            console.log("index");
          }
        }
        this.loadcart();

      }else{
        this.loadcart();

      }
    //})
  }

  loadcart(){
    this.total=0;
  this.items=[];
  //console.log(this.items);
  let cart:any = JSON.parse(sessionStorage.getItem('cart'));
   //let cart = JSON.parse(sessionStorage.getItem('cart'));
   console.log("Cart in loadcart"+ cart);
   console.log("Cart Length"+ cart.length);
    for (var i=0;i<cart.length;i++){
     // let quantity= JSON.parse(this.cart[i].quantity);
      //let product:Product=JSON.parse(cart[i].product);
      let item:Item= JSON.parse(cart[i]);

    //  let product:Product=cart[i].product;
     // console.log("item.product.id"+ item.product.id);
    //  product.id =item.product.id;
      //product.name=item.product.name;
      //product.price=item.product.price;
      //product.photo=item.product.photo;
     // product = [
        //{id: item.product.id, name:item.product.name, price:item.product.price , photo: item.product.photo}]
    console.log("Item in Loadcart"+item);
  //  console.log("Item in Loadcart"+quantity);
        this.items.push(item);
      /*this.items.push({
        product:product,
        quantity:2
      });*/
      console.log(this.items);
    this.total += item.product.price* item.quantity;
    }
    
   
  }

  remove(id:string):void{
    let cart:any = JSON.parse(sessionStorage.getItem('cart'));
    let index:number=-1;
    for (var i=0;i<cart.length;i++){
      let item= JSON.parse(cart[i]);
      if(item.product.id==id){
        cart.splice(i,1);
        break;
      }
    }
   sessionStorage.setItem("cart", JSON.stringify(cart));
   this.loadcart();
  }

}
