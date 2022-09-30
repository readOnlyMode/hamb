import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/appointments/appointments.modules').then(
        (m) => m.AppointmentsModule
      ),
  },
  {
    path: 'appointment',
    loadChildren: () =>
      import('./modules/appointment/appointment.modules').then(
        (m) => m.AppointmentModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
