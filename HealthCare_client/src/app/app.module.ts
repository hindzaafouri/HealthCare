import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule , Routes} from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AllTemplateClientComponent } from './frontOffice/all-template-client/all-template-client.component';
import { HeaderComponent } from './frontOffice/header/header.component';
import { FooterComponent } from './frontOffice/footer/footer.component';
import { BodyComponent } from './frontOffice/body/body.component';


@NgModule({
  declarations: [
    AppComponent,
    AllTemplateClientComponent,
    HeaderComponent,
    FooterComponent,
    BodyComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
