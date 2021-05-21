import { Component, OnInit, ViewChild } from '@angular/core';
import { AppComponent } from '../app.component';
import firebase from "firebase/app";
import "firebase/firestore";
import * as fs from '../firebase.firestore.config.json';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-home-after-registration',
  templateUrl: './home-after-registration.page.html',
  styleUrls: ['./home-after-registration.page.scss'],
})
export class HomeAfterRegistrationPage implements OnInit {

  offline: boolean = false;

  constructor(private ac: AppComponent) {}

  onClick(greenMenu: boolean, current: string) {
    this.ac.greenMenu = greenMenu;
    this.ac.updateCurrentMenuItemCSS(current);
  }

  @ViewChild('hostSlides') hostSlides: IonSlides;
  @ViewChild('guestSlides') guestSlides: IonSlides;
  @ViewChild('languageHelpersSlides') languageHelpersSlides: IonSlides;

  isFirstHostSlide: boolean;
  isLastHostSlide: boolean;
  
  isFirstGuestSlide: boolean;
  isLastGuestSlide: boolean;
  
  isFirstLanguageHelperSlide: boolean;
  isLastLanguageHelperSlide: boolean;

  next(slider: string) {
    switch (slider) {
      case 'hosts':
        this.hostSlides.slideNext();
        break;
      case 'guests':
        this.guestSlides.slideNext();
        break;
      case 'languageHelpers':
        this.languageHelpersSlides.slideNext();
    }
  }

  prev(slider: string) {
    switch (slider) {
      case 'hosts':
        this.hostSlides.slidePrev();
        break;
      case 'guests':
        this.guestSlides.slidePrev();
        break;
      case 'languageHelpers':
        this.languageHelpersSlides.slidePrev();
    }
  }

  slideChange(slider: string) {
    switch (slider) {
      case 'hosts':
        this.hostSlides.isBeginning().then((isIt) => this.isFirstHostSlide = isIt);
        this.hostSlides.isEnd().then((isIt) => this.isLastHostSlide = isIt);
        break;

      case 'guests':
        this.guestSlides.isBeginning().then((isIt) => this.isFirstGuestSlide = isIt);
        this.guestSlides.isEnd().then((isIt) => this.isLastGuestSlide = isIt);
        break;

      case 'languageHelpers':
        this.languageHelpersSlides.isBeginning().then((isIt) => this.isFirstLanguageHelperSlide = isIt);
        this.languageHelpersSlides.isEnd().then((isIt) => this.isLastLanguageHelperSlide = isIt);
        break;
    }
  }

  hosts: string[] = [];
  languageHelpers: string[] = [];
  guests: string[] = [];

  ngOnInit() {
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

    db.collection('hosts').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.hosts.push(doc.data().link);
      });
    });

    db.collection('language-helpers').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.languageHelpers.push(doc.data().link);
      });
    });

    db.collection('guests').get().then(snapshot => {
      snapshot.docs.forEach(doc => {
        this.guests.push(doc.data().link);
      });
    }).then(() => {
      // We're calling the following, because we want to initialize isFirst...Slide and isLast...Slide booleans

      this.offline = this.hosts.length == 0 || this.guests.length == 0 || this.languageHelpers.length == 0; 

      this.slideChange('hosts');
      this.slideChange('guests');
      this.slideChange('languageHelpers');
    });
  }

}