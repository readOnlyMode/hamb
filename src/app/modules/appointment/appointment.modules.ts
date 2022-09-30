import { NgModule } from '@angular/core';
import { AppointmentRoutingModule } from './appointments-rounting.module';
import {AppointmentFormComponent} from "./components/appointment-form/appointment-form.component";
import {AppCommonModule} from "../app-common.module";

@NgModule({
  declarations: [AppointmentFormComponent],
  imports: [
    AppCommonModule,
    AppointmentRoutingModule,
  ],
})
export class AppointmentModule {}
