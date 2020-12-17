import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';

var firebaseConfig = {
  apiKey: "AIzaSyCK7QUe82gTWTa8N6SkvBJTNf59C3fX2Dk",
  authDomain: "mobile-uas-22700.firebaseapp.com",
  projectId: "mobile-uas-22700",
  storageBucket: "mobile-uas-22700.appspot.com",
  messagingSenderId: "104598524215",
  appId: "1:104598524215:web:0e7c758dee48de99724ab2",
  measurementId: "G-L22J4VQ58R"
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    HttpClientModule,
    BrowserModule, 
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireDatabaseModule],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
