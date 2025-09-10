import Logo from './Logo';

const Loader = () => {
  return (
    <div className="flex items-center justify-center w-screen h-screen light-mode dark:dark-mode">
      <Logo className="light-mode dark:dark-mode" />
    </div>
  );
};

export default Loader;
