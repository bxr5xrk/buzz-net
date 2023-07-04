import { SignUp } from '@/features/auth';
import { cl } from '@/shared/lib';
import { buttonVariants } from '@/shared/ui/Button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function SignUpPage() {
  return (
    <div className="absolute inset-0">
      <div className="h-full max-w-2xl mx-auto flex flex-col items-center justify-center gap-20">
        <Link
          href="/"
          className={cl(
            buttonVariants({ theme: 'ghost', className: 'self-start -mt-20' })
          )}
        >
          <ChevronLeft className="mr-2 h-4 w-4" />
          Home
        </Link>

        <SignUp />
      </div>
    </div>
  );
}
