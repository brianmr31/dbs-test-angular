import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import {provideHttpClient, withFetch} from '@angular/common/http';

import { routeConfig } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

import { EmployeService } from './employe/employe.service';


export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), provideClientHydration(), provideHttpClient(withFetch()) ]
};
