import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { Routes, RouterModule } from "@angular/router";
import {ProductService} from './product.service';

const routes: Routes = [
 /* { path: '',
    redirectTo: '/products',
    pathMatch: 'full'
  },*/
  { path : 'products', component : ProductComponent},
  { path : 'cart' , component : CartComponent }
]


@NgModule({
  declarations: [
    AppComponent,
    CartComponent,
    ProductComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes,{ enableTracing: true })
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
