import { SignUp } from '@/features/auth';
import { CloseModal, CloseBackground } from '@/shared/ui/CloseModal';

export default function SignUpModal() {
  return (
    <div className="fixed inset-0 z-10 bg-zinc-900/20">
      <CloseBackground />

      <div className="container z-20 mx-auto flex h-full max-w-lg items-center">
        <div className="relative h-fit w-full rounded-lg bg-white px-2 py-20">
          <div className="absolute right-4 top-4">
            <CloseModal />
          </div>

          <SignUp />
        </div>
      </div>
    </div>
  );
}
