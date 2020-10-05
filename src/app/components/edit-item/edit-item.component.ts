import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { cartService } from './../../shared/cart.service';
import { FormGroup, FormBuilder, Validators ,FormControl} from "@angular/forms";
import { ItemService } from 'src/app/shared/item.service';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.css']
})
export class EditItemComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  items: String[] = [];
  @ViewChild('chipList') chipList;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;
  edititemForm: FormGroup;

  ngOnInit() {
    this.updateitemForm();
  }

  constructor(
    public fb: FormBuilder,    
    private location: Location,
    private itemApi: ItemService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    var id = this.actRoute.snapshot.paramMap.get('id');

    this.itemApi.Getitem(id).valueChanges().subscribe(data => {
      this.items = data.items;

      this.edititemForm.setValue(data);
    })
  }

  /* Get errors */
  public handleError = (controlName: string, errorName: string) => {
    return this.edititemForm.controls[controlName].hasError(errorName);
  }

  // - An item should have ID, SKU, name, description, prices
    /* Update form */
    updateitemForm(){
      this.edititemForm = this.fb.group({
        id: new FormControl({ value: '', disabled: true }),
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
        SKU: ['', [Validators.required]],
        prices :['', [Validators.required]]
      })
    }

 /* Go to previous page */
 goBack(){
  this.location.back();
}

  /* Submit cart */
  updateItem() {
    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you wanna update?')){
        this.itemApi.Updateitem(id, this.edititemForm.value);
      this.router.navigate(['items-list']);
    }
  }

}
