import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { Router } from '@angular/router';
import firebase from "firebase/app";
import "firebase/firestore";
import * as fs from '../firebase.firestore.config.json';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  progress: number = 0;

  title: string = '';
  firstName: string = '';
  middleName: string = '';
  lastName: string = '';

  occupation: string = '';
  otherOccupation: string = '';

  organizationName: string = '';
  organizationType: string = '';
  fromACTorENO: string = '';

  countryCode: string = '';
  whatsappNumber: string = '';
  email: string = '';

  nationality: string = '';
  country: string = '';

  sessions: boolean[] = [false, false, false, false, false, false, false, false];

  agreement1: boolean = false;
  agreement2: boolean = false;

  disableSubmit: boolean = false;

  emailAlreadyExists: boolean = false;

  offline: boolean = false;

  constructor(private ionLoader: LoaderService, private router: Router, private ac: AppComponent) {}

  onClick(greenMenu: boolean, current: string) {
    this.ac.greenMenu = greenMenu;
    this.ac.updateCurrentMenuItemCSS(current);
  }

  submit() {
    this.ionLoader.showLoader('Submitting your details...', 'dots', 'loading').then(() => {
      const firebaseConfig = {
        apiKey: fs.apiKey,
        authDomain: fs.authDomain,
        projectId: fs.projectId,
        storageBucket: fs.storageBucket,
        messagingSenderId: fs.messagingSenderId,
        appId: fs.appId,
        measurementId: fs.measurementId
      };

      firebase.apps.length ? firebase.app() : firebase.initializeApp(firebaseConfig);
      const db = firebase.firestore();

      db.collection('check-for-net').get().then(snapshot => {
        this.offline = snapshot.docs.length == 0;
        this.ionLoader.hideLoader();
      });

      if (!this.offline) {
        db.collection("registrations").where("email", "==", this.email).get().then(snapshot => {
          this.emailAlreadyExists = snapshot.docs.length > 0;
          console.log(this.emailAlreadyExists);

          if (!this.emailAlreadyExists) {
            db.collection('registrations').add({
              title: this.title,
              firstName: this.firstName,
              middleName: this.middleName,
              lastName: this.lastName,
              occupation: this.occupation,
              otherOccupation: this.otherOccupation,
              organizationName: this.organizationName,
              organizationType: this.organizationType,
              fromACTorENO: this.fromACTorENO,
              countryCode: this.countryCode,
              whatsappNumber: this.whatsappNumber,
              email: this.email,
              nationality: this.nationality,
              country: this.country,
              sessions: this.sessions
            }).then(() => {
              this.ionLoader.hideLoader().then(() => {
                this.router.navigate(['/submitted']);
              });
            });
          }
        })
      }
    });
  }

ngOnInit() { }

}
