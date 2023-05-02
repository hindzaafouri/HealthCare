import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { NotFoundComponent } from './frontOffice/not-found/not-found.component';
import { ThreadsAdminComponent } from './backOffice/threads-admin/threads-admin.component';
import { DashboardComponent } from './backOffice/dashboard/dashboard.component';
import { UpdateThreadAdminComponent } from './backOffice/update-thread-admin/update-thread-admin.component';
import { CommentAdminComponent } from './backOffice/comment-admin/comment-admin.component';

const routes: Routes = [
  { path: "" , component: AllTemplateClientComponent},
  { path: "admin" , component: DashboardComponent},
  { path : 'threads'  , component:ThreadComponent },
  { path: 'threads-admin' , component:ThreadsAdminComponent } ,
  { path : 'threads/:idThread', component:ThreadDetailsComponent },
  { path: 'update-thread/:threadId', component: UpdateThreadAdminComponent } ,
  { path: 'comments/:idAnswer', component: CommentAdminComponent },
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
