import { User } from '@prisma/client';

export type AuthorUsername = Pick<User, 'username'>['username'];
