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
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@frontend/components/common/Avatar';
import { ImageIcon } from '@frontend/components/common/Icon';
import { toBase64 } from '@frontend/utils/toBase64';
import { useDeviceStore } from '@frontend/hooks/stores';

interface WorkspaceFormProps {
  onCancel: () => void;
  onSubmit: (values: createWorkspaceDto) => void;
  isPending: boolean;
}

export const WorkspaceFormUI = ({
  onCancel,
  onSubmit,
  isPending
}: WorkspaceFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors }
  } = useForm<createWorkspaceDto>({
    resolver: customResolver(createWorkspaceSchema)
  });

  const { getLabel } = useLanguage();
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const { isMobile } = useDeviceStore();

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const base64Str = await toBase64(file);
      setPreview(base64Str);
    }
  };

  const submitHandler = (values) => {
    const finalValues = {
      ...values,
      imageUrl: !preview ? undefined : preview
    };

    onSubmit(finalValues);

    if (isPending) reset();
  };

  return (
    <Card className="w-full h-full p-7">
      <CardHeader className="flex">
        <CardTitle className="font-bold text-black text-md lg:text-lg">
          {getLabel('lbl_form_001')}
        </CardTitle>
      </CardHeader>

      <Separator
        variant="dot"
        orientation="horizontal"
        className="my-2 text-black"
      />

      <CardContent className="block">
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-4"
        >
          <Label className="text-sm font-bold text-black">
            {getLabel('lbl_form_002')}
          </Label>
          <Input
            placeholder={getLabel('lbl_form_003')}
            className={`w-full text-black ${
              errors.name
                ? 'border-destructive focus:outline-none focus:ring-0'
                : ''
            } text-xs lg:text-sm`}
            disabled={isPending}
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
                <div className="size-[36px] lg:size-[72px] relative rounded-md overflow-hidden">
                  <img alt="image" className="object-cover" src={preview}></img>
                </div>
              ) : (
                <Avatar className="text-black size-[36px] lg:size-[72px]">
                  <AvatarFallback>
                    <ImageIcon className="size-[18px] lg:size-[36px]" />
                  </AvatarFallback>
                </Avatar>
              )}

              <div className="flex flex-col text-black">
                <p className="text-xs lg:text-sm">{getLabel('lbl_form_004')}</p>
                <p className="text-xs lg:text-sm text-muted-foreground">
                  {getLabel('lbl_form_005')}
                </p>
                <input
                  ref={imageRef}
                  className="hidden"
                  type="file"
                  accept=".jpg, .png, .jpeg, .svg"
                  onChange={handleImageChange}
                  disabled={isPending}
                ></input>
                <Button
                  variant={'teritary'}
                  type="button"
                  size={'xs'}
                  className="mt-2 w-fit"
                  onClick={() => imageRef.current?.click()}
                >
                  <span className="text-xs lg:text-sm">
                    {getLabel('lbl_button_005')}
                  </span>
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
              size={`${isMobile ? 'sm' : 'lg'}`}
              variant={'secondary'}
              onClick={onCancel}
              disabled={isPending}
            >
              <span className="text-xs lg:text-sm">
                {getLabel('lbl_button_007')}
              </span>
            </Button>
            <Button
              type="submit"
              size={`${isMobile ? 'sm' : 'lg'}`}
              disabled={isPending}
            >
              <span className="text-xs lg:text-sm">
                {getLabel('lbl_button_006')}
              </span>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
