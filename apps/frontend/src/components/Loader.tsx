import { useEffect, useState } from 'react';
import Logo from './Logo';

const Loader = () => {
  return (
    <div className="w-screen h-screen light-mode dark:dark-mode">
      <Logo className="absolute top-[50%] left-[50%] light-mode dark:dark-mode" />
    </div>
  );
};

const DelayedLoader = ({ delay = 300 }: { delay?: number }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  return show ? <Loader /> : null;
};

export default DelayedLoader;
