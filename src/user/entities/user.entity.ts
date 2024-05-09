import { User } from '@prisma/client';

export class UserEntity implements User {
  created_at: Date;
  email: string;
  id: number;
  name: string | null;
  password: string;
  updated_at: Date;
}
