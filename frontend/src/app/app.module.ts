import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Injectable } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardHomeComponent } from './medecin/dashboard-home/dashboard-home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { SpinnerComponent } from './spinner/spinner.component';
import { StatistiqueComponent } from './medecin/statistique/statistique.component';
import { RendezVousComponent } from './medecin/rendez-vous/rendez-vous.component';
import { FactureComponent } from './medecin/facture/facture.component';
import { ProfilComponent } from './medecin/profil/profil.component';
import { HomePegeComponent } from './home-pege/home-pege.component';
import { LeftComponent } from './medecin/left/left.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientComponent } from './medecin/patient/patient.component';
import { EssayeComponent } from './medecin/essaye/essaye.component';
import { ConsultationComponent } from './medecin/consultation/consultation.component';
import { ArchiveComponent } from './medecin/archive/archive.component';
import { BodyCalendrierComponent } from './calendrier/body-calendrier/body-calendrier.component';

import { FullCalendarModule } from '@fullcalendar/angular';
import interactionPlugin from '@fullcalendar/interaction';
import dayGridPlugin from '@fullcalendar/daygrid';
import { HistoriquePatientComponent } from './medecin/historique-patient/historique-patient.component';
import { ConsultationsComponent } from './medecin/listConsultations/consultations.component';
import { HistoriqueComponent } from './patient/historique/historique.component';
import { ProfilPatientComponent } from './patient/profil-patient/profil-patient.component';
import { RendezVousPatientComponent } from './patient/rendez-vous-patient/rendez-vous-patient.component';
import { DashboardHomePatientComponent } from './patient/dashboard-home-patient/dashboard-home-patient.component';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './authentification/auth.guard';
import { AuthInterceptor } from './authentification/auth.interceptor';
import { UtilisateurService } from './services/utilisateur.service';
import { MdpOublierComponent } from './motDePasseOubliee/taperMail/mdp-oublier.component';
import { CodeVerificationComponent } from './motDePasseOubliee/code-verification/code-verification.component';
import { CodeEnvoyerComponent } from './motDePasseOubliee/code-envoyer/code-envoyer.component';
import { UpdateMdpComponent } from './motDePasseOubliee/update-mdp/update-mdp.component';
import { SidebarPatientComponent } from './patient/sidebar-patient/sidebar-patient.component';
import { NavbarPatientComponent } from './patient/navbar-patient/navbar-patient.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MonMedecinComponent } from './patient/mon-medecin/mon-medecin.component';





@NgModule({
  declarations: [
    AppComponent,
    DashboardHomeComponent,
    RegisterComponent,
    LoginComponent,
    SpinnerComponent,
    StatistiqueComponent,
    RendezVousComponent,
    FactureComponent,
    ProfilComponent,
    HomePegeComponent,
    LeftComponent,
    NotFoundComponent,
    PatientComponent,
    EssayeComponent,
    ConsultationComponent,
    ArchiveComponent,
    BodyCalendrierComponent,
    HistoriquePatientComponent,
    ConsultationsComponent,
    HistoriqueComponent,
    ProfilPatientComponent,
    RendezVousPatientComponent,
    DashboardHomePatientComponent,
    MdpOublierComponent,
    CodeVerificationComponent,
    CodeEnvoyerComponent,
    UpdateMdpComponent,
    SidebarPatientComponent,
    NavbarPatientComponent,
    NavbarComponent,
    MonMedecinComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    RouterModule
  ],
  providers: [AuthGuard,
  {
    provide: HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
  },
  UtilisateurService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
