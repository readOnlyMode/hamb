import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/appointment/new',
    pathMatch: 'full'},
  {
    path: "new",
    component: AppointmentFormComponent
  },
  {
    path: "edit/:id",
    component: AppointmentFormComponent
  }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppointmentRoutingModule {}
