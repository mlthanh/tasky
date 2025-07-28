import Logo from '@components/Logo';
import LoginForm from '@components/auth/signin/LoginForm';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from '@frontend/components/common/Card';
import { Separator } from '@frontend/components/common/Seporator';

export default function LoginPage() {
  return (
    <div className="flex h-screen bg-neutral-100 bg-full lg:bg-auth_background px-auth">
      <div className="flex items-center justify-center w-full lg:block lg:flex-1 ">
        <div className="flex flex-col gap-10">
          <Logo />
          <Card className="p-8 mx-auto ">
            <CardHeader className="flex items-center justify-center">
              <CardTitle className="text-2xl font-extrabold lg:text-4xl">
                Welcome back !
              </CardTitle>
            </CardHeader>
            <Separator
              variant="dot"
              orientation="horizontal"
              className="my-3"
            />
            <CardContent className="flex items-center justify-center">
              <LoginForm />
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="items-end flex-1 hidden lg:flex">
        <img
          src="/auth/woman-character.png"
          className="bottom-0 w-auto max-h-[80%]"
          alt="women is working"
        />
      </div>
    </div>
  );
}
