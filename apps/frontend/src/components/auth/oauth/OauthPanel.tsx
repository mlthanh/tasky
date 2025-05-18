import { Button } from '@common/Button';
import { GithubIcon, GoogleIcon } from '@common/Icon';
import { trpc } from '@utils/trpc';

type OauthPanelProps = {
  className?: string;
};

export const OauthPanel = ({ className }: OauthPanelProps) => {
  const { data, refetch, isFetching } = trpc.oauth.googleAuth.useQuery(
    undefined,
    {
      enabled: false,
    }
  );

  const oauthHandler = async () => {
    const result = await refetch();
    if (result.data) {
      window.location.href = result.data.url;
    }
  };

  return (
    <div className={`${className}`}>
      <Button type="button" variant={'icon'} onClick={() => oauthHandler()}>
        <GoogleIcon />
      </Button>
      <Button type="button" variant={'icon'}>
        <GithubIcon />
      </Button>
    </div>
  );
};
