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
import { DoctorInterfaceComponent } from './frontOffice/amani/doctor/doctor-interface/doctor-interface.component';
import { DoctorInfosComponent } from './frontOffice/amani/doctor/doctor-infos/doctor-infos.component';
import { ListConsultationsComponent } from './frontOffice/amani/doctor/list-consultations/list-consultations.component';
import { TableConsultationsComponent } from './frontOffice/amani/doctor/table-consultations/table-consultations.component';
import { ListPatientsComponent } from './frontOffice/amani/doctor/list-patients/list-patients.component';
import { TablePatientsComponent } from './frontOffice/amani/doctor/table-patients/table-patients.component';
import { AjouterConsultationComponent } from './frontOffice/amani/doctor/ajouter-consultation/ajouter-consultation.component';
import { ProfileComponent } from './frontOffice/amani/doctor/profile/profile.component';
import { EditprofileComponent } from './frontOffice/amani/doctor/editprofile/editprofile.component';
import { ConsultationdetailsComponent } from './frontOffice/amani/doctor/consultationdetails/consultationdetails.component';
import { EditconsultationComponent } from './frontOffice/amani/doctor/editconsultation/editconsultation.component';
import { PatientdetailsComponent } from './frontOffice/amani/doctor/patientdetails/patientdetails.component';
import { PatientInterfaceComponent } from './frontOffice/amani/patient/patient-interface/patient-interface.component';
import { PatientInfosComponent } from './frontOffice/amani/patient/patient-infos/patient-infos.component';
import { ConsultationsPatientComponent } from './frontOffice/amani/patient/consultations-patient/consultations-patient.component';
import { ProfilePatientComponent } from './frontOffice/amani/patient/profile-patient/profile-patient.component';


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
    {path: 'reset', component:ResetPasswordComponent},
  {path: 'active', component:CodeActivationComponent},
  {path: 'signup', component:SignupComponent},
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path: 'update-thread/:threadId', component: UpdateThreadAdminComponent } ,
  { path: 'comments/:idAnswer', component: CommentAdminComponent },
 // { path : "**" , component:NotFoundComponent},
  {
    path: 'doctor', component: DoctorInterfaceComponent, children: [
       { path: '', redirectTo:'table-consultations' ,pathMatch:'full' },
      { path: 'doctorInfos', component: DoctorInfosComponent },
      { path: 'list-consultations', component: ListConsultationsComponent },
      { path: 'table-consultations', component: TableConsultationsComponent },
      { path: 'list-patients', component: ListPatientsComponent },
      { path: 'table-patients', component: TablePatientsComponent },
      { path: 'ajouter-consultation', component: AjouterConsultationComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'edit-profile', component: EditprofileComponent },
      { path: 'consultation-details/:id', component: ConsultationdetailsComponent },
      { path: 'edit-consultation/:id', component: EditconsultationComponent },
      { path: 'patient-details/:id', component: PatientdetailsComponent },
    ]
  },{
    path: 'patient', component: PatientInterfaceComponent, children: [
      { path: '', redirectTo: 'consultations-patient', pathMatch: 'full' },
      { path: 'patientInfos', component: PatientInfosComponent },
      { path: 'consultations-patient', component: ConsultationsPatientComponent },
      { path: 'list-patients', component: ListPatientsComponent },
      { path: 'profile_patient', component: ProfilePatientComponent },

    ]
  }

];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
