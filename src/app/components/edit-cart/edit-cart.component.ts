import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { cartService } from './../../shared/cart.service';
import { ItemService } from './../../shared/item.service';
import { FormGroup, FormBuilder, Validators ,FormControl} from "@angular/forms";
import { Item } from "../../shared/Item";

var form: FormGroup;
@Component({
  selector: 'app-edit-cart',
  templateUrl: './edit-cart.component.html',
  styleUrls: ['./edit-cart.component.css']
})

export class EditcartComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  items: String[] = [];
 itemsStr = "";
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  editcartForm: FormGroup;

  ngOnInit() {
    this.updatecartForm();
  }

  constructor(
    public fb: FormBuilder,    
    private location: Location,
    private cartApi: cartService,
    private itemApi: ItemService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');
   var items_tmp: String[] = [];

    this.cartApi.GetCart(id).valueChanges().subscribe(data => {
      data.items.forEach(element => {
          this.itemApi.Getitem(element).valueChanges().subscribe(data1 => {
            console.log(data1.name);
            this.itemsStr += data1.name + ","
            items_tmp.push(data1.name);
          });
          
      console.log(items_tmp);
      this.items = items_tmp;
      data.items = this.items;
      });
      this.editcartForm.setValue(data);
    })
  }

  getItems(){
    // hack to remove the last coma.
    return this.itemsStr.substr(0,this.itemsStr.length-1);
  }
  /* Update form */
  updatecartForm(){
    this.editcartForm = this.fb.group({
      id: new FormControl({ value: '', disabled: true }),
      items: new FormControl({ value: [], disabled: true }),
      userID: new FormControl({ value: '', disabled: true }),
      Total:  new FormControl({ value: '', disabled: true }),
    })
  }

  /* Add language */
  add(event: MatChipInputEvent): void {
    var input: any = event.input;
    var value: any = event.value;
    // Add language
    if ((value || '').trim() && this.items.length < 5) {
      this.items.push(value);
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  /* Remove language */
  remove(language: any): void {
    const index = this.items.indexOf(language);
    if (index >= 0) {
      this.items.splice(index, 1);
    }
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.editcartForm.controls[controlName].hasError(errorName);
  }

  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editcartForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Go to previous page */
  goBack(){
    this.location.back();
  }

  /* Submit cart */
  updateCart() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
        this.cartApi.UpdateCart(id, this.editcartForm.value);
      this.router.navigate(['carts-list']);
    }
  }

}