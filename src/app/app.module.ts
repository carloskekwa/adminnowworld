import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AddcartComponent } from './components/add-cart/add-cart.component';
import { EditcartComponent } from './components/edit-cart/edit-cart.component';
import { cartListComponent } from './components/cart-list/cart-list.component';

/* Angular material */
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './material.module';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

/* Firebase */
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';

/* Angular CRUD services */
import { cartService } from './shared/cart.service';

/* Reactive form services in Angular 7 */
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdditemComponent } from './components/add-item/add-item.component';
import { ItemListComponent } from './components/item-list/item-list.component';
import { EditItemComponent } from './components/edit-item/edit-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AddcartComponent,
    EditcartComponent,
    cartListComponent,
    AdditemComponent,
    ItemListComponent,
    EditItemComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule
],
  providers: [cartService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
