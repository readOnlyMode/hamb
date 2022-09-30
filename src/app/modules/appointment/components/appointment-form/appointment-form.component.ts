import {Component, OnInit, ViewChild} from "@angular/core";
import {FormControl, FormGroup, FormGroupDirective, Validator, Validators} from "@angular/forms";
import {AppointmentsStoreService} from "../../../../services/appointments-store.service";
import {BehaviorSubject, delay, of, Subject, concat, switchMap, skip} from "rxjs";
import {UniqueIdService} from "../../../../services/unique-id.service";
import {Appointment} from "../../../../shared/types/appointment";
import {ActivatedRoute, Router} from "@angular/router";


@Component({
  selector: 'app-appointment-form',
  templateUrl:'./appointment-form.component.html'
})
export class AppointmentFormComponent implements OnInit{
  @ViewChild('formDirective') private form: FormGroupDirective | null = null;

  // pseudocode to imitate toast
  private appointmentEmitter= new BehaviorSubject(null);
  public appointmentSuccessfullyCreated$ = this.appointmentEmitter.asObservable()
    .pipe(skip(1),
      switchMap(()=>concat(of(true), of(false).pipe(delay(2000)))))

  protected dateFormControl = new FormControl<Date>(new Date(), [Validators.required]);
  protected titleFormControl = new FormControl<string>('',[Validators.required]);
  protected descriptionFormControl = new FormControl<string>('',[Validators.required]);
  public appointmentForm = new FormGroup({
    date: this.dateFormControl,
    title: this.titleFormControl,
    description: this.descriptionFormControl
  })

  public isEditMode = false;
  public storedAppointment: Appointment | null = null;

  constructor(
    private appointmentsStoreService: AppointmentsStoreService,
    private uniqueIdService: UniqueIdService,
    private route: ActivatedRoute,
    private router: Router
  ){
  }

  ngOnInit(): void {
    const appointmentId = this.route.snapshot.paramMap.get('id');
    if(appointmentId) {
      this.isEditMode = true;
      this.storedAppointment = this.appointmentsStoreService.getStoredAppointment(+appointmentId);

      if(this.storedAppointment){
        this.appointmentForm.setValue(
          {
            date: this.storedAppointment.date,
            title: this.storedAppointment.title,
            description: this.storedAppointment.description
          })
      }
    }
  }

  public sendForm(): void {
    if(this.isEditMode){
      this.appointmentsStoreService.edit(
        {
          ...this.appointmentForm.value,
          id: this.storedAppointment!.id
        } as Appointment);
      this.router.navigate(['/'])
    }else {
      this.appointmentsStoreService.save(
        {
          ...this.appointmentForm.value,
          id: this.uniqueIdService.generateId()
        } as Appointment);

      this.appointmentEmitter.next(null)

      this.resetForm();
    }
  }

  private resetForm(){
    this.appointmentForm.reset()
    this.form?.resetForm()
  }
}
