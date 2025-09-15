import { Button } from '@components/common/Button';
import { GithubIcon, GoogleIcon } from '@components/common/Icon';

type OauthPanelProps = {
  className?: string;
  oauthGoogleHandler: () => void;
};

export const OauthPanelUI = ({ oauthGoogleHandler }: OauthPanelProps) => {
  return (
    <div className={`flex flex-col justify-center gap-2`}>
      <Button
        type="button"
        variant={'outline'}
        className="border border-neutral-200"
        onClick={() => oauthGoogleHandler()}
      >
        <GoogleIcon /> Login with google
      </Button>
      <Button
        type="button"
        variant={'outline'}
        className="border border-neutral-200"
      >
        <GithubIcon /> Login with github
      </Button>
    </div>
  );
};
