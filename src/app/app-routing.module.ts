import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddcartComponent } from './components/add-cart/add-cart.component';
import { cartListComponent } from './components/cart-list/cart-list.component';
import { EditcartComponent } from './components/edit-cart/edit-cart.component';
import { AdditemComponent } from './components/add-item/add-item.component';
import {EditItemComponent} from './components/edit-item/edit-item.component'
import {ItemListComponent} from './components/item-list/item-list.component'



const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-item' },
  { path: 'add-item', component: AdditemComponent },
  { path: 'edit-cart/:id', component: EditcartComponent },
  { path: 'carts-list', component: cartListComponent },
  {path :'edit-item/:id' , component: EditItemComponent},
  {path :'items-list' , component: ItemListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }