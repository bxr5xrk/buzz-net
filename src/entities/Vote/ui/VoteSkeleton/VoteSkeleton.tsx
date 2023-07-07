import { buttonVariants } from '@/shared/ui/Button';
import { ArrowBigDown, ArrowBigUp, Loader2 } from 'lucide-react';

export function VoteSkeleton() {
  return (
    <div className="flex w-20 flex-col items-center pr-6">
      {/* upvote */}
      <div className={buttonVariants({ theme: 'ghost' })}>
        <ArrowBigUp className="h-5 w-5 text-zinc-700" />
      </div>

      {/* score */}
      <div className="py-2 text-center text-sm font-medium text-zinc-900">
        <Loader2 className="h-3 w-3 animate-spin" />
      </div>

      {/* downvote */}
      <div className={buttonVariants({ theme: 'ghost' })}>
        <ArrowBigDown className="h-5 w-5 text-zinc-700" />
      </div>
    </div>
  );
}
