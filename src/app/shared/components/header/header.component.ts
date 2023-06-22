import { Component } from '@angular/core';
import { AccountService } from '@app/services';
import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { logOut } from '@store/actions/account.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(
    private accountService: AccountService,
    private store: Store<AppState>
  ) {}

  logout() {
    this.store.dispatch(logOut());
  }

  get account() {
    return this.accountService.accountValue;
  }
}
