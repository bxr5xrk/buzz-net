import { Community } from '@prisma/client';

export type CommunityName = Pick<Community, 'name'>['name'];
