import { ApplicationConfig } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authorInterceptorInterceptor } from './Interceptor/author-interceptor.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes,withComponentInputBinding()),provideHttpClient( withInterceptors([authorInterceptorInterceptor])), provideAnimationsAsync()]
};
