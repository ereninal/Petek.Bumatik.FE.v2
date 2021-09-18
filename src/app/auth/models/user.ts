import { Role } from './role';

export class User {
  id: number;
  email: string;
  password: string;
  fullname: string;
  avatar: string;
  role: Role;
  token?: string;
}
