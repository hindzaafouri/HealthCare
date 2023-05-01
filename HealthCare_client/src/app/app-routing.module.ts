import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { HomeComponent } from './frontOffice/home/home/home.component';
import { AddAppointmentComponent } from './frontOffice/Appointment/add-appointment/add-appointment.component';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { BodyComponent } from './frontOffice/body/body.component';
import { ShowAppointmentComponent } from './frontOffice/Appointment/show-appointment/show-appointment.component';
import { DetailsShowComponent } from './frontOffice/Appointment/details-show/details-show.component';
import { EditAppointmentComponent } from './frontOffice/Appointment/edit-appointment/edit-appointment.component';

const routes: Routes = [
    { path: "front" , component: AllTemplateClientComponent},
  { path : 'threads'  , component:ThreadComponent },
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path: "" , component: HomeComponent},
  { path : 'Appointment' , component : AddAppointmentComponent},
  { path : 'back' , component : HeaderBackComponent},
  { path : 'Appointment/show' , component : ShowAppointmentComponent},
  { path : 'Appointment/show/details' , component : DetailsShowComponent},
  { path : 'editappointment/:id_appointment' , component : EditAppointmentComponent},
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
