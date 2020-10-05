import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { cartService } from '../../shared/cart.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Item } from "../../shared/Item";
import { Cart } from "../../shared/Cart";


@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddcartComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  itemArray: String[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  cartForm: FormGroup;


  ngOnInit() { 
    this.cartApi.GetCartList();
    this.submitcartForm();
  }

  constructor(
    public fb: FormBuilder,
    private cartApi: cartService
  ) { }

  /* Remove dynamic languages */
  remove(item: String): void {
    const index = this.itemArray.indexOf(item);
    if (index >= 0) {
      this.itemArray.splice(index, 1);
    }
  }

  /* Reactive cart form */
  submitcartForm() {
    this.cartForm = this.fb.group({
      Total: ['', [Validators.required]],
      item: [this.itemArray]
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.cartForm.controls[controlName].hasError(errorName);
  }

  /* Add dynamic languages */
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    // Add language
    if ((value || '').trim() && this.itemArray.length < 5) {
      this.itemArray.push(value)
    }
    // Reset the input value
    if (input) {
      input.value = '';
    }
  }
  
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.cartForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.itemArray = [];
    this.cartForm.reset();
    Object.keys(this.cartForm.controls).forEach(key => {
      this.cartForm.controls[key].setErrors(null)
    });
  }

  /* Submit cart */
  submitcart() {
    if (this.cartForm.valid){
      var cart : Cart = this.cartForm.value;
      cart.items = this.itemArray;
      this.cartApi.Addcart(this.cartForm.value)
      this.resetForm();
    }
  }

}