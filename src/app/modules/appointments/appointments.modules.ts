import { NgModule } from '@angular/core';
import { AppointmentsRoutingModule } from './appointments-rounting.module';
import {AppointmentListComponent} from "./components/appointment-list/appointment-list.component";
import {AppCommonModule} from "../app-common.module";

@NgModule({
  declarations: [AppointmentListComponent],
  imports: [AppCommonModule, AppointmentsRoutingModule],
})
export class AppointmentsModule {}
