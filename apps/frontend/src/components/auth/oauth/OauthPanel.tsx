import { trpc } from '@frontend/utils/trpc';
import { OauthPanelUI } from './OauthPanelUI';

export const OauthPanel = () => {
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
  return <OauthPanelUI oauthGoogleHandler={oauthGoogleHandler} />;
};
