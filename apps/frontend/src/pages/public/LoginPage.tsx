import Logo from '@components/Logo';
import LoginForm from '@components/auth/signin/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex m-auto bg-no-repeat lg:min-h-screen bg-full lg:bg-auth_background px-auth">
      <div className="flex items-center justify-center w-full mt-8 lg:block lg:flex-1">
        <div className="flex flex-col gap-10">
          <Logo />
          <span className="text-4xl font-extrabold lg:text-6xl">Log in</span>
          <LoginForm />
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
