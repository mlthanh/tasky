import { Button } from '@components/common/Button';
import { useSearchParams } from 'react-router-dom';

export default function OauthErrorPage() {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message');
  const statusCode = searchParams.get('statusCode');

  return (
    <div className="flex m-auto bg-no-repeat lg:min-h-screen bg-full lg:bg-auth_background px-auth">
      <div className="items-end flex-1 hidden lg:flex">
        <img
          src="/auth/error_bg.png"
          className="bottom-0 w-auto max-h-[80%]"
          alt="women is working"
        />
      </div>
      <div className="flex flex-col items-start justify-center w-full min-h-screen gap-3 lg:flex-1">
        <h1 className="font-bold text-9xl">Oops!</h1>
        <p className="text-4xl font-medium tracking-wider">{message}</p>
        <span className="mt-4 text-2xl font-normal">
          Error code: {statusCode}
        </span>
        <Button
          variant={'secondary'}
          className="flex items-center p-3 text-lg font-medium text-white bg-primary"
        >
          Go back
        </Button>
      </div>
    </div>
  );
}
