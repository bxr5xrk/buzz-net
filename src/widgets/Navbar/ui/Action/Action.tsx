import { authOptions } from '@/shared/lib/auth/auth';
import { buttonVariants } from '@/shared/ui/Button/config/config';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { UserAccount } from '../UserAccount/UserAccount';

export async function Action() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <Link href="/sign-in" className={buttonVariants({})}>
        Sign In
      </Link>
    );
  }

  return <UserAccount user={session.user} />;
}
