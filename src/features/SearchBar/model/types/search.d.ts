import { Community, Prisma } from '@prisma/client';

export interface CommunityWithCount extends Community {
  _count: Prisma.CommunityCountOutputType;
}
