
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule , Routes} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { BodyComponent } from './frontOffice/body/body.component';
import { HeaderComponent } from './frontOffice/header/header.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { HomeComponent } from './frontOffice/home/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { AddAppointmentComponent } from './frontOffice/Appointment/add-appointment/add-appointment.component';
import { EditAppointmentComponent } from './frontOffice/Appointment/edit-appointment/edit-appointment.component';
import { ShowAppointmentComponent } from './frontOffice/Appointment/show-appointment/show-appointment.component';
import { DetailsShowComponent } from './frontOffice/Appointment/details-show/details-show.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { AsideComponent } from './backOffice/aside/aside.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { UserListComponent } from './backOffice/user/user-list/user-list.component';
import { UserAddComponent } from './backOffice/user/user-add/user-add.component';
import { LoginComponent } from './frontOffice/user/login/login.component';
import { HttpInterceptorService } from './frontOffice/user/http-interceptor.service';
import { UserEditComponent } from './backOffice/user/user-edit/user-edit.component';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import { CodeActivationComponent } from './frontOffice/user/code-activation/code-activation.component';
import { ResetPasswordComponent } from './frontOffice/user/reset-password/reset-password.component';
import { SignupComponent } from './frontOffice/user/signup/signup.component';
import { NotFoundComponent } from './frontOffice/not-found/not-found.component';
import { ThreadsAdminComponent } from './backOffice/threads-admin/threads-admin.component';
import { UpdateThreadAdminComponent } from './backOffice/update-thread-admin/update-thread-admin.component';
import { AnswerAdminComponent } from './backOffice/answer-admin/answer-admin.component';
import { CommentAdminComponent } from './backOffice/comment-admin/comment-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnswerFrontComponent } from './frontOffice/answer-front/answer-front.component';
import { ConsultationsPatientComponent } from './frontOffice/amani/patient/consultations-patient/consultations-patient.component';
import { PatientInfosComponent } from './frontOffice/amani/patient/patient-infos/patient-infos.component';
import { PatientInterfaceComponent } from './frontOffice/amani/patient/patient-interface/patient-interface.component';
import { ProfilePatientComponent } from './frontOffice/amani/patient/profile-patient/profile-patient.component';
import { AjouterConsultationComponent } from './frontOffice/amani/doctor/ajouter-consultation/ajouter-consultation.component';
import { ConsultationdetailsComponent } from './frontOffice/amani/doctor/consultationdetails/consultationdetails.component';
import { DoctorInfosComponent } from './frontOffice/amani/doctor/doctor-infos/doctor-infos.component';
import { DoctorInterfaceComponent } from './frontOffice/amani/doctor/doctor-interface/doctor-interface.component';
import { EditconsultationComponent } from './frontOffice/amani/doctor/editconsultation/editconsultation.component';
import { EditprofileComponent } from './frontOffice/amani/doctor/editprofile/editprofile.component';
import { ListConsultationsComponent } from './frontOffice/amani/doctor/list-consultations/list-consultations.component';
import { ListPatientsComponent } from './frontOffice/amani/doctor/list-patients/list-patients.component';
import { PatientdetailsComponent } from './frontOffice/amani/doctor/patientdetails/patientdetails.component';
import { ProfileComponent } from './frontOffice/amani/doctor/profile/profile.component';
import { TableConsultationsComponent } from './frontOffice/amani/doctor/table-consultations/table-consultations.component';
import { TablePatientsComponent } from './frontOffice/amani/doctor/table-patients/table-patients.component';
import { PatientService } from './backOffice/anas/patient.service';
import { DoctorListComponent } from './backOffice/user/doctor-list/doctor-list.component';
import { PatientfileComponent } from './frontOffice/anas/patientfile/patientfile.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { ListDoctorComponent } from './frontOffice/list-doctor/list-doctor.component';
import { PatientappointmentlistComponent } from './frontOffice/Appointment/patientappointmentlist/patientappointmentlist.component';
import { DoctorappointmentlistComponent } from './frontOffice/doctorappointmentlist/doctorappointmentlist.component';
import { DoctorappointmentUpdateComponent } from './frontOffice/doctorappointment-update/doctorappointment-update.component';
import { GrammarlyButtonElement, GrammarlyEditorPluginElement } from '@grammarly/editor-sdk';
import { PatientfileAdminComponent } from './backOffice/anas/patientfile-admin/patientfile-admin.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    AllTemplateClientComponent,
    FooterComponent,
    HeaderComponent,
    ThreadComponent,
    ThreadDetailsComponent,
    HomeComponent,
    AddAppointmentComponent,
    EditAppointmentComponent,
    ShowAppointmentComponent,
    DetailsShowComponent,
    HeaderBackComponent,
    AllTemplateAdminComponent,
    HeaderBackComponent,
    AsideComponent,
    DashboardComponent,
    UserListComponent,
    UserAddComponent,
    LoginComponent,
    UserEditComponent,
    CodeActivationComponent,
    ResetPasswordComponent,
    SignupComponent,
    NotFoundComponent,
    ThreadsAdminComponent,
    UpdateThreadAdminComponent,
    AnswerAdminComponent,
    CommentAdminComponent,
    AnswerFrontComponent,
    ConsultationsPatientComponent,
    PatientInfosComponent,
    PatientInterfaceComponent,
    ProfilePatientComponent,
    AjouterConsultationComponent,
    ConsultationdetailsComponent,
    DoctorInfosComponent,
    DoctorInterfaceComponent,
    EditconsultationComponent,
    EditprofileComponent,
    ListConsultationsComponent,
    ListPatientsComponent,
    PatientdetailsComponent,
    ProfileComponent,
    TableConsultationsComponent,
    TablePatientsComponent,
    PatientfileComponent,
    ProfileComponent,
    DoctorListComponent,
    ListDoctorComponent,
    PatientappointmentlistComponent,
    DoctorappointmentlistComponent,
    DoctorappointmentUpdateComponent,
    PatientfileAdminComponent

  ],
  imports: [
    NgxPaginationModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    SocialLoginModule,
    FullCalendarModule
    ],

  exports: [RouterModule],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '998943596311-agii5b72rppsj1h1tdp5f75mhnfj22s7.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('554126483472498')
          }
        ]
      } as SocialAuthServiceConfig,
    },
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true},
       PatientService
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class AppModule { }