import { Component } from '@angular/core';
import { AccountService } from '@app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {
  constructor(private accountService: AccountService) {}

  get account() {
    return this.accountService.accountValue;
  }
}
