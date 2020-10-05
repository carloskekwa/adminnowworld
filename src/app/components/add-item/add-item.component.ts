import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Item } from "../../shared/Item";
import { ItemService } from 'src/app/shared/item.service';


@Component({
  selector: 'app-add-cart',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AdditemComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  itemArray: String[] = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  itemForm: FormGroup;


  ngOnInit() { 
    this.itemApi.GetitemList();
    this.submititemForm();
  }

  constructor(
    public fb: FormBuilder,
    private itemApi: ItemService
  ) { }

  /* Remove dynamic languages */
  remove(item: String): void {
    const index = this.itemArray.indexOf(item);
    if (index >= 0) {
      this.itemArray.splice(index, 1);
    }
  }

  /* Reactive cart form */
  submititemForm() {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      SKU: ['', [Validators.required]],
      prices: ['', [Validators.required]],
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.itemForm.controls[controlName].hasError(errorName);
  }

  
  
  /* Date */
  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.itemForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  /* Reset form */
  resetForm() {
    this.itemArray = [];
    this.itemForm.reset();
    Object.keys(this.itemForm.controls).forEach(key => {
      this.itemForm.controls[key].setErrors(null)
    });
  }

  /* Submit cart */
  submitcart() {
    if (this.itemForm.valid){
      this.itemApi.Additem(this.itemForm.value)
      this.resetForm();
    }
  }

}