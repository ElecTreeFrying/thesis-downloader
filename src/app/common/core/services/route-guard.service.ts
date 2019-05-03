import { Injectable } from '@angular/core';
import {
  Router,
  RoutesRecognized, ResolveStart, NavigationStart,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate,
  CanActivateChild
} from '@angular/router';
import 'rxjs/add/operator/map';

import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class EntryGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.router.events.map((_router) => {
      // console.log(_router);
      if (_router instanceof RoutesRecognized) {
        // console.log(_router.url);
      } else if (_router instanceof ResolveStart) {
        // console.log('z');
      }
    }).subscribe(() => 0);

    return this.authService.state.map((state) => {
      state === null ? this.router.navigate(['/']) : 0;
      return state !== null;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}

@Injectable({ providedIn: 'root' })
export class ExitGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    this.router.events.map((_router) => {
      // console.log(_router);
      if (_router instanceof RoutesRecognized) {
        // console.log('----------------');
        // console.log('exit');
        // console.log(_router.url.substring(1));
        // console.log('----------------\n\n\n\n');
      }
      return true;
    }).subscribe(() => 0);
    
    return this.authService.state.map((state) => {
      state !== null ? this.router.navigate([`/${sessionStorage.getItem('option')}`]) : 0;
      return state === null;
    });
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}

@Injectable({ providedIn: 'root' })
export class ComponentGuard implements CanActivate, CanActivateChild {

  constructor(
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // return this.router.url === sessionStorage.getItem('option')
    return this.router.events.map((_router) => {
        // console.log(_router);
      if (_router instanceof NavigationStart || _router instanceof RoutesRecognized) {
        return _router.url === sessionStorage.getItem('option');
      }
    })
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.canActivate(route, state);
  }

}
