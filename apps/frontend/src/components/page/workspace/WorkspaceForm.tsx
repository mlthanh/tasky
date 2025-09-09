import { useForm } from 'react-hook-form';
import React, { useRef, useState } from 'react';

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
import { Avatar } from '@frontend/components/common/Avatar';
import { ImageIcon } from '@frontend/components/common/Icon';
import { toBase64 } from '@frontend/utils/toBase64';

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
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { mutate, isPending } = useCreateWorkspace();

  const onSubmit = (value: createWorkspaceDto) => {
    mutate(value);
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const base64Str = await toBase64(file);
      setPreview(base64Str);
    }
  };

  return (
    <Card className="w-full h-full p-7">
      <CardHeader className="flex">
        <CardTitle className="text-lg font-bold text-black">
          {getLabel('lbl_form_001')}
        </CardTitle>
      </CardHeader>

      <Separator
        variant="dot"
        orientation="horizontal"
        className="my-2 text-black"
      />

      <CardContent className="block">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Label className="text-sm text-black">
            {getLabel('lbl_form_002')}
          </Label>
          <Input
            placeholder={getLabel('lbl_form_003')}
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

          <div className="flex flex-col gap-y-2">
            <div className="flex items-center gap-x-5 ">
              {preview ? (
                <div className="size-[72px] relative rounded-md overflow-hidden">
                  <img
                    alt="image"
                    className="object-cover-fill"
                    src={preview}
                    {...register('imageUrl')}
                  ></img>
                </div>
              ) : (
                <Avatar
                  classNameWrapper="text-black size-[72px]"
                  fallback={<ImageIcon className="size-[36px]" />}
                />
              )}

              <div className="flex flex-col text-black">
                <p className="text-sm">{getLabel('lbl_form_004')}</p>
                <p className="text-sm text-muted-foreground">
                  {getLabel('lbl_form_005')}
                </p>
                <input
                  ref={imageRef}
                  disabled={isPending}
                  className="hidden"
                  type="file"
                  accept=".jpg, .png, .jpeg, .svg"
                  onChange={handleImageChange}
                ></input>
                <Button
                  variant={'teritary'}
                  type="button"
                  disabled={isPending}
                  size={'xs'}
                  className="mt-2 w-fit"
                  onClick={() => imageRef.current?.click()}
                >
                  {getLabel('lbl_button_005')}
                </Button>
              </div>
            </div>
          </div>

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
              {getLabel('lbl_button_007')}
            </Button>
            <Button type="submit" size={'lg'} disabled={isPending}>
              {getLabel('lbl_button_006')}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
