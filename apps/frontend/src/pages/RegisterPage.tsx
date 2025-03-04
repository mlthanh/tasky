import women_is_standing from '@assets/auth/woman-is-standing.png';
import SignUpForm from '@components/auth/signup/SignUpForm';

const RegisterPage = () => {
  return (
    <div className="flex h-screen m-auto bg-no-repeat bg-full lg:bg-auth_background lg:px-auth">
      <div className="flex items-center justify-center w-full lg:mt-8 lg:block lg:flex-1">
        <div className="flex flex-col gap-10">
          <span className="text-4xl font-extrabold lg:text-6xl">
            Registration
          </span>
          <SignUpForm />
        </div>
      </div>
      <div className="items-end justify-center flex-1 hidden lg:flex">
        <img
          src={women_is_standing}
          className="bottom-0 w-auto max-h-[80%]"
          alt="women is standing"
        />
      </div>
    </div>
  );
};

export default RegisterPage;
