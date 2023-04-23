import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';

const routes: Routes = [
  {path: "front" , component: AllTemplateClientComponent}
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
