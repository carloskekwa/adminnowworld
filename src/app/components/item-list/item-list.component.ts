import { Component, ViewChild } from '@angular/core';
import { Item } from '../../shared/Item';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { ItemService } from '../../shared/item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent{
  dataSource: MatTableDataSource<Item>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  // - An item should have ID, SKU, name, description, prices
  itemData: any = [];
  displayedColumns: any[] = [
    "SKU", 
    "name",
    "description",
    'prices',
    'action'
  ];
  


  constructor(private itemApi: ItemService){
    this.itemApi.GetitemList()
    .snapshotChanges().subscribe(items => {
      items.forEach(item => {
        let a = item.payload.toJSON();

          a['$key'] = item.key;
          this.itemData.push(a as Item)

        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.itemData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
        }, 0);
    })
  }
   /* Delete */
   deletecart(index: number, e){
    if(window.confirm('Are you sure?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.itemApi.Deleteitem(e.$key)
    }
  }
}
