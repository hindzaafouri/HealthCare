import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
import { GrammarlyButtonElement, GrammarlyEditorPluginElement } from '@grammarly/editor-sdk';


@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA] ,
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
  ],
  imports: [
    NgxPaginationModule,
    NgbModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    ToastrModule.forRoot({
      timeOut: 5000,
      progressBar: true,
      progressAnimation: 'increasing'
    }),
    SocialLoginModule
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }