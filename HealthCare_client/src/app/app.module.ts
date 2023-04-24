import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule , Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ThreadComponent } from './thread/thread.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ThreadDetailsComponent } from './thread-details/thread-details.component';


import { AppRoutingModule } from './app-routing.module';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { HeaderComponent } from './frontOffice/header/header.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { BodyComponent } from './frontOffice/body/body.component';



@NgModule({
  declarations: [
    AppComponent,
    BodyComponent,
    AllTemplateClientComponent,
    FooterComponent,
    HeaderComponent,
    ThreadComponent,
    ThreadDetailsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
  ],
  exports: [RouterModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }