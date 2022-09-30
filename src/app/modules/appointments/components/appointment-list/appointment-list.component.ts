import {Component, OnDestroy, OnInit} from "@angular/core";
import {AppointmentsStoreService} from "../../../../services/appointments-store.service";
import {Appointment} from "../../../../shared/types/appointment";
import {Subject, takeUntil} from "rxjs";
import {CdkDragDrop, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";

@Component({
  selector:"app-appointment-list",
  templateUrl: './appointment-list.component.html',
  styleUrls:['./appointment-list.scss']
})
export class AppointmentListComponent implements OnInit, OnDestroy{
  private unsubscriber: Subject<null> = new Subject()

  public appointments: Appointment[]  = []

  constructor(public appointmentsStoreService: AppointmentsStoreService) {
  }

  ngOnInit(): void {
    this.appointmentsStoreService.appointments$.pipe(
      takeUntil(this.unsubscriber)
    ).subscribe(appointments => {
      this.appointments = appointments
    })
  }

  trackById(index:number, appointment:Appointment){
    return appointment.id
  }

  drop(event: CdkDragDrop<Appointment[]>) {
    moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(null)
  }
}
