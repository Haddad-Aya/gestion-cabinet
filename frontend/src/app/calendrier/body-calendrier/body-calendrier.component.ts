import { Component, ChangeDetectorRef, OnInit } from '@angular/core';
import { CalendarOptions, DateSelectArg, EventClickArg, EventApi } from '@fullcalendar/core';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { INITIAL_EVENTS, createEventId } from './event-utils';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { RendezVousService } from 'src/app/services/rendez-vous.service';
import { RendezVous } from 'src/app/classes/RendezVous';
import { PatientService } from 'src/app/services/patient.service';

@Component({
  selector: 'app-body-calendrier',
  templateUrl: './body-calendrier.component.html',
  styleUrls: ['./body-calendrier.component.css'],
})
export class BodyCalendrierComponent implements OnInit{
  formRendezVous!: FormGroup
  idPatient!:any
  patients!:any
  vDateDebut=[
    {"heureD":"08:30"},
    {"heureD":"09:00"},
    {"heureD":"09:30"},
    {"heureD":"10:00"},
    {"heureD":"10:30"},
    {"heureD":"11:00"},
    {"heureD":"11:30"},
    {"heureD":"12:00"},
    {"heureD":"12:30"},
    {"heureD":"15:00"},
    {"heureD":"15:30"},
    {"heureD":"16:00"},
    {"heureD":"16:30"},
    {"heureD":"17:00"},
    {"heureD":"17:30"}
  ]
  //verif champs rendez vous
  verifHeureDebut:boolean=false
  verifDateRendezVous:boolean=false
  erreurFormulaire:boolean=false
  formulaireValid:boolean=false
  calendarVisible = true;
  calendarOptions: CalendarOptions = {
    plugins: [
      interactionPlugin,
      dayGridPlugin,
      timeGridPlugin,
      listPlugin,
    ],
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    eventsSet: this.handleEvents.bind(this),
    //eventAdd:
    //eventChange:
    //eventRemove:
    /* you can update a remote database when these fire:
    eventAdd:
    eventChange:
    eventRemove:
    */
  };
  currentEvents: EventApi[] = [];

  constructor(private changeDetector: ChangeDetectorRef, private build: FormBuilder,private router: Router,private activatedRoute: ActivatedRoute, private serviceRendezVous:RendezVousService, private servicePatient:PatientService) {
    this.idPatient = this.activatedRoute.snapshot.paramMap.get("id")
  }
  ngOnInit(): void {
    try {
      this.servicePatient.getById(this.idPatient).subscribe((resultData: any) => {
       this.patients=resultData
       console.log(this.patients[0].nom)
      });
    }
    catch (error) {
      console.log(error)
    }

    //init formulaire rendezVous
    this.formRendezVous = this.build.group({
      dateRendezVous:['', [Validators.required]],
      heureDebut:['', [Validators.required]]
    })
    
  }

  handleCalendarToggle() {
    this.calendarVisible = !this.calendarVisible;
  }

  handleWeekendsToggle() {
    const { calendarOptions } = this;
    calendarOptions.weekends = !calendarOptions.weekends;
  }

  handleDateSelect(selectInfo: DateSelectArg) {
    const title = prompt('Please enter a new title for your event');
    const calendarApi = selectInfo.view.calendar;

    calendarApi.unselect(); // clear date selection

    if (title) {
      calendarApi.addEvent({
        id: this.idPatient,
        title:this.patients[0].nom+" "+this.patients[0].nom,
        start: selectInfo.startStr,
        allDay: selectInfo.allDay
      });
    }
  }

  handleEventClick(clickInfo: EventClickArg) {
    //bech nfaskhou beha el rendez-vous
    if (confirm(`Are you sure you want to delete the event '${clickInfo.event.title} ${clickInfo.event.id}'`)) {
      clickInfo.event.remove();
   /*   try {
        this.serviceRendezVous.annulerRendezVous(clickInfo,newRendezVous).subscribe((resultData: any) => {
         alert('Vous avez annuler le rendez vous de ')
        });
      }
      catch (error) {
        console.log(error)
      }*/
    }
  }

  handleEvents(events: EventApi[]) {
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }

  verifierLesChampRendezVous(){
    if(this.formRendezVous.value.dateRendezVous==""){
      this.verifDateRendezVous=true
    } 
  }
  getSelectedHeureDebut(event:any){
    let value = event.target.value;
    console.log(value)
    this.formRendezVous.get('heureDebut')?.setValue(value)
  }
  ajouterRendezVous(){
    this.verifierLesChampRendezVous()
    if(this.formRendezVous.valid){ 
      let newRendezVous=new RendezVous()
      newRendezVous.dateRendezVous=this.formRendezVous.value.dateRendezVous
      newRendezVous.heureDebut=this.formRendezVous.value.heureDebut
      try {
        this.serviceRendezVous.saveRendezVous(newRendezVous,this.idPatient).subscribe((resultData: any) => {
          this.formulaireValid=true
        });
      }
      catch (error) {
        console.log(error)
      }
    }
    else this.erreurFormulaire=true
  }
}
