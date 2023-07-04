import { SignIn } from '@/features/auth';
import { CloseModal, CloseBackground } from '@/shared/ui/CloseModal';

export default function SignInModal() {
  return (
    <div className="fixed inset-0 bg-zinc-900/20 z-10">
      <CloseBackground />

      <div className="container flex items-center h-full max-w-lg mx-auto">
        <div className="relative bg-white w-full h-fit py-20 px-2 rounded-lg">
          <div className="absolute top-4 right-4">
            <CloseModal />
          </div>

          <SignIn />
        </div>
      </div>
    </div>
  );
}
