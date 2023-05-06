import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { HomeComponent } from './frontOffice/home/home/home.component';
import { AddAppointmentComponent } from './frontOffice/Appointment/add-appointment/add-appointment.component';
import { BodyComponent } from './frontOffice/body/body.component';
import { ShowAppointmentComponent } from './frontOffice/Appointment/show-appointment/show-appointment.component';
import { DetailsShowComponent } from './frontOffice/Appointment/details-show/details-show.component';
import { EditAppointmentComponent } from './frontOffice/Appointment/edit-appointment/edit-appointment.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { UserListComponent } from './backOffice/user/user-list/user-list.component';
import { UserAddComponent } from './backOffice/user/user-add/user-add.component';
import { LoginComponent } from './frontOffice/user/login/login.component';
import { NotFoundComponent } from './frontOffice/not-found/not-found.component';
import { ThreadsAdminComponent } from './backOffice/threads-admin/threads-admin.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { UpdateThreadAdminComponent } from './backOffice/update-thread-admin/update-thread-admin.component';
import { CommentAdminComponent } from './backOffice/comment-admin/comment-admin.component';
import { ResetPasswordComponent } from './frontOffice/user/reset-password/reset-password.component';
import { CodeActivationComponent } from './frontOffice/user/code-activation/code-activation.component';
import { SignupComponent } from './frontOffice/user/signup/signup.component';
import { ListDoctorComponent } from './frontOffice/list-doctor/list-doctor.component';
import { PatientappointmentlistComponent } from './frontOffice/Appointment/patientappointmentlist/patientappointmentlist.component';
import { DoctorappointmentlistComponent } from './frontOffice/doctorappointmentlist/doctorappointmentlist.component';
import { DoctorappointmentUpdateComponent } from './frontOffice/doctorappointment-update/doctorappointment-update.component';


const routes: Routes = [
  { path: "" , component: HomeComponent},
  { path: "admin" , component: DashboardComponent},
  { path : 'threads'  , component:ThreadComponent },
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path : 'Appointment' , component : AddAppointmentComponent},
  { path : 'Appointment/show' , component : ShowAppointmentComponent},
  { path : 'Appointment/show/details' , component : DetailsShowComponent},
  { path : 'editappointment/:id_appointment' , component : EditAppointmentComponent},
  { path : 'user_list'  , component:UserListComponent },
  { path : 'user_add'  , component:UserAddComponent },
  { path : 'login'  , component:LoginComponent },
  { path: 'reset', component:ResetPasswordComponent},
  { path: 'active', component:CodeActivationComponent},
  { path: 'signup', component:SignupComponent},
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path: 'update-thread/:threadId', component: UpdateThreadAdminComponent } ,
  { path: 'patientappointments', component: PatientappointmentlistComponent },
  { path: 'doctorappointments', component: DoctorappointmentlistComponent },
  { path: 'doctorappointments/update', component: DoctorappointmentUpdateComponent },
  { path: "doctors", component: ListDoctorComponent },
  { path: 'comments/:idAnswer', component: CommentAdminComponent },
  { path: "**", component: NotFoundComponent },
 

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
