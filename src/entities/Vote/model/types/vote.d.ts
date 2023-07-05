import { Vote } from '@prisma/client';

export type VoteType = Pick<Vote, 'type'>['type'];
