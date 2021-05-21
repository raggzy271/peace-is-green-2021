import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeAfterRegistrationPageRoutingModule } from './home-after-registration-routing.module';

import { HomeAfterRegistrationPage } from './home-after-registration.page';

import { ScrollDownComponent } from '../components/scroll-down/scroll-down.component';
import { NoInternetComponent } from '../components/no-internet/no-internet.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeAfterRegistrationPageRoutingModule
  ],
  declarations: [HomeAfterRegistrationPage, ScrollDownComponent, NoInternetComponent],
  exports: [ScrollDownComponent, NoInternetComponent]
})
export class HomeAfterRegistrationPageModule {}
