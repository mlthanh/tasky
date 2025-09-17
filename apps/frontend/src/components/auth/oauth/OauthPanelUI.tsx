import { Button } from '@components/common/Button';
import { GithubIcon, GoogleIcon } from '@components/common/Icon';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';

type OauthPanelProps = {
  className?: string;
  oauthGoogleHandler: () => void;
};

export const OauthPanelUI = ({ oauthGoogleHandler }: OauthPanelProps) => {
  const { getLabel } = useLanguage();

  return (
    <div className="flex flex-col justify-center gap-2">
      <Button
        type="button"
        variant={'outline'}
        className="border border-neutral-200"
        onClick={() => oauthGoogleHandler()}
      >
        <GoogleIcon /> {getLabel('lbl_button_008')}
      </Button>
      <Button
        type="button"
        variant={'outline'}
        className="border border-neutral-200"
      >
        <GithubIcon /> {getLabel('lbl_button_009')}
      </Button>
    </div>
  );
};
