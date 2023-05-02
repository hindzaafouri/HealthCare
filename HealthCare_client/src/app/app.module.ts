import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { RouterModule , Routes} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { BodyComponent } from './frontOffice/body/body.component';
import { HeaderComponent } from './frontOffice/header/header.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { AsideComponent } from './backOffice/aside/aside.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { NotFoundComponent } from './frontOffice/not-found/not-found.component';
import { ThreadsAdminComponent } from './backOffice/threads-admin/threads-admin.component';
import { UpdateThreadAdminComponent } from './backOffice/update-thread-admin/update-thread-admin.component';
import { AnswerAdminComponent } from './backOffice/answer-admin/answer-admin.component';
import { CommentAdminComponent } from './backOffice/comment-admin/comment-admin.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AnswerFrontComponent } from './frontOffice/answer-front/answer-front.component';

@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    AllTemplateClientComponent,
    FooterComponent,
    HeaderComponent,
    ThreadComponent,
    ThreadDetailsComponent,
    HeaderBackComponent,
    AllTemplateAdminComponent,
    HeaderBackComponent,
    AsideComponent,
    DashboardComponent,
    NotFoundComponent,
    ThreadsAdminComponent,
    UpdateThreadAdminComponent,
    AnswerAdminComponent,
    CommentAdminComponent,
    AnswerFrontComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule 
    ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }