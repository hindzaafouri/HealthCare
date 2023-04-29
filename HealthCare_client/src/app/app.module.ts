import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule , Routes} from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { BodyComponent } from './frontOffice/body/body.component';
import { HeaderComponent } from './frontOffice/header/header.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { AsideComponent } from './backOffice/aside/aside.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { UserListComponent } from './backOffice/user/user-list/user-list.component';
import { UserAddComponent } from './backOffice/user/user-add/user-add.component';
import { LoginComponent } from './frontOffice/user/login/login.component';
import { HttpInterceptorService } from './frontOffice/user/http-interceptor.service';
import { UserEditComponent } from './backOffice/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    AllTemplateClientComponent,
    FooterComponent,
    HeaderComponent,
    ThreadComponent,
    ThreadDetailsComponent,
    AllTemplateAdminComponent,
    HeaderBackComponent,
    AsideComponent,
    DashboardComponent,
    UserListComponent,
    UserAddComponent,
    LoginComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  exports: [RouterModule],
  providers: [
    {provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }