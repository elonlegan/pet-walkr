import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@app/helpers/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'profile',
  },
  {
    path: 'account',
    loadChildren: () =>
      import('./account/account.module').then((m) => m.AccountModule),
  },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
  },
  { path: 'accounts', loadChildren: () => import('./accounts/accounts.module').then(m => m.AccountsModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
