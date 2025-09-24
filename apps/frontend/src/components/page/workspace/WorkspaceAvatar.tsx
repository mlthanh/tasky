import { Avatar, AvatarFallback } from '@frontend/components/common/Avatar';
import { tailwindMerge } from '@frontend/utils/merge';

interface WorkspaceAvatarProps {
  image?: string;
  name: string;
  className?: string;
}

export const WorkspaceAvatar = ({
  image,
  name,
  className
}: WorkspaceAvatarProps) => {
  const avatarFallback = name[0];
  if (image) {
    return (
      <div
        className={tailwindMerge(
          'size-10 relative rounded-md overflow-hidden',
          className
        )}
      >
        <img src={image} alt={name} className="object-cover"></img>
      </div>
    );
  }

  return (
    <Avatar className="flex items-center justify-center font-bold text-white rounded-md select-none bg-primary size-10">
      <AvatarFallback className="text-light">{avatarFallback}</AvatarFallback>
    </Avatar>
  );
};
