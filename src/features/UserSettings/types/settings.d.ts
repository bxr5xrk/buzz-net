import { UsernameValidator } from '@/shared/lib/validators/username';
import * as z from 'zod';

export type FormData = z.infer<typeof UsernameValidator>;
