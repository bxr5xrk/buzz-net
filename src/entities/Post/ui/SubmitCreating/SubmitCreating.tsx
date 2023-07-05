import { Button } from '@/shared/ui/Button';
import { FORM_ID } from '../../const';

export function SubmitCreating() {
  return (
    <div className="flex w-full justify-end">
      <Button type="submit" className="w-full" form={FORM_ID}>
        Post
      </Button>
    </div>
  );
}
