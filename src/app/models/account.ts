import { Role } from './role';

export class Account {
  id: string;
  title: string;
  name: string;
  email: string;
  imageUrl: string;
  role: Role;
  jwtToken?: string;
}
