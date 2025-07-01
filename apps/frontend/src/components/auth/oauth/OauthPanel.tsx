import { Button } from '@components/common/Button';
import { GithubIcon, GoogleIcon } from '@components/common/Icon';
import { trpc } from '@utils/trpc';

type OauthPanelProps = {
  className?: string;
};

export const OauthPanel = ({ className }: OauthPanelProps) => {
  const { refetch } = trpc.oauth.googleAuth.useQuery(undefined, {
    enabled: false
  });

  const oauthGoogleHandler = async () => {
    const result = await refetch();
    if (result.data) {
      openPopup(result.data.url);
    }
  };

  function openPopup(
    url: string,
    name = 'GoogleLogin',
    width = 500,
    height = 600
  ): Window | null {
    const left = window.screenX + (window.innerWidth - width) / 2;
    const top = window.screenY + (window.innerHeight - height) / 2;

    return window.open(
      url,
      name,
      `width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`
    );
  }

  return (
    <div className={`${className}`}>
      <Button
        type="button"
        variant={'icon'}
        onClick={() => oauthGoogleHandler()}
      >
        <GoogleIcon />
      </Button>
      <Button type="button" variant={'icon'}>
        <GithubIcon />
      </Button>
    </div>
  );
};
