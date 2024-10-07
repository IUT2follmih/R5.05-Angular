import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideFirebaseApp(() => initializeApp({"projectId":"angular-c4748","appId":"1:1020739479429:web:7e530be09eab892b7206ec","storageBucket":"angular-c4748.appspot.com","apiKey":"AIzaSyAvZzC6LrYflUSKuLPlUHm7J_IWsPBG0D0","authDomain":"angular-c4748.firebaseapp.com","messagingSenderId":"1020739479429"})), provideFirestore(() => getFirestore())]
};
