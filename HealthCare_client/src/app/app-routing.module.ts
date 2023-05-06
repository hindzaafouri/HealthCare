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
import { PatientFileComponent } from './backOffice/anas/patient-file/patient-file.component';
import { ProfileComponent } from './frontOffice/user/profile/profile.component';
import { DoctorListComponent } from './backOffice/user/doctor-list/doctor-list.component';
import { AdminGuard } from './backOffice/user/admin-guard';
import { PatientfileComponent } from './frontOffice/anas/patientfile/patientfile.component';


const routes: Routes = [
 { path: "" , component: HomeComponent},
  { path: "admin" , component: DashboardComponent, canActivate: [AdminGuard]},
  { path : 'threads'  , component:ThreadComponent },
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path : 'Appointment' , component : AddAppointmentComponent},
  { path : 'back' , component : HeaderBackComponent},
  { path : 'Appointment/show' , component : ShowAppointmentComponent},
  { path : 'Appointment/show/details' , component : DetailsShowComponent},
  { path : 'editappointment/:id_appointment' , component : EditAppointmentComponent},
  { path : 'user_list'  , component:UserListComponent },
  { path : 'doctor_list'  , component:DoctorListComponent },
    { path : 'user_add'  , component:UserAddComponent },
    { path : 'login'  , component:LoginComponent },
    {path: 'reset', component:ResetPasswordComponent},
  {path: 'active', component:CodeActivationComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'profile', component:ProfileComponent},
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path: 'update-thread/:threadId', component: UpdateThreadAdminComponent } ,
  { path: 'comments/:idAnswer', component: CommentAdminComponent },
  {
    path:'patient',
    component:PatientfileComponent
  },
  { path : "**" , component:NotFoundComponent}
 
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
