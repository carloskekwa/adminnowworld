import { Injectable } from '@angular/core';
import { Cart } from './Cart';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { UtilService } from '../utils/util.service'
@Injectable({
  providedIn: 'root'
})

export class cartService {
  cartsRef: AngularFireList<any>;
  cartRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}

  /* Create cart */
  Addcart(cart: Cart) {

    this.cartsRef.push({
      Total: cart.Total,
      userID: "666",
      id : UtilService.generateID(),
      items: cart.items
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }
    
  /* Get cart */
  GetCart(id: string) {
    this.cartRef = this.db.object('cart-list/' + id);
    return this.cartRef;
  }  

  /* Get cart list */
  GetCartList() {
    this.cartsRef = this.db.list('cart-list');
    return this.cartsRef;
  }

  /* Update cart */
  UpdateCart(id : String, cart: Cart) {
    this.cartRef.update({
      Total : cart.Total,
      items: cart.items
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete cart */
  Deletecart(id: string) {
    this.cartRef = this.db.object('cart-list/' + id);
    this.cartRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  // Error management
  private errorMgmt(error) {
    console.log(error)
  }
}