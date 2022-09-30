import {Injectable, OnDestroy} from "@angular/core";
import {BehaviorSubject, Subject, takeUntil} from "rxjs";
import {Appointment} from "../shared/types/appointment";

@Injectable({
  providedIn: 'root',
})
export class AppointmentsStoreService implements OnDestroy{
  private readonly appointmentsKey = 'appointmentsKey';
  readonly appointments$: BehaviorSubject<Appointment[]> = new BehaviorSubject<Appointment[]>([]);

  private unsubscriber: Subject<null> = new Subject()
  constructor() {
    const storedAppointments: string | null = localStorage.getItem(this.appointmentsKey);

    if (storedAppointments) {
      this.appointments$.next(JSON.parse(storedAppointments));
    }

    this.appointments$.pipe(takeUntil(this.unsubscriber)).subscribe({
      next: (value: Appointment[]) => {
        localStorage.setItem(this.appointmentsKey, JSON.stringify(value));
      },
    });
  }

  public save(appointment: Appointment): void {
    const appointments: Appointment[] = this.getStoredAppointments()

    appointments.push(appointment)

    this.appointments$.next(appointments);
  }

  public delete(id: number){
    const appointments: Appointment[] = this.getStoredAppointments()
    this.appointments$.next(appointments.filter(appointment => appointment.id !== id));
  }

  public edit(appointment: Appointment){
    const appointments: Appointment[] = this.getStoredAppointments()
    const filteredAppointmentById = appointments.filter(storedAppointment => storedAppointment.id !== appointment.id)
    this.appointments$.next([...filteredAppointmentById, appointment]);
  }

  public getStoredAppointment(id: number): Appointment | null {
    const appointments: Appointment[] = this.getStoredAppointments()

    return appointments.find(appointment => appointment.id === id) ?? null;
  }

  private getStoredAppointments():  Appointment[] {
    return JSON.parse(localStorage.getItem(this.appointmentsKey) ?? "[]");
  }

  ngOnDestroy(): void {
    this.unsubscriber.next(null)
  }
}
