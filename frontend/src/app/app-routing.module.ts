import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
import { NotFoundComponent } from './not-found/not-found.component';
import { PatientComponent } from './medecin/patient/patient.component';
import { EssayeComponent } from './medecin/essaye/essaye.component';
import { ConsultationComponent } from './medecin/consultation/consultation.component';
import { ArchiveComponent } from './medecin/archive/archive.component';
import { BodyCalendrierComponent } from './calendrier/body-calendrier/body-calendrier.component';
import { HistoriquePatientComponent } from './medecin/historique-patient/historique-patient.component';
import { ConsultationsComponent } from './medecin/listConsultations/consultations.component';
import { HistoriqueComponent } from './patient/historique/historique.component';
import { ProfilPatientComponent } from './patient/profil-patient/profil-patient.component';
import { RendezVousPatientComponent } from './patient/rendez-vous-patient/rendez-vous-patient.component';
import { DashboardHomePatientComponent } from './patient/dashboard-home-patient/dashboard-home-patient.component';
import { MdpOublierComponent } from './motDePasseOubliee/taperMail/mdp-oublier.component';
import { CodeVerificationComponent } from './motDePasseOubliee/code-verification/code-verification.component';
import { CodeEnvoyerComponent } from './motDePasseOubliee/code-envoyer/code-envoyer.component';
import { UpdateMdpComponent } from './motDePasseOubliee/update-mdp/update-mdp.component';
import { MonMedecinComponent } from './patient/mon-medecin/mon-medecin.component';
import { AuthGuard } from './authentification/auth.guard';

const routes: Routes = [
  { path: '', component: HomePegeComponent  },
  { path: 'home', component: HomePegeComponent  },
  { path: 'login', component: LoginComponent  },
  { path: 'register', component: RegisterComponent  },
  { path: 'dashboardMedecin', component: DashboardHomeComponent,canActivate:[AuthGuard], data:{roles:'ADMIN'}},
  { path: 'rendezVous', component: RendezVousComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'}},
  { path: 'profil', component: ProfilComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'} },
  { path: 'factures', component: FactureComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'} },
  { path: 'statistique', component: StatistiqueComponent  ,canActivate:[AuthGuard], data:{roles:'ADMIN'}},
  { path: 'consultation/:id', component: ConsultationComponent,canActivate:[AuthGuard], data:{roles:'ADMIN'}},
  { path: 'mesConsultation', component: ConsultationsComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'}},
  { path: 'archive', component: ArchiveComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'} },
  { path: 'patient', component: PatientComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'} },
  { path: 'calendar/:id', component: BodyCalendrierComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'} },
  { path: 'historique/:id', component: HistoriquePatientComponent ,canActivate:[AuthGuard], data:{roles:'ADMIN'} },

  { path: 'historique', component: HistoriqueComponent ,canActivate:[AuthGuard], data:{roles:'USER'} },
  { path: 'profilPatient', component: ProfilPatientComponent ,canActivate:[AuthGuard], data:{roles:'USER'}  },
  { path: 'rendezVousPatient', component: RendezVousPatientComponent ,canActivate:[AuthGuard], data:{roles:'USER'}  },
  { path: 'dashboardHomePatient', component: DashboardHomePatientComponent ,canActivate:[AuthGuard], data:{roles:'USER'}  },
  { path: 'notFount', component: NotFoundComponent  },
  { path: 'MdpOublier', component: MdpOublierComponent  },
  { path: 'codeVerif/:email', component: CodeVerificationComponent  },
  { path: 'codeEnvoyer/:email', component: CodeEnvoyerComponent  },
  { path: 'updateMdp', component: UpdateMdpComponent  },
  { path: 'monMedecin', component: MonMedecinComponent  },
  { path: '**', component: NotFoundComponent  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
