import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeAfterRegistrationPage } from './home-after-registration.page';

const routes: Routes = [
  {
    path: '',
    component: HomeAfterRegistrationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeAfterRegistrationPageRoutingModule {}
