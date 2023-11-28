import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import routeConfigs from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfigs)]
};
