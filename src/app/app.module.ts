import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InputTextNumberDirective } from './directive/input-text-number.directive';

@NgModule({
  declarations: [
    AppComponent,
    InputTextNumberDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    InputTextNumberDirective,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
