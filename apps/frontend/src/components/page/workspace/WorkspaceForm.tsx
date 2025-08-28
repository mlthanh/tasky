import { Button } from '@frontend/components/common/Button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@frontend/components/common/Card';
import Input from '@frontend/components/common/Input';
import { Label } from '@frontend/components/common/Label';
import { Separator } from '@frontend/components/common/Separator';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useCreateWorkspace } from '@frontend/hooks/useCreateWorkspace';
import { customResolver } from '@frontend/utils/customResolver';
import {
  createWorkspaceDto,
  createWorkspaceSchema
} from '@shared/trpc/schemas/workspace.schema';
import { Form, useForm } from 'react-hook-form';

interface WorkspaceFormProps {
  onCancel: () => void;
}

export const WorkspaceForm = ({ onCancel }: WorkspaceFormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm<createWorkspaceDto>({
    resolver: customResolver(createWorkspaceSchema)
  });

  const { getLabel } = useLanguage();
  const { mutate, isPending } = useCreateWorkspace();

  const onSubmit = (value: createWorkspaceDto) => {
    mutate(value);
  };

  return (
    <Card className="w-full h-full p-7">
      <CardHeader className="flex">
        <CardTitle className="text-lg font-bold text-black">
          {getLabel('workspace_title')}
        </CardTitle>
      </CardHeader>

      <Separator
        variant="dot"
        orientation="horizontal"
        className="my-2 text-black"
      />

      <CardContent className="block">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label className="text-sm text-black">Workspace Name</Label>
          <Input
            placeholder="Enter workspace name"
            className={`w-full text-black ${
              errors.name
                ? 'border-destructive focus:outline-none focus:ring-0'
                : ''
            } text-xs lg:text-sm`}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs lg:hidden text-destructive">
              {errors.name.message}
            </p>
          )}

          <Separator
            variant="dot"
            orientation="horizontal"
            className="my-2 text-black"
          />

          <div className="flex items-center justify-between">
            <Button
              type="button"
              size={'lg'}
              variant={'secondary'}
              onClick={onCancel}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" size={'lg'} disabled={isPending}>
              Create workspace
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
