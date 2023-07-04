import { Avatar, AvatarFallback } from '@/shared/ui/Avatar';
import { User } from '@prisma/client';
import { AvatarProps } from '@radix-ui/react-avatar';
import Image from 'next/image';
import { Icons } from '../../../shared/ui/Icons/Icons';

interface UserAvatarProps extends AvatarProps {
  image?: Pick<User, 'image'>['image'];
  name?: Pick<User, 'name'>['name'];
}

export function UserAvatar({ name, image, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={image}
            alt="profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{name}</span>
          <Icons.user className="h-4 w-4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
}
