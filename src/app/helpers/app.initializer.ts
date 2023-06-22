import { AppState } from '@app/store';
import { Store } from '@ngrx/store';
import { refreshToken } from '@store/actions/account.actions';
import { firstValueFrom } from 'rxjs';

export function appInitializer(store: Store<AppState>) {
  return () => store['store'].dispatch(refreshToken());
}
