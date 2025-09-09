import { Button } from '@components/common/Button';
import { useLanguage } from '@frontend/contexts/language/LanguageProvider';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const goBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      navigate('/');
    }
  };

  const { getLabel } = useLanguage();

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
        <p className="text-4xl font-medium tracking-wider">
          {getLabel('lbl_notfound_001')} <br /> {getLabel('lbl_notfound_002')}
        </p>
        <span className="mt-4 text-2xl font-normal">
          {getLabel('lbl_notfound_003')} 404
        </span>
        <Button
          variant={'secondary'}
          className="flex items-center p-3 text-lg font-medium text-white bg-primary"
          onClick={() => goBack()}
        >
          {getLabel('lbl_button_001')}
        </Button>
      </div>
    </div>
  );
};

export default NotFoundPage;
