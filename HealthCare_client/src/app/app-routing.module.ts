import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { ThreadComponent } from './frontOffice/thread/thread.component';
import { ThreadDetailsComponent } from './frontOffice/thread-details/thread-details.component';
import { HeaderBackComponent } from './backOffice/header-back/header-back.component';
import { AllTemplateAdminComponent } from './backOffice/all-template-admin/all-template-admin.component';
import { UserListComponent } from './backOffice/user/user-list/user-list.component';
import { UserAddComponent } from './backOffice/user/user-add/user-add.component';
import { LoginComponent } from './frontOffice/user/login/login.component';

const routes: Routes = [
    { path: "front" , component: AllTemplateClientComponent},
    { path: "admin" , component: AllTemplateAdminComponent},
  { path : 'threads'  , component:ThreadComponent },
  { path : 'user_list'  , component:UserListComponent },
    { path : 'user_add'  , component:UserAddComponent },
    { path : 'login'  , component:LoginComponent },


  { path : 'threads/:idThread', component:ThreadDetailsComponent }
];



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
