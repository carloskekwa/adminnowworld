import { Injectable } from '@angular/core';
import { Item } from './Item';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { UtilService } from '../utils/util.service'
@Injectable({
  providedIn: 'root'
})
export class ItemService {

  itemsRef: AngularFireList<any>;
  itemRef: AngularFireObject<any>;

  constructor(private db: AngularFireDatabase) {}
    /* Create item */
    Additem(item: Item) {
      this.itemsRef.push({
        SKU : item.SKU ,
        description: item.description,
        name: item.name,
        id : UtilService.generateID(),
        prices: item.prices
      })
      .catch(error => {
        this.errorMgmt(error);
      })
    }



  /* Get item */
  Getitem(id: string) {
    this.itemRef = this.db.object('item-list/' + id);
    return this.itemRef;
  }  

  /* Get item list */
  GetitemList() {
    this.itemsRef = this.db.list('item-list');
    return this.itemsRef;
  }
  // - An item should have ID, SKU, name, description, prices

  /* Update item */
  Updateitem(id : String, item: Item) {
    this.itemRef.update({
      name: item.name,
      SKU : item.SKU,
      description: item.description,
      prices: item.prices
    })
    .catch(error => {
      this.errorMgmt(error);
    })
  }

  /* Delete item */
  Deleteitem(id: string) {
    this.itemRef = this.db.object('item-list/' + id);
    this.itemRef.remove()
    .catch(error => {
      this.errorMgmt(error);
    })
  }
     // Error management
  private errorMgmt(error) {
    console.log(error)
  } 

}
