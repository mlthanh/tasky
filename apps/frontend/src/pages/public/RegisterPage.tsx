import SignUpForm from '@components/auth/signup/SignUpForm';
import Transition from '@components/transition/Transition';
import { useEffect, useState } from 'react';
import MarketingPage from './MarketingPage';
import { useLocation } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@frontend/components/common/Card';
import Logo from '@frontend/components/Logo';

const RegisterPage = () => {
  const location = useLocation();
  const [delay, setDelay] = useState(false);
  const isFromGetting = location?.state?.from === 'getting';

  useEffect(() => {
    if (isFromGetting) {
      const timer = setTimeout(() => setDelay(true), 800);
      return () => {
        clearTimeout(timer);
        window.history.replaceState({}, '');
      };
    } else {
      setDelay(true);
    }
  }, [isFromGetting]);

  return (
    <>
      {isFromGetting && <Transition />}
      {isFromGetting && !delay ? (
        <MarketingPage />
      ) : (
        <div className="flex h-screen bg-neutral-100 bg-full lg:bg-auth_background lg:px-auth">
          <div className="flex items-center justify-center w-full lg:m-auto lg:block lg:flex-1 ">
            <Card className="p-8 mx-auto ">
              <CardHeader className="flex items-center justify-center">
                <CardTitle className="text-2xl font-extrabold lg:text-4xl">
                  Sign Up
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <SignUpForm />
              </CardContent>
            </Card>
          </div>
          <div className="items-end justify-center flex-1 hidden lg:flex">
            <img
              src="/auth/woman-is-standing.png"
              className="bottom-0 w-auto max-h-[80%]"
              alt="women is standing"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default RegisterPage;
