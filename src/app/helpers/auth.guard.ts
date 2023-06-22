import { Injectable } from '@angular/core';
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { Role } from '@app/models';

import { AccountService } from '@app/services';

@Injectable({ providedIn: 'root' })
export class AuthGuard {
  constructor(private router: Router, private accountService: AccountService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const account = this.accountService.accountValue;
    console.log(account);

    if (account) {
      // check if route is restricted by role
      if (route.data['roles'] && !route.data['roles'].includes(account.role)) {
        // role not authorized so redirect to home page
        this.router.navigate([
          account.role === Role.Admin || account.role === Role.PetOwner
            ? '/pet-walkers'
            : '/home',
        ]);
        return false;
      }

      // authorized so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }
}
